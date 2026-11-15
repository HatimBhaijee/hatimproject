import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Landing.css";
import "./PageHeader.css";
import { Icon, colorVars, findProject } from "./theme.jsx";

/* ==========================================================
   Top bar and coloured title area shown on every project page.
   It also gives the page its colour (the same colour as its
   card on the homepage). Shows nothing on the homepage.
   ========================================================== */
export default function PageHeader({ management = [], ai = [] }) {
  const { pathname } = useLocation();
  const project = findProject(pathname, management, ai);

  // Sets the page colour for the buttons, inputs and tables below
  useEffect(() => {
    const root = document.documentElement;
    const names = ["--c", "--cd", "--cs", "--ct"];

    if (project) {
      const vars = colorVars(project.color);
      names.forEach((name) => root.style.setProperty(name, vars[name]));
    } else {
      names.forEach((name) => root.style.removeProperty(name));
    }
  }, [project]);

  // Opens each page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!project) return null;

  return (
    <div className="hb pg-top">
      <header className="hb-nav">
        <div className="hb-wrap hb-nav-inner">
          <Link to="/" className="hb-logo">
            <span className="hb-logo-tile">HB</span>
            <span className="hb-logo-name">Hatim Bhaijee</span>
          </Link>
          <Link to="/" className="hb-btn hb-btn--small hb-btn--ghost">
            <Icon name="back" size={16} />
            All projects
          </Link>
        </div>
      </header>

      <section className="pg-hero" style={colorVars(project.color)}>
        <span
          className={`pg-deco pg-deco--${project.shape}`}
          aria-hidden="true"
        />
        <div className="hb-wrap pg-hero-inner">
          <span className="pg-tile">
            <Icon name={project.path} size={34} />
          </span>
          <div>
            <span className="pg-group">{project.group}</span>
            <h1 className="pg-title">{project.name}</h1>
            <p className="pg-text">{project.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
