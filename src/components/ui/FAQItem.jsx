import { useState } from "react";

export function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="wr-pillar" style={{ maxWidth: 720, textAlign: "left" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ background: "none", border: 0, padding: 0, cursor: "pointer", fontWeight: 800, color: "inherit", fontSize: 15 }}
      >
        {q} {open ? "–" : "+"}
      </button>
      {open && <p style={{ margin: "10px 0 0" }}>{a}</p>}
    </div>
  );
}
