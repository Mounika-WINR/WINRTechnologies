CREATE TABLE IF NOT EXISTS resume_records (
    resume_session_id uuid PRIMARY KEY,
    consent_record_id  uuid NOT NULL REFERENCES resume_consent_records (id),
    resume_data        jsonb NOT NULL CHECK (jsonb_typeof(resume_data) = 'object'),
    photo_data_url     text,
    created_at         timestamptz NOT NULL DEFAULT now(),
    updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resume_records_consent_idx
    ON resume_records (consent_record_id);
