import { useEffect, useRef, useState } from "react";
import "../styles/bg-compare.css";

/* ==========================================================================
   COMPONENT COMPARISON — REFERENCE ONLY (not part of the site).
   Route: /#/__bg-compare

   Renders the REAL Home page content over a faithful visual replica of each of
   the four Framer Marketplace background components, so the difference can be
   shown to a client side by side.

   These are replicas of each component's *look* (their Framer .fram modules
   cannot run outside Framer), built from each marketplace page's own
   description: colours, palette, mood and motion.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CHROMA SHADER — paid ($10). Flowing strands / sculpted waves, 3-colour
   palette (presets incl. "Solar Ember", "Cobalt Paper"). Built for dark hero
   sections. Replica: dark base + glowing flowing strands.
   -------------------------------------------------------------------------- */
function ChromaShader({ t }) {
  return (
    <div className="cmp-layer cmp-chroma">
      <svg className="cmp-chroma-strands" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="chr1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A29FF" />
            <stop offset="50%" stopColor="#FF94B4" />
            <stop offset="100%" stopColor="#FF3232" />
          </linearGradient>
          <linearGradient id="chr2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF3232" />
            <stop offset="60%" stopColor="#7A2BFF" />
            <stop offset="100%" stopColor="#3A29FF" />
          </linearGradient>
          <filter id="chrGlow"><feGaussianBlur stdDeviation="9" /></filter>
        </defs>
        <g filter="url(#chrGlow)" opacity="0.9" style={{ mixBlendMode: "screen" }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              className="cmp-strand"
              d={`M-50 ${60 + i * 46} C 260 ${i * 30 - 120}, 620 ${420 - i * 22}, 1250 ${120 + i * 40}`}
              fill="none"
              stroke={i % 2 ? "url(#chr2)" : "url(#chr1)"}
              strokeWidth={1.4 + (i % 3) * 0.9}
              style={{ animationDelay: `${-i * 0.55}s`, animationDuration: `${7 + (i % 5) * 1.4}s` }}
            />
          ))}
        </g>
      </svg>
      <span className="cmp-caption-badge">t = {t}</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   2. AURA NIGHT SKY — free. "Night sky": dark backdrop, star field, drifting
   stripes / rainbow palettes. Night-themed by name and by design.
   Replica: near-black navy + stars + soft aurora stripes.
   -------------------------------------------------------------------------- */
