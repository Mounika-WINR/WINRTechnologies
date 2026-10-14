
/* Card-in-card: outer blue shell + inner dark card (matches folder cards). */
export function ServiceCard({ card, index = 0 }) {
  return (
    <div className="wr-inner-card">
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
      <a
        href={card.href}
        onClick={(e) => e.stopPropagation()}
        className={index === 0 ? "wr-card-btn hot" : "wr-card-btn"}
      >
        {card.cta}
      </a>
    </div>
  );
}
