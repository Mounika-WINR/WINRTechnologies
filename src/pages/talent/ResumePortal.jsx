import { useEffect, useRef, useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

const MAX_ENTRIES = 11;
const MAX_RESUME_PHOTO_BYTES = 2 * 1024 * 1024;
const SECTION_TITLES = [
  "Job Description & Experience",
  "Basic Details",
  "Resume Headline & Summary",
  "Experience / Internship",
  "Education Details",
  "Certifications",
  "Achievements",
  "Projects",
  "Skills",
  "ATS Score",
];

const createExperience = () => ({
  company: "", position: "", type: "", location: "",
  startDate: "", endDate: "", salary: "", saved: false,
});
const createEducation = () => ({
  institution: "", degree: "", field: "", startDate: "", endDate: "", grade: "", saved: false,
});
const createCertification = () => ({
  name: "", issuer: "", earnedDate: "", skills: "", file: null, saved: false,
});
const createAchievement = () => ({ description: "", date: "", file: null, saved: false });
const createProject = () => ({
  name: "", projectUrl: "", githubUrl: "", year: "", techStack: "", description: "", saved: false,
});
const createSkill = (value = "") => ({ value, saved: false });

const SKILL_CATALOG = [
  { category: "technical", skills: [
    "React", "Angular", "Vue", "Node.js", ".NET", "SQL", "MongoDB", "AWS", "Azure", "GCP",
    "Docker", "Kubernetes", "Figma", "Git", "REST API", "GraphQL", "Machine Learning", "Data Analysis",
    "Cybersecurity", "Linux", "Salesforce", "Power BI", "Tableau", "Jest", "Playwright",
    "Spring Boot", "Django", "Flask", "Express.js", "PostgreSQL", "MySQL", "Redis",
    "Terraform", "Jenkins", "CI/CD", "Next.js", "Ruby on Rails",
  ] },
  { category: "soft", skills: [
    "Communication", "Written communication", "Verbal communication", "Teamwork",
    "Collaboration", "Problem solving", "Critical thinking", "Analytical thinking",
    "Leadership", "Adaptability", "Time management", "Project management",
    "Stakeholder management", "Customer service", "Negotiation", "Mentoring",
    "Attention to detail", "Decision making", "Creativity", "Conflict resolution",
  ] },
  { category: "programming", skills: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Rust", "PHP",
    "Ruby", "Swift", "Kotlin", "Dart", "MATLAB",
  ] },
  { category: "spoken", skills: [
    "English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Bengali",
    "Marathi", "Gujarati", "Urdu", "Spanish", "French", "German", "Japanese",
    "Mandarin Chinese",
  ] },
];

function getResumeSnapshot(data) {
  const stripEntryMetadata = (entries) => entries.map((entry) => {
    const snapshot = { ...entry };
    delete snapshot.saved;
    delete snapshot.file;
    return snapshot;
  });
  return {
    ...data,
    experiences: stripEntryMetadata(data.experiences),
    education: stripEntryMetadata(data.education),
    certifications: stripEntryMetadata(data.certifications),
    achievements: stripEntryMetadata(data.achievements),
    projects: stripEntryMetadata(data.projects),
    skills: stripEntryMetadata(data.skills),
  };
}

function getAtsScoringData(data) {
  const selectFields = (section, fields) => data[section].map((entry) =>
    Object.fromEntries(fields.map((field) => [field, entry[field]]))
  );
  return {
    jobDescription: data.jobDescription,
    resumeData: {
      experiences: selectFields("experiences", ["position"]),
      education: selectFields("education", ["degree", "field"]),
      certifications: selectFields("certifications", ["name", "skills"]),
      achievements: selectFields("achievements", ["description"]),
      projects: selectFields("projects", ["name", "techStack", "description"]),
      skills: selectFields("skills", ["value"]),
    },
  };
}

const createInitialData = () => ({
  jobDescription: "",
  yearsExperience: "",
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  headline: "",
  summary: "",
  experiences: [createExperience()],
  education: [createEducation()],
  certifications: [createCertification()],
  achievements: [createAchievement()],
  projects: [createProject()],
  skills: [createSkill()],
});

function containsWholeSkill(text, skill) {
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "i").test(text);
}

function normalizeSkillName(value) {
  return value.replace(/^(?:soft skill|programming language|spoken language):\s*/i, "").trim();
}

function formatResumeDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" })
    .format(new Date(`${value}T00:00:00`));
}

function getJobSkillMatches(jobDescription) {
  return Object.fromEntries(SKILL_CATALOG.map(({ category, skills }) => [
    category,
    skills.filter((skill) => containsWholeSkill(jobDescription, skill)),
  ]));
}

async function getResumeApiDiagnostic(needsResumeStorage = false) {
  try {
    const response = await fetch("/api/health");
    const result = await response.json();
    if (result.database !== "connected") {
      return result.error || "PostgreSQL is not reachable from the API. Check the API terminal and database settings.";
    }
    if (!result.schema) {
      return "The API is running an older version. Restart npm run api from the winr project folder to enable migration diagnostics and resume storage.";
    }
    if (!result.schema?.resumeConsentRecords) {
      return "The consent table is missing. Run server/migrations/001_resume_consent_records.sql in the intended database.";
    }
    if (needsResumeStorage && !result.schema?.resumeRecords) {
      return "The resume table is missing. Run server/migrations/002_resume_records.sql after migration 001.";
    }
    return result.error || "The API returned an error. Check the API terminal for the database details.";
  } catch {
    return "The resume API is not reachable. Start it with npm run api from the winr project folder.";
  }
}

function FormField({ label, children, className = "" }) {
  return <label className={`rp-field ${className}`}><span>{label}</span>{children}</label>;
}

function TextInput({ value, onChange, ...props }) {
  return <input className="rp-input" required value={value} onChange={onChange} {...props} />;
}

