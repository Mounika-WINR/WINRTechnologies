import { useEffect, useState } from "react";
import { Outlet } from "./Outlet.jsx";
import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";
import { AuroraBackground } from "./AuroraBackground.jsx";
import { ScrollReveal } from "./ScrollReveal.jsx";

/* ==========================================================================
   PAGE INTRO CONTROLLER (lives in Layout, applies to EVERY page)
   --------------------------------------------------------------------------
   Whenever the route changes, every page's 1st section animates in:
     - the 3D floating logo on the LEFT rises / floats into place
     - the title + content on the RIGHT slides in smoothly from the RIGHT

   A routeKey change flips a class on the shell:
       is-entering -> content held offset (right), logo hidden
       is-entered  -> both animate to their resting position
   The entering state lasts one short beat so there is no perceptible gap -
   the transition itself is the reveal. If anything goes wrong the class is
   cleared, so content can never be left stuck hidden. Reduced motion skips it.
   ========================================================================== */

const REVEAL_DELAY_MS = 60;

export function Layout({ children, routeKey = "home" }) {
  const [enteredRouteKey, setEnteredRouteKey] = useState(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }
    const t = window.setTimeout(() => setEnteredRouteKey(routeKey), REVEAL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [routeKey, prefersReducedMotion]);

  const entered = prefersReducedMotion || enteredRouteKey === routeKey;

  return (
    <div className={`wr-page-shell ${entered ? "is-entered" : "is-entering"}`} data-route={routeKey}>
      {/* Full-page blue/orange shader background — every page, every section. */}
      <AuroraBackground />
      {/* Scroll-in reveal for sections marked data-reveal. */}
      <ScrollReveal />
      <Navbar />
      <main>
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
