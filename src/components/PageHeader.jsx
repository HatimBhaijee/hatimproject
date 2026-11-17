import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Landing.css";
import "./PageHeader.css";
import { Icon, colorVars, findProject } from "./theme.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

/* Everything that gets the soft light under the cursor on hover */
const LIT = [
  ".hb-btn",
  ".hb-card",
  ".submit",
  ".payment",
  ".prediction-submit",
  ".list",
  ".showpayment",
  ".cancel",
  ".prediction-clear",
  ".action-btn",
  ".scroll-top",
].join(",");

/* ==========================================================
   Top bar, coloured banner and "How it works" panel shown on
   every project page. On the homepage it shows nothing, but it
   still runs the cursor light for the buttons and cards.
   ========================================================== */
export default function PageHeader({ management = [], ai = [] }) {
  const { pathname } = useLocation();
  const project = findProject(pathname, management, ai);

  // Sets the page colour for the buttons, inputs and tables below
  useEffect(() => {
    const root = document.documentElement;
    const names = ["--c", "--cd", "--cs", "--ct", "--cl"];

    if (project) {
      const vars = colorVars(project.color);
      names.forEach((name) => root.style.setProperty(name, vars[name]));
    } else {
      names.forEach((name) => root.style.removeProperty(name));
    }
  }, [project]);

  // Opens each page at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Tells each button and card where the cursor is, for the hover light
  useEffect(() => {
    function onMove(e) {
      const el = e.target.closest && e.target.closest(LIT);
      if (!el) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - box.left}px`);
      el.style.setProperty("--my", `${e.clientY - box.top}px`);
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  if (!project) return null;

  return (
    <div className="hb pg-top">
      <header className="hb-nav">
        <div className="hb-wrap hb-nav-inner">
          <Link to="/" className="hb-logo">
            <span className="hb-logo-mark">HB</span>
            <span className="hb-logo-name">Hatim Bhaijee</span>
          </Link>
          <ThemeToggle />
          <Link to="/" className="hb-btn hb-btn--small hb-btn--ghost">
            <Icon name="back" size={16} />
            All projects
          </Link>
        </div>
      </header>

      <section className="pg-hero" style={colorVars(project.color)}>
        <div className="hb-wrap pg-hero-inner">
          <span className="pg-icon">
            <Icon name={project.path} size={40} stroke={1.4} />
          </span>
          <div>
            <span className="pg-group">{project.group}</span>
            <h1 className="pg-title">{project.name}</h1>
            <p className="pg-text">{project.description}</p>
          </div>
        </div>
      </section>

      {project.info && (
        <aside className="pg-how" aria-label="How it works">
          <h2 className="pg-how-label">How it works</h2>
          <ol className="pg-steps">
            {project.info.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2 className="pg-how-label">Built with</h2>
          <div className="pg-built">
            {project.info.built.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
