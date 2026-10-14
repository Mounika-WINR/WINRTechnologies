/* Industries.jsx — consolidated single-page Industries view.
   Five sections: Intro → Six Industry Cards → Challenges → How We Deliver → Contact.
   Reuses AccordionGallery + HoverRevealCards models from TechnologyIT / IndustryPages.
   Uses existing CSS variables and class patterns from index.css. */

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../../components/ui/Modal.jsx";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

/* ─── IMAGES ─────────────────────────────────────────────────────────────── */
import techImg        from "../../assets/images/techandit.jpg";
import telecomImg     from "../../assets/images/telecom.jpg";
import bankImg        from "../../assets/images/BandF.jpg";
import healthImg      from "../../assets/images/healthandLS.jpg";
import mfgImg         from "../../assets/images/Manufacturing.jpg";
import profImg        from "../../assets/images/proffessionalsector.jpg";

/* ─── INLINE SVG ICONS (reused from IndustryPages.jsx / TechnologyIT.jsx) ── */
function Icon({ type }) {
  const p = {
    width: "28", height: "28", viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (type) {
    case "search-x":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      );
    case "clock-fast":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
          <line x1="2" y1="6" x2="6" y2="6" />
          <line x1="2" y1="10" x2="4" y2="10" />
        </svg>
      );
    case "badge-check":
      return (
        <svg {...p}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "scale-up":
      return (
        <svg {...p}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const INDUSTRIES = [
  {
    id: "technology-it",
    name: "Technology & IT",
    desc: "Engineering-led hiring for AI/ML, cloud architecture, DevOps, and full-stack teams — assessed by working engineers.",
    img: techImg,
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    desc: "Sector-fluent talent for 5G rollouts, core network transformations, OSS/BSS modernisation, and edge deployments.",
    img: telecomImg,
  },
  {
    id: "banking-financial-services",
    name: "Banking & Financial Services",
    desc: "Compliance-first hiring for core banking, fintech product teams, payments, and risk — with background verification built in.",
    img: bankImg,
  },
  {
    id: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    desc: "Care-grade talent for clinical operations, digital health, R&D, and regulatory affairs where quality is non-negotiable.",
    img: healthImg,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    desc: "Operations, automation, IIoT, and supply-chain talent for manufacturers modernising from the shop floor up.",
    img: mfgImg,
  },
  {
    id: "professional-services",
    name: "Professional Services",
    desc: "Billable-ready consulting, legal, and audit talent — placed to deliver engagement value from week one.",
    img: profImg,
  },
];

const CHALLENGES = [
  {
    icon: "search-x",
    title: "Finding the Right Skills",
    desc: "Growing teams may need specialist developers or experienced industry talent without a large hiring function. We help clarify role needs, identify suitable candidates, and assess practical skills.",
  },
  {
    icon: "clock-fast",
    title: "Improving Manual Processes",
    desc: "Spreadsheets, disconnected tools, or older systems can make everyday work harder to manage. We help shape and build fit-for-purpose software that supports real team workflows.",
  },
  {
    icon: "badge-check",
    title: "Connecting Business Needs to Technology",
    desc: "It can be difficult to turn an operational challenge into a clear development plan. We work with stakeholders to define priorities, agree on a practical scope, and deliver in manageable stages.",
  },
  {
    icon: "scale-up",
    title: "Scaling Delivery Capacity",
    desc: "Project demand can change faster than a team can hire or build new capabilities. We can support delivery with additional talent, software development, or a combination suited to the agreed scope.",
  },
];

const STAGES = [
  {
    num: "01",
    title: "Discover",
    desc: "We learn about your business goals, current systems, team capabilities, and the industry context before recommending a development or staffing approach.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Together we set priorities, define a workable scope, and agree on the skills, milestones, and success measures needed for the engagement.",
  },
  {
    num: "03",
    title: "Deploy",
    desc: "We deliver software in reviewable increments, introduce relevant talent, or coordinate both so your team can provide feedback and stay aligned.",
  },
  {
    num: "04",
    title: "Measure",
    desc: "We review progress against the agreed outcomes, address feedback, and refine the solution or team support as your needs develop.",
  },
];

/* ─── ACCORDION GALLERY (Challenges — reuses wr-acc-card model) ──────────── */
function AccordionGallery({ items }) {
  const [active, setActive] = useState(0);
  return (
    <div className="wr-accordion-gallery" data-reveal-group aria-label="Challenges We Solve">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`wr-acc-card ind-challenge-card${i === active ? " open" : ""}`}
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

/* ─── HOVER REVEAL CARDS (How We Deliver — reuses wr-hr-card model) ─────── */
function HoverRevealCards({ stages }) {
  const [active, setActive] = useState(null);
  return (
    <div className="wr-hover-reveal-grid" data-reveal-group aria-label="How We Deliver">
      {stages.map((s, i) => (
        <div
          key={s.num}
          className={`wr-hr-card ind-deliver-card${active === i ? " is-open" : ""}`}
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

/* ─── INTRO CTA (GET IN TOUCH lives in section 1) ────────────────────────── */
function IntroActions() {
  return (
    <div className="ind-intro-actions">
      <a className="btn skew pri ind-cta-btn" href="#contact">
        <span>GET IN TOUCH</span>
      </a>
    </div>
  );
}

function MotionSendScene({ stage, reducedMotion }) {
  const stageLabel = {
    folding: "Folding your message",
    sealed: "Sealing your envelope",
    mailing: "Sending it on its way",
  }[stage];

  return (
    <motion.div
      className="ind-send-scene"
      role="status"
      aria-live="polite"
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 22 }}
    >
      <svg className="ind-mail-animation" viewBox="0 0 360 200" aria-hidden="true">
        <ellipse cx="185" cy="169" rx="118" ry="12" fill="rgba(11,28,51,.1)" />

        <g className={`ind-mailbox${stage === "mailing" ? " is-open" : ""}`}>
          <path d="M275 145v29h22v-29" fill="#263c5c" stroke="#0B1C33" strokeWidth="4" strokeLinejoin="round" />
          <path d="M263 173h46" stroke="#0B1C33" strokeWidth="6" strokeLinecap="round" />
          <path d="M222 104a22 22 0 0 1 22-22h67a22 22 0 0 1 22 22v41a13 13 0 0 1-13 13h-85a13 13 0 0 1-13-13z" fill="#31517d" stroke="#0B1C33" strokeWidth="4" />
          <path d="M228 107a16 16 0 0 1 16-16h67a16 16 0 0 1 16 16" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="4" strokeLinecap="round" />
          <rect x="236" y="104" width="81" height="39" rx="8" fill="#0B1C33" stroke="#8aa2c1" strokeWidth="2" />
          <path d="M243 111h67v25h-67z" fill="#142742" />
          <path d="M239 108h75" stroke="rgba(255,255,255,.28)" strokeWidth="2" strokeLinecap="round" />
          <motion.path
            d="M228 105a16 16 0 0 1 16-14h67a16 16 0 0 1 16 14v8h-99z"
            fill="#DE7829"
            stroke="#a84f12"
            strokeWidth="3"
            strokeLinejoin="round"
            animate={reducedMotion
              ? { y: 0, rotateX: 0 }
              : stage === "mailing"
                ? { y: -18, rotateX: -62 }
                : { y: 0, rotateX: 0 }}
            style={{ transformOrigin: "228px 105px", transformPerspective: 500 }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 18 }}
          />
          <path d="M314 126v-27" stroke="#DE7829" strokeWidth="5" strokeLinecap="round" />
          <path d="M313 98h24v12h-24z" rx="3" fill="#DE7829" stroke="#a84f12" strokeWidth="2" />
          <circle cx="250" cy="151" r="3" fill="#b8cce6" />
          <circle cx="305" cy="151" r="3" fill="#b8cce6" />
        </g>

        <motion.g
          className="ind-envelope"
          initial={{ x: -42, y: 26, scale: 0.82, rotate: -8, opacity: 0 }}
          animate={reducedMotion ? { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 } : stage === "mailing"
            ? { x: 150, y: -26, scale: 0.55, rotate: 13, opacity: 0 }
            : { x: 0, y: stage === "sealed" ? 0 : 12, scale: 1, rotate: 0, opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : stage === "mailing"
            ? { duration: 1.15, ease: [0.2, 0.8, 0.2, 1] }
            : { type: "spring", stiffness: 210, damping: 18 }}
        >
          <rect x="68" y="83" width="118" height="76" rx="9" fill="#fff" stroke="#b8cce6" strokeWidth="3" />
          <motion.path
            d={stage === "folding" ? "M71 87l56-44 56 44" : "M71 87l56 38 56-38"}
            fill={stage === "folding" ? "#e8f1fc" : "#d9e8fb"}
            stroke="#9cb7dc"
            strokeWidth="3"
            strokeLinejoin="round"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <path d="M72 155l42-36M182 155l-42-36" fill="none" stroke="#b8cce6" strokeWidth="3" />
          <motion.circle
            cx="127"
            cy="91"
            r="13"
            fill="#DE7829"
            stroke="#b85d18"
            strokeWidth="2"
            initial={false}
            animate={stage === "folding" ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            style={{ transformOrigin: "127px 91px" }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 18 }}
          />
          {stage !== "folding" && (
            <motion.path
              d="M122 91l4 4 7-8"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0 : 0.25 }}
            />
          )}
        </motion.g>
      </svg>
      <p className="ind-send-caption">{stageLabel}<span className="ind-send-dots" aria-hidden="true">...</span></p>
    </motion.div>
  );
}

function MotionThankYou({ reducedMotion }) {
  return (
    <motion.div
      className="ind-thankyou-scene"
      role="status"
      aria-live="polite"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
    >
      <motion.span
        className="ind-thankyou-seal"
        initial={reducedMotion ? false : { scale: 0, rotate: -35 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 17, delay: 0.12 }}
        aria-hidden="true"
      >
        ✓
      </motion.span>
      <motion.h3 initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.28 }}>
        Thanks for reaching out!
      </motion.h3>
      <motion.p initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.45 }}>
        We appreciate your interest in WINR Technologies.
      </motion.p>
    </motion.div>
  );
}

/* ─── POPUP FORM ─────────────────────────────────────────────────────────── */
function IndustryPopup({ industry, onClose }) {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", purpose: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [sendStage, setSendStage] = useState("folding");
  const reduceMotion = useReducedMotion();

  const submittingRef = useRef(false);

  useEffect(() => {
    if (status !== "pending") return undefined;
    const sealTimer = setTimeout(() => setSendStage("sealed"), 650);
    const mailTimer = setTimeout(() => setSendStage("mailing"), 1350);
    const completeTimer = setTimeout(() => setStatus("success"), 2550);
    return () => {
      clearTimeout(sealTimer);
      clearTimeout(mailTimer);
      clearTimeout(completeTimer);
    };
  }, [status]);

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email.";
    if (!fields.purpose.trim()) errs.purpose = "Purpose is required.";
    if (!fields.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleChange = (e) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((err) => { const n = { ...err }; delete n[e.target.name]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    submittingRef.current = true;
    setSendStage("folding");
    setStatus("pending");
  };

  const field = (name, label, type = "text", required = false) => (
    <div className="ind-form-field">
      <label htmlFor={`ind-form-${name}`} className="ind-form-label">
        {label}{required && <span className="ind-form-req" aria-hidden="true"> *</span>}
      </label>
      <input
        id={`ind-form-${name}`}
        type={type}
        name={name}
        value={fields[name]}
        onChange={handleChange}
        aria-required={required}
        aria-describedby={errors[name] ? `ind-err-${name}` : undefined}
        aria-invalid={!!errors[name]}
        className={`ind-form-input${errors[name] ? " has-error" : ""}`}
        disabled={status === "pending" || status === "success"}
        autoComplete={name === "email" ? "email" : name === "phone" ? "tel" : "off"}
        autoFocus={name === "name"}
      />
      {errors[name] && <p id={`ind-err-${name}`} className="ind-form-error" role="alert">{errors[name]}</p>}
    </div>
  );

  return (
    <Modal open onClose={onClose} title="Let’s Talk" className="ind-popup-modal">
      <div className="ind-popup-header">
          <p className="ind-popup-sub">Industry Context: {industry ? <strong>{industry.name}</strong> : "General"}</p>
          {industry && (
            <span className="ind-popup-chip" aria-hidden="true">{industry.name}</span>
          )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "pending" ? (
            <MotionSendScene key="sending" stage={sendStage} reducedMotion={reduceMotion} />
        ) : status === "success" ? (
            <MotionThankYou key="thank-you" reducedMotion={reduceMotion} />
        ) : (
        <motion.form
          key="form"
          className="ind-popup-form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            scaleY: 0.08,
            scaleX: 0.88,
            rotateX: 72,
            y: -32,
            transition: { duration: 0.58, ease: [0.7, 0, 0.84, 0] },
          }}
          style={{ transformOrigin: "top center" }}
        >
          <div className="ind-form-row">
            {field("name", "Name", "text", true)}
            {field("email", "Email", "email", true)}
          </div>
          <div className="ind-form-row">
            {field("phone", "Phone No", "tel", false)}
            {/* Purpose — plain text input, not prefilled */}
            <div className="ind-form-field">
              <label htmlFor="ind-form-purpose" className="ind-form-label">
                Purpose <span className="ind-form-req" aria-hidden="true">*</span>
              </label>
              <input
                id="ind-form-purpose"
                type="text"
                name="purpose"
                value={fields.purpose}
                onChange={handleChange}
                placeholder="Describe what you need"
                aria-required={true}
                aria-describedby={errors.purpose ? "ind-err-purpose" : undefined}
                aria-invalid={!!errors.purpose}
                className={`ind-form-input${errors.purpose ? " has-error" : ""}`}
                disabled={status === "pending" || status === "success"}
              />
              {errors.purpose && <p id="ind-err-purpose" className="ind-form-error" role="alert">{errors.purpose}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="ind-form-field">
            <label htmlFor="ind-form-message" className="ind-form-label">
              Message <span className="ind-form-req" aria-hidden="true">*</span>
            </label>
            <textarea
              id="ind-form-message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              rows={4}
              aria-required={true}
              aria-describedby={errors.message ? "ind-err-message" : undefined}
              aria-invalid={!!errors.message}
              className={`ind-form-input ind-form-textarea${errors.message ? " has-error" : ""}`}
              disabled={status === "pending" || status === "success"}
            />
            {errors.message && <p id="ind-err-message" className="ind-form-error" role="alert">{errors.message}</p>}
          </div>

            <div className="ind-submit-wrap">
              <button
                type="submit"
                className="ind-submit-btn"
                aria-busy={false}
              >
                <span className="ind-submit-label">Send Message</span>
                <span className="ind-submit-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Screen-reader status for the confirmation */}
            <p className="ind-submit-live" role="status" aria-live="polite">
              {status === "success"
                ? "Thank you for your time. Our team will review your details and get back to you soon."
                : ""}
            </p>
        </motion.form>
        )}
      </AnimatePresence>
    </Modal>
  );
}

/* ─── DRIFT CARD (Framer Drift-Cards model: 3D tilt toward pointer + a
      staggered spring "pop" of the neighboring cards on hover) ───────────── */
function DriftCard({ ind, isActive, isFocused, offset, onOpen }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const btnRef = useRef(null);

  /* Pointer-driven rotation */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 22, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [9, -9]);
  const bgScale = useTransform(sx, [0, 1], [1.04, 1.12]);
  const glareX = useTransform(sx, (v) => `${v * 100}%`);
  const glareY = useTransform(sy, (v) => `${v * 100}%`);

  const handleMove = (e) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      id={`ind-card-${ind.id}`}
      tabIndex={-1}
      className={`ind-card${isActive ? " is-active is-hovered" : ""}${isFocused ? " is-identified" : ""}`}
      role="listitem"
      aria-hidden={!isActive}
      inert={!isActive}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      animate={reduce
        ? { x: offset * 90, y: Math.abs(offset) ? 10 : 0, scale: offset === 0 ? 1 : 0.92, opacity: Math.abs(offset) <= 1 ? 1 : 0, zIndex: 6 - Math.abs(offset) }
        : {
          x: offset * 112,
          y: offset === 0 ? 0 : 12 + Math.min(Math.abs(offset), 2) * 6,
          scale: offset === 0 ? 1 : Math.max(0.78, 0.94 - Math.abs(offset) * 0.06),
          rotateZ: offset === 0 ? 0 : offset * 3,
          opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.86 : Math.abs(offset) === 2 ? 0.48 : 0,
          zIndex: 6 - Math.abs(offset),
        }}
      transition={{ type: "spring", stiffness: 230, damping: 25, mass: 0.8 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.div
        className="ind-card-bg"
        style={{ backgroundImage: `url(${ind.img})`, scale: reduce ? 1 : bgScale }}
        aria-hidden="true"
      />
      <div className="ind-card-overlay" aria-hidden="true" />
      {!reduce && (
        <motion.div
          className="ind-card-glare"
          style={{
            background: useMotionTemplate`radial-gradient(320px circle at ${glareX} ${glareY}, rgba(255,255,255,.30), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="ind-card-content">
        <h3 className="ind-card-name">{ind.name}</h3>
        <p className="ind-card-desc">{ind.desc}</p>
        <button
          ref={btnRef}
          className="ind-card-btn"
          onClick={() => onOpen(ind, btnRef.current)}
          aria-label={`Let's Talk about ${ind.name}`}
        >
          Let's Talk
        </button>
      </div>
    </motion.article>
  );
}

function IndustryCards({ onLetsTalk, focusId }) {
  const reduce = useReducedMotion();
  const initialIndex = Math.max(0, INDUSTRIES.findIndex((item) => item.id === focusId));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const swipeStartRef = useRef(null);
  const next = useCallback(() => setActiveIndex((index) => (index + 1) % INDUSTRIES.length), []);
  const previous = useCallback(() => setActiveIndex((index) => (index - 1 + INDUSTRIES.length) % INDUSTRIES.length), []);

  useEffect(() => {
    if (reduce) return undefined;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, reduce]);

  const handlePointerDown = (event) => {
    swipeStartRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (swipeStartRef.current === null) return;
    const delta = event.clientX - swipeStartRef.current;
    swipeStartRef.current = null;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else previous();
    }
  };

  /* Looping stacked carousel: adjacent image cards drift behind the active card. */
  return (
    <div className="ind-carousel" role="region" aria-roledescription="carousel" aria-label="Industries we serve">
      {/* data-reveal-group only groups the stage + dots for a soft staggered
         arrival — the drift carousel's own motion is untouched. */}
      <div data-reveal-group>
        <motion.div
          className="ind-drift-stage"
          onPointerDownCapture={handlePointerDown}
          onPointerUpCapture={handlePointerUp}
          onPointerCancel={() => { swipeStartRef.current = null; }}
        >
          {INDUSTRIES.map((ind, index) => {
            const offset = ((index - activeIndex + INDUSTRIES.length / 2 + INDUSTRIES.length) % INDUSTRIES.length) - INDUSTRIES.length / 2;
            return (
              <DriftCard
                key={ind.id}
                ind={ind}
                isActive={index === activeIndex}
                isFocused={focusId === ind.id}
                offset={offset}
                onOpen={onLetsTalk}
              />
            );
          })}
        </motion.div>
        <div className="ind-carousel-controls">
          <div className="ind-carousel-dots" role="group" aria-label="Choose an industry">
            {INDUSTRIES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`ind-carousel-dot${index === activeIndex ? " is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export function Industries({ focusId }) {
  const [popup, setPopup] = useState(null); // { industry, triggerEl }

  /* Always land at the top of the page when Industries opens (e.g. from the
     "Who We Are" page) — the carousel card for focusId is only pre-selected,
     never scrolled to. */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [focusId]);

  const triggerRef = useRef(null);

  const openPopup = (industry, triggerEl) => {
    triggerRef.current = triggerEl;
    setPopup({ industry });
  };

  const closePopup = () => {
    setPopup(null);
    /* Return focus to triggering button */
    setTimeout(() => triggerRef.current?.focus(), 50);
  };

  return (
    <>
    <div className="wr-tech-it-container ind-page-container">

      {/* ── SECTION 1: INTRO ─────────────────────────────────────────── */}
      <section className="wr-sec wr-full-hero ind-intro-sec" id="industries">
        <div className="wr-hero split ind-intro-split">
          <div className="wr-hero-left ind-intro-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Specialist talent across every sector we serve</p>
          </div>
          <div className="wr-about-right ind-intro-right">
            <p className="wr-eyebrow">WINR TECHNOLOGIES — INDUSTRIES</p>
            <h1 className="wr-main-title">Industries We Serve</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              WINR places specialist talent across six sectors — Technology &amp; IT, Telecommunications,
              Banking &amp; Financial Services, Healthcare &amp; Life Sciences, Manufacturing, and Professional
              Services. Each engagement is led by consultants with real domain experience, not generalist
              recruiters working from job descriptions alone.
            </p>
            <IntroActions />
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      {/* ── SECTION 2: SIX INDUSTRY CARDS ────────────────────────────── */}
      <section className="wr-sec wr-full-section ind-cards-sec" id="industries-cards">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Six Industries. One Standard.</h2>
          <p className="wr-sub wr-sub-wide">
            Deep sector fluency means every shortlist reflects real domain understanding — not keyword-matched CVs.
          </p>
        </div>
        <IndustryCards key={focusId ?? "all-industries"} onLetsTalk={openPopup} focusId={focusId} />
      </section>

      <div className="wr-page-line" />

      {/* ── SECTION 3: CHALLENGES WE SOLVE ───────────────────────────── */}
      <section className="wr-sec wr-full-section ind-challenges-sec" id="industries-challenges">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">Challenges We Solve</h2>
          <p className="wr-sub wr-sub-wide">
            From finding the right people to improving business software, we help teams address practical delivery and technology challenges across the industries we serve.
          </p>
        </div>
        <AccordionGallery items={CHALLENGES} />
      </section>

      <div className="wr-page-line" />

      {/* ── SECTION 4: HOW WE DELIVER ─────────────────────────────────── */}
      <section className="wr-sec wr-full-section ind-deliver-sec" id="industries-deliver">
        <div className="wr-section-header-block">
          <h2 className="wr-large-heading">How We Deliver</h2>
          <p className="wr-sub">
            We combine software development and staffing through a practical four-step process, shaped around your priorities, team, and industry context.
          </p>
        </div>
        <HoverRevealCards stages={STAGES} />
      </section>
    </div>
    {createPortal(
      <AnimatePresence>
        {popup && <IndustryPopup industry={popup.industry} onClose={closePopup} />}
      </AnimatePresence>,
      document.body,
    )}
    </>
  );
}
