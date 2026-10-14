import assert from "node:assert/strict";
import test from "node:test";
import { getResumeScoringText, scoreResumeMatch } from "./atsScoring.js";

test("scores recognized requirements and returns missing keywords", () => {
  const result = scoreResumeMatch(
    "We need Python, Linux, and strong communication.",
    "Used Linux troubleshooting and communication on a project.",
  );

  assert.equal(result.score, 60);
  assert.deepEqual(result.matchedKeywords, ["Linux", "Communication"]);
  assert.deepEqual(result.missingKeywords, ["Python"]);
});

test("matches supported aliases without matching substrings", () => {
  const result = scoreResumeMatch("React.js and Java are required.", "Built with ReactJS and JavaScript.");

  assert.equal(result.score, 50);
  assert.deepEqual(result.matchedKeywords, ["React"]);
  assert.deepEqual(result.missingKeywords, ["Java"]);
});

test("returns no score if the description contains no supported keywords", () => {
  const result = scoreResumeMatch("A positive and motivated team player.", "Reliable and motivated.");

  assert.equal(result.score, null);
  assert.equal(result.totalRequirements, 0);
  assert.match(result.message, /cannot be calculated/);
});

test("uses resume evidence but excludes personal information and generated summaries", () => {
  const text = getResumeScoringText({
    fullName: "Java Candidate",
    email: "python@example.com",
    jobDescription: "Kubernetes",
    summary: "Expert in Kubernetes",
    skills: [{ value: "Linux" }],
    projects: [{ name: "API", techStack: "Node.js", description: "Built backend services" }],
  });

  assert.match(text, /Linux/);
  assert.match(text, /Node\.js/);
  assert.doesNotMatch(text, /Java Candidate|python@example|Kubernetes/);
});
