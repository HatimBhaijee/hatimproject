import { useEffect, useRef } from "react";

/* ==========================================================
   Wraps everything below the name. Adds a fine grain texture
   and a soft light that eases after the cursor, so visitors
   can see where they are on the page. Without a mouse (phones)
   the light sits in the middle of the screen as you scroll.
   ========================================================== */
export default function GrainLight({ children }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pointer = null; // last cursor position on screen, or null
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;

    // Where the light should go, measured from the top-left of this area
    function aim() {
      const r = box.getBoundingClientRect();
      const cx = pointer ? pointer.x : window.innerWidth / 2;
      const cy = pointer ? pointer.y : window.innerHeight / 2;
      tx = cx - r.left;
      ty = cy - r.top;
    }

    function place() {
      box.style.setProperty("--lx", `${x}px`);
      box.style.setProperty("--ly", `${y}px`);
    }

    function frame() {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      place();
      raf = Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(frame) : 0;
    }

    function update() {
      aim();
      if (reduceMotion) {
        x = tx;
        y = ty;
        place();
      } else if (!raf) {
        raf = requestAnimationFrame(frame);
      }
    }

    function onMove(e) {
      pointer = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
      update();
    }
    function onLeave() {
      pointer = null;
      update();
    }

    aim();
    x = tx;
    y = ty;
    place();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="hb-below" ref={boxRef}>
      <div className="hb-below-fx" aria-hidden="true" />
      {children}
    </div>
  );
}