function UploadField({ label, file, onChange }) {
  const viewFile = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  return (
    <FormField label={label}>
      <input className="rp-input rp-file-input" type="file" accept=".pdf,.png,.jpg,.jpeg" required onChange={onChange} />
      <span className="rp-hint">{file ? file.name : "PDF, PNG or JPG"}</span>
      {file && <button className="rp-file-view" type="button" onClick={viewFile}>View uploaded file</button>}
    </FormField>
  );
}

function ResumePreview({ data, photoUrl }) {
  const certifications = data.certifications.filter((entry) => entry.name || entry.issuer);
  const achievements = data.achievements.filter((entry) => entry.description);
  const projects = data.projects.filter((entry) => entry.name || entry.description);
  const skills = data.skills.map((entry) => entry.value.trim()).filter(Boolean);
  const experience = data.experiences.filter((entry) => entry.company || entry.position);
  const education = data.education.filter((entry) => entry.institution || entry.degree);

  return (
    <article className="rp-print-resume">
      <header className="rp-print-header">
        {photoUrl && <img src={photoUrl} alt="" />}
        <div>
          <h1>{data.fullName || "Your Name"}</h1>
          <p>{data.headline || "Professional headline"}</p>
          <div className="rp-print-contact">
            {[data.email, data.phone, data.linkedin, data.github].filter(Boolean).join("  |  ")}
          </div>
        </div>
      </header>
      {data.summary && <section><h2>Professional Summary</h2><p>{data.summary}</p></section>}
      {experience.length > 0 && <section><h2>Experience</h2>{experience.map((item, index) => (
        <div className="rp-print-entry" key={`experience-${index}`}>
          <strong>{[item.position, item.company].filter(Boolean).join(" — ")}</strong>
          {(item.startDate || item.endDate) && <span>{[formatResumeDate(item.startDate), formatResumeDate(item.endDate) || (item.startDate ? "Present" : "")].filter(Boolean).join(" – ")}</span>}
          {item.location && <span>{item.location}</span>}
          {item.type && <span>{item.type}</span>}
        </div>
      ))}</section>}
      {education.length > 0 && <section><h2>Education</h2>{education.map((item, index) => (
        <div className="rp-print-entry" key={`education-${index}`}>
          <strong>{[item.degree, item.field].filter(Boolean).join(", ")}</strong>
          <span>{[item.institution, item.grade].filter(Boolean).join(" · ")}</span>
          {(item.startDate || item.endDate) && <span>{[formatResumeDate(item.startDate), formatResumeDate(item.endDate)].filter(Boolean).join(" – ")}</span>}
        </div>
      ))}</section>}
      {certifications.length > 0 && <section><h2>Certifications</h2>{certifications.map((item, index) => (
        <div className="rp-print-entry" key={`certification-${index}`}>
          <strong>{item.name}</strong><span>{[item.issuer, item.skills, formatResumeDate(item.earnedDate)].filter(Boolean).join(" · ")}</span>
        </div>
      ))}</section>}
      {achievements.length > 0 && <section><h2>Achievements</h2><ul>{achievements.map((item, index) => (
        <li key={`achievement-${index}`}>{item.description}{item.date ? ` (${item.date})` : ""}</li>
      ))}</ul></section>}
      {projects.length > 0 && <section><h2>Projects</h2>{projects.map((item, index) => (
        <div className="rp-print-entry" key={`project-${index}`}>
          <strong>{item.name}</strong>
          <span>{[item.year, item.techStack, item.projectUrl, item.githubUrl].filter(Boolean).join(" · ")}</span>
          {item.description && <p>{item.description}</p>}
        </div>
      ))}</section>}
      {skills.length > 0 && <section><h2>Skills</h2><p>{skills.join(", ")}</p></section>}
    </article>
  );
}

