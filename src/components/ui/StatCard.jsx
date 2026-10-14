
export function StatCard({ value, label }) {
  return (
    <div className="wr-pillar">
      <strong style={{ fontSize: 26, display: "block" }}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
