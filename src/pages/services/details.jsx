import React from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

const BUILD_ITEMS = [
  { icon: "01", title: "Corporate & Marketing Websites", desc: "Brand-led, conversion-focused sites with clear messaging, lead forms, and analytics wiring." },
  { icon: "02", title: "Custom Web Applications", desc: "Dashboards, portals, and SaaS-style apps with secure auth, APIs, and role-based access." },
  { icon: "03", title: "E-Commerce & CMS", desc: "Online stores and content platforms with payment integration, catalogues, and editorial workflows." },
  { icon: "04", title: "UI Rebuilds & Migrations", desc: "Modernise legacy sites with better UX, performance, and maintainable component libraries." },
];

const DELIVERY_STEPS = [
  { icon: "01", title: "Understand", desc: "Goals, users, and technical constraints mapped upfront." },
  { icon: "02", title: "Design", desc: "Wireframes and UI that match your brand system." },
  { icon: "03", title: "Develop", desc: "Clean code, APIs, and staging reviews each sprint." },
  { icon: "04", title: "Deliver", desc: "Performance, SEO, and hosting support at go-live." },
];

const QUALITY_STANDARDS = [
  { title: "SECURE BY DEFAULT", desc: "Thoughtful auth, validation, permissions, and deployment practices." },
  { title: "PERFORMANCE FOCUSED", desc: "Fast experiences, lean assets, and measurable Core Web Vitals." },
  { title: "CROSS-BROWSER READY", desc: "Responsive, accessible interfaces that work across modern devices." },
];

function OutlineIcon({ type }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (type === "01") return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 21h10M9 18v3M15 18v3" /></svg>;
  if (type === "02") return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h4" /></svg>;
  if (type === "03") return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M4 19a5 5 0 0 1 10 0M15 5h5v5M17 7l3-3" /></svg>;
  return <svg {...common}><path d="M4 5h16M4 12h10M4 19h16" /><path d="m17 10 3 2-3 2" /></svg>;
}

