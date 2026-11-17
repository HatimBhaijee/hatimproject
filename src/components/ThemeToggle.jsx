import { useEffect, useState } from "react";
import { Icon } from "./theme.jsx";

/* ==========================================================
   Light / dark switch for the top bar.
   index.html already picks the right theme before the page
   shows (saved choice, or the phone/laptop setting), so this
   starts from whatever is already on <html>.
   ========================================================== */
function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  // Puts the theme on <html> and remembers it for next visit
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // private browsing can block storage, the switch still works
    }
  }, [theme]);

  function toggle() {
    const root = document.documentElement;
    root.classList.add("theme-fade");
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    window.setTimeout(() => root.classList.remove("theme-fade"), 350);
  }

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="hb-btn hb-btn--small hb-btn--ghost theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}
