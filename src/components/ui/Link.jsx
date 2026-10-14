
// Router-free Link: uses hash anchors today; swap for react-router <Link> later.
export function Link({ to = "#", children, ...rest }) {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}
