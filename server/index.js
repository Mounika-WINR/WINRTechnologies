import "dotenv/config";
import { Buffer } from "node:buffer";
import express from "express";
import nodemailer from "nodemailer";
import pg from "pg";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { getResumeScoringText, scoreResumeMatch } from "./atsScoring.js";

const { Pool } = pg;
const requiredEnvironment = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"];
const CONSENT_POLICY_VERSION = "resume-consent-v2";
const TERMS_CONSENT_TEXT = "I have read and agree to the WINR Resume Portal Terms & Conditions and WINR Technologies Terms of Services & Conditions. The information I enter may be used to create and assess my resume. When I click Preview, WINR will store the current resume for this session, and a later preview will replace it. If I withdraw storage permission, the saved resume will be deleted while the consent and withdrawal record remains for audit purposes. My ATS score will not be stored.";
const STORAGE_CONSENT_TEXT = "I give WINR permission to store the resume I create on its system.";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_RESUME_JSON_LENGTH = 1_000_000;
const MAX_PHOTO_DATA_URL_LENGTH = 3_000_000;
const QUOTE_SERVICES = new Set([
  "Web Development",
  "App Development",
  "Software Development",
  "Staffing",
]);
const apiRoutes = [
  { method: "GET", path: "/api/health", description: "Check API and PostgreSQL connection" },
  { method: "GET", path: "/api/opportunities", description: "List published opportunities" },
  { method: "POST", path: "/api/contact/quote", description: "Email a quote request to WINR" },
  { method: "POST", path: "/api/contact/message", description: "Email a contact form submission to WINR" },
  { method: "POST", path: "/api/ats-score", description: "Score resume keywords against a job description" },
  { method: "POST", path: "/api/resume-consents", description: "Record accepted resume consent" },
  { method: "POST", path: "/api/resume-consents/:id/withdraw", description: "Record consent withdrawal" },
  { method: "PUT", path: "/api/resumes/:resumeSessionId", description: "Save or replace a resume preview" },
];

async function deliverQuoteEmail(fields) {
  return deliverContactEmail({
    ...fields,
    formType: "Request a Quote",
    subject: `Quote request - ${fields.service}`,
  });
}

async function deliverContactEmail(fields) {
  const requiredMailSettings = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"];
  const missingMailSettings = requiredMailSettings.filter((key) => !process.env[key]);
  if (missingMailSettings.length > 0) {
    const error = new Error(`Missing SMTP configuration: ${missingMailSettings.join(", ")}`);
    error.code = "SMTP_NOT_CONFIGURED";
    throw error;
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    const error = new Error("SMTP_PORT must be a valid TCP port number.");
    error.code = "SMTP_NOT_CONFIGURED";
    throw error;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || (process.env.SMTP_SECURE !== "false" && port === 465),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: "info@winrtechnologies.com",
    replyTo: fields.email,
    subject: fields.subject || `${fields.formType} - ${fields.fullName}`,
    text: Object.entries(fields)
      .filter(([key, value]) => !["subject", "resume"].includes(key) && typeof value === "string" && value.trim())
      .map(([key, value]) => `${key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)}: ${value.trim()}`)
      .join("\n"),
    attachments: fields.resume
      ? [{
        filename: fields.resume.name,
        content: Buffer.from(fields.resume.contentBase64, "base64"),
        contentType: fields.resume.type,
      }]
      : [],
  });
}

export function createApp(pool, {
  sendQuoteEmail = deliverQuoteEmail,
  sendContactEmail = deliverContactEmail,
} = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "5mb" }));

app.get("/", (request, response) => {
  response.json({
    name: "WINR API",
    routes: apiRoutes.map((route) => ({
      ...route,
      url: `${request.protocol}://${request.get("host")}${route.path}`,
    })),
  });
});

app.get("/api/health", async (_request, response, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        to_regclass('public.resume_consent_records') IS NOT NULL AS "resumeConsentRecords",
        to_regclass('public.resume_records') IS NOT NULL AS "resumeRecords"
    `);
    const schema = rows[0];
    const status = schema.resumeConsentRecords && schema.resumeRecords ? "ok" : "needs_migrations";
    response.status(status === "ok" ? 200 : 503).json({
      status,
      database: "connected",
      schema,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/opportunities", async (_request, response, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        title,
        team,
        description,
        location,
        employment_type AS "employmentType",
        published_at AS "publishedAt",
        closes_at AS "closesAt"
      FROM opportunities
      WHERE status = 'published'
        AND (closes_at IS NULL OR closes_at >= CURRENT_TIMESTAMP)
      ORDER BY published_at DESC NULLS LAST, created_at DESC
    `);

    response.json({ opportunities: rows });
  } catch (error) {
    next(error);
  }
});

