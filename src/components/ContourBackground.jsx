import { useEffect, useRef } from "react";

/* ==========================================================
   Live topographic contour lines behind the name.
   Mouse raises a hill under the cursor, a click grows a hill
   that settles, and scrolling makes the terrain flow.
   It pauses when the band is off screen.
   ========================================================== */

/* Smooth random values (Perlin noise) */
const P = new Uint8Array(512);
(() => {
  const p = [...Array(256).keys()];
  let s = 7;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];
})();
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a, b, t) => a + (b - a) * t;
function grad(h, x, y, z) {
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return (h & 1 ? -u : u) + (h & 2 ? -v : v);
}
function noise(x, y, z) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = fade(x), v = fade(y), w = fade(z);
  const A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z;
  const B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z;
  return lerp(
    lerp(
      lerp(grad(P[AA] & 15, x, y, z), grad(P[BA] & 15, x - 1, y, z), u),
      lerp(grad(P[AB] & 15, x, y - 1, z), grad(P[BB] & 15, x - 1, y - 1, z), u),
      v,
    ),
    lerp(
      lerp(grad(P[AA + 1] & 15, x, y, z - 1), grad(P[BA + 1] & 15, x - 1, y, z - 1), u),
      lerp(grad(P[AB + 1] & 15, x, y - 1, z - 1), grad(P[BB + 1] & 15, x - 1, y - 1, z - 1), u),
      v,
    ),
    w,
  );
}

export default function ContourBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const band = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, cell = 14, raf = 0, visible = true;
    const start = performance.now();
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, inside: false, placed: false };
    const clicks = [];

    function draw(now) {
      const t = reduceMotion ? 0 : (now - start) / 1000;
      if (mouse.inside) {
        if (!mouse.placed) { mouse.sx = mouse.x; mouse.sy = mouse.y; mouse.placed = true; }
        mouse.sx += (mouse.x - mouse.sx) * 0.15;
        mouse.sy += (mouse.y - mouse.sy) * 0.15;
      }

      ctx.clearRect(0, 0, W, H);
      const s = cell;
      const cols = Math.ceil(W / s) + 1, rows = Math.ceil(H / s) + 1;
      const field = new Float32Array(cols * rows);
      const z = t * 0.04 + window.scrollY * 0.0012;

      // Hills from the cursor and recent clicks
      const hills = [];
      if (mouse.inside) hills.push({ x: mouse.sx, y: mouse.sy, h: 0.35, r: 140 });
      for (const c of clicks) {
        const age = (now - c.t) / 1000;
        if (age < 4) hills.push({ x: c.x, y: c.y, h: 0.6 * Math.sin((age / 4) * Math.PI), r: 200 });
      }

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * s, y = j * s;
          let v = noise(x * 0.0035, y * 0.0035, z) + noise(x * 0.009, y * 0.009, z * 1.7) * 0.3;
          for (const h of hills) {
            const d2 = ((x - h.x) ** 2 + (y - h.y) ** 2) / (h.r * h.r);
            v += h.h * Math.exp(-d2 * 2);
          }
          field[j * cols + i] = v;
        }
      }

      // Draw the contour lines (marching squares)
      for (let L = 0; L < 16; L++) {
        const iso = -0.6 + L * 0.085;
        const major = L % 4 === 0;
        ctx.strokeStyle = major ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.075)";
        ctx.lineWidth = major ? 1.1 : 0.8;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i], b = field[j * cols + i + 1];
            const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
            const idx = (a > iso) | ((b > iso) << 1) | ((c > iso) << 2) | ((d > iso) << 3);
            if (idx === 0 || idx === 15) continue;
            const x = i * s, y = j * s;
            const T = [x + (s * (iso - a)) / (b - a), y];
            const R = [x + s, y + (s * (iso - b)) / (c - b)];
            const Bt = [x + (s * (iso - d)) / (c - d), y + s];
            const Lf = [x, y + (s * (iso - a)) / (d - a)];
            const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
            switch (idx) {
              case 1: case 14: seg(Lf, T); break;
              case 2: case 13: seg(T, R); break;
              case 3: case 12: seg(Lf, R); break;
              case 4: case 11: seg(R, Bt); break;
              case 5: seg(Lf, T); seg(R, Bt); break;
              case 6: case 9: seg(T, Bt); break;
              case 7: case 8: seg(Lf, Bt); break;
              case 10: seg(T, R); seg(Lf, Bt); break;
              default: break;
            }
          }
        }
        ctx.stroke();
      }
    }

    function frame(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(frame);
    }
    function play() {
      if (reduceMotion) { draw(performance.now()); return; }
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = band.clientWidth;
      H = band.clientHeight;
      cell = W < 600 ? 18 : 14; // bigger cells on phones = less work
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      play();
    }

    function onMove(e) {
      const r = band.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = e.pointerType === "mouse";
    }
    function onLeave() {
      mouse.inside = false;
      mouse.placed = false;
    }
    function onDown(e) {
      const r = band.getBoundingClientRect();
      clicks.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
      if (clicks.length > 6) clicks.shift();
      play();
    }
    function onVisibility() {
      if (!document.hidden) play();
    }

    const sizeWatcher = new ResizeObserver(resize);
    sizeWatcher.observe(band);
    const screenWatcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
    });
    screenWatcher.observe(band);
    band.addEventListener("pointermove", onMove);
    band.addEventListener("pointerleave", onLeave);
    band.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      sizeWatcher.disconnect();
      screenWatcher.disconnect();
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
      band.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hb-contours" aria-hidden="true" />;
}
