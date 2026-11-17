import { useEffect, useState } from "react";
import { Icon } from "./theme.jsx";

/* ==========================================================
   Round-cornered button in the bottom right corner that
   scrolls back to the top. Shows once you scroll down.
   Uses the page colour on project pages, navy on the homepage.
   ========================================================== */
export default function ScrollTopButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${shown ? " is-shown" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={shown ? 0 : -1}
    >
      <Icon name="up" size={22} />
    </button>
  );
}
