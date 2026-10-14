import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ANIMATION_DURATION_MS = 2500;

export function MotionSubmitFeedback() {
  const [stage, setStage] = useState("folding");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const successTimer = setTimeout(() => setStage("success"), 0);
      return () => clearTimeout(successTimer);
    }

    const sealTimer = setTimeout(() => setStage("sealed"), 650);
    const mailTimer = setTimeout(() => setStage("mailing"), 1300);
    const successTimer = setTimeout(() => setStage("success"), ANIMATION_DURATION_MS);
    return () => {
      clearTimeout(sealTimer);
      clearTimeout(mailTimer);
      clearTimeout(successTimer);
    };
  }, [reduceMotion]);

  if (stage === "success") {
    return (
      <motion.div
        className="ind-thankyou-scene"
        role="status"
        aria-live="polite"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      >
        <motion.span
          className="ind-thankyou-seal"
          initial={reduceMotion ? false : { scale: 0, rotate: -35 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 17 }}
          aria-hidden="true"
        >
          ✓
        </motion.span>
        <h3>Thank you for your time.</h3>
        <p>We appreciate your interest in WINR Technologies.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="ind-send-scene"
      role="status"
      aria-live="polite"
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <svg className="ind-mail-animation" viewBox="0 0 360 200" aria-hidden="true">
        <ellipse cx="185" cy="169" rx="118" ry="12" fill="rgba(11,28,51,.1)" />
        <path d="M275 145v29h22v-29M263 173h46" fill="none" stroke="#263c5c" strokeWidth="6" strokeLinecap="round" />
        <rect x="222" y="82" width="111" height="76" rx="18" fill="#31517d" stroke="#0B1C33" strokeWidth="4" />
        <rect x="236" y="104" width="81" height="39" rx="8" fill="#0B1C33" stroke="#8aa2c1" strokeWidth="2" />
        <path d="M243 111h67v25h-67z" fill="#142742" />
        <motion.path
          d="M228 105a16 16 0 0 1 16-14h67a16 16 0 0 1 16 14v8h-99z"
          fill="#DE7829"
          stroke="#a84f12"
          strokeWidth="3"
          animate={stage === "mailing" ? { y: -18, rotateX: -62 } : { y: 0, rotateX: 0 }}
          style={{ transformOrigin: "228px 105px", transformPerspective: 500 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 18 }}
        />
        <motion.g
          initial={{ x: -42, y: 26, scale: 0.82, rotate: -8, opacity: 0 }}
          animate={stage === "mailing"
            ? { x: 150, y: -26, scale: 0.55, rotate: 13, opacity: 0 }
            : { x: 0, y: stage === "sealed" ? 0 : 12, scale: 1, rotate: 0, opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : stage === "mailing"
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
            transition={{ duration: 0.3 }}
          />
          <path d="M72 155l42-36M182 155l-42-36" fill="none" stroke="#b8cce6" strokeWidth="3" />
          {stage !== "folding" && <circle cx="127" cy="91" r="12" fill="#DE7829" />}
          {stage !== "folding" && (
            <path d="M122 91l4 4 7-8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </motion.g>
      </svg>
      <p className="ind-send-caption">
        {stage === "folding" ? "Preparing your message" : stage === "sealed" ? "Sealing your message" : "Thanks for reaching out"}
        <span className="ind-send-dots" aria-hidden="true">...</span>
      </p>
    </motion.div>
  );
}
