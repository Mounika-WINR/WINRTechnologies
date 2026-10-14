
// Minimal <Outlet/> stand-in so Layout works WITHOUT react-router installed.
// When you later `npm i react-router-dom`, replace this import in Layout.jsx
// with `import { Outlet } from "react-router-dom";` and delete this file.
export function Outlet({ children }) {
  return <>{children}</>;
}