app.post("/api/contact/quote", async (request, response) => {
  const fields = request.body ?? {};
  const { fullName, phone, email, companyName, service, message } = fields;
  const valid =
    typeof fullName === "string"
    && /^[\p{L}\s]{2,100}$/u.test(fullName.trim())
    && typeof phone === "string"
    && /^\+[1-9]\d{0,2}\d{10}$/.test(phone)
    && typeof email === "string"
    && email.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && typeof companyName === "string"
    && /^[\p{L}\s]{2,100}$/u.test(companyName.trim())
    && typeof service === "string"
    && QUOTE_SERVICES.has(service)
    && typeof message === "string"
    && message.trim().length > 0
    && message.length <= 2000;

  if (!valid) {
    return response.status(400).json({ error: "Enter valid details in all required quote request fields." });
  }

  try {
    await sendQuoteEmail({ fullName: fullName.trim(), phone, email, companyName: companyName.trim(), service, message: message.trim() });
    return response.json({ message: "Thank you for your message. We will get back to you shortly." });
  } catch (error) {
    if (error.code === "SMTP_NOT_CONFIGURED") {
      console.error("Quote email is not configured:", error.message);
      return response.status(503).json({ error: "Quote email delivery is not configured. Please contact WINR directly." });
    }

    console.error("Quote email delivery failed:", error);
    return response.status(502).json({ error: "We could not send your request right now. Please try again later." });
  }
});

app.post("/api/contact/message", async (request, response) => {
  const fields = request.body ?? {};
  const { formType, fullName, name, email, phone, message, resume } = fields;
  const senderName = fullName ?? name;
  const valid =
    typeof formType === "string"
    && ["Get in Touch", "Let's Talk"].includes(formType)
    && typeof senderName === "string"
    && senderName.trim().length >= 2
    && senderName.length <= 100
    && typeof email === "string"
    && email.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && (formType !== "Get in Touch" || fields.privacyConsent === "on")
    && (phone === undefined || (typeof phone === "string" && phone.length <= 30))
    && typeof message === "string"
    && message.trim().length > 0
    && message.length <= 5000
    && (resume === undefined || (
      resume
      && typeof resume === "object"
      && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(resume.type)
      && typeof resume.name === "string"
      && resume.name.length <= 255
      && typeof resume.contentBase64 === "string"
      && resume.contentBase64.length <= 4_194_304
    ));

  if (!valid) {
    return response.status(400).json({ error: "Enter valid details in all required contact form fields." });
  }

  try {
    const forwardedFields = Object.fromEntries(
      ["phone", "primaryInterest", "purpose", "studentOpportunity", "industry", "privacyConsent", "newsletterConsent"]
        .filter((key) => typeof fields[key] === "string")
        .map((key) => [key, fields[key]]),
    );
    await sendContactEmail({
      ...forwardedFields,
      formType,
      fullName: senderName.trim(),
      email: email.trim(),
      message: message.trim(),
      ...(resume ? { resume } : {}),
    });
    return response.json({ message: "Thank you for your message. We will get back to you shortly." });
  } catch (error) {
    if (error.code === "SMTP_NOT_CONFIGURED") {
      console.error("Contact email is not configured:", error.message);
      return response.status(503).json({ error: "Email delivery is not configured. Please contact WINR directly." });
    }

    console.error("Contact email delivery failed:", error);
    return response.status(502).json({ error: "We could not send your message right now. Please try again later." });
  }
});

app.post("/api/ats-score", (request, response) => {
  const { jobDescription, resumeData } = request.body ?? {};
  if (
    typeof jobDescription !== "string"
    || jobDescription.trim().length === 0
    || jobDescription.length > 50_000
    || !resumeData
    || typeof resumeData !== "object"
    || Array.isArray(resumeData)
    || JSON.stringify(resumeData).length > MAX_RESUME_JSON_LENGTH
  ) {
    return response.status(400).json({
      error: "A job description and valid resume details are required (maximum 50,000 characters for the job description and 1 MB for resume details).",
    });
  }

  const resumeText = getResumeScoringText(resumeData);
  const result = scoreResumeMatch(jobDescription, resumeText);
  if (result.score === null) {
    return response.status(422).json(result);
  }
  return response.json(result);
});

