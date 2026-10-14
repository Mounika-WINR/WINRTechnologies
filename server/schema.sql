CREATE TABLE IF NOT EXISTS opportunities (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title           text NOT NULL,
    team            text,
    description     text NOT NULL,
    location        text,
    employment_type text,
    status          text NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'closed')),
    published_at    timestamptz,
    closes_at       timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);
