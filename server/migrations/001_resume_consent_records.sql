CREATE TABLE IF NOT EXISTS resume_consent_records (
    id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_session_id        uuid NOT NULL,
    policy_version           text NOT NULL,
    terms_text               text NOT NULL,
    storage_consent_text     text NOT NULL,
    accepted_at              timestamptz NOT NULL DEFAULT now(),
    withdrawn_at             timestamptz
);

CREATE INDEX IF NOT EXISTS resume_consent_records_session_idx
    ON resume_consent_records (resume_session_id);
