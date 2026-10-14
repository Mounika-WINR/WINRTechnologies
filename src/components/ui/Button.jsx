import { Link } from "./Link.jsx";

export function Button({ to = "#contact", variant = "primary", skew = true, children, ...rest }) {
  const cls = `btn${skew ? " skew" : ""} ${variant === "primary" ? "pri" : "sec"}`;
  return (
    <Link to={to} className={cls} {...rest}>
      <span>{children}</span>
    </Link>
  );
}
