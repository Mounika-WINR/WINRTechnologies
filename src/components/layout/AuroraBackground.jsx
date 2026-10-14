import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "../../styles/aurora-background.css";

/* ==========================================================================
   WINR INTERACTIVE BACKGROUND — FLOWING FOG
   Minimal, soft smoke/fog that drifts on its own and flows around the cursor.

     • fog     — layered noise "smoke" that creeps slowly across the page.
     • cursor  — the fog parts and curls toward the pointer; a faint brand
                 light rides along with it.
     • scroll  — the flow direction and tint shift as you scroll, so each
                 section sits in a slightly different atmosphere.

   Deliberately restrained: no grid, no hard shapes, nothing that competes
   with content. Colour-locked to --acc2 #0057A8 and --acc #DE7829.
   ========================================================================== */

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmp;      // noise amplitude
uniform vec2  uRes;
uniform float uBlend;    // wash toward white (keeps it readable)
uniform vec2  uPointer;  // smoothed cursor, 0..1 (GL: bottom-up)
uniform float uScroll;   // 0..1 page progress
uniform float uPointerStr;

uniform vec3 uBlue;
uniform vec3 uOrange;
uniform vec3 uDeep;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

/* Soft billowing fog: fractal noise shaped into wispy sheets. */
float fbm(vec2 p, float t) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p + vec2(t * 0.6, -t * 0.4));
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.06;

  // ---- the fog is pulled toward the cursor: sampling near the pointer
  //      drags the noise field, so the smoke visibly flows and curls -------
  vec2 toPointer = uPointer - uv;
  float pDist = length(vec2(toPointer.x * aspect, toPointer.y));
  float pull = exp(-pDist * 1.7) * uPointerStr;

  vec2 flow = p + toPointer * pull * 0.55;

  // scroll gently rotates/sways the field so sections feel different
  flow += vec2(0.0, uScroll * 1.2);

  // ---- two fog layers at different scales and speeds ----
  float f1 = fbm(flow * 0.85 + vec2(t * 0.5, -t * 0.35), t * 0.5);
  float f2 = fbm(flow * 1.70 + vec2(-t * 0.30, t * 0.45) + f1 * 0.35, t * 0.4);

  float density = smoothstep(-0.35, 0.85, f1 * 0.62 + f2 * 0.48) * uAmp;

  // ---- build the smoke colour from the brand blue/orange ----
  // lower wisps read blue, upper wisps warm to orange
  float warm = clamp(uv.y * 0.75 + f2 * 0.28 - uScroll * 0.35, 0.0, 1.0);
  vec3 smoke = mix(uBlue, uOrange, smoothstep(0.18, 0.92, warm));
  // keep the smoke soft and desaturated, never neon
  smoke = mix(smoke, vec3(0.98, 0.99, 1.0), 0.34);

  vec3 col = vec3(1.0);
  col = mix(col, smoke, density * 0.50);

  // ---- a second, denser fold right around the cursor so the fog reacts ----
  col = mix(col, smoke, pull * density * 0.26);

  // ---- faint brand light travelling with the pointer ----
  float glow = exp(-pDist * 3.4) * uPointerStr;
  col = mix(col, mix(uBlue, uOrange, 0.42), glow * 0.13);

  // ---- soft vignette keeps the eye toward the middle of the page ----
  float vig = smoothstep(1.25, 0.20, length((uv - 0.5) * vec2(aspect, 1.0)));
  col *= mix(0.972, 1.0, vig);

  fragColor = vec4(col, 1.0);
}
`;

/* Brand-locked defaults (--acc2 / --acc / --navy in index.css) */
const BLUE = "#0057A8";
const ORANGE = "#DE7829";
const DEEP = "#0B1C33";

export function AuroraBackground({
  amp = 1.0,
  blend = 0.0,        // fog is already soft — no white wash needed
  speed = 1.0,
  pointerStrength = 1.0,
  scrollStrength = 1.0,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    let program;
    let mesh;
    let raf = 0;
    let disposed = false;
    let resizeHandler;

    // ---- smoothed interaction state (no snapping) ----
    const target = { px: 0.5, py: 0.45, scroll: 0, pStr: 0 };
    const smooth = { px: 0.5, py: 0.45, scroll: 0, pStr: 0 };
    let pointerInside = false;

    try {
      renderer = new Renderer({ alpha: false, premultipliedAlpha: false, antialias: false, dpr: 1 });
      const gl = renderer.gl;
      gl.clearColor(1, 1, 1, 1);

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: amp },
          uRes: { value: [1, 1] },
          uBlend: { value: blend },
          uPointer: { value: [0.5, 0.45] },
          uScroll: { value: 0 },
          uPointerStr: { value: 0 },
          uBlue: { value: hexToRgb(BLUE) },
          uOrange: { value: hexToRgb(ORANGE) },
          uDeep: { value: hexToRgb(DEEP) },
        },
      });

      mesh = new Mesh(gl, { geometry, program });

      resizeHandler = () => {
        const w = container.offsetWidth || window.innerWidth;
        const h = container.offsetHeight || window.innerHeight;
        renderer.setSize(w, h);
        program.uniforms.uRes.value = [w, h];
      };
      window.addEventListener("resize", resizeHandler, false);
      resizeHandler();
      container.appendChild(gl.canvas);

      /* ---------------- interaction ---------------- */
      const onPointerMove = (e) => {
        pointerInside = true;
        target.px = e.clientX / Math.max(window.innerWidth, 1);
        target.py = 1.0 - e.clientY / Math.max(window.innerHeight, 1); // GL is bottom-up
        target.pStr = pointerStrength;
      };
      const onPointerLeave = () => {
        pointerInside = false;
        target.pStr = 0;
      };
      const onScroll = () => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        target.scroll = Math.min(window.scrollY / max, 1) * scrollStrength;
      };

      if (!reduceMotion) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      }

      const lerp = (a, b, t) => a + (b - a) * t;

      if (reduceMotion) {
        // One static frame: a soft fog bank, no motion at all.
        program.uniforms.uTime.value = 20.0;
        program.uniforms.uPointerStr.value = 0.0;
        renderer.render({ scene: mesh });
      } else {
        const loop = (time) => {
          if (disposed) return;
          raf = requestAnimationFrame(loop);

          // idle drift: with the pointer away, the fog light wanders on its own
          if (!pointerInside) {
            const t = time * 0.001;
            target.px = 0.5 + Math.sin(t * 0.10) * 0.30;
            target.py = 0.5 + Math.cos(t * 0.074) * 0.24;
            target.pStr = 0.60;
          }

          smooth.px = lerp(smooth.px, target.px, 0.030);
          smooth.py = lerp(smooth.py, target.py, 0.030);
          smooth.scroll = lerp(smooth.scroll, target.scroll, 0.05);
          smooth.pStr = lerp(smooth.pStr, target.pStr, 0.038);

          program.uniforms.uTime.value = (time * 0.001 * speed) % 3600;
          program.uniforms.uPointer.value = [smooth.px, smooth.py];
          program.uniforms.uScroll.value = smooth.scroll;
          program.uniforms.uPointerStr.value = smooth.pStr;

          renderer.render({ scene: mesh });
        };
        raf = requestAnimationFrame(loop);
      }

      // expose teardown for the cleanup below
      container.__wrCleanup = () => {
        window.removeEventListener("resize", resizeHandler, false);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("scroll", onScroll);
      };
    } catch {
      // No WebGL — the CSS gradient underneath still shows.
      if (container) container.dataset.auroraFallback = "true";
    }

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (container.__wrCleanup) {
        container.__wrCleanup();
        container.__wrCleanup = null;
      }
      if (mesh) mesh.gl = null;
      if (program) program.gl = null;
      const cv = renderer && renderer.gl && renderer.gl.canvas;
      if (cv && cv.parentNode) cv.parentNode.removeChild(cv);
      renderer = null;
    };
  }, [amp, blend, speed, pointerStrength, scrollStrength]);

  return <div ref={containerRef} className={`wr-bg ${className}`.trim()} aria-hidden="true" />;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(full, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

export default AuroraBackground;
