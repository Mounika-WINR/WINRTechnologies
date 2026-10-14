import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";
import evalutionImg from "../../assets/images/evalution-removebg.png";
import coreImg from "../../assets/images/core-removebg.png";
import innovationImg from "../../assets/images/innovation-removebg.png";

const INDUSTRIES = [
  "Technology & IT",
  "Telecommunications",
  "Banking & Financial Services",
  "Healthcare & Life Sciences",
  "Manufacturing",
  "Professional Services",
  "E-Commerce & Retail",
  "Education & EdTech",
];

/* Pure CSS infinite scrolling ticker — guaranteed never to stop, freeze, or NaN-lag */
function InfiniteIndustryTicker() {
  const doubled = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];
  return (
    <div className="wr-css-ticker" aria-label="Industries we serve">
      <div className="wr-css-ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="wr-css-ticker-item">
            <span className="wr-css-ticker-word">{item}</span>
            <span className="wr-css-ticker-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Our Evaluation Story",
    img: evalutionImg,
    desc: "We start every engagement by understanding where you are — business goals, current systems, and skill gaps — then shape a roadmap with clear, measurable milestones.",
  },
  {
    title: "Core Competencies",
    img: coreImg,
    desc: "Web, mobile apps, custom software, and professional training — deep, hands-on expertise across the full delivery lifecycle from a focused senior team.",
  },
  {
    title: "Innovation Driven",
    img: innovationImg,
    desc: "Modern stack, clean architecture, and continuous improvement — we bring fresh, practical ideas that keep your product ahead, not just online.",
  },
];

const VALUES = [
  {
    title: "Measurable Outcomes",
    desc: "Every engagement is scoped around business results you can measure — not just deliverables or lines of code.",
  },
  {
    title: "Transparent Delivery",
    desc: "Clear scope, realistic timelines, and honest technical recommendations at every single step of execution.",
  },
  {
    title: "End-to-End Craft",
    desc: "One focused team from idea to launch — design, engineering, cloud deployment, and team enablement.",
  },
];

/* Pinned note Service-Card-UI (Framer Service-Card-UI-L8FDiL model, exact):
   white pinned card + number + light-blue box with TITLE then CONTENT (!important) */
function PinnedValues({ values }) {
  return (
    <div className="wr-pinned-grid" data-reveal-group aria-label="Our Values pinned cards">
      {values.map((v, i) => (
        <div className="wr-pinned-card" key={v.title}>
          <span className="wr-pinned-pin" aria-hidden="true">
            <span className="wr-pinned-pin-head" />
            <span className="wr-pinned-pin-shadow" />
          </span>
          <span className="wr-pinned-num">{String(i + 1).padStart(2, "0")}</span>
          <div className="wr-pinned-body">
            <h3 className="wr-pinned-title">{v.title}</h3>
            <p className="wr-pinned-desc">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WhoWeAre() {
  return (
    <div className="wr-whoweare-container">
      {/* SECTION 1: Full-page Hero View */}
      <section className="wr-sec wr-full-hero" id="who-we-are">
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">WE Build What Moves YOU Forward</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">ABOUT WINR</p>
            <h1 className="wr-main-title">Who We Are</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              WINR Technologies is an end-to-end IT services and solution provider based in Kakinada,
              Andhra Pradesh. We build web applications, mobile apps, and custom enterprise software.
              From SMEs and startups to educational institutions, we empower organizations to launch faster,
              scale smarter, and operate efficiently with custom-engineered technology.
            </p>
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 2: Competency Cards + Industry Leadership & Recognition + Infinite Marquee */}
      <section className="wr-sec wr-full-section">
        <div className="wr-grid wr-grid-3" data-reveal-group>
          {CARDS.map((c) => (
            <div className="wr-img-card" key={c.title}>
              <div className="wr-img-card-imgwrap">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className="wr-img-card-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Added extra space above Industry Leadership & Recognition heading */}
        <div className="wr-section-header-block wr-header-spaced">
          <h2 className="wr-large-heading">Industry Leadership &amp; Recognition</h2>
          <p className="wr-sub wr-sub-wide">
            Our expertise spans eight key sectors, delivering domain-specific solutions that solve critical operational challenges while incorporating cross-industry best practices.
          </p>
        </div>

        <InfiniteIndustryTicker />
      </section>

      <div className="wr-page-line" />

      {/* SECTION 3: Our Values (Matched Card Styling, No VALUE text badge) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Our Values</h2>
          <p className="wr-sub">
            The principles that guide our technical engineering standards, customer relationships, and company culture.
          </p>
        </div>

        <PinnedValues values={VALUES} />
      </section>
    </div>
  );
}
