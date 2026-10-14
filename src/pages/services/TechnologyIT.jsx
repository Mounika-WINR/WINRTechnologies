import { useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

/* SVG Icons for Challenges We Solve - matched to old website cards */
function Icon({ type }) {
  const p = { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (type) {
    case "cpu":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    case "cloud":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "rocket":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "shield":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "clock":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "zap":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "users":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}

/* 6 Cards for "Challenges We Solve" - 1:1 from old website winrtechnologies.com/industries/technology */
const CHALLENGES = [
  {
    id: 0,
    icon: "cpu",
    title: "AI/ML understaffing",
    desc: "68% of teams are short-staffed. We source and screen for practical algorithm depth, not buzzwords.",
  },
  {
    id: 1,
    icon: "shield",
    title: "Cybersecurity shortage",
    desc: "43% shortage rate. Security-first interviews, threat-landscape checks, and compliance validation.",
  },
  {
    id: 2,
    icon: "cloud",
    title: "Multi-cloud complexity",
    desc: "AWS, Azure, GCP — architects who can actually ship, not just certify.",
  },
  {
    id: 3,
    icon: "clock",
    title: "Slow time-to-hire",
    desc: "We compress 45-day cycles to under 20 with pre-qualified pipelines.",
  },
  {
    id: 4,
    icon: "users",
    title: "Team culture drift",
    desc: "Collaborative-fit screening keeps velocity high after onboarding.",
  },
  {
    id: 5,
    icon: "rocket",
    title: "Scaling under pressure",
    desc: "Burst hiring plans for product launches and market expansion.",
  },
];

/* 4 Cards for "How We Deliver" - 1:1 from old website */
const STAGES = [
  {
    num: "01",
    title: "Discover",
    desc: "Map your stack, roles, and outcomes.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Assessment framework tuned to each role.",
  },
  {
    num: "03",
    title: "Deploy",
    desc: "Pre-screened candidates within 10 days.",
  },
  {
    num: "04",
    title: "Measure",
    desc: "Track retention, ramp, and impact.",
  },
];

/* 10 Roles pills - 1:1 from old website winrtechnologies.com/industries/technology */
const ROLES = [
  "Senior Software Engineer",
  "Cloud Architect",
  "DevOps / SRE",
  "ML Engineer",
  "Data Engineer",
  "Security Engineer",
  "Full-Stack Developer",
  "Mobile Engineer",
  "Engineering Manager",
  "Principal Engineer",
];

/* Accordion Gallery v2 Component for Challenges We Solve (6 Cards) */
function AccordionGallery() {
  const [active, setActive] = useState(0);

  return (
    <div className="wr-accordion-gallery" aria-label="Challenges We Solve accordion gallery">
      {CHALLENGES.map((item, i) => (
        <div
          key={item.title}
          className={`wr-acc-card ${i === active ? "open" : ""}`}
          onMouseEnter={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <div className="wr-acc-icon-box">
            <Icon type={item.icon} />
          </div>
          <h3 className="wr-acc-title">{item.title}</h3>
          <p className="wr-acc-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* Hover Reveal Card Component for How We Deliver (4 Cards - Framer Hover-Reveal-Card model) */
function HoverRevealCards() {
  const [active, setActive] = useState(null);

  return (
    <div className="wr-hover-reveal-grid" aria-label="How We Deliver hover reveal cards">
      {STAGES.map((s, i) => (
        <div
          key={s.num}
          className={`wr-hr-card ${active === i ? "is-open" : ""}`}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          onClick={() => setActive(active === i ? null : i)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
          tabIndex={0}
          role="button"
          aria-label={`${s.num} ${s.title}`}
        >
          {/* Initial state: Card Number + Title (No picture) */}
          <div className="wr-hr-initial">
            <span className="wr-hr-num">{s.num}</span>
            <h3 className="wr-hr-title">{s.title}</h3>
            <span className="wr-hr-hint">Hover to reveal</span>
          </div>
          {/* Hover state: small content card glides up on hover */}
          <div className="wr-hr-overlay">
            <span className="wr-hr-num-overlay">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TechnologyIT() {
  return (
    <div className="wr-tech-it-container">
      {/* SECTION 1: Hero — logo + eyebrow + title + desc + 4 stats, NO buttons (matches other Industries pages) */}
      <section className="wr-sec wr-full-hero" id="technology-it">
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Technology staffing built by engineers</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">INDUSTRIES &mdash; TECHNOLOGY &amp; IT</p>
            <h1 className="wr-main-title">Technology &amp; IT</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              Technology staffing built by engineers, not generalists. We match teams to your technical DNA
              &mdash; from AI/ML and cloud architecture to full-stack, DevOps, and security &mdash; with
              assessments run by working engineers.
            </p>
            <div className="wr-hero-stats">
              <div className="wr-hero-stat"><strong>50%</strong><span>Faster placement</span></div>
              <div className="wr-hero-stat"><strong>95%</strong><span>Interview pass rate</span></div>
              <div className="wr-hero-stat"><strong>18d</strong><span>Avg. time to hire</span></div>
              <div className="wr-hero-stat"><strong>85%</strong><span>12-month retention</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 2: Challenges We Solve - title + icon + content (old website text) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Challenges We Solve</h2>
          <p className="wr-sub wr-sub-wide">
            Sector-specific bottlenecks that hold recruitment velocity back &mdash; and how we clear them.
          </p>
        </div>

        <AccordionGallery />
      </section>

      <div className="wr-page-line" />

      {/* SECTION 3: How We Deliver - 4 Hover-Reveal Cards (number + title, small card on hover) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">How We Deliver</h2>
          <p className="wr-sub">
            A four-step delivery model calibrated for this sector.
          </p>
        </div>

        <HoverRevealCards />
      </section>

      <div className="wr-page-line" />

      {/* SECTION 4: Roles We Staff - pills (1:1 old website) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Roles We Staff</h2>
          <p className="wr-sub">
            A representative slice of the mandates we take on.
          </p>
        </div>

        <div className="wr-roles-pills">
          {ROLES.map((r) => (
            <span key={r} className="wr-role-pill">{r}</span>
          ))}
        </div>
      </section>

      <div className="wr-page-line" />

      {/* Final: Testimonial (1:1 old website) */}
      <section className="wr-sec wr-full-section" style={{ paddingBottom: 32 }}>
        <div className="wr-quote-card">
          <p className="wr-quote-text">
            &ldquo;WINR&apos;s engineering-led screening cut our time-to-hire in half and materially raised the
            bar of who reached our loop.&rdquo;
          </p>
          <p className="wr-quote-by">VP Engineering &mdash; Enterprise SaaS client</p>
          <p className="wr-quote-stat">50% Time-to-hire reduction</p>
        </div>
      </section>
    </div>
  );
}
