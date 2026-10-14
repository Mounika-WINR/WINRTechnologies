/* INDUSTRY PAGES — shared factory (card-UI models copied from TechnologyIT.jsx).
   Content 1:1 from old website winrtechnologies.com/industries/* pages. */
import { useState } from "react";
import logoWithName from "../../assets/images/WinrLogoName.png";

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
    case "radio":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" />
          <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
        </svg>
      );
    case "bank":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="5" y1="21" x2="5" y2="10" />
          <line x1="19" y1="21" x2="19" y2="10" />
          <line x1="12" y1="21" x2="12" y2="10" />
          <polygon points="3 8 12 3 21 8 3 8" />
        </svg>
      );
    case "heart":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "wrench":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "activity":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "layers":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "trending":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "scale":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="3" x2="12" y2="21" />
          <path d="M5 7l7-4 7 4" />
          <path d="M5 7l-3 7a4 4 0 0 0 6 0L5 7z" />
          <path d="M19 7l-3 7a4 4 0 0 0 6 0l-3-7z" />
        </svg>
      );
    default:
      return null;
  }
}

/* Accordion Gallery v2 — same model as TechnologyIT page */
function AccordionGallery({ items }) {
  const [active, setActive] = useState(0);
  return (
    <div className="wr-accordion-gallery" aria-label="Challenges We Solve accordion gallery">
      {items.map((item, i) => (
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

/* Hover Reveal Cards — same model as TechnologyIT page (number + title, content on hover) */
function HoverRevealCards({ stages }) {
  const [active, setActive] = useState(null);
  return (
    <div className="wr-hover-reveal-grid" aria-label="How We Deliver hover reveal cards">
      {stages.map((s, i) => (
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
          <div className="wr-hr-initial">
            <span className="wr-hr-num">{s.num}</span>
            <h3 className="wr-hr-title">{s.title}</h3>
            <span className="wr-hr-hint">Hover to reveal</span>
          </div>
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

/* SHARED INDUSTRY PAGE — same structure/UI as Technology & IT page:
   Hero (logo + eyebrow + title + desc + stats, NO buttons) → Challenges We Solve
   → How We Deliver → Roles We Staff → Testimonial. Uses wr-tech-it-container
   compaction CSS so no section has excess empty space. */
export function IndustryPage({ data }) {
  const { eyebrow, title, tagline, desc, stats, challenges, stages, roles, quote } = data;
  return (
    <div className="wr-tech-it-container">
      {/* SECTION 1: Hero — NO buttons (buttons only exist on existing pages) */}
      <section className="wr-sec wr-full-hero" id={data.id}>
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <img src={logoWithName} alt="WINR Technologies Pvt Ltd" className="wr-hero-logo about" />
            <p className="wr-tagline">{tagline}</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">{eyebrow}</p>
            <h1 className="wr-main-title">{title}</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">{desc}</p>
            {stats && (
              <div className="wr-hero-stats">
                {stats.map((s) => (
                  <div className="wr-hero-stat" key={s.strong}>
                    <strong>{s.strong}</strong>
                    <span>{s.span}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 2: Challenges We Solve */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Challenges We Solve</h2>
          <p className="wr-sub wr-sub-wide">
            Sector-specific bottlenecks that hold recruitment velocity back &mdash; and how we clear them.
          </p>
        </div>
        <AccordionGallery items={challenges} />
      </section>

      <div className="wr-page-line" />

      {/* SECTION 3: How We Deliver */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">How We Deliver</h2>
          <p className="wr-sub">A four-step delivery model calibrated for this sector.</p>
        </div>
        <HoverRevealCards stages={stages} />
      </section>

      <div className="wr-page-line" />

      {/* SECTION 4: Roles We Staff */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Roles We Staff</h2>
          <p className="wr-sub">A representative slice of the mandates we take on.</p>
        </div>
        <div className="wr-roles-pills">
          {roles.map((r) => (
            <span key={r} className="wr-role-pill">{r}</span>
          ))}
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 5: Testimonial (old website quote) */}
      <section className="wr-sec wr-full-section" style={{ paddingBottom: 32 }}>
        <div className="wr-quote-card">
          <p className="wr-quote-text">&ldquo;{quote.text}&rdquo;</p>
          <p className="wr-quote-by">{quote.by} &mdash; {quote.role}</p>
          {quote.stat && <p className="wr-quote-stat">{quote.stat}</p>}
        </div>
      </section>
    </div>
  );
}

/* ===================== CONTENT — 1:1 from old website ===================== */

const TELECOM_DATA = {
  id: "telecommunications",
  eyebrow: "INDUSTRIES — TELECOMMUNICATIONS",
  title: "Telecommunications",
  tagline: "Talent for the networks powering everything else",
  desc: "From 5G rollouts to core network transformations, we source telecom talent that ships — with sector fluency built in.",
  stats: [
    { strong: "4+", span: "Operator engagements" },
    { strong: "5G", span: "Ready specialisation" },
    { strong: "30d", span: "Avg. senior placement" },
    { strong: "92%", span: "Offer acceptance" },
  ],
  challenges: [
    { icon: "radio", title: "5G specialist scarcity", desc: "A small national pool. We map and engage passive senior talent." },
    { icon: "layers", title: "RF & core convergence", desc: "Hybrid skill sets are rare — we screen for real cross-domain depth." },
    { icon: "cloud", title: "OSS/BSS modernisation", desc: "Transformation programs need people who've done it before." },
    { icon: "trending", title: "Edge & IoT scaling", desc: "Distributed architectures need distributed hiring — we scale with you." },
    { icon: "shield", title: "Vendor certifications", desc: "Ericsson, Nokia, Cisco — verified, not just claimed." },
    { icon: "clock", title: "Rollout cadence", desc: "Burst hiring aligned to circle-by-circle deployment plans." },
  ],
  stages: [
    { num: "01", title: "Map", desc: "Circle, technology, and vendor footprint." },
    { num: "02", title: "Match", desc: "Certification and delivery-track validation." },
    { num: "03", title: "Mobilise", desc: "Onsite/remote squads ready in weeks." },
    { num: "04", title: "Monitor", desc: "SLA tracking through rollout milestones." },
  ],
  roles: [
    "5G RAN Engineer", "Core Network Engineer", "RF Planning Engineer", "OSS/BSS Consultant",
    "Network Architect", "NOC Lead", "Transmission Engineer", "SDN/NFV Engineer",
    "Field Engineering Manager", "IoT Solutions Architect",
  ],
  quote: {
    text: "They landed senior 5G engineers in weeks where every other vendor stalled for months.",
    by: "Head of Network Rollout",
    role: "Tier-1 operator",
    stat: "3x Pipeline velocity",
  },
};

const BANKING_DATA = {
  id: "banking-financial-services",
  eyebrow: "INDUSTRIES — BANKING & FINANCIAL SERVICES",
  title: "Banking & Financial Services",
  tagline: "Regulated hiring, delivered without regulatory drag",
  desc: "From core banking modernisation to fintech product teams, we place talent that understands controls, cadence, and capital.",
  stats: [
    { strong: "5+", span: "BFSI clients" },
    { strong: "RBI", span: "Regulatory aligned" },
    { strong: "22d", span: "Avg. time to hire" },
    { strong: "90%", span: "Compliance clearance" },
  ],
  challenges: [
    { icon: "bank", title: "Core banking transformation", desc: "Legacy-to-cloud migrations need engineers who've done a full cycle." },
    { icon: "scale", title: "Risk & compliance depth", desc: "Basel, AML, KYC — verified through scenario-based screening." },
    { icon: "zap", title: "Fintech product velocity", desc: "PMs and engineers who can ship weekly under regulatory scrutiny." },
    { icon: "shield", title: "Background verification", desc: "Multi-layered checks aligned to BFSI onboarding standards." },
    { icon: "activity", title: "Payments expertise", desc: "UPI, cards, cross-border — deep switching and settlement knowledge." },
    { icon: "cpu", title: "Quant & data science", desc: "Model risk, pricing, and algo trading talent from a screened pool." },
  ],
  stages: [
    { num: "01", title: "Scope", desc: "Regulatory context and role criticality." },
    { num: "02", title: "Screen", desc: "Domain, background, and cultural fit." },
    { num: "03", title: "Serve", desc: "Shortlist with dossier ready in 10 days." },
    { num: "04", title: "Sustain", desc: "Retention monitoring for 12 months." },
  ],
  roles: [
    "Core Banking Engineer", "Risk Analyst", "Compliance Officer", "Payments Architect",
    "Quant Developer", "Fintech PM", "AML/KYC Specialist", "Data Scientist",
    "Treasury Analyst", "Cybersecurity Lead",
  ],
  quote: {
    text: "WINR understood our controls environment from day one. Every candidate reached the loop pre-cleared and interview-ready.",
    by: "Head of Talent",
    role: "Mid-market private bank",
    stat: "238% First-year ROI",
  },
};

const HEALTHCARE_DATA = {
  id: "healthcare-life-sciences",
  eyebrow: "INDUSTRIES — HEALTHCARE & LIFE SCIENCES",
  title: "Healthcare & Life Sciences",
  tagline: "Care-grade talent for clinical, research, and digital health",
  desc: "We hire for organisations where quality and compliance aren't negotiable — and where speed still matters.",
  stats: [
    { strong: "3+", span: "Healthcare projects" },
    { strong: "HIPAA", span: "Data-handling aware" },
    { strong: "25d", span: "Avg. specialist hire" },
    { strong: "88%", span: "12-month retention" },
  ],
  challenges: [
    { icon: "heart", title: "Clinical role scarcity", desc: "Specialised clinicians in short supply — we build long-lead pipelines." },
    { icon: "zap", title: "Digital health velocity", desc: "Product teams that speak both engineering and clinical." },
    { icon: "cpu", title: "R&D and translational", desc: "Scientists with commercialisation instincts and IP fluency." },
    { icon: "scale", title: "Regulatory rigor", desc: "FDA/CDSCO awareness screened through case-based interviews." },
    { icon: "trending", title: "Pharma & biotech scaling", desc: "Manufacturing, QA, and CMC talent for growth-phase companies." },
    { icon: "cloud", title: "Telemedicine expansion", desc: "Clinical operations, care coordination, and platform engineering." },
  ],
  stages: [
    { num: "01", title: "Understand", desc: "Clinical, regulatory, and product context." },
    { num: "02", title: "Assess", desc: "Domain depth and quality-mindset checks." },
    { num: "03", title: "Onboard", desc: "Compliance-first onboarding support." },
    { num: "04", title: "Optimise", desc: "Retention and ramp-up analytics." },
  ],
  roles: [
    "Medical Officer", "Clinical Research Associate", "Regulatory Affairs Lead", "Bioinformatics Engineer",
    "Health-Tech PM", "Care Coordinator", "QA/QC Specialist", "Medical Writer",
    "Telehealth Ops Lead", "Data Scientist (Clinical)",
  ],
  quote: {
    text: "The candidates arrived understanding both our clinical workflows and our engineering constraints. That's rare.",
    by: "Chief Medical Officer",
    role: "Digital health scale-up",
    stat: "60% Ramp-up time saved",
  },
};

const MANUFACTURING_DATA = {
  id: "manufacturing",
  eyebrow: "INDUSTRIES — MANUFACTURING",
  title: "Manufacturing",
  tagline: "Hiring for the factory floor and the digital thread that runs through it",
  desc: "Operations, automation, IoT, and supply-chain talent for manufacturers modernising from shop floor to top floor.",
  stats: [
    { strong: "6+", span: "Manufacturing projects" },
    { strong: "IoT", span: "Industry 4.0 ready" },
    { strong: "28d", span: "Avg. plant hire" },
    { strong: "80%", span: "Retention at 12 months" },
  ],
  challenges: [
    { icon: "users", title: "Plant leadership pipeline", desc: "Site heads and ops managers with digital + lean pedigree." },
    { icon: "wrench", title: "Automation & controls", desc: "PLC, SCADA, and robotics engineers vetted on real problems." },
    { icon: "briefcase", title: "Skilled trades scarcity", desc: "Structured pipelines for tool-and-die, CNC, and maintenance." },
    { icon: "layers", title: "IIoT & digital twin", desc: "Engineers who bridge OT and IT without translation loss." },
    { icon: "trending", title: "Supply-chain resilience", desc: "Planners and buyers who can model, not just react." },
    { icon: "shield", title: "Quality & compliance", desc: "ISO, IATF, and sector-specific quality leaders." },
  ],
  stages: [
    { num: "01", title: "Walk", desc: "Plant walk-through and role scoping." },
    { num: "02", title: "Work", desc: "Scenario-based assessments on real cases." },
    { num: "03", title: "Wire", desc: "Onsite deployment with handover kit." },
    { num: "04", title: "Watch", desc: "Post-placement productivity tracking." },
  ],
  roles: [
    "Plant Head", "Automation Engineer", "Quality Manager", "Supply Chain Planner",
    "Maintenance Lead", "Production Engineer", "IIoT Architect", "EHS Manager",
    "Lean Six Sigma Black Belt", "R&D Engineer",
  ],
  quote: {
    text: "They understood the difference between an OT engineer who's certified and one who's actually commissioned a line.",
    by: "COO",
    role: "Automotive tier-1 supplier",
    stat: "40% Downtime reduction",
  },
};

const PROFESSIONAL_DATA = {
  id: "professional-services",
  eyebrow: "INDUSTRIES — PROFESSIONAL SERVICES",
  title: "Professional Services",
  tagline: "Billable-ready talent for consulting, legal, and audit",
  desc: "Firms live and die by utilisation. We source associates and leaders who ship engagement value from week one.",
  stats: [
    { strong: "10+", span: "Firm clients" },
    { strong: "24/7", span: "Delivery support" },
    { strong: "20d", span: "Avg. senior hire" },
    { strong: "94%", span: "Utilisation-ready" },
  ],
  challenges: [
    { icon: "briefcase", title: "Partner-track pipeline", desc: "Senior managers with a credible client-origination story." },
    { icon: "rocket", title: "Practice building", desc: "New-practice launches need multi-role hiring in parallel." },
    { icon: "layers", title: "Legal-tech blend", desc: "Lawyers who speak product, engineers who understand doctrine." },
    { icon: "zap", title: "Consultant velocity", desc: "Analyst-to-manager pipelines calibrated to your bar." },
    { icon: "scale", title: "Litigation & compliance", desc: "Deep-domain legal talent verified through casework review." },
    { icon: "users", title: "Audit & assurance", desc: "Big-Four alumni and boutique specialists on standby." },
  ],
  stages: [
    { num: "01", title: "Frame", desc: "Practice, book of business, and bar." },
    { num: "02", title: "Filter", desc: "Casework and client-facing screens." },
    { num: "03", title: "Fit", desc: "Culture and utilisation alignment." },
    { num: "04", title: "Follow-through", desc: "Ramp support and retention tracking." },
  ],
  roles: [
    "Consulting Partner", "Engagement Manager", "Senior Associate", "Legal Counsel",
    "Audit Manager", "Legal-Tech PM", "Strategy Analyst", "Compliance Advisor",
    "Practice Head", "Business Development Lead",
  ],
  quote: {
    text: "We stood up a new advisory practice with three partners and eight managers inside a quarter. Unheard of.",
    by: "Managing Partner",
    role: "Advisory firm",
    stat: "1Q New-practice standup",
  },
};

/* Page exports */
export function Telecommunications() { return <IndustryPage data={TELECOM_DATA} />; }
export function BankingFinancial() { return <IndustryPage data={BANKING_DATA} />; }
export function HealthcareLifeSciences() { return <IndustryPage data={HEALTHCARE_DATA} />; }
export function Manufacturing() { return <IndustryPage data={MANUFACTURING_DATA} />; }
export function ProfessionalServices() { return <IndustryPage data={PROFESSIONAL_DATA} />; }
