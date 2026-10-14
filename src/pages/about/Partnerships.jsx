import { useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";
import techImg from "../../assets/images/tech_platform-removebg.png";
import eduImg from "../../assets/images/edu_institu-removebg.png";
import assocImg from "../../assets/images/indus_associate-removebg.png";
import consultImg from "../../assets/images/consult_allies-removebg.png";
import vendorImg from "../../assets/images/vendor_net-removebg.png";
import rdImg from "../../assets/images/r-d_collab-removebg.png";

const CATEGORIES = [
  {
    title: "Technology Platforms",
    img: techImg,
    items: ["Cloud and software tools suited to current project needs", "Startup programs and credits explored where eligible", "Integration support from platform specialists when needed"],
  },
  {
    title: "Educational Institutions",
    img: eduImg,
    items: ["Project-based engagement with faculty or departments", "Internships and student projects where there is a mutual fit", "Guest sessions and practical technology workshops"],
  },
  {
    title: "Industry Associations",
    img: assocImg,
    items: ["Participation in relevant startup and technology communities", "Local industry events and peer networking", "Learning from public resources and professional forums"],
  },
  {
    title: "Consulting Alliances",
    img: consultImg,
    items: ["Independent specialists for focused client needs", "Small delivery partners for complementary project skills", "Domain advisors engaged for specific assignments"],
  },
  {
    title: "Vendor Network",
    img: vendorImg,
    items: ["Cloud and SaaS providers selected for each engagement", "Assessment and verification services used when appropriate", "Legal, accounting, and compliance professionals engaged as needed"],
  },
  {
    title: "R&D Collaborations",
    img: rdImg,
    items: ["Small prototypes to evaluate practical technology ideas", "Open-source communities and shared learning resources", "Incubator or accelerator programs considered when relevant"],
  },
];

const TEXT_LOGOS = [
  "WORKDAY",
  "NASSCOM",
  "IIT ALUMNI NETWORK",
  "AWS PLATFORMS",
  "AZURE CLOUD",
  "GOOGLE CLOUD",
  "SHRM GLOBAL",
  "MICROSOFT PARTNERS",
];

const SHOW_PARTNERS_WE_WORK_WITH = false;

function TextLogoTicker() {
  const tripled = [...TEXT_LOGOS, ...TEXT_LOGOS, ...TEXT_LOGOS];
  return (
    <div className="wr-css-ticker wr-text-logo-ticker" aria-label="Partners text logos">
      <div className="wr-css-ticker-track">
        {tripled.map((logo, i) => (
          <div key={i} className="wr-text-logo-item">
            <span className="wr-text-logo-badge">{logo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3D Rotating Product Stage Carousel Model (Framer Product Stage / ProductFocusCarousel model).
   Cards arranged on a 3D ring; clicking a card rotates the ring to focus it front-centre,
   displaying its content details below the stage. */
function ProductStage() {
  const [focus, setFocus] = useState(0);
  const n = CATEGORIES.length;
  const step = 360 / n;
  const centered = ((focus % n) + n) % n;

  return (
    <div className="wr-stage-wrapper" aria-label="Partnership Categories 3D Carousel">
      <div className="wr-stage">
        <div
          className="wr-stage-ring"
          style={{ transform: `rotateY(${-centered * step}deg)` }}
        >
          {CATEGORIES.map((c, i) => {
            const isActive = i === centered;
            return (
              <div
                key={c.title}
                className={`wr-stage-card ${isActive ? "active" : ""}`}
                style={{ transform: `rotateY(${i * step}deg) translateZ(340px)` }}
                onClick={() => setFocus(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setFocus(i);
                }}
              >
                <div className="wr-stage-card-imgwrap">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <span className="wr-stage-title">{c.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content details for the focused card — displayed below stage */}
      <div className="wr-stage-detail" key={centered}>
        <h3>{CATEGORIES[centered].title}</h3>
        <ul>
          {CATEGORIES[centered].items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Partnerships() {
  return (
    <div className="wr-partnerships-container">
      {/* SECTION 1: Partnerships Hero with buttons moved after the content */}
      <section className="wr-sec wr-full-hero" id="partnerships">
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Strategic Ecosystem</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">PARTNERSHIPS</p>
            <h1 className="wr-main-title">Alliances That Amplify Outcomes</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              A carefully curated ecosystem of technology, academic, and delivery partners that make our clients faster and more competitive in their markets.
            </p>
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 2: Partnership Categories 3D Stage Carousel */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Partnership Categories</h2>
          <p className="wr-sub wr-sub-wide">
            As a growing startup, we collaborate selectively with institutions, specialists, and technology providers—starting with practical, project-sized opportunities and growing relationships where there is a clear mutual fit.
          </p>
        </div>

        <ProductStage />
      </section>

      {SHOW_PARTNERS_WE_WORK_WITH && (
        <>
          <div className="wr-page-line" />
          <section className="wr-sec wr-full-section wr-partners-bottom-sec">
            <div className="wr-section-header-block">
              <h2 className="wr-large-heading">Partners We Work With</h2>
              <p className="wr-sub">
                Strategic alliances and platform ecosystems driving technical acceleration across industries.
              </p>
            </div>
            <TextLogoTicker />
          </section>
        </>
      )}
    </div>
  );
}
