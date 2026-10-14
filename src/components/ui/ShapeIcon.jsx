
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
