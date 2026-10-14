
export function SectionHeading({ eyebrow, title, desc, align = "center" }) {
  const right = align === "right";
  return (
    <div className={right ? "wr-page2-head" : undefined} style={right ? undefined : { textAlign: "center" }}>
      {eyebrow && <p className="wr-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {desc && <p className={right ? "wr-sub sm right" : "wr-sub sm"}>{desc}</p>}
      <div className={right ? "wr-rule right" : "wr-rule"} aria-hidden="true" />
    </div>
  );
}
