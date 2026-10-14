import { motion, useReducedMotion } from "framer-motion";

export function ShapeIcon({ shape }) {
  const s = { width: 30, height: 30, display: "block" };
  const fill = "#F97316";
  if (shape === "circle")
    return (<svg viewBox="0 0 26 26" style={s} aria-hidden="true"><circle cx="13" cy="13" r="8.5" fill={fill} /></svg>);
  if (shape === "square")
    return (<svg viewBox="0 0 26 26" style={s} aria-hidden="true"><rect x="5" y="5" width="16" height="16" rx="1.5" fill={fill} /></svg>);
  if (shape === "hex")
    return (<svg viewBox="0 0 26 26" style={s} aria-hidden="true"><path d="M13 3l8.5 5v10L13 23l-8.5-5V8z" fill={fill} /></svg>);
  return (<svg viewBox="0 0 26 26" style={s} aria-hidden="true"><rect x="6" y="6" width="14" height="14" rx="1.5" transform="rotate(45 13 13)" fill={fill} /></svg>);
}

const FAN = [
  { rotate: -11, x: "-78%", y: -92, scale: 1 },
  { rotate: -4, x: "-26%", y: -116, scale: 1.02 },
  { rotate: 4, x: "26%", y: -116, scale: 1.02 },
  { rotate: 11, x: "78%", y: -92, scale: 1 },
];

/* 3. CLOSED = cards peek inside pocket (tops visible, like shared Framer
   component). Tune --cardpeek (visible px) — ServiceCard reads it via CLOSED.y. */
const CLOSED = { rotate: 0, x: "-50%", y: 150, scale: 0.96 };

/* Card-in-card: inner dark card holds icon/title/desc/cta, like impact page cards. */
function InnerCard({ card, index }) {
  return (
    <div className="wr-inner-card">
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
      <a href={card.href} onClick={(e) => e.stopPropagation()} className={index === 0 ? "wr-card-btn hot" : "wr-card-btn"}>
        {card.cta}
      </a>
    </div>
  );
}

export function ServiceCard({ card, index, open, speed, reduced }) {
  const fan = FAN[index % FAN.length];
  // 3. CLOSED = cards fully hidden inside pocket (y:150 pushes them under the
  // front panel). Open = they fan out above the pocket like photo 3.
  const target = open ? fan : { ...CLOSED, rotate: [-9, -3, 3, 9][index % 4], x: ["-68%", "-56%", "-44%", "-32%"][index % 4] };
  return (
    <motion.article
      initial={false}
      animate={{ x: target.x, y: target.y, rotate: target.rotate, scale: target.scale, opacity: 1 }}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 170 * speed, damping: 22, mass: 0.9 }}
      className="wr-outer-card"
      style={{ zIndex: open ? 10 + index : 1 }}
      aria-label={`${card.title} card ${index + 1} of 4`}
      aria-hidden={!open}
    >
      <InnerCard card={card} index={index} compact={!open} />
    </motion.article>
  );
}

/* Static 4-card grid that mirrors folder content (same data, same links). */
export function ServiceGrid({ cards }) {
  const reduced = useReducedMotion();
  return (
    <div className="wr-grid">
      {cards.slice(0, 4).map((c, i) => (
        <motion.div
          key={c.id}
          className="wr-outer-card static"
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <InnerCard card={c} index={i} />
        </motion.div>
      ))}
    </div>
  );
}
