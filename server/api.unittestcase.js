import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { createApp } from "./index.js";

const RESUME_SESSION_ID = "11111111-1111-4111-8111-111111111111";
const CONSENT_ID = "22222222-2222-4222-8222-222222222222";
const OPPORTUNITIES = [{
  id: "33333333-3333-4333-8333-333333333333",
  title: "Software Engineer",
  employmentType: "Full-time",
}];

class FakePool {
  constructor() {
    this.consents = new Map();
    this.resumes = new Map();
  }

  async query(sql, values = []) {
    if (sql.includes("to_regclass")) {
      return { rows: [{ resumeConsentRecords: true, resumeRecords: true }] };
    }
    if (sql.includes("FROM opportunities")) {
      return { rows: OPPORTUNITIES };
    }
    if (sql.includes("INSERT INTO resume_consent_records")) {
      const consent = {
        id: CONSENT_ID,
        resume_session_id: values[0],
        acceptedAt: "2026-10-12T00:00:00.000Z",
        policyVersion: values[1],
        withdrawn_at: null,
      };
      this.consents.set(CONSENT_ID, consent);
      return { rows: [consent] };
    }
    throw new Error(`Unexpected pool query in test: ${sql}`);
  }

  async connect() {
    return {
      query: async (sql, values = []) => {
        if (sql === "BEGIN" || sql === "COMMIT" || sql === "ROLLBACK") {
          return { rows: [] };
        }
        if (sql.includes("FROM resume_consent_records") && sql.includes("FOR UPDATE")) {
          const consent = this.consents.get(values[0]);
          const activeForSession = consent
            && consent.resume_session_id === values[1]
            && !consent.withdrawn_at;
          return { rows: activeForSession ? [{ id: consent.id }] : [] };
        }
        if (sql.includes("UPDATE resume_consent_records")) {
          const consent = this.consents.get(values[0]);
          if (!consent) return { rows: [] };
          consent.withdrawn_at ??= "2026-10-12T00:01:00.000Z";
          return {
            rows: [{
              id: consent.id,
              resumeSessionId: consent.resume_session_id,
              withdrawnAt: consent.withdrawn_at,
            }],
          };
        }
        if (sql.includes("DELETE FROM resume_records")) {
          for (const [sessionId, resume] of this.resumes) {
            if (resume.consentRecordId === values[0]) this.resumes.delete(sessionId);
          }
          return { rows: [] };
        }
        if (sql.includes("INSERT INTO resume_records")) {
          const resume = {
            resumeSessionId: values[0],
            consentRecordId: values[1],
            resumeData: JSON.parse(values[2]),
            photoDataUrl: values[3],
            updatedAt: "2026-10-12T00:02:00.000Z",
          };
          this.resumes.set(values[0], resume);
          return { rows: [resume] };
        }
        throw new Error(`Unexpected client query in test: ${sql}`);
      },
      release() {},
    };
  }
}

async function startTestServer() {
  const pool = new FakePool();
  const server = createApp(pool).listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address();
  return {
    pool,
    baseUrl: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    }),
  };
}

test("GET / and /api/health expose routes and migration readiness", async (t) => {
  const api = await startTestServer();
  t.after(api.close);

  const rootResponse = await fetch(`${api.baseUrl}/`);
  const root = await rootResponse.json();
  assert.equal(rootResponse.status, 200);
  assert.equal(root.name, "WINR API");
  assert.ok(root.routes.some((route) => route.path === "/api/ats-score"));
  assert.ok(root.routes.some((route) => route.url.startsWith(api.baseUrl)));

  const healthResponse = await fetch(`${api.baseUrl}/api/health`);
  const health = await healthResponse.json();
  assert.equal(healthResponse.status, 200);
  assert.equal(health.database, "connected");
  assert.deepEqual(health.schema, { resumeConsentRecords: true, resumeRecords: true });
});

test("GET /api/opportunities returns opportunity rows from the database layer", async (t) => {
  const api = await startTestServer();
  t.after(api.close);

  const response = await fetch(`${api.baseUrl}/api/opportunities`);
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(result.opportunities, OPPORTUNITIES);
});

test("POST /api/ats-score validates input and returns a match report", async (t) => {
  const api = await startTestServer();
  t.after(api.close);

  const invalidResponse = await fetch(`${api.baseUrl}/api/ats-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDescription: "", resumeData: {} }),
  });
  assert.equal(invalidResponse.status, 400);

  const response = await fetch(`${api.baseUrl}/api/ats-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobDescription: "Python, SQL, and communication required.",
      resumeData: {
        skills: [{ value: "Python" }, { value: "SQL" }],
        experiences: [],
        education: [],
        certifications: [],
        achievements: [],
        projects: [],
      },
    }),
  });
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.equal(result.score, 80);
  assert.deepEqual(result.matchedKeywords, ["Python", "SQL"]);
  assert.deepEqual(result.missingKeywords, ["Communication"]);
});

test("POST /api/ats-score returns 422 when no supported requirements are found", async (t) => {
  const api = await startTestServer();
  t.after(api.close);

  const response = await fetch(`${api.baseUrl}/api/ats-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDescription: "A motivated self-starter.", resumeData: {} }),
  });
  const result = await response.json();
  assert.equal(response.status, 422);
  assert.equal(result.score, null);
  assert.equal(result.totalRequirements, 0);
});

test("consent validation, resume upsert, and withdrawal deletion work through HTTP", async (t) => {
  const api = await startTestServer();
  t.after(api.close);

  const invalidConsent = await fetch(`${api.baseUrl}/api/resume-consents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resumeSessionId: RESUME_SESSION_ID,
      termsAccepted: true,
      storageConsentAccepted: false,
    }),
  });
  assert.equal(invalidConsent.status, 400);

  const consentResponse = await fetch(`${api.baseUrl}/api/resume-consents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resumeSessionId: RESUME_SESSION_ID,
      termsAccepted: true,
      storageConsentAccepted: true,
    }),
  });
  const consentResult = await consentResponse.json();
  assert.equal(consentResponse.status, 201);
  assert.equal(consentResult.consent.id, CONSENT_ID);

  const resumeUrl = `${api.baseUrl}/api/resumes/${RESUME_SESSION_ID}`;
  const saveResume = (headline) => fetch(resumeUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      consentRecordId: CONSENT_ID,
      resumeData: { headline },
    }),
  });
  const saved = await saveResume("First version");
  assert.equal(saved.status, 200);
  assert.equal(api.pool.resumes.size, 1);
  const replaced = await saveResume("Updated version");
  assert.equal(replaced.status, 200);
  assert.equal(api.pool.resumes.size, 1);
  assert.equal(api.pool.resumes.get(RESUME_SESSION_ID).resumeData.headline, "Updated version");

  const withdrawal = await fetch(`${api.baseUrl}/api/resume-consents/${CONSENT_ID}/withdraw`, {
    method: "POST",
  });
  assert.equal(withdrawal.status, 200);
  assert.equal(api.pool.resumes.size, 0);

  const rejectedSave = await saveResume("After withdrawal");
  assert.equal(rejectedSave.status, 403);
});

test("invalid UUIDs are rejected before database operations", async (t) => {
  const api = await startTestServer();
  t.after(api.close);

  const response = await fetch(`${api.baseUrl}/api/resumes/not-a-uuid`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ consentRecordId: CONSENT_ID, resumeData: {} }),
  });
  assert.equal(response.status, 400);
});
