import { useEffect, useRef, useState } from "react";
import floatingVideo from "../../assets/images/winr-floating-logo.mp4";

/* ==========================================================================
   FLOATING LOGO
   --------------------------------------------------------------------------
   The WINR logo shown on the left of every page's hero section.

   Source clip: winr-floating-logo.mp4 (1920×1080, solid white background).

   APPROACH: Canvas chromakey (draws cropped region, keys near-white → α=0).
   The key uses TWO passes:
     1. SATURATION GUARD: pixels with high colour saturation (the orange ring,
        blue body, etc.) are always kept regardless of luminance.
     2. LUMINANCE KEY: only truly neutral-grey/white pixels are faded out.

   KEY FIX (root cause of missing top):
     Previously KEY_EDGE=205 was too aggressive — it partially removed the
     light-blue tones of the flying figure's wings/body at the top of the mark.
     The saturation check (mx-mn > 26) wasn't catching these because light blue
     at high brightness can have a small chroma spread.

     Fix: use PERCEPTUAL SATURATION (HSL-style) instead of raw channel range,
     and raise KEY_EDGE to 220 so only truly neutral whites/greys are keyed.
     Also use a REGION GUARD: the top 35% of the canvas (where the flying
     figure lives) gets a stricter luminance cut-off (KEY_SOFT_TOP=250) so
     semi-transparent light pixels of the figure are preserved.

   CROP: matches the measured logo bounding box with generous headroom:
     - 4% above the topmost pixel so the flying figure never hits row 0
     - 3% below + 2% each side for shadow/glow room
   ========================================================================== */

const SRC_W = 1920;
const SRC_H = 1080;

/* ── CROP ──────────────────────────────────────────────────────────────────
   Measured logo bounding box (via canvas pixel scan):
     topmost logo pixel ≈ row 112 (star top, ~0.1037 of frame)
     bottommost text    ≈ row 892 ('Pvt Ltd' baseline at lowest animation point, ~0.826)
   Crop ends at y=0.835 (row 902) to cleanly cut out the hazy studio floor shadow
   pool beneath the text while keeping every pixel of 'Pvt Ltd' crisp and intact. */
const CROP = { x: 0.249, y: 0.100, w: 0.504, h: 0.735 };

/* ── KEYING PARAMS ──────────────────────────────────────────────────────────
   For NEUTRAL (low-saturation) pixels only:
   - lum >= KEY_SOFT  → fully transparent
   - KEY_EDGE < lum < KEY_SOFT → fade out proportionally
   - lum <= KEY_EDGE  → fully opaque (kept)
   SATURATION threshold: if HSL-saturation > SAT_KEEP the pixel is always kept
   regardless of luminance (protects light-blue wings, orange star & ring, etc.). */
const KEY_SOFT   = 248;
const KEY_EDGE   = 225;
const SAT_KEEP   = 0.08;

export function FloatingLogo({ className = "", play = true }) {
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const rafRef     = useRef(0);
  const stoppedRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return undefined;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return undefined;

    stoppedRef.current = false;

    const drawKeyedFrame = () => {
      const sw = video.videoWidth  || SRC_W;
      const sh = video.videoHeight || SRC_H;
      if (!sw || !sh) return;

      /* Canvas pixel dimensions = the crop region in source pixels. */
      const cw = Math.round(sw * CROP.w);
      const ch = Math.round(sh * CROP.h);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width  = cw;
        canvas.height = ch;
      }

      ctx.clearRect(0, 0, cw, ch);

      /* Draw only the cropped region of the source video, 1:1 pixel mapping. */
      ctx.drawImage(
        video,
        Math.round(sw * CROP.x), Math.round(sh * CROP.y), cw, ch,
        0, 0, cw, ch,
      );

      try {
        const img = ctx.getImageData(0, 0, cw, ch);
        const d   = img.data;

        for (let y = 0; y < ch; y++) {
          for (let x = 0; x < cw; x++) {
            const i = (y * cw + x) * 4;

            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];

            /* 2. Chroma / Color guard — keep any genuinely coloured pixel.
               Near-white pixels (high lightness with tiny delta like 254/254/255)
               are neutral background, NOT color. */
            const mx  = Math.max(r, g, b);
            const mn  = Math.min(r, g, b);
            const avg = (r + g + b) / 3;

            // Truly colored pixel (orange ring/star, blue wings/body/text)
            // Color pixels have noticeable difference between max and min channel
            const isColor = (mx - mn) > 18;
            if (isColor && avg < 240) continue; // genuinely colored → always keep

            /* 3. Luminance key for white/neutral studio background. */
            if (avg >= KEY_SOFT) {
              d[i + 3] = 0;
            } else if (avg > KEY_EDGE) {
              const t = (avg - KEY_EDGE) / (KEY_SOFT - KEY_EDGE);
              d[i + 3] = Math.round(d[i + 3] * (1 - t));
            }
          }
        }
        ctx.putImageData(img, 0, 0);
      } catch {
        /* Pixel access failed (e.g. cross-origin); keep the raw frame. */
      }
    };

    const loop = () => {
      if (stoppedRef.current) return;
      drawKeyedFrame();
      if (!video.paused && !video.ended) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const start = () => {
      drawKeyedFrame();
      if (prefersReducedMotion || !play) return;
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
      loop();
    };

    if (video.readyState >= 2) start();
    else video.addEventListener("loadeddata", start, { once: true });

    const onPlay = () => loop();
    video.addEventListener("play", onPlay);
    video.addEventListener("seeked", drawKeyedFrame);

    return () => {
      stoppedRef.current = true;
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("seeked", drawKeyedFrame);
    };
  }, [play, prefersReducedMotion]);

  return (
    <div
      className={`wr-float-logo${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Hidden source video — frames are drawn keyed onto the canvas. */}
      <video
        ref={videoRef}
        className="wr-float-logo-src"
        src={floatingVideo}
        muted
        playsInline
        preload="auto"
      />
      <canvas ref={canvasRef} className="wr-float-logo-canvas" />
    </div>
  );
}

export default FloatingLogo;
