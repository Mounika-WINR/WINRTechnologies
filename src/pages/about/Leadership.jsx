import { useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";
import memberImg from "../../assets/images/ledership.jpg";

/* Showcase Card Component (Framer Showcase Card / CMS Showcase Card model).
   Cards maintain current dimensions; dropdown click expands only the targeted card
   without resizing or stretching neighboring cards. */
const EXECUTIVES = [
  {
    id: "exec-1",
    name: "Awinash Sharma",
    position: "Founder & Managing Director",
    desc: "Oversees company strategy, major enterprise client relationships, and business growth directions across India and overseas.",
  },
  {
    id: "exec-2",
    name: "Bramar Sankar",
    position: "Chief Finance Officer",
    desc: "Oversees financial planning, budgeting, and financial operations to support the company’s sustainable growth.",
  },
  {
    id: "exec-3",
    name: "Naga Sravani Miriyala",
    position: "VP - Human Resource, Delivery & Operations",
    desc: "Leads people operations and delivery, supporting teams and ensuring reliable execution for clients.",
  },
];

const SHOW_ADVISORS = false;

const ADVISORS = [
  {
    id: "adv-1",
    name: "Dr. Arvind Rao",
    position: "Chief Technology Advisor",
    desc: "Provides strategic guidance on enterprise software evolution, AI capabilities, security standards, and platform scaling.",
    img: memberImg,
  },
  {
    id: "adv-2",
    name: "Siddharth Mehta",
    position: "Strategic Business Advisor",
    desc: "Advises the board on venture partnerships, market expansion, organizational growth, and corporate governance.",
    img: memberImg,
  },
];

function ShowcaseCard({ member, badgeText }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`wr-cms-card ${open ? "is-expanded" : ""}`}>
      <div className="wr-cms-imgwrap">
        {member.img ? (
          <img src={member.img} alt={member.name} loading="lazy" />
        ) : (
          <div className="wr-cms-placeholder" aria-hidden="true">
            <svg viewBox="0 0 64 64" focusable="false">
              <circle cx="32" cy="22" r="12" />
              <path d="M10 57c0-12.2 9.8-22 22-22s22 9.8 22 22H10Z" />
            </svg>
          </div>
        )}
        <span className="wr-cms-badge">{badgeText}</span>
      </div>
      <div className="wr-cms-body">
        <div className="wr-cms-header">
          <div>
            <h3 className="wr-cms-name">{member.name}</h3>
            <p className="wr-cms-pos">{member.position}</p>
          </div>
          <button
            type="button"
            className="wr-cms-toggle"
            onClick={() => setOpen(!open)}
            aria-label={`Toggle info for ${member.name}`}
            aria-expanded={open}
          >
            <span className={`wr-cms-arrow ${open ? "up" : "down"}`}>{open ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* Dropdown expanded content */}
        {open && (
          <div className="wr-cms-details animate-fadeIn">
            <div className="wr-cms-divider" />
            <p className="wr-cms-desc">{member.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Leadership() {
  return (
    <div className="wr-leadership-container">
      {/* SECTION 1: Leadership Hero */}
      <section className="wr-sec wr-full-hero" id="leadership">
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Leadership &amp; Vision</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">LEADERSHIP</p>
            <h1 className="wr-main-title">The People Behind WINR</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              WINR Technologies is led by experienced engineering leaders and product strategists who have built complex systems, managed global deliveries, and trained high-performing technology teams. Our executives work directly with clients from discovery to deployment.
            </p>
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 2: Executive Leadership (Distinct Section) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Executive Leadership</h2>
          <p className="wr-sub wr-sub-wide">
            Hands-on executive team shaping technical strategy, engineering standards, and organization growth.
          </p>
        </div>

        <div className="wr-cms-grid wr-leadership-executives" data-reveal-group>
          {EXECUTIVES.map((member) => (
            <ShowcaseCard key={member.id} member={member} badgeText="Executive" />
          ))}
        </div>
      </section>

      {SHOW_ADVISORS && (
        <>
          <div className="wr-page-line" />
          <section className="wr-sec wr-full-section">
            <div className="wr-section-header-block">
              <h2 className="wr-large-heading">Advisors</h2>
              <p className="wr-sub wr-sub-wide">
                Industry veterans and subject matter experts providing strategic governance and technology guidance.
              </p>
            </div>
            <div className="wr-cms-grid wr-cms-grid-2" data-reveal-group>
              {ADVISORS.map((member) => (
                <ShowcaseCard key={member.id} member={member} badgeText="Advisor" />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