app.post("/api/resume-consents", async (request, response, next) => {
  const { resumeSessionId, termsAccepted, storageConsentAccepted } = request.body ?? {};

  if (
    typeof resumeSessionId !== "string"
    || !UUID_PATTERN.test(resumeSessionId)
    || termsAccepted !== true
    || storageConsentAccepted !== true
  ) {
    return response.status(400).json({
      error: "A valid resume session ID and acceptance of both consent checkboxes are required.",
    });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO resume_consent_records (
         resume_session_id,
         policy_version,
         terms_text,
         storage_consent_text
       )
       VALUES ($1, $2, $3, $4)
       RETURNING id, accepted_at AS "acceptedAt", policy_version AS "policyVersion"`,
      [resumeSessionId, CONSENT_POLICY_VERSION, TERMS_CONSENT_TEXT, STORAGE_CONSENT_TEXT],
    );

    response.status(201).json({ consent: rows[0] });
  } catch (error) {
    next(error);
  }
});

app.post("/api/resume-consents/:id/withdraw", async (request, response, next) => {
  if (!UUID_PATTERN.test(request.params.id)) {
    return response.status(400).json({ error: "A valid consent record ID is required." });
  }

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const { rows } = await client.query(
      `UPDATE resume_consent_records
       SET withdrawn_at = COALESCE(withdrawn_at, CURRENT_TIMESTAMP)
       WHERE id = $1
       RETURNING id, resume_session_id AS "resumeSessionId", withdrawn_at AS "withdrawnAt"`,
      [request.params.id],
    );

    if (rows.length === 0) {
      await client.query("ROLLBACK");
      return response.status(404).json({ error: "Consent record not found." });
    }

    await client.query(
      "DELETE FROM resume_records WHERE consent_record_id = $1",
      [request.params.id],
    );
    await client.query("COMMIT");
    response.json({ consent: rows[0] });
  } catch (error) {
    if (client) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Failed to roll back consent withdrawal:", rollbackError);
      }
    }
    next(error);
  } finally {
    client?.release();
  }
});

app.put("/api/resumes/:resumeSessionId", async (request, response, next) => {
  const { resumeSessionId } = request.params;
  const { consentRecordId, resumeData, photoDataUrl = null } = request.body ?? {};

  if (
    !UUID_PATTERN.test(resumeSessionId)
    || typeof consentRecordId !== "string"
    || !UUID_PATTERN.test(consentRecordId)
    || !resumeData
    || typeof resumeData !== "object"
    || Array.isArray(resumeData)
    || JSON.stringify(resumeData).length > MAX_RESUME_JSON_LENGTH
    || (photoDataUrl !== null
      && (typeof photoDataUrl !== "string"
        || photoDataUrl.length > MAX_PHOTO_DATA_URL_LENGTH
        || !/^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/]+=*$/i.test(photoDataUrl)))
  ) {
    return response.status(400).json({ error: "A valid resume session, active consent, resume data, and optional image are required." });
  }

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const consent = await client.query(
      `SELECT id
       FROM resume_consent_records
       WHERE id = $1
         AND resume_session_id = $2
         AND withdrawn_at IS NULL
       FOR UPDATE`,
      [consentRecordId, resumeSessionId],
    );
    if (consent.rows.length === 0) {
      await client.query("ROLLBACK");
      return response.status(403).json({ error: "Active resume-storage consent is required before saving a preview." });
    }

    const { rows } = await client.query(
      `INSERT INTO resume_records (
         resume_session_id,
         consent_record_id,
         resume_data,
         photo_data_url
       )
       VALUES ($1, $2, $3::jsonb, $4)
       ON CONFLICT (resume_session_id) DO UPDATE SET
         consent_record_id = EXCLUDED.consent_record_id,
         resume_data = EXCLUDED.resume_data,
         photo_data_url = EXCLUDED.photo_data_url,
         updated_at = CURRENT_TIMESTAMP
       RETURNING resume_session_id AS "resumeSessionId", updated_at AS "updatedAt"`,
      [resumeSessionId, consentRecordId, JSON.stringify(resumeData), photoDataUrl],
    );
    await client.query("COMMIT");
    response.json({ resume: rows[0] });
  } catch (error) {
    if (client) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Failed to roll back resume storage:", rollbackError);
      }
    }
    next(error);
  } finally {
    client?.release();
  }
});

app.use((error, _request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  console.error("API request failed:", error);
  const errorMessage = error.code === "42P01"
    ? "A required database table is missing. Run the resume portal migrations in order."
    : error.code === "ECONNREFUSED" || error.code === "ENOTFOUND"
      ? "The PostgreSQL database could not be reached. Check the API database settings and PostgreSQL service."
      : "The request could not be completed. Check the API logs for the database error.";
  response.status(500).json({ error: errorMessage });
});
  return app;
}

function startServer() {
  const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);
  if (missingEnvironment.length > 0) {
    console.error(`Missing database configuration: ${missingEnvironment.join(", ")}. Copy .env.example to .env and fill in your local PostgreSQL settings.`);
    process.exit(1);
  }

  const port = Number(process.env.API_PORT || 3002);
  const databasePort = Number(process.env.DB_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error("API_PORT must be a valid TCP port number.");
    process.exit(1);
  }
  if (!Number.isInteger(databasePort) || databasePort < 1 || databasePort > 65535) {
    console.error("DB_PORT must be a valid TCP port number.");
    process.exit(1);
  }

  const pool = new Pool({
    host: process.env.DB_HOST,
    port: databasePort,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  const app = createApp(pool);
  const server = app.listen(port, () => {
    console.log(`WINR API listening on http://localhost:${port}`);
    console.log("Available API routes:");
    for (const route of apiRoutes) {
      console.log(`  ${route.method} http://localhost:${port}${route.path} - ${route.description}`);
    }
  });

  async function shutDown() {
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  }

  process.on("SIGINT", shutDown);
  process.on("SIGTERM", shutDown);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}
