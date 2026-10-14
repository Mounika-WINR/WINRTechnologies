import { useEffect } from "react";

import {
  REVEAL_FIRST_PAINT_MS,
  REVEAL_MAX_DELAY_MS,
  holdChildren,
  revealChildren,
} from "./revealChildren.js";

/* ==========================================================================
   SCROLL REVEAL
   Adds a soft rise-in as each section / card group scrolls into view, plus a
   short stagger for cards that are already on screen on first load.

   Two opt-ins (both styled in styles/scroll-reveal.css):
     • data-reveal        → the element itself rises in (sections, dividers)
     • data-reveal-group  → each DIRECT CHILD rises in one after another
                            (card grids, content columns, tickers)

   Safety first: the VISIBLE state is the CSS default, and the hidden state is
   applied by THIS script and nothing else. Content can never be left stuck
   invisible:
     • no IntersectionObserver  → nothing is ever hidden
     • reduced motion           → nothing is ever hidden
     • observer never fires     → a timeout clears every pending/hold class
     • JS never runs            → nothing is hidden, everything just shows
   ========================================================================== */
export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") return undefined;

    const groups = Array.from(document.querySelectorAll("[data-reveal-group]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          if (el.hasAttribute("data-reveal-group")) revealChildren(el);
          else {
            el.classList.remove("reveal-pending");
            el.classList.add("reveal-in");
          }
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    /* Cards/content already on screen when the page opens get the same
       staggered arrival (a beat after first paint) instead of popping in
       fully formed. Off-screen ones are held for the observer.
       In BOTH cases the child is held hidden by JS first, so CSS is never the
       thing hiding content. */
    const onScreenNow = [];
    for (const el of groups) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) onScreenNow.push(el);
      else {
        holdChildren(el, REVEAL_MAX_DELAY_MS);
        observer.observe(el);
      }
    }

    /* Sections + dividers: only the ones that are OFF screen are held hidden. */
    for (const el of Array.from(document.querySelectorAll("[data-reveal]"))) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) continue;
      el.classList.add("reveal-pending");
      observer.observe(el);
    }

    const firstPaint = window.setTimeout(() => {
      onScreenNow.forEach((el) => revealChildren(el, REVEAL_MAX_DELAY_MS));
    }, REVEAL_FIRST_PAINT_MS);

    // Hard safety net: if anything is still hidden after 6s, reveal it.
    // Already-revealed elements are only re-flagged, never re-animated.
    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll(".reveal-pending")
        .forEach((el) => el.classList.remove("reveal-pending"));
      groups.forEach((el) => revealChildren(el, REVEAL_MAX_DELAY_MS));
    }, 6000);

    return () => {
      observer.disconnect();
      window.clearTimeout(firstPaint);
      window.clearTimeout(failsafe);
      // Never leave the page in a hidden state on unmount.
      document
        .querySelectorAll(".reveal-pending")
        .forEach((el) => el.classList.remove("reveal-pending"));
      groups.forEach((el) => revealChildren(el, REVEAL_MAX_DELAY_MS));
    };
  }, []);

  return null;
}

export default ScrollReveal;
