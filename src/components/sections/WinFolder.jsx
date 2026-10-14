import React, { useId, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SERVICE_CARDS } from "../../data/services.js";
import { ServiceCard } from "./FolderCards.jsx";

// 3. Folder shell = ORANGE (matches photo 2). Cards stay dark blue
// so they pop against the shell. Pass folder="light"/"dark" for old looks.
const LIGHT_FOLDER = "#9CC3E5";
const DARK_FOLDER = "#1E3A5F";
const ORANGE_FOLDER = "#F5851F";

export default function WinFolder({ cards = SERVICE_CARDS, startOpen = false, enableTilt = true, speed = 1, folder = "dark" }) {
  const [open, setOpen] = React.useState(startOpen);
  const panelId = useId();
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 140, damping: 18 });
  const onMove = (e) => {
    if (!enableTilt || reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const fan = open;
  const BLUE = folder === "dark" ? DARK_FOLDER : folder === "light" ? LIGHT_FOLDER : ORANGE_FOLDER;
  const pocketText = folder === "orange" ? "rgba(255,255,255,.95)" : folder === "dark" ? "rgba(255,255,255,.85)" : "rgba(11,28,51,.75)";
  return (
    <div className="winfolder-outer" ref={wrapRef} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={enableTilt && !reduced ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}>
        <div id={panelId} className={`winfolder-stage${fan ? " is-open" : ""}`}>
          <div aria-hidden="true" className="winfolder-back" />
          <div aria-hidden="true" className="winfolder-tab" style={{ background: BLUE, filter: "brightness(.8)" }} />
          <div
            className={`winfolder-cards ${fan ? "is-open" : "is-closed"}`}
            aria-hidden={!fan}
            inert={!fan}
          >
            {cards.slice(0, 4).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i} open={fan} speed={speed} reduced={reduced} />
            ))}
          </div>
          <div className="winfolder-front" style={{ background: BLUE }}>
            <button type="button" aria-label={`${fan ? "Close" : "Open"} services folder`} aria-expanded={fan} aria-controls={panelId} onClick={() => setOpen((v) => !v)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: 0, borderRadius: "inherit", cursor: "pointer" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: 14, left: "50%", marginLeft: -14, width: 28, height: 3, borderRadius: 4, background: "rgba(0,0,0,.22)", boxShadow: "0 1px 0 rgba(255,255,255,.25)" }} />
            </button>
            <div aria-hidden="true" style={{ position: "absolute", right: 18, bottom: 16, color: pocketText, fontSize: 12, fontWeight: 700, letterSpacing: ".08em" }}>{fan ? "OPEN - CLICK TO CLOSE" : "CLOSED - CLICK TO OPEN"}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
