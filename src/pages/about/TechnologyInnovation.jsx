import { useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

import coreImg from "../../assets/images/core-removebg.png";
import aiImg from "../../assets/images/applied-ai-removebg.png";
import cloudImg from "../../assets/images/cloudscale-removebg.png";
import analyticsImg from "../../assets/images/Analysis-removebg.png";
import visionImg from "../../assets/images/computer-v-removebg.png";
import blockchainImg from "../../assets/images/blockchain-removebg.png";
import quantumImg from "../../assets/images/quantum-removebg.png";
import evalutionImg from "../../assets/images/evalution-removebg.png";

import discoverImg from "../../assets/images/lab-innovate-removebg.png";
import aiRoadImg from "../../assets/images/AI-removebg.png";
import automationImg from "../../assets/images/Automation-removebg.png";
import enterpriseImg from "../../assets/images/enterprise-removebg.png";

/* Capability topics; the visible subset is numbered in display order. */
const CAPABILITIES = [
  {
    id: 0,
    title: "Web & Software Engineering",
    img: coreImg,
    desc: "Production-grade web apps, cloud portals, and custom enterprise software built on modern, maintainable technology stacks.",
  },
  {
    id: 1,
    title: "Applied AI & Machine Learning",
    img: aiImg,
    desc: "Practical AI — document intelligence, chat assistants, and prediction models embedded into daily business workflows.",
  },
  {
    id: 2,
    title: "Cloud Scale & DevOps",
    img: cloudImg,
    desc: "Cloud-native architectures, CI/CD pipelines, containerization, and infrastructure-as-code for zero-downtime delivery.",
  },
  {
    id: 3,
    title: "Data & Business Intelligence",
    img: analyticsImg,
    desc: "Dashboards, ETL pipelines, and reporting systems that turn raw corporate data into decisions you can act on.",
  },
  {
    id: 4,
    title: "Computer Vision & Automation",
    img: visionImg,
    desc: "Automated visual inspection, document OCR, object detection, and smart monitoring systems that streamline operations.",
  },
  {
    id: 5,
    title: "Blockchain & Security",
    img: blockchainImg,
    desc: "Decentralized ledgers, smart contracts, cryptographic security, and audit-ready data verification layers.",
  },
  {
    id: 6,
    title: "Quantum & Next-Gen Tech",
    img: quantumImg,
    desc: "Exploring high-performance algorithms, cryptography readiness, and next-generation computational frameworks.",
  },
  {
    id: 7,
    title: "Continuous Digital Evolution",
    img: evalutionImg,
    desc: "Iterative upgrades, legacy modernization, refactoring, and continuous feature deployment for long-term resilience.",
  },
];

/* 4 Topics for "Platform Roadmap" (Collapsing Cards / Steps Card model) */
const ROADMAP = [
  {
    number: "01",
    title: "Discover",
    img: discoverImg,
    desc: "We map your goals, systems, and constraints — and define what success looks like with measurable outcomes.",
  },
  {
    number: "02",
    title: "Design",
    img: aiRoadImg,
    desc: "Architecture, UX design, and delivery plan shaped around measurable business results and scalable infrastructure.",
  },
  {
    number: "03",
    title: "Build",
    img: automationImg,
    desc: "Agile sprints with working software you can see, test, and shape from week one with continuous integration.",
  },
  {
    number: "04",
    title: "Scale",
    img: enterpriseImg,
    desc: "Production launch, team training, cloud monitoring, and continuous improvement as your organization grows.",
  },
];

const HIDDEN_CAPABILITY_IDS = new Set([1, 4, 5, 6]);
const VISIBLE_CAPABILITIES = CAPABILITIES.filter(({ id }) => !HIDDEN_CAPABILITY_IDS.has(id));

/* Framer Organic Carousel / Gallery Component model for capability topics */
function OrganicGallery() {
  const [focus, setFocus] = useState(0);

  return (
    <div className="wr-organic" aria-label="Current What We Build On capabilities">
      <div className="wr-organic-row" data-reveal-group>
        {VISIBLE_CAPABILITIES.map((c, i) => (
          <button
            key={c.title}
            type="button"
            className={`wr-organic-pill ${i === focus ? "active" : ""}`}
            onClick={() => setFocus(i)}
            style={{ backgroundImage: `url(${c.img})` }}
            aria-label={c.title}
          />
        ))}
      </div>

      <div className="wr-organic-detail" key={focus}>
        <div className="wr-organic-badge">
          TOPIC {String(focus + 1).padStart(2, "0")} OF {String(VISIBLE_CAPABILITIES.length).padStart(2, "0")}
        </div>
        <h3>{VISIBLE_CAPABILITIES[focus].title}</h3>
        <p>{VISIBLE_CAPABILITIES[focus].desc}</p>
      </div>
    </div>
  );
}

/* Framer Collapsing Cards / Steps Card Component model for 4 roadmap topics */
function CollapsingCards() {
  const [active, setActive] = useState(0);

  return (
    <div className="wr-collapse-wrapper" aria-label="Platform Roadmap 4 steps collapsing cards">
      <div className="wr-collapse" data-reveal-group>
        {ROADMAP.map((r, i) => (
          <div
            key={r.number}
            className={`wr-collapse-card ${i === active ? "open" : ""}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <div className="wr-collapse-card-bg">
              <img src={r.img} alt={r.title} loading="lazy" />
            </div>
            <div className="wr-collapse-inner">
              <span className="wr-collapse-num">STEP {r.number}</span>
              <strong className="wr-collapse-title">{r.title}</strong>
              <p className="wr-collapse-desc">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechnologyInnovation() {
  return (
    <div className="wr-tech-container">
      {/* SECTION 1: Technology & Innovation Hero */}
      <section className="wr-sec wr-full-hero" id="technology">
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Engineering Excellence</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">TECHNOLOGY &amp; INNOVATION</p>
            <h1 className="wr-main-title">Technology That Compounds</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              We make architectural decisions that compound over time — modern platforms, clean codebases, and robust automation that increase in value with every release.
            </p>
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* SECTION 2: What We Build On (8 Topics Organic Gallery) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">What We Build On</h2>
          <p className="wr-sub wr-sub-wide">
            Explore selected technology areas that support our product engineering and delivery work. Click a card to see its capabilities.
          </p>
        </div>

        <OrganicGallery />
      </section>

      <div className="wr-page-line" />

      {/* SECTION 3: Platform Roadmap (4 Topics Collapsing Cards) */}
      <section className="wr-sec wr-full-section">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Platform Roadmap</h2>
          <p className="wr-sub">
            Our structured 4-stage delivery methodology ensures consistent quality from discovery to scale.
          </p>
        </div>

        <CollapsingCards />
      </section>
    </div>
  );
}
