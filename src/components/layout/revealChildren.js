/* ==========================================================================
   REVEAL HELPERS (shared by ScrollReveal.jsx)
   --------------------------------------------------------------------------
   A "reveal group" is any element carrying [data-reveal-group]. Its DIRECT
   children are the cards / content blocks that arrive one after another.

   Everything here is additive and safe:
     • a child is only ever HELD hidden by holdChildren(), which is called solely
       for a group the script has confirmed it can observe - so a card is never
       hidden unless something is already watching to bring it back
     • revealChildren() only ever makes children visible
     • the stagger delay is written to --reveal-delay, which the stylesheet
       reads (see styles/scroll-reveal.css), so the animation itself stays
       entirely in CSS
     • re-running it on an already revealed group simply re-marks it, which
       makes it usable both on scroll and on first paint
   ========================================================================== */

/* Longest stagger we will ever apply, so a big grid never crawls in. */
export const REVEAL_MAX_DELAY_MS = 420;

/* How long to wait after mount before revealing what is already on screen. */
export const REVEAL_FIRST_PAINT_MS = 520;

const PER_CHILD_STEP_MS = 90;

/* Per-child beat of the stagger, capped by maxDelay so the last card in a
   long grid is never left waiting. */
function stepFor(count, maxDelay) {
  if (count < 2) return 0;
  return Math.min(PER_CHILD_STEP_MS, maxDelay / (count - 1));
}

/* Pre-set the delays AND hold the children hidden. Called only for a group the
   script has confirmed it can observe, so a card is never hidden unless
   something is already watching to bring it back. */
export function holdChildren(group, maxDelay = REVEAL_MAX_DELAY_MS) {
  if (!group) return;
  const children = Array.from(group.children);
  const step = stepFor(children.length, maxDelay);
  children.forEach((child, i) => {
    if (step) child.style.setProperty("--reveal-delay", `${Math.round(i * step)}ms`);
    if (!child.classList.contains("reveal-in")) child.classList.add("reveal-hold");
  });
}

/* Reveal every direct child, one after another. `.reveal-hold` is dropped as
   each child's entrance animation takes over. */
export function revealChildren(group, maxDelay = REVEAL_MAX_DELAY_MS) {
  if (!group) return;
  const children = Array.from(group.children);
  const step = stepFor(children.length, maxDelay);
  children.forEach((child, i) => {
    if (step) child.style.setProperty("--reveal-delay", `${Math.round(i * step)}ms`);
    child.classList.remove("reveal-hold");
    child.classList.add("reveal-in");
  });
}
