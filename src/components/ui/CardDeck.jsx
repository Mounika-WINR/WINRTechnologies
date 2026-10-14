import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Service-Card-UI deck (Framer Service-Card-UI-L8FDiL model)
   — N cards stacked in a pocket; on hover/tap they spring-fan
   out. Reusable: <CardDeck cards={[{title, desc, cta, href}]} />
   Closed state = deck with only top card face visible.
   ============================================================ */

/* Fan offsets for a 3-card spread (left, centre, right).
   Tuned for ~300px card width — wider than the 4-card folder fan. */
const FAN3 = [
  { rotate: -8, x: -150, y: -18, scale: 1 },
  { rotate: 0, x: 0, y: -44, scale: 1.04 },
  { rotate: 8, x: 150, y: -18, scale: 1 },
];

/* Closed = stacked in the pocket, slight rotation fan peek like the
   Framer original (each card offset a few px so edges show). */
const CLOSED3 = [
  { rotate: -6, x: -14, y: 10, scale: 0.97 },
  { rotate: 3, x: 10, y: 5, scale: 0.98 },
  { rotate: -2, x: -4, y: 0, scale: 1 },
];

export function CardDeck({ cards, accent = "#F97316", height = 340 }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const n = cards.length;
  // spread FAN/CLOSED evenly for any card count (3 default)
  const fan = FAN3.length === n ? FAN3 : FAN3;
  const closed = CLOSED3.length === n ? CLOSED3 : CLOSED3;

  return (
    <div
      className={`wr-deck ${open ? "is-open" : ""}`}
      style={{ height }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      role="group"
      aria-label={`${n} service cards, hover to spread`}
    >
      {/* pocket shadow behind the stack */}
      <span className="wr-deck-pocket" aria-hidden="true" />
      {cards.map((card, i) => {
        const t = open ? fan[i] : closed[i];
        return (
          <motion.article
            key={card.title}
            className="wr-deck-card"
            style={{ zIndex: open ? 10 + i : n - i, ["--deck-acc"]: accent }}
            initial={false}
            animate={{ x: t.x, y: t.y, rotate: t.rotate, scale: t.scale }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 22, mass: 0.9 }}
            aria-hidden={open && i !== 0 ? false : undefined}
          >
            <span className="wr-deck-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="wr-deck-title">{card.title}</h3>
            <p className="wr-deck-desc">{card.desc}</p>
            {card.cta && (
              <a
                href={card.href || "#/contact/consultation"}
                className="wr-deck-btn"
                onClick={(e) => e.stopPropagation()}
              >
                {card.cta}
              </a>
            )}
          </motion.article>
        );
      })}
      <p className="wr-deck-hint">{open ? "" : "Hover to reveal"}</p>
    </div>
  );
}