function AuraNightSky({ t }) {
  return (
    <div className="cmp-layer cmp-night">
      <div className="cmp-stars cmp-stars-a" aria-hidden="true" />
      <div className="cmp-stars cmp-stars-b" aria-hidden="true" />
      <div className="cmp-night-stripes" aria-hidden="true">
        <span style={{ animationDelay: "-1s" }} />
        <span style={{ animationDelay: "-3.5s" }} />
        <span style={{ animationDelay: "-6s" }} />
      </div>
      <div className="cmp-moon" aria-hidden="true" />
      <span className="cmp-caption-badge">t = {t}</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   3. AURORA FLOW — free. "Full-screen WebGL animated background of soft glowing
   ribbons... a dynamic, DARK-MOODY hero or section background." Two ribbon
   colours + background colour, cursor-reactive.
   Replica: dark base + two glowing ribbons bending toward the cursor.
   -------------------------------------------------------------------------- */
function AuroraFlow({ t, cursor }) {
  const shift = (cursor.x - 0.5) * 90;
  const shiftY = (cursor.y - 0.5) * 60;
  return (
    <div className="cmp-layer cmp-flow">
      <svg className="cmp-flow-svg" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="af1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0057A8" />
            <stop offset="100%" stopColor="#DE7829" />
          </linearGradient>
          <linearGradient id="af2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#DE7829" />
            <stop offset="100%" stopColor="#0057A8" />
          </linearGradient>
          <filter id="afGlow"><feGaussianBlur stdDeviation="26" /></filter>
        </defs>
        <g filter="url(#afGlow)">
          <path
            className="cmp-ribbon"
            style={{ transform: `translate(${shift}px, ${shiftY}px)`, animationDelay: "-1s" }}
            d="M-100 620 C 200 300, 520 700, 800 380 S 1150 180, 1350 340"
            fill="none" stroke="url(#af1)" strokeWidth="150" opacity="0.5"
          />
          <path
            className="cmp-ribbon"
            style={{ transform: `translate(${-shift * 0.7}px, ${-shiftY * 0.7}px)`, animationDelay: "-4s" }}
            d="M-100 260 C 260 560, 560 160, 900 520 S 1180 620, 1350 460"
            fill="none" stroke="url(#af2)" strokeWidth="130" opacity="0.42"
          />
        </g>
      </svg>
      <span className="cmp-caption-badge">t = {t}</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   4. SHADER BACKGROUNDS — "License Limited" (premium). Liquid-glass WebGL.
   Four 3-D shapes: Diagonal, Vertical, Corrugated, Sweeping Fold. Core /
   inner-band / edge-highlight colours. Heavier Three.js + GLSL render.
   Replica: liquid-glass diagonal folds with edge highlights.
   -------------------------------------------------------------------------- */
function ShaderBackgrounds({ t }) {
  return (
    <div className="cmp-layer cmp-shaderbg">
      <svg className="cmp-fold-svg" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sb1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8FB8FF" />
            <stop offset="45%" stopColor="#3C6BD8" />
            <stop offset="100%" stopColor="#0B1C33" />
          </linearGradient>
          <linearGradient id="sb2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFC08A" />
            <stop offset="55%" stopColor="#DE7829" />
            <stop offset="100%" stopColor="#7A3C12" />
          </linearGradient>
          <filter id="sbGloss"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i} className="cmp-fold" style={{ animationDelay: `${-i * 0.9}s` }}>
            <polygon
              points={`${-120 + i * 190},860 ${40 + i * 190},-60 ${210 + i * 190},-60 ${50 + i * 190},860`}
              fill={i % 2 ? "url(#sb2)" : "url(#sb1)"}
              opacity="0.55"
            />
            <polygon
              points={`${210 + i * 190},-60 ${232 + i * 190},-60 ${72 + i * 190},860 ${50 + i * 190},860`}
              fill="#ffffff" opacity="0.3" filter="url(#sbGloss)"
            />
          </g>
        ))}
      </svg>
      <div className="cmp-glass" aria-hidden="true" />
      <span className="cmp-caption-badge">t = {t}</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   5. SHIPPED — the WINR Aurora (what is actually on the site now).
   -------------------------------------------------------------------------- */
function WinrAurora({ t, cursor }) {
  const x = cursor.x * 100, y = cursor.y * 100;
  return (
    <div
      className="cmp-layer cmp-winr"
      style={{ "--cx": `${x}%`, "--cy": `${y}%`, "--tt": `${t}s` }}
    >
      <div className="cmp-winr-blob cmp-winr-blob-a" />
      <div className="cmp-winr-blob cmp-winr-blob-b" />
      <div className="cmp-winr-blob cmp-winr-blob-c" />
      <span className="cmp-caption-badge">t = {t}</span>
    </div>
  );
}

/* ==========================================================================
   The real Home content, rendered on top of whichever background is active.
   ========================================================================== */
const HOME = {
  eyebrow: "WINR TECHNOLOGIES PVT LTD",
  h1a: "IT Services & Digital",
  h1b: "Solutions That",
  h1c: "Power Business Growth",
  desc: "WINR Technologies builds websites, mobile apps, and custom software — and trains talent to use them. End-to-end IT services from a team with deep domain expertise and a focus on measurable outcomes.",
  tagline: "WE Build What Moves YOU Forward",
};

function HomeContent() {
  return (
    <div className="cmp-content">
      <div className="cmp-content-left">
        <div className="cmp-logo-ph">WINR</div>
        <p className="cmp-tagline">{HOME.tagline}</p>
      </div>
      <div className="cmp-content-right">
        <p className="cmp-eyebrow">{HOME.eyebrow}</p>
        <h1>{HOME.h1a}<br /><span>{HOME.h1b}</span><br />{HOME.h1c}</h1>
        <p className="cmp-desc">{HOME.desc}</p>
        <div className="cmp-btns">
          <span className="cmp-btn pri">GET FREE CONSULTATION</span>
          <span className="cmp-btn sec">EXPLORE OUR SERVICES</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
const VARIANTS = [
  {
    key: "chroma",
    n: 1,
    name: "Chroma Shader",
    cost: "PAID — $10",
    tag: "problem",
    Comp: ChromaShader,
    dark: true,
    why: [
      "Dark, neon, high-contrast — built for dark hero sections",
      "Presets are Electric Iris / Solar Ember / Ultraviolet, not brand blue+orange",
      "Colour cycling keeps changing — fights a fixed brand identity",
      "Body copy and white cards become unreadable on top of it",
    ],
  },
  {
    key: "night",
    n: 2,
    name: "Aura Night Sky",
    cost: "FREE",
    tag: "problem",
    Comp: AuraNightSky,
    dark: true,
    why: [
      "It is literally a night sky — near-black navy base by name and by design",
      "Star field reads as a night/space theme, not a B2B IT company",
      "Site is light (white background) — this forces a full dark redesign",
    ],
  },
  {
    key: "flow",
    n: 3,
    name: "Aurora Flow",
    cost: "FREE",
    tag: "close",
    Comp: AuroraFlow,
    dark: true,
    why: [
      "Closest of the four in mood — glowing ribbons, brand-tintable",
      "But it is explicitly a 'dark-moody hero' background",
      "Ribbon glow washes out text unless the whole site goes dark",
      "Framer .fram module — cannot run in this React + Vite app",
    ],
  },
  {
    key: "shaderbg",
    n: 4,
    name: "Shader Backgrounds",
    cost: "LICENSE LIMITED (premium)",
    tag: "problem",
    Comp: ShaderBackgrounds,
    dark: true,
    why: [
      "Liquid-glass 3-D folds — very heavy, competes with the content",
      "Hard geometric folds look like a portfolio/creative site, not IT services",
      "Bundled pack — you pay for 4 shapes to use one",
      "Framer .fram module — cannot run in this React + Vite app",
    ],
  },
  {
    key: "winr",
    n: 5,
    name: "WINR Aurora (shipped)",
    cost: "FREE — MIT, no licence",
    tag: "good",
    Comp: WinrAurora,
    dark: false,
    why: [
      "Locked to the exact brand blue #0057A8 + orange #DE7829",
      "Light base — every existing card, heading and paragraph stays readable",
      "Sits behind the content (z-index:-1) — nothing else had to change",
      "Runs natively in React + Vite — no Framer licence, no .fram module",
    ],
  },
];

export function BgCompare() {
  const [active, setActive] = useState(0);
  const [t, setT] = useState(0);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const startRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();
    let raf = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      setT(Math.round((now - startRef.current) / 1000));
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setCursor({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const v = VARIANTS[active];
  const Comp = v.Comp;

  return (
    <div className="cmp-root">
      <header className="cmp-bar">
        <strong>Background component comparison</strong>
        <span className="cmp-bar-sub">Home page content · same section · same viewport</span>
      </header>

      <div className="cmp-tabs" role="tablist">
        {VARIANTS.map((x, i) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={i === active}
            className={`cmp-tab cmp-tab--${x.tag}${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <b>{x.n}</b>
            <span className="cmp-tab-name">{x.name}</span>
            <span className="cmp-tab-cost">{x.cost}</span>
          </button>
        ))}
      </div>

      <div className="cmp-stage" onMouseMove={onMove}>
        <Comp t={t} cursor={cursor} />
        <div className={`cmp-content-wrap${v.dark ? " on-dark" : ""}`}>
          <HomeContent />
        </div>
        <div className="cmp-badge-top">{v.name}</div>
      </div>

      <div className="cmp-notes">
        <h2>
          {v.name}
          <span className={`cmp-pill cmp-pill--${v.tag}`}>
            {v.tag === "good" ? "RECOMMENDED" : v.tag === "close" ? "CLOSEST, STILL NOT SUITABLE" : "NOT SUITABLE"}
          </span>
        </h2>
        <ul>
          {v.why.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>

      <div className="cmp-foot">
        Reference only — this route is not part of the site. Screenshot each tab to share.
      </div>
    </div>
  );
}

export default BgCompare;