function WebHero() {
  return (
    <section className="wr-sec wr-full-hero wr-web-hero" id="web-development">
      <div className="wr-hero split">
        <div className="wr-hero-left">
          <FloatingLogo className="wr-hero-floating" />
          <p className="wr-tagline">Web experiences built to grow</p>
        </div>
        <div className="wr-about-right">
          <p className="wr-eyebrow">OUR SERVICES &mdash; WEB DEVELOPMENT</p>
          <h1 className="wr-main-title">Web Development That Converts Visitors Into Customers</h1>
          <div className="wr-rule" />
          <p className="wr-sub about-text">Fast, secure, and scalable websites and web applications designed around your business goals &mdash; from corporate sites to complex customer portals.</p>
          <div className="wr-hero-stats wr-web-stats">
            <div className="wr-hero-stat"><strong>40%+</strong><span>Faster page loads</span></div>
            <div className="wr-hero-stat"><strong>100%</strong><span>Mobile responsive</span></div>
            <div className="wr-hero-stat"><strong>SEO</strong><span>Ready architecture</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildSection() {
  return (
    <section className="wr-sec wr-full-section wr-web-section">
      <div className="wr-section-header-block">
        <p className="wr-eyebrow">OUTCOMES FIRST</p>
        <h2 className="wr-large-heading">Built for Business Outcomes</h2>
        <p className="wr-sub wr-sub-wide">WINR Technologies delivers web experiences that look sharp and perform under real traffic. We combine modern frameworks with clean architecture so your site is easy to maintain, extend, and scale as your product or brand grows.</p>
        <p className="wr-sub wr-sub-wide">Whether you need a marketing website, a client portal, or a full-stack web product, we own the journey from discovery and UX through development, launch, and ongoing support.</p>
      </div>
      {/* Framer Service-Card-UI model: horizontal slim cards, hovered card expands */}
      <div className="wr-web-build-servicecards" aria-label="What we build">
        {BUILD_ITEMS.map((item) => (
          <article className="wr-web-service-card" key={item.title} tabIndex={0}>
            <span className="wr-web-sc-icon"><OutlineIcon type={item.icon} /></span>
            <div className="wr-web-sc-static">
              <span className="wr-web-sc-num">{item.icon}</span>
              <h3 className="wr-web-sc-title">{item.title}</h3>
            </div>
            <div className="wr-web-sc-expanded">
              <span className="wr-web-sc-num">{item.icon}</span>
              <h3 className="wr-web-sc-title">{item.title}</h3>
              <p className="wr-web-sc-desc">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* Hover Reveal Cards for How We Deliver — same model as Technology & IT page
   (Framer Hover-Reveal-Card: number + title visible, content card glides up on hover)
   Supports both `icon` (delivery steps) and `num` (advantage stages) for the orange circle. */
function HoverRevealCards({ steps = DELIVERY_STEPS }) {
  const [active, setActive] = React.useState(null);
  const colsClass = steps.length === 3 ? " cols-3" : "";
  return (
    <div className={`wr-hover-reveal-grid${colsClass}`} aria-label="How We Deliver hover reveal cards">
      {steps.map((s, i) => {
        const badge = s.icon || s.num || `0${i + 1}`;
        return (
        <div
          key={badge + s.title}
          className={`wr-hr-card ${active === i ? "is-open" : ""}`}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          onClick={() => setActive(active === i ? null : i)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
          tabIndex={0}
          role="button"
          aria-label={`${badge} ${s.title}`}
        >
          <div className="wr-hr-initial">
            <span className="wr-hr-num">{badge}</span>
            <h3 className="wr-hr-title">{s.title}</h3>
            <span className="wr-hr-hint">Hover to reveal</span>
          </div>
          <div className="wr-hr-overlay">
            <span className="wr-hr-num-overlay">{badge}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
        );
      })}
    </div>
  );
}

/* Orange-accent checkmark block — heading is configurable per page:
   Web Development = "QUALITY STANDARDS", App Development = "WHAT CLIENTS GAIN",
   Software Development = "OUTCOMES YOU CAN MEASURE" (old-website content). */
function QualityStandards({ items = QUALITY_STANDARDS, title = "QUALITY STANDARDS", sub = "Built to last beyond launch" }) {
  return (
    <div className="wr-web-quality">
      <div className="wr-web-quality-heading">
        <h2 className="wr-web-quality-title">{title}</h2>
        <p className="wr-web-quality-sub">{sub}</p>
      </div>
      <div className="wr-web-quality-grid" data-reveal-group>
        {items.map((standard) => (
          <article key={standard.title}>
            <span className="wr-web-quality-check" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            <div><h3>{standard.title}</h3><p>{standard.desc}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DeliverySection() {
  return (
    <section className="wr-sec wr-full-section wr-web-section">
      <div className="wr-section-header-block">
        <p className="wr-eyebrow">A CLEAR PATH TO LAUNCH</p>
        <h2 className="wr-large-heading">How We Deliver</h2>
        <p className="wr-sub wr-sub-wide">A structured delivery model keeps timelines predictable and quality consistent across every engagement.</p>
      </div>
      <HoverRevealCards />
      <QualityStandards />
    </section>
  );
}

/* Shared service-page hero — NO buttons (matches Web Development + Industries pattern:
   logo + eyebrow + title + desc + stats only, no CTA row in 1st section) */
function ServiceHero({ id, eyebrow, title, tagline, desc, stats }) {
  return (
    <section className="wr-sec wr-full-hero wr-web-hero" id={id}>
      <div className="wr-hero split">
        <div className="wr-hero-left">
          <FloatingLogo className="wr-hero-floating" />
          <p className="wr-tagline">{tagline}</p>
        </div>
        <div className="wr-about-right">
          <p className="wr-eyebrow">{eyebrow}</p>
          <h1 className="wr-main-title">{title}</h1>
          <div className="wr-rule" />
          <p className="wr-sub about-text">{desc}</p>
          {stats && (
            <div className="wr-hero-stats wr-web-stats">
              {stats.map((s) => (
                <div className="wr-hero-stat" key={s.strong}><strong>{s.strong}</strong><span>{s.span}</span></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Framer Service-Card-UI expand-on-hover cards — same model as Web Development page */
function ServiceCards({ items, label }) {
  return (
    <div className="wr-web-build-servicecards" data-reveal-group aria-label={label}>
      {items.map((item) => (
        <article className="wr-web-service-card" key={item.title} tabIndex={0}>
          <span className="wr-web-sc-icon"><OutlineIcon type={item.icon} /></span>
          <div className="wr-web-sc-static">
            <span className="wr-web-sc-num">{item.icon}</span>
            <h3 className="wr-web-sc-title">{item.title}</h3>
          </div>
          <div className="wr-web-sc-expanded">
            <span className="wr-web-sc-num">{item.icon}</span>
            <h3 className="wr-web-sc-title">{item.title}</h3>
            <p className="wr-web-sc-desc">{item.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ServiceBuildSection({ eyebrow, title, intro, extra, items, label }) {
  return (
    <section className="wr-sec wr-full-section wr-web-section">
      <div className="wr-section-header-block">
        <p className="wr-eyebrow">{eyebrow}</p>
        <h2 className="wr-large-heading">{title}</h2>
        <p className="wr-sub wr-sub-wide">{intro}</p>
        {extra && <p className="wr-sub wr-sub-wide">{extra}</p>}
      </div>
      <ServiceCards items={items} label={label} />
    </section>
  );
}

function ServiceDeliverySection({ eyebrow, title, intro, steps, standards, qualityTitle, qualitySub }) {
  return (
    <section className="wr-sec wr-full-section wr-web-section">
      <div className="wr-section-header-block">
        <p className="wr-eyebrow">{eyebrow}</p>
        <h2 className="wr-large-heading">{title}</h2>
        <p className="wr-sub wr-sub-wide">{intro}</p>
      </div>
      <HoverRevealCards steps={steps} />
      <QualityStandards items={standards} title={qualityTitle} sub={qualitySub} />
    </section>
  );
}

export function WebDevelopment() {
  return (
    <div className="wr-web-container">
      <WebHero />
      <div className="wr-page-line" />
      <BuildSection />
      <div className="wr-page-line" />
      <DeliverySection />
    </div>
  );
}

/* ---------------- APP DEVELOPMENT ---------------- */
const APP_ITEMS = [
  { icon: "01", title: "Native iOS & Android Apps", desc: "Platform-idiomatic apps with smooth UI, offline support, and store-ready release pipelines." },
  { icon: "02", title: "Cross-Platform Apps", desc: "React Native and Flutter builds that ship one codebase to both stores without sacrificing UX." },
  { icon: "03", title: "Cloud Backends & APIs", desc: "Scalable backends, auth, push notifications, and analytics wired in from day one." },
  { icon: "04", title: "App Modernisation & Support", desc: "Rebuilds, store-compliance fixes, and ongoing release management for existing apps." },
];

/* WHAT CLIENTS GAIN — old-website content (app-development page) */
const APP_GAINS = [
  { title: "FASTER", desc: "Time to market" },
  { title: "POLISHED", desc: "User experience" },
  { title: "SCALABLE", desc: "Technical foundation" },
];

export function AppDevelopment() {
  return (
    <div className="wr-web-container">
      <ServiceHero
        id="app-development"
        eyebrow="OUR SERVICES — APP DEVELOPMENT"
        title="Mobile Apps Your Customers Actually Use"
        tagline="Apps built to perform, not just to exist"
        desc="Native and cross-platform mobile applications with clean UX, cloud backends, and scalable architecture — engineered for performance on real devices and real networks."
        stats={[{ strong: "2 Platforms", span: "One codebase option" }, { strong: "100%", span: "Store-ready builds" }, { strong: "Offline", span: "First architecture" }]}
      />
      <div className="wr-page-line" />
      <ServiceBuildSection
        eyebrow="WHAT WE BUILD"
        title="App Capabilities"
        intro="From consumer apps to internal field-tools, we build mobile products that stay fast, stable, and maintainable long after launch."
        extra="Every engagement covers UX design, development, store submission, and post-launch iteration — one team, end to end."
        items={APP_ITEMS}
        label="App development capabilities"
      />
      <div className="wr-page-line" />
      <ServiceDeliverySection
        eyebrow="A CLEAR PATH TO LAUNCH"
        title="How We Deliver"
        intro="A structured delivery model keeps app timelines predictable and quality consistent across every release."
        steps={DELIVERY_STEPS}
        standards={APP_GAINS}
        qualityTitle="WHAT CLIENTS GAIN"
        qualitySub="The difference a focused app partner makes"
      />
    </div>
  );
}

/* ---------------- SOFTWARE DEVELOPMENT ---------------- */
const SOFTWARE_ITEMS = [
  { icon: "01", title: "Custom Business Systems", desc: "ERP-style platforms, workflow tools, and internal systems shaped around how your organisation actually works." },
  { icon: "02", title: "APIs & Integrations", desc: "REST and third-party integrations that connect your CRM, ERP, payments, and reporting tools." },
  { icon: "03", title: "Cloud & DevOps", desc: "Cloud architecture, CI/CD pipelines, and infrastructure that scales with your product." },
  { icon: "04", title: "Legacy Modernisation", desc: "Migrate ageing systems to modern stacks with zero-disruption phased rollouts." },
];

/* OUTCOMES YOU CAN MEASURE — old-website content (software-development page) */
const SOFTWARE_OUTCOMES = [
  { title: "LESS", desc: "Manual process overhead" },
  { title: "MORE", desc: "System reliability" },
  { title: "CLEAR", desc: "Ownership & roadmaps" },
];

export function SoftwareDevelopment() {
  return (
    <div className="wr-web-container">
      <ServiceHero
        id="software-development"
        eyebrow="OUR SERVICES — SOFTWARE DEVELOPMENT"
        title="Custom Software Engineered Around Your Business"
        tagline="Systems built for how you actually work"
        desc="Custom business systems, APIs, and integrations engineered around your processes — from workflow automation and dashboards to full cloud platforms."
        stats={[{ strong: "API", span: "First architecture" }, { strong: "Secure", span: "By default" }, { strong: "Cloud", span: "Ready & scalable" }]}
      />
      <div className="wr-page-line" />
      <ServiceBuildSection
        eyebrow="WHAT WE BUILD"
        title="Software Capabilities"
        intro="We build the systems that run your operations — designed with your team, documented properly, and handed over without lock-in."
        extra="Whether it's a client portal, an operations dashboard, or a full platform rebuild, we own the journey from discovery to production."
        items={SOFTWARE_ITEMS}
        label="Software development capabilities"
      />
      <div className="wr-page-line" />
      <ServiceDeliverySection
        eyebrow="A CLEAR PATH TO LAUNCH"
        title="How We Deliver"
        intro="A structured delivery model keeps software timelines predictable and quality consistent across every engagement."
        steps={DELIVERY_STEPS}
        standards={SOFTWARE_OUTCOMES}
        qualityTitle="OUTCOMES YOU CAN MEASURE"
        qualitySub="What better engineering looks like in practice"
      />
    </div>
  );
}

/* ---------------- STRATEGIC STAFFING SOLUTIONS ----------------
   Old-website style: hero with buttons in 1st section + 3 simple cards. */
const STAFFING_CARDS = [
  {
    title: "Permanent Staffing",
    desc: "Full-time hires screened for skills, culture, and long-term fit — from junior engineers to leadership roles across IT and digital functions.",
  },
  {
    title: "Contract & Contract-to-Hire",
    desc: "Flexible talent for projects, peak seasons, and cover requirements — with a proven path to convert the best contractors to permanent roles.",
  },
  {
    title: "Recruitment Process Outsourcing",
    desc: "We run your end-to-end hiring engine — sourcing, screening, coordination, and offer management — so your team stays focused on delivery.",
  },
];

/* Our Strategic Advantage — 3 technology cards, same Hover-Reveal card UI as How We Deliver */
function StaffingCards() {
  return (
    <div className="wr-web-build-grid cards-3" aria-label="Strategic staffing options">
      {STAFFING_CARDS.map((card) => (
        <article className="wr-web-build-card" key={card.title}>
          <span className="wr-web-card-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function StrategicStaffing() {
  return (
    <div className="wr-web-container wr-staffing-container">
      <ServiceHero
        id="strategic-staffing"
        eyebrow="OUR SERVICES — STRATEGIC STAFFING SOLUTIONS"
        title="Talent That Fits Your Roadmap"
        tagline="The right people, placed right"
        desc="Strategic staffing solutions that go beyond filling vacancies — we align every hire with your short and long-term business objectives, with screening run by working technologists."
      />
      <div className="wr-page-line" />
      {/* SECTION 1 (part 2): 3 staffing solution cards (old-website content) */}
      <section className="wr-sec wr-full-section wr-web-section" style={{ paddingTop: 0 }}>
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Strategic Staffing Solutions We Offer</h2>
          <p className="wr-sub wr-sub-wide">Flexible engagement models that scale with your team and your roadmap.</p>
        </div>
        <StaffingCards />
      </section>
      <div className="wr-page-line" />
      {/* SECTION 2: Our Strategic Advantage */}
      <section className="wr-sec wr-full-section wr-web-section wr-staffing-advantage">
        <div className="wr-section-header-block">
          <p className="wr-eyebrow">WHY WINR</p>
          <h2 className="wr-large-heading">Our Strategic Advantage</h2>
          <p className="wr-sub wr-sub-wide">
            Unlike conventional recruitment firms, WINR leverages deep technical understanding gained
            from years of R&amp;D and technology consulting. This unique background enables us to assess
            candidates with unprecedented accuracy, understand complex technical requirements, and
            implement data-driven hiring strategies that deliver sustainable results.
          </p>
        </div>
      </section>
    </div>
  );
}

/* Nav "Strategic Staffing Solutions" points at #/services/training */
export function Training() { return <StrategicStaffing />; }
