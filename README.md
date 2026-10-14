# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## WINR local opportunities API

The career opportunities page loads published vacancies from the local PostgreSQL database through the Express API. The application form is still a demo and does not save submissions.

1. Copy `.env.example` to `.env` in the project folder and set `DB_PASSWORD` to the password for your local PostgreSQL `postgres` role. Do not commit or share `.env`.
2. Confirm the database name in `.env` matches the database created in pgAdmin. The default is `Winr-dev`.
3. Open one terminal in this project folder and run `npm run api`.
4. Open a second terminal in this project folder and run `npm run dev`.
5. Visit the local Vite address shown in the second terminal. The opportunities page requests `GET /api/opportunities`; check `http://localhost:3001/api/health` to verify the API can connect to PostgreSQL.

The API returns only published opportunities that have not passed their closing date. `server/schema.sql` contains the opportunity-table definition for setting up a fresh development database; it is safe to execute when the table already exists.

## Resume portal storage (development)

The resume portal sends consent metadata to `POST /api/resume-consents` only after both the terms checkbox and resume-storage permission checkbox are accepted. Clicking Preview attempts to save the current resume data and selected photo through `PUT /api/resumes/:resumeSessionId`; another preview replaces that session's saved version. The preview still opens if saving fails, with a notice that it was not stored. Unchecking either consent box after acceptance records withdrawal and deletes the saved resume. ATS scores are not stored. The Terms & Conditions link opens a new tab so the in-progress form remains in place.

Run `server/migrations/001_resume_consent_records.sql` in pgAdmin's Query Tool connected to `Winr-dev` to record consent. Run `server/migrations/002_resume_records.sql` after it to enable saving resume snapshots on Preview. Restart `npm run api` after changing server code, then run Vite and test the Resume Portal. The consent text and policy version are defined in `server/index.js`; update the version whenever the approved consent text changes. Consent and resume-storage language must be reviewed and approved by WINR before collecting real candidates' information.

To verify the tables in pgAdmin, run:

```sql
SELECT
  to_regclass('public.resume_consent_records') AS consent_table,
  to_regclass('public.resume_records') AS resume_table;

SELECT id, resume_session_id, policy_version, accepted_at, withdrawn_at
FROM resume_consent_records
ORDER BY accepted_at DESC
LIMIT 20;

SELECT count(*) AS consent_record_count
FROM resume_consent_records;
```

The API health endpoint at `http://localhost:3001/api/health` reports database connectivity and whether both resume tables exist. Consent can be recorded once migration 001 is applied; Preview requires both migrations. If a health response lacks a `schema` object, restart the API so it loads the current server code. The resume portal reports API/database setup errors next to the consent controls; after fixing the issue, uncheck and re-check both consent boxes to submit again.

The final Resume Portal step can request a match from `POST /api/ats-score`. This is a deterministic backend keyword-coverage estimate, not an AI model, a hiring recommendation, or a score guaranteed by every ATS. It compares supported technical/programming terms (weighted 2) and soft/spoken-language terms (weighted 1) found in the job description against entered experience titles, education, certifications, achievements, projects, and skills. Personal contact details and the generated summary/headline are excluded. The API does not store the resume or score for this request. Missing terms appear as suggestions; adding one inserts it into Skills and recalculates the score. Candidates should only add a suggestion if it accurately describes them. The keyword list is curated, so unsupported terms and equivalent wording may not be recognized.

Run all backend unit and HTTP integration tests with `npm test`. The API tests use an isolated in-memory fake database adapter; they do not create, update, or delete records in `Winr-dev`. The test files are `server/atsScoring.unittestcase.js` and `server/api.unittestcase.js`. Restart `npm run api` after changing the scorer or API code.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