export function ResumePortal() {
  const [activeStep, setActiveStep] = useState(0);
  const stepFormRef = useRef(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [data, setData] = useState(createInitialData);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [headlineNotice, setHeadlineNotice] = useState("");
  const [stepNotice, setStepNotice] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [storageConsentAccepted, setStorageConsentAccepted] = useState(false);
  const [consentRecordId, setConsentRecordId] = useState("");
  const [consentSaving, setConsentSaving] = useState(false);
  const [previewSaving, setPreviewSaving] = useState(false);
  const [consentNotice, setConsentNotice] = useState("");
  const [previewStorageNotice, setPreviewStorageNotice] = useState("");
  const [atsResult, setAtsResult] = useState(null);
  const [atsError, setAtsError] = useState("");
  const [atsLoading, setAtsLoading] = useState(false);
  const [addedAtsKeywords, setAddedAtsKeywords] = useState([]);
  const [resumeSessionId, setResumeSessionId] = useState(() => crypto.randomUUID());
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
  }, [photoUrl]);

  const update = (key, value) => {
    setAtsResult(null);
    setAtsError("");
    setAddedAtsKeywords([]);
    setCompletedSteps((current) => current.filter((step) => step !== activeStep));
    setData((current) => ({ ...current, [key]: value }));
  };

  const updateEntry = (section, index, key, value) => {
    setAtsResult(null);
    setAtsError("");
    setAddedAtsKeywords([]);
    setCompletedSteps((current) => current.filter((step) => step !== activeStep));
    setData((current) => ({
      ...current,
      [section]: current[section].map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [key]: value, saved: false } : entry
      ),
    }));
  };

  const addEntry = (section, createEntry) => {
    setAtsResult(null);
    setAtsError("");
    setAddedAtsKeywords([]);
    setCompletedSteps((current) => current.filter((step) => step !== activeStep));
    setData((current) => current[section].length >= MAX_ENTRIES
      ? current
      : { ...current, [section]: [...current[section], createEntry()] });
  };

  const removeEntry = (section, index) => {
    setAtsResult(null);
    setAtsError("");
    setAddedAtsKeywords([]);
    setCompletedSteps((current) => current.filter((step) => step !== activeStep));
    setData((current) => ({
      ...current,
      [section]: current[section].filter((_, entryIndex) => entryIndex !== index),
    }));
  };

  const saveCurrentStep = () => {
    setCompletedSteps((current) => [...new Set([...current, activeStep])]);
    const sectionByStep = {
      3: "experiences",
      4: "education",
      5: "certifications",
      6: "achievements",
      7: "projects",
      8: "skills",
    }[activeStep];
    if (sectionByStep) {
      setData((current) => ({
        ...current,
        [sectionByStep]: current[sectionByStep].map((entry) => ({ ...entry, saved: true })),
      }));
    }
    setStepNotice("");
    if (activeStep < SECTION_TITLES.length - 1) {
      setActiveStep((step) => step + 1);
      window.scrollTo({ top: document.querySelector(".rp-builder-section")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStepNotice("");
    if (activeStep > 0) setActiveStep((step) => step - 1);
  };

  const goToFirstStep = () => {
    setStepNotice("");
    setActiveStep(0);
    setShowPreview(false);
    window.scrollTo({ top: document.querySelector(".rp-builder-section")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const suggestHeadline = () => {
    const lines = data.jobDescription.split(/\r?\n/).map((line) => line.trim().replace(/^[-*•\s]+/, "")).filter(Boolean);
    const labeledRole = lines.find((line) => /^(job title|role|position|title)\s*[:-]/i.test(line));
    const hiringPhrase = data.jobDescription.match(/(?:we are (?:seeking|hiring)|looking for|hiring)\s+(?:an?\s+)?([^.!?\n]+)/i)?.[1];
    const roleLine = labeledRole?.replace(/^(job title|role|position|title)\s*[:-]\s*/i, "")
      ?? hiringPhrase
      ?? lines.flatMap((line) => line.split(/[.!?]\s+/))
        .find((sentence) => sentence.length <= 80 && !/^(job description|responsibilities|requirements|about the role|professional summary|about us)\b/i.test(sentence));
    const priorRole = data.experiences.find((entry) => entry.position.trim())?.position.trim();
    const role = (roleLine || priorRole || "Target Role")
      .replace(/\s+(with|to join|to work|for our|in our)\b.*$/i, "")
      .replace(/[|,:;—–-]+$/, "")
      .trim();
    const experience = data.yearsExperience ? `${data.yearsExperience} years' experience` : "";
    update("headline", [role, experience].filter(Boolean).join(" | "));
    setHeadlineNotice("Draft based on your job description and experience selection. Review it for accuracy; no AI service is connected yet.");
  };

  const suggestSummary = () => {
    const role = data.headline.split("|")[0]?.trim() || "target role";
    const years = data.yearsExperience ? `${data.yearsExperience} years of experience` : "";
    const experience = data.experiences
      .filter((entry) => entry.position.trim() || entry.company.trim())
      .map((entry) => [entry.position.trim(), entry.company.trim()].filter(Boolean).join(" at "))
      .slice(0, 2);
    const verifiedSkills = data.skills.map((entry) => normalizeSkillName(entry.value)).filter(Boolean).slice(0, 6);
    const projectHighlights = data.projects
      .filter((entry) => entry.name || entry.description)
      .map((entry) => [entry.name, entry.techStack && `built with ${entry.techStack}`].filter(Boolean).join(" "))
      .slice(0, 2);
    const matchedSkills = verifiedSkills.filter((skill) => containsWholeSkill(data.jobDescription, skill));
    const education = data.education
      .map((entry) => {
        const qualification = [entry.degree, entry.field].filter(Boolean).join(" in ");
        return [qualification, entry.institution && `from ${entry.institution}`].filter(Boolean).join(" ");
      })
      .filter(Boolean)
      .slice(0, 1);
    const jobSkillMatches = getJobSkillMatches(data.jobDescription);
    const jobFocus = [...new Set([
      ...jobSkillMatches.technical,
      ...jobSkillMatches.programming,
      ...jobSkillMatches.soft,
      ...jobSkillMatches.spoken,
    ])].slice(0, 5);
    const opening = `${role}${years ? ` with ${years}` : ""}`;
    const sentenceOne = matchedSkills.length
      ? `${opening} and role-aligned skills in ${matchedSkills.slice(0, 4).join(", ")}.`
      : `${opening}, focused on job requirements including ${jobFocus.length ? jobFocus.join(", ") : "the skills listed in the job description"}.`;
    const evidence = [
      ...experience.map((item) => `experience as ${item}`),
      ...projectHighlights.map((item) => `project work on ${item}`),
      ...education.map((item) => `education in ${item}`),
    ];
    const softSkills = verifiedSkills
      .filter((skill) => SKILL_CATALOG.find(({ category }) => category === "soft")
        .skills.some((knownSkill) => knownSkill.toLowerCase() === skill.toLowerCase()))
      .slice(0, 2);
    const spokenLanguages = verifiedSkills
      .filter((skill) => SKILL_CATALOG.find(({ category }) => category === "spoken")
        .skills.some((knownSkill) => knownSkill.toLowerCase() === skill.toLowerCase()))
      .slice(0, 2);
    const additionalSkills = verifiedSkills
      .filter((skill) => !matchedSkills.includes(skill) && !softSkills.includes(skill) && !spokenLanguages.includes(skill))
      .slice(0, 3);
    const sentenceTwo = evidence.length
      ? `Relevant background includes ${evidence.slice(0, 2).join(" and ")}${additionalSkills.length ? `, alongside skills in ${additionalSkills.join(", ")}` : ""}.`
      : additionalSkills.length
        ? `Additional skills include ${additionalSkills.join(", ")}.`
        : "";
    const collaboration = [...softSkills, ...spokenLanguages].slice(0, 3);
    const collaborationDetails = [
      softSkills.length && `Offers skills in ${softSkills.join(" and ")}`,
      spokenLanguages.length && `listed languages include ${spokenLanguages.join(" and ")}`,
    ].filter(Boolean);
    const sentenceThree = collaboration.length
      ? `${collaborationDetails.join("; ")}. Ready to contribute to the team’s goals.`
      : matchedSkills.length
        ? `Ready to apply these skills to practical software work and grow with the engineering team.`
        : `Ready to support collaborative software delivery while continuing to develop role-relevant skills.`;
    update("summary", [sentenceOne, sentenceTwo, sentenceThree].filter(Boolean).join(" "));
    setHeadlineNotice("Professional summary generated from the details you entered and the job description. Review it for accuracy; it does not invent qualifications.");
  };

  const suggestSkills = () => {
    const matchedByCategory = getJobSkillMatches(data.jobDescription);
    const matches = [
      ...matchedByCategory.technical.slice(0, 4),
      ...matchedByCategory.soft.slice(0, 3).map((skill) => `Soft skill: ${skill}`),
      ...matchedByCategory.programming.slice(0, 2).map((skill) => `Programming language: ${skill}`),
      ...matchedByCategory.spoken.slice(0, 2).map((skill) => `Spoken language: ${skill}`),
      ...matchedByCategory.technical.slice(4),
      ...matchedByCategory.soft.slice(3).map((skill) => `Soft skill: ${skill}`),
      ...matchedByCategory.programming.slice(2).map((skill) => `Programming language: ${skill}`),
      ...matchedByCategory.spoken.slice(2).map((skill) => `Spoken language: ${skill}`),
    ];
    if (matches.length === 0) {
      setHeadlineNotice("No skills from the local suggestion list matched the job description. Add the skills you want manually.");
      return;
    }
    const existing = data.skills.map((skill) => normalizeSkillName(skill.value).toLowerCase());
    const newSkills = matches.filter((skill) => !existing.includes(normalizeSkillName(skill).toLowerCase()));
    if (newSkills.length === 0) {
      setHeadlineNotice("Suggested skills are already in your list.");
      return;
    }
    const replaceEmptyStarter = data.skills.length === 1 && !data.skills[0].value.trim();
    const additions = newSkills.slice(0, Math.max(0, MAX_ENTRIES - (replaceEmptyStarter ? 0 : data.skills.length)));
    setData((current) => ({
      ...current,
      skills: [
        ...(replaceEmptyStarter ? [] : current.skills),
        ...additions.map(createSkill),
      ],
    }));
    setHeadlineNotice(`Added ${additions.length} job-description skill suggestion(s). Review and edit them.`);
  };

  const selectPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > MAX_RESUME_PHOTO_BYTES) {
      setPhotoName(file.size > MAX_RESUME_PHOTO_BYTES
        ? "Please select an image smaller than 2 MB."
        : "Please select a JPG, PNG, or WebP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setPhotoName("Could not read the selected image. Please try again.");
        return;
      }
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      setPhotoUrl(URL.createObjectURL(file));
      setPhotoDataUrl(reader.result);
      setPhotoName(file.name);
    };
    reader.onerror = () => setPhotoName("Could not read the selected image. Please try again.");
    reader.readAsDataURL(file);
  };

  const clearDraft = async () => {
    setConsentNotice("");
    if (consentRecordId) {
      setConsentSaving(true);
      try {
        const response = await fetch(`/api/resume-consents/${consentRecordId}/withdraw`, { method: "POST" });
        if (!response.ok) throw new Error(`Consent withdrawal failed (${response.status}).`);
      } catch (error) {
        console.error("Failed to withdraw resume consent:", error);
        setConsentNotice("Could not record consent withdrawal. The draft was not cleared; please try again.");
        return;
      } finally {
        setConsentSaving(false);
      }
    }
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl("");
    setPhotoDataUrl("");
    setPhotoName("");
    setHeadlineNotice("");
    setStepNotice("");
    setAtsResult(null);
    setAtsError("");
    setAddedAtsKeywords([]);
    setTermsAccepted(false);
    setStorageConsentAccepted(false);
    setConsentRecordId("");
    setResumeSessionId(crypto.randomUUID());
    setShowPreview(false);
    setData(createInitialData());
    setCompletedSteps([]);
    setActiveStep(0);
  };

  const atsScore = atsResult?.score;
  const hasValidAtsScore = typeof atsScore === "number" && Number.isFinite(atsScore) && atsScore >= 0 && atsScore <= 100;
  const scoreQualifies = hasValidAtsScore && atsScore >= 75;
  const consentRecorded = Boolean(
    termsAccepted && storageConsentAccepted && consentRecordId
  );

  const recordConsent = async (
    acceptedTerms = termsAccepted,
    acceptedStorageConsent = storageConsentAccepted,
  ) => {
    if (!acceptedTerms || !acceptedStorageConsent || consentSaving) return;

    setConsentSaving(true);
    setConsentNotice("");
    try {
      const response = await fetch("/api/resume-consents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeSessionId,
          termsAccepted: true,
          storageConsentAccepted: true,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `Consent request failed (${response.status}).`);
      }
      if (!result.consent?.id) {
        throw new Error("The consent API did not return a consent record.");
      }

      setConsentRecordId(result.consent.id);
      setConsentNotice("Your consent has been recorded.");
    } catch (error) {
      console.error("Failed to record resume consent:", error);
      const diagnostic = await getResumeApiDiagnostic();
      setConsentNotice(`Could not record your consent. ${diagnostic} After fixing the issue, uncheck and re-check both consent boxes to submit consent again.`);
    } finally {
      setConsentSaving(false);
    }
  };

  const requestAtsScore = async (resumeData = data) => {
    setAtsLoading(true);
    setAtsError("");
    try {
      const response = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getAtsScoringData(resumeData)),
      });
      const result = await response.json();
      if (!response.ok && response.status !== 422) {
        throw new Error(result.error || `ATS scoring failed (${response.status}).`);
      }
      setAtsResult(result);
    } catch (error) {
      console.error("Failed to score resume against job description:", error);
      setAtsResult(null);
      setAtsError(error.message || "Could not calculate the match score. Check that the resume API is running.");
    } finally {
      setAtsLoading(false);
    }
  };

  const addAtsKeyword = async (keyword) => {
    const alreadyAdded = data.skills.some(
      (skill) => normalizeSkillName(skill.value).toLowerCase() === keyword.toLowerCase(),
    );
    if (alreadyAdded) {
      setAddedAtsKeywords((current) => current.includes(keyword) ? current : [...current, keyword]);
      return;
    }
    const replaceEmptyStarter = data.skills.length === 1 && !data.skills[0].value.trim();
    if (!replaceEmptyStarter && data.skills.length >= MAX_ENTRIES) {
      setAtsError("The Skills section is at its 11-entry limit. Remove a skill before adding this keyword.");
      return;
    }
    const nextResumeData = {
      ...data,
      skills: [
        ...(replaceEmptyStarter ? [] : data.skills),
        createSkill(keyword),
      ],
    };
    setData(nextResumeData);
    setAddedAtsKeywords((current) => current.includes(keyword) ? current : [...current, keyword]);
    await requestAtsScore(nextResumeData);
  };

  const updateConsent = async (kind, accepted) => {
    const nextTermsAccepted = kind === "terms" ? accepted : termsAccepted;
    const nextStorageConsentAccepted = kind === "storage" ? accepted : storageConsentAccepted;
    setTermsAccepted(nextTermsAccepted);
    setStorageConsentAccepted(nextStorageConsentAccepted);
    setConsentNotice("");

    if (!accepted) {
      setShowPreview(false);
      if (consentRecordId) {
        setConsentSaving(true);
        try {
          const response = await fetch(`/api/resume-consents/${consentRecordId}/withdraw`, {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error(`Consent withdrawal failed (${response.status}).`);
          }
          setConsentRecordId("");
          setConsentNotice("Your consent withdrawal has been recorded.");
        } catch (error) {
          console.error("Failed to withdraw resume consent:", error);
          setConsentNotice("Could not record consent withdrawal. Please try again.");
        } finally {
          setConsentSaving(false);
        }
      }
      return;
    }

    if (nextTermsAccepted && nextStorageConsentAccepted) {
      await recordConsent(nextTermsAccepted, nextStorageConsentAccepted);
    }
  };

  const downloadResume = () => {
    if (!consentRecorded) {
      setStepNotice("Accept both consent checkboxes and wait for confirmation before downloading.");
      return;
    }
    if (!scoreQualifies) {
      setStepNotice("Download is available after the ATS agent returns a score of at least 75%.");
      return;
    }
    setStepNotice("");
    setShowPreview(false);
    window.print();
  };

  const previewResume = async () => {
    if (!consentRecorded || !consentRecordId) {
      setStepNotice("Accept both consent checkboxes and wait for confirmation before previewing.");
      return;
    }

    setPreviewSaving(true);
    setStepNotice("");
    setPreviewStorageNotice("");
    try {
      const response = await fetch(`/api/resumes/${resumeSessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consentRecordId,
          resumeData: getResumeSnapshot(data),
          photoDataUrl,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `Resume save failed (${response.status}).`);
      }
      if (!result.resume?.resumeSessionId) {
        throw new Error("The resume API did not confirm that the resume was saved.");
      }
      setShowPreview(true);
    } catch (error) {
      console.error("Failed to save resume preview:", error);
      const diagnostic = await getResumeApiDiagnostic(true);
      setPreviewStorageNotice(`This preview is displayed but was not saved. ${diagnostic}${error.message ? ` Server response: ${error.message}` : ""}`);
      setShowPreview(true);
    } finally {
      setPreviewSaving(false);
    }
  };

  const saveAndNext = () => {
    if (activeStep === 9) return;
    saveCurrentStep();
  };

  const listEntryCards = (section, title, renderFields, createEntry) => (
    <div className="rp-repeater-list">
      {data[section].map((entry, index) => (
        <div className="rp-repeat-card" key={`${section}-${index}`}>
          <div className="rp-entry-title-row">
            <h4>{title} {index + 1}</h4>
            <div className="rp-entry-actions">
              {entry.saved && <span className="rp-saved-tag">Saved</span>}
              {index > 0 && (
                <button
                  type="button"
                  className="rp-remove-entry"
                  aria-label={`Remove ${title} ${index + 1}`}
                  onClick={() => removeEntry(section, index)}
                >
                  ×
                </button>
              )}
            </div>
          </div>
          {renderFields(entry, index)}
        </div>
      ))}
      <button className="rp-add-btn" type="button" onClick={() => addEntry(section, createEntry)} disabled={data[section].length >= MAX_ENTRIES}>
        + Add {title}
      </button>
      {data[section].length >= MAX_ENTRIES && <p className="rp-hint">Maximum of 11 entries reached.</p>}
    </div>
  );

  const currentTitle = SECTION_TITLES[activeStep];

  return (
    <div className="wr-talent-page rp-page">
      <section className="wr-sec wr-full-hero wr-talent-hero rp-hero">
        <div className="wr-hero split wr-talent-intro">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Build a resume around your next opportunity</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">WINR TECHNOLOGIES — RESUME PORTAL</p>
            <h1 className="wr-main-title">Create Your Resume</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              Complete each step in order. Your draft stays in this browser until you accept storage permission and choose Preview; each later preview replaces the saved version.
            </p>
          </div>
        </div>
      </section>

      <section className="rp-builder-section" aria-label="Resume builder">
        <div className="rp-builder-intro">
          <h2>Resume details</h2>
          <p>Step {activeStep + 1} of {SECTION_TITLES.length}: {currentTitle}</p>
        </div>

        <div className="rp-wizard">
          <nav className="rp-step-nav" aria-label="Resume sections">
            {SECTION_TITLES.map((title, index) => (
              <button
                type="button"
                className={`rp-step-link${activeStep === index ? " active" : ""}${completedSteps.includes(index) ? " completed" : ""}`}
                key={title}
                aria-current={activeStep === index ? "step" : undefined}
                onClick={() => {
                  if (index > activeStep + 1) return;
                  if (index > activeStep && !stepFormRef.current?.reportValidity()) return;
                  setActiveStep(index);
                  setStepNotice("");
                }}
              >
                <span className="rp-step-dot">{completedSteps.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span>
                <span>{title}</span>
              </button>
            ))}
          </nav>

          <form ref={stepFormRef} className="rp-step-panel" onSubmit={(event) => { event.preventDefault(); saveAndNext(); }}>
            <div className="rp-step-panel-heading">
              <span className="rp-step-kicker">STEP {String(activeStep + 1).padStart(2, "0")}</span>
              <h3>{currentTitle}</h3>
              {activeStep !== 9 && <p>Add or update the information for this section, then continue.</p>}
            </div>

            {activeStep === 0 && (
              <div className="rp-fields-grid">
                <FormField label="Job description" className="rp-field-wide">
                  <textarea className="rp-input rp-textarea" rows={7} required value={data.jobDescription} onChange={(event) => update("jobDescription", event.target.value)} placeholder="Paste the job description here" />
                </FormField>
                <FormField label="Years of experience">
                  <select className="rp-input" required value={data.yearsExperience} onChange={(event) => update("yearsExperience", event.target.value)}>
                    <option value="">Select experience</option>
                    <option>0–1</option><option>1–3</option><option>3–5</option><option>5–8</option><option>8–10</option><option>10+</option>
                  </select>
                </FormField>
              </div>
            )}

            {activeStep === 1 && (
              <div className="rp-fields-grid">
                <FormField label="Photo">
                  <input className="rp-input rp-file-input" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" required onChange={selectPhoto} />
                  {photoName && <span className="rp-hint">{photoName}</span>}
                </FormField>
                {photoUrl && <img className="rp-photo-preview" src={photoUrl} alt="Selected resume portrait preview" />}
                <FormField label="Full name"><TextInput autoComplete="name" value={data.fullName} onChange={(event) => update("fullName", event.target.value)} /></FormField>
                <FormField label="Email"><TextInput type="email" autoComplete="email" value={data.email} onChange={(event) => update("email", event.target.value)} /></FormField>
                <FormField label="Phone number"><TextInput type="tel" autoComplete="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} /></FormField>
                <FormField label="LinkedIn URL"><TextInput type="url" value={data.linkedin} onChange={(event) => update("linkedin", event.target.value)} placeholder="https://linkedin.com/in/..." /></FormField>
                <FormField label="GitHub URL"><TextInput type="url" value={data.github} onChange={(event) => update("github", event.target.value)} placeholder="https://github.com/..." /></FormField>
              </div>
            )}

            {activeStep === 2 && (
              <div className="rp-headline-content">
                <button className="rp-secondary-btn" type="button" onClick={suggestHeadline}>Generate Headline</button>
                <button className="rp-secondary-btn rp-generate-summary" type="button" onClick={suggestSummary}>Generate Professional Summary</button>
                {headlineNotice && <p className="rp-hint" role="status">{headlineNotice}</p>}
                <FormField label="Resume headline"><TextInput value={data.headline} onChange={(event) => update("headline", event.target.value)} placeholder="Your role and strongest professional value" /></FormField>
                <FormField label="Professional summary">
                  <textarea className="rp-input rp-textarea" rows={5} required value={data.summary} onChange={(event) => update("summary", event.target.value)} placeholder="Summarize your experience, strengths, and career focus." />
                </FormField>
              </div>
            )}

            {activeStep === 3 && listEntryCards("experiences", "Experience / Internship", (entry, index) => (
              <>
                <div className="rp-fields-grid">
                  <FormField label="Company name"><TextInput value={entry.company} onChange={(event) => updateEntry("experiences", index, "company", event.target.value)} /></FormField>
                  <FormField label="Position"><TextInput value={entry.position} onChange={(event) => updateEntry("experiences", index, "position", event.target.value)} /></FormField>
                  <FormField label="Type"><select className="rp-input" required value={entry.type} onChange={(event) => updateEntry("experiences", index, "type", event.target.value)}><option value="">Select type</option><option>Job</option><option>Internship</option></select></FormField>
                  <FormField label="Company location"><TextInput value={entry.location} onChange={(event) => updateEntry("experiences", index, "location", event.target.value)} /></FormField>
                  <FormField label="Start date (optional)"><input className="rp-input" type="date" value={entry.startDate} onChange={(event) => updateEntry("experiences", index, "startDate", event.target.value)} /></FormField>
                  <FormField label="End date (optional; leave blank if current)"><input className="rp-input" type="date" value={entry.endDate} onChange={(event) => updateEntry("experiences", index, "endDate", event.target.value)} /></FormField>
                  <FormField label="Salary per annum"><TextInput type="number" min="0" value={entry.salary} onChange={(event) => updateEntry("experiences", index, "salary", event.target.value)} /></FormField>
                </div>
                {entry.saved && <span className="rp-saved-tag">Saved</span>}
              </>
            ), createExperience)}

            {activeStep === 4 && listEntryCards("education", "Education", (entry, index) => (
              <div className="rp-fields-grid">
                <FormField label="Institution name"><TextInput value={entry.institution} onChange={(event) => updateEntry("education", index, "institution", event.target.value)} /></FormField>
                <FormField label="Degree type"><select className="rp-input" required value={entry.degree} onChange={(event) => updateEntry("education", index, "degree", event.target.value)}><option value="">Select degree</option><option>High School / SSC</option><option>Intermediate / +2</option><option>Diploma</option><option>Bachelor&apos;s Degree</option><option>Master&apos;s Degree</option><option>Doctorate</option><option>Other</option></select></FormField>
                <FormField label="Field of study"><TextInput value={entry.field} onChange={(event) => updateEntry("education", index, "field", event.target.value)} /></FormField>
                <FormField label="Start date (optional)"><input className="rp-input" type="date" value={entry.startDate} onChange={(event) => updateEntry("education", index, "startDate", event.target.value)} /></FormField>
                <FormField label="End date (optional)"><input className="rp-input" type="date" value={entry.endDate} onChange={(event) => updateEntry("education", index, "endDate", event.target.value)} /></FormField>
                <FormField label="CGPA / Percentage"><TextInput value={entry.grade} onChange={(event) => updateEntry("education", index, "grade", event.target.value)} /></FormField>
                {entry.saved && <span className="rp-saved-tag">Saved</span>}
              </div>
            ), createEducation)}

            {activeStep === 5 && listEntryCards("certifications", "Certification", (entry, index) => (
              <div className="rp-fields-grid">
                <FormField label="Name of certificate"><TextInput value={entry.name} onChange={(event) => updateEntry("certifications", index, "name", event.target.value)} /></FormField>
                <FormField label="Issued by"><TextInput value={entry.issuer} onChange={(event) => updateEntry("certifications", index, "issuer", event.target.value)} /></FormField>
                <FormField label="Date earned (optional)"><input className="rp-input" type="date" value={entry.earnedDate} onChange={(event) => updateEntry("certifications", index, "earnedDate", event.target.value)} /></FormField>
                <FormField label="Skills you learned"><textarea className="rp-input rp-textarea" rows={3} required value={entry.skills} onChange={(event) => updateEntry("certifications", index, "skills", event.target.value)} /></FormField>
                <UploadField label="Upload certificate" file={entry.file} onChange={(event) => updateEntry("certifications", index, "file", event.target.files?.[0] ?? null)} />
                {entry.saved && <span className="rp-saved-tag">Saved</span>}
              </div>
            ), createCertification)}

            {activeStep === 6 && listEntryCards("achievements", "Achievement", (entry, index) => (
              <div className="rp-fields-grid">
                <FormField label="Achievement (clear and concise)" className="rp-field-wide">
                  <textarea className="rp-input rp-textarea" rows={3} required value={entry.description} onChange={(event) => updateEntry("achievements", index, "description", event.target.value)} />
                </FormField>
                <FormField label="Date received"><TextInput type="date" value={entry.date} onChange={(event) => updateEntry("achievements", index, "date", event.target.value)} /></FormField>
                <UploadField label="Upload evidence" file={entry.file} onChange={(event) => updateEntry("achievements", index, "file", event.target.files?.[0] ?? null)} />
                {entry.saved && <span className="rp-saved-tag">Saved</span>}
              </div>
            ), createAchievement)}

            {activeStep === 7 && listEntryCards("projects", "Project", (entry, index) => (
              <div className="rp-fields-grid">
                <FormField label="Project name"><TextInput value={entry.name} onChange={(event) => updateEntry("projects", index, "name", event.target.value)} /></FormField>
                <FormField label="Year"><TextInput type="number" min="1900" max="2100" value={entry.year} onChange={(event) => updateEntry("projects", index, "year", event.target.value)} /></FormField>
                <FormField label="Project link"><TextInput type="url" value={entry.projectUrl} onChange={(event) => updateEntry("projects", index, "projectUrl", event.target.value)} placeholder="https://" /></FormField>
                <FormField label="GitHub link"><TextInput type="url" value={entry.githubUrl} onChange={(event) => updateEntry("projects", index, "githubUrl", event.target.value)} placeholder="https://github.com/..." /></FormField>
                <FormField label="Tech stack"><TextInput value={entry.techStack} onChange={(event) => updateEntry("projects", index, "techStack", event.target.value)} placeholder="Separate technologies with commas" /></FormField>
                <FormField label="Description" className="rp-field-wide"><textarea className="rp-input rp-textarea" rows={4} required value={entry.description} onChange={(event) => updateEntry("projects", index, "description", event.target.value)} /></FormField>
                {entry.saved && <span className="rp-saved-tag">Saved</span>}
              </div>
            ), createProject)}

            {activeStep === 8 && (
              <>
                <p className="rp-step-description">Suggestions are matched to the job description and grouped across technical skills, programming languages, soft skills, and spoken languages. Review them, remove anything that does not describe you, or add your own.</p>
                {headlineNotice && <p className="rp-hint" role="status">{headlineNotice}</p>}
                <button className="rp-secondary-btn rp-suggest-skills" type="button" onClick={suggestSkills}>Suggest skills from job description</button>
                {listEntryCards("skills", "Skill", (entry, index) => (
                  <div className="rp-fields-grid">
                    <FormField label={`Skill ${index + 1}`} className="rp-field-wide"><TextInput value={entry.value} onChange={(event) => updateEntry("skills", index, "value", event.target.value)} placeholder="Enter a relevant skill" /></FormField>
                  </div>
                ), createSkill)}
              </>
            )}

            {activeStep === 9 && (
              <div className="rp-ats-panel">
                <div className={`rp-ats-score-card${scoreQualifies ? " qualified" : ""}`}>
                  <span className="rp-ats-label">CURRENT ATS MATCH</span>
                  <strong>{hasValidAtsScore ? `${Math.round(atsScore)}%` : "Not scored yet"}</strong>
                  <p>{hasValidAtsScore
                    ? scoreQualifies
                      ? "Your resume has at least 75% keyword coverage. Review the suggestions and consent before downloading."
                      : "Your resume has less than 75% keyword coverage. Review the missing keywords and only add skills you genuinely have."
                    : "Generate a transparent keyword match against the job description. This is an estimate, not a hiring decision or a score guaranteed by every ATS."}</p>
                </div>
                <button
                  type="button"
                  className="rp-secondary-btn rp-generate-ats"
                  disabled={atsLoading}
                  onClick={() => requestAtsScore()}
                >
                  {atsLoading ? "Calculating match…" : hasValidAtsScore ? "Recalculate ATS match" : "Generate ATS match"}
                </button>
                {atsError && <p className="rp-download-error" role="alert">{atsError}</p>}
                {atsResult && atsResult.score === null && <p className="rp-hint" role="status">{atsResult.message}</p>}
                {hasValidAtsScore && (
                  <section className="rp-keyword-card" aria-label="Missing job description keywords">
                    <h3>Job description keyword check</h3>
                    <p className="rp-hint">Score uses only recognized job-related terms found in the job description and in your experience, education, certifications, achievements, projects, and skills. Add a suggestion only if it accurately describes you.</p>
                    <p className="rp-keyword-count">
                      Matched {atsResult.matchedKeywords.length} of {atsResult.totalRequirements} detected keywords.
                    </p>
                    {atsResult.missingKeywords.length === 0 && addedAtsKeywords.length === 0
                      ? <p className="rp-keyword-empty">No missing keywords from the supported list were detected.</p>
                      : (
                        <ul className="rp-keyword-list">
                          {atsResult.missingKeywords.map((keyword) => (
                            <li key={keyword}>
                              <span>{keyword}</span>
                              <button type="button" disabled={atsLoading} onClick={() => addAtsKeyword(keyword)}>Add to Skills</button>
                            </li>
                          ))}
                          {addedAtsKeywords.map((keyword) => (
                            <li className="rp-keyword-added" key={`added-${keyword}`}>
                              <span>{keyword}</span>
                              <span className="rp-keyword-added-label">Added</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </section>
                )}
                <div className="rp-ats-actions">
                  <button type="button" className="rp-secondary-btn" disabled={!consentRecorded || consentSaving || previewSaving || atsLoading} onClick={previewResume}>{previewSaving ? "Saving resume…" : "Preview resume"}</button>
                  <button type="button" className="rp-primary-btn" disabled={!scoreQualifies || !consentRecorded || consentSaving} aria-describedby="rp-download-status" onClick={downloadResume}>Download resume</button>
                  <button type="button" className="rp-secondary-btn" onClick={goToFirstStep}>Edit from first step</button>
                </div>
                <p id="rp-download-status" className="rp-hint" role="status">Preview unlocks after both consents are recorded. Download additionally requires an ATS score of at least 75%.</p>
                <div className="rp-privacy-card">
                  <h4>Privacy and consent</h4>
                  <p>Your consent record is stored when both permissions are accepted. Clicking Preview saves the current resume for this session; each later preview replaces the prior version. Withdrawing storage permission deletes the saved resume. The consent API does not store your ATS score.</p>
                  <details className="rp-hint">
                    <summary>Read the resume portal terms summary</summary>
                    <p>The information you enter is used to create and assess your resume. When you click Preview, the current resume details and selected photo are saved for this resume session. A later preview replaces the saved version. If you withdraw storage permission, the saved resume is deleted; the consent and withdrawal record remains for audit purposes. Your ATS score is not stored.</p>
                  </details>
                  <label className="rp-checkbox rp-consent">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      disabled={consentSaving}
                      onChange={(event) => updateConsent("terms", event.target.checked)}
                    />
                    I have read and agree to the WINR Resume Portal <a href="#/terms-of-service" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>.
                  </label>
                  <label className="rp-checkbox rp-consent">
                    <input
                      type="checkbox"
                      required
                      checked={storageConsentAccepted}
                      disabled={consentSaving}
                      onChange={(event) => updateConsent("storage", event.target.checked)}
                    />
                    I give WINR permission to store the resume I create on its system.
                  </label>
                  {consentNotice && <p className="rp-hint" role="status">{consentNotice}</p>}
                </div>
              </div>
            )}

            {stepNotice && <p className="rp-download-error" role="alert">{stepNotice}</p>}
            <div className="rp-step-navigation">
              <button type="button" className="rp-secondary-btn" onClick={goBack} disabled={activeStep === 0}>Back</button>
              {activeStep < 9
                ? <button type="submit" className="rp-primary-btn">Save &amp; Next</button>
                : <button type="button" className="rp-secondary-btn" onClick={goToFirstStep}>Back to first field</button>}
            </div>
          </form>
        </div>
        <div className="rp-builder-footer"><button type="button" className="rp-text-button" disabled={consentSaving || previewSaving} onClick={clearDraft}>Clear draft</button></div>
      </section>

      {showPreview && (
        <div className="rp-preview-backdrop" role="presentation" onClick={() => setShowPreview(false)}>
          <section className="rp-preview-dialog" role="dialog" aria-modal="true" aria-label="Resume preview" onClick={(event) => event.stopPropagation()}>
            <div className="rp-preview-toolbar">
              <h3>Resume preview</h3>
              <button type="button" className="rp-secondary-btn" onClick={() => setShowPreview(false)}>Close preview</button>
            </div>
            {previewStorageNotice && <p className="rp-download-error" role="alert">{previewStorageNotice}</p>}
            <ResumePreview data={data} photoUrl={photoUrl} />
          </section>
        </div>
      )}
      <div className="rp-print-only"><ResumePreview data={data} photoUrl={photoUrl} /></div>
    </div>
  );
}
