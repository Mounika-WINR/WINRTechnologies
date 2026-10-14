import { useCallback, useEffect, useRef, useState } from "react";
import logoVideo from "../../assets/images/WINRlogovideo.mp4";

/* ==========================================================================
   LOGO INTRO (Home page only)
   --------------------------------------------------------------------------
   Flow, synced to the video:
     1. A FULL-WINDOW curtain shows the WINR logo video across the viewport.
        On mobile a centered, edge-cropped video sits over a full-screen
        backdrop so the forming logo stays centered without the corner mark.
     2. The moment the logo is fully formed (video 'ended'), the curtain slides
        from the CENTRE to the LEFT and fades, landing where the 3D floating
        logo lives in the 1st section.
     3. As it lands, the floating logo is already there (no time gap), and the
        title + content slide in smoothly from the RIGHT.

   Safety: reduced motion skips the intro; a fallback timer and onError always
   close the overlay so the user can never be trapped.
   ========================================================================== */

const FALLBACK_MS = 9000;
/* How long the curtain's exit (slide + fade) takes. The page reveal starts
   slightly BEFORE this finishes so the two overlap - no dead beat between the
   intro video and the Home content. */
const SLIDE_MS = 1000;
/* Hand control to the page this far into the slide. */
const HANDOFF_EARLY_MS = 320;

export function LogoIntro({ onDone, onExitStart }) {
  const [phase, setPhase] = useState("playing"); // playing | sliding | done
  const videoRef = useRef(null);
  const backdropVideoRef = useRef(null);
  const doneRef = useRef(false);
  const exitStartedRef = useRef(false);
  const timersRef = useRef([]);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("done");
    onDone?.();
  }, [onDone]);

  useEffect(() => {
    if (prefersReducedMotion) finish();
  }, [finish, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const t = window.setTimeout(finish, FALLBACK_MS);
    timersRef.current.push(t);
    return () => window.clearTimeout(t);
  }, [finish, prefersReducedMotion]);

  useEffect(() => () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const v = videoRef.current;
    const backdrop = backdropVideoRef.current;
    if (!v || !backdrop) return undefined;
    const useMobileBackdrop = window.matchMedia("(max-width: 640px)").matches;
    let userActivatedAudio = false;

    const syncBackdrop = () => {
      if (backdrop.readyState < 2) return;
      if (Math.abs(backdrop.currentTime - v.currentTime) > 0.2) {
        backdrop.currentTime = v.currentTime;
      }
    };
    const playBackdrop = () => {
      backdrop.play().catch(() => {});
    };

    const enableAudio = () => {
      userActivatedAudio = true;
      document.removeEventListener("pointerdown", enableAudio);
      document.removeEventListener("keydown", enableAudio);
      v.muted = false;
      v.play().catch(() => {});
    };

    // Attempt audible autoplay; browsers may require a user gesture, so keep
    // the intro playing silently until the first gesture when they reject it.
    v.muted = false;
    const attempt = v.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        if (userActivatedAudio) return;
        v.muted = true;
        v.play().catch(() => {});
      });
    }
    document.addEventListener("pointerdown", enableAudio);
    document.addEventListener("keydown", enableAudio);
    if (useMobileBackdrop) {
      v.addEventListener("timeupdate", syncBackdrop);
      backdrop.addEventListener("canplay", playBackdrop);
      playBackdrop();
    }
    return () => {
      document.removeEventListener("pointerdown", enableAudio);
      document.removeEventListener("keydown", enableAudio);
      if (useMobileBackdrop) {
        v.removeEventListener("timeupdate", syncBackdrop);
        backdrop.removeEventListener("canplay", playBackdrop);
      }
    };
  }, [prefersReducedMotion]);

  /* Video finished -> slide, then hand control to the page so the floating logo
     and the content reveal take over with no time gap. */
  const handleEnded = () => {
    setPhase("sliding");
    /* Tell the page NOW so its content begins revealing *underneath* the
       curtain while it fades - the two overlap into one continuous motion. */
    if (!exitStartedRef.current) {
      exitStartedRef.current = true;
      onExitStart?.();
    }
    const handoff = window.setTimeout(finish, SLIDE_MS - HANDOFF_EARLY_MS);
    timersRef.current.push(handoff);
  };

  if (prefersReducedMotion || phase === "done") return null;

  const sliding = phase === "sliding";

  return (
    <div className={`wr-logo-intro${sliding ? " is-sliding" : ""}`} aria-hidden="true">
      {/* The mobile foreground is cropped around the centered logo over a
          synchronized full-screen backdrop. */}
      <div className="wr-logo-intro-crop">
        <video
          ref={backdropVideoRef}
          className="wr-logo-intro-backdrop-video"
          src={logoVideo}
          muted
          playsInline
          preload="none"
        />
        <video
          ref={videoRef}
          className="wr-logo-intro-video"
          src={logoVideo}
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onError={finish}
        />
      </div>
    </div>
  );
}

export default LogoIntro;
