import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

/* ==========================================================
   Your details. Change anything here and the page updates.
   ========================================================== */
const PROFILE = {
  firstName: "Hatim",
  lastName: "Bhaijee",
  role: "Computer Science (AI) student",
  intro:
    "I build full-stack web apps and machine learning models. Every project on this page runs live on my own server, so go ahead and try them.",
  email: "hatim.bhaijee.2006@gmail.com",
  github: "https://github.com/HatimBhaijee",
};

const EXPERIENCE = [
  {
    title: "Technical Intern",
    place: "Beem",
    dates: "Jul 2025 to Oct 2025",
    text: "Worked with the engineering team on backend connectivity and system integration, and learned how fintech systems are optimised and rolled out.",
  },
  {
    title: "IT Intern",
    place: "SimplyIT",
    dates: "May 2025 to Jun 2025",
    text: "Supported the project management and technical teams with daily IT operations, troubleshooting and workflow documentation.",
  },
];

const EDUCATION = [
  {
    title: "BSc (Hons) Computer Science, Artificial Intelligence",
    place: "Asia Pacific University of Innovation and Technology",
    dates: "Nov 2025 to Nov 2027",
  },
  {
    title: "Diploma in Information and Communication Technology",
    place: "Asia Pacific University of Innovation and Technology",
    dates: "Sep 2023 to Jun 2025",
  },
];

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "Java", "C#", "C++", "SQL"],
  },
  {
    group: "Frameworks and tools",
    items: [
      "React",
      "Node.js",
      "Express",
      ".NET",
      "MySQL",
      "TensorFlow",
      "scikit-learn",
      "OpenCV",
      "Git and GitHub",
      "RStudio",
    ],
  },
  {
    group: "Areas",
    items: [
      "Machine learning",
      "Web development",
      "System and network administration",
      "Cybersecurity (Kali Linux, VMware)",
      "Data analysis",
    ],
  },
];

/* ==========================================================
   Card colours. Every card uses the same style, with its own
   colour, icon and corner shape so each one looks different.
   main = button and icon, dark = 3D edge, soft = light tint,
   text = text colour on the button
   ========================================================== */
const COLORS = [
  { main: "#3E9C00", dark: "#2F7A00", soft: "#E5F6D6", text: "#FFFFFF" }, // green
  { main: "#0A84C6", dark: "#076699", soft: "#DCF0FA", text: "#FFFFFF" }, // blue
  { main: "#D46A00", dark: "#A85400", soft: "#FDEBD9", text: "#FFFFFF" }, // orange
  { main: "#E02E2E", dark: "#B32020", soft: "#FCE1E1", text: "#FFFFFF" }, // red
  { main: "#FFC800", dark: "#D9A900", soft: "#FFF6CC", text: "#2B2B2B" }, // yellow
  { main: "#00897A", dark: "#006B5F", soft: "#D6F0EC", text: "#FFFFFF" }, // teal
  { main: "#D63D86", dark: "#AD2E6A", soft: "#F9E0EC", text: "#FFFFFF" }, // pink
  { main: "#2B70C9", dark: "#1F559C", soft: "#DFE9F7", text: "#FFFFFF" }, // royal blue
];

const SHAPES = ["circle", "square", "ring", "diamond"];

// Gives each card its colour as CSS variables
function colorVars(c) {
  return { "--c": c.main, "--cd": c.dark, "--cs": c.soft, "--ct": c.text };
}

/* ==========================================================
   Icons (simple line drawings, 24 x 24)
   ========================================================== */
const ICONS = {
  "/users": (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14.3c1.8.8 3 2.6 3 4.7" />
    </>
  ),
  "/payments": (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6.5 15h4" />
    </>
  ),
  "/billing": (
    <>
      <path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h3" />
    </>
  ),
  "/products": (
    <>
      <path d="M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z" />
      <path d="M3.5 7.4L12 12l8.5-4.6" />
      <path d="M12 12v9.2" />
    </>
  ),
  "/chat": (
    <>
      <path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v9a1.5 1.5 0 0 1-1.5 1.5h-9.5L6 20v-3.5H4A1.5 1.5 0 0 1 2.5 15V6A1.5 1.5 0 0 1 4 4.5z" />
      <path d="M7.5 9.5h9" />
      <path d="M7.5 12.5h5" />
    </>
  ),
  "/insurance": (
    <>
      <path d="M12 2.8l7.5 3v6c0 4.6-3.2 8.3-7.5 9.4-4.3-1.1-7.5-4.8-7.5-9.4v-6z" />
      <path d="M8.5 12l2.4 2.4 4.6-4.8" />
    </>
  ),
  "/crop": (
    <>
      <path d="M5 20c0-8.5 5.5-14.5 15.5-16-.5 10-6.5 16-15.5 16z" />
      <path d="M5 20l8-8" />
    </>
  ),
  "/country": (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8c2.6 2.5 4 5.8 4 9.2s-1.4 6.7-4 9.2c-2.6-2.5-4-5.8-4-9.2s1.4-6.7 4-9.2z" />
    </>
  ),
  "/cars": (
    <>
      <path d="M3.5 16V12l2-5a2 2 0 0 1 1.9-1.3h9.2a2 2 0 0 1 1.9 1.3l2 5v4z" />
      <path d="M3.5 12h17" />
      <circle cx="7.5" cy="16.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
    </>
  ),
  "/houses": (
    <>
      <path d="M3 11l9-7.5 9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  "/delivery": (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  "/catsdog": (
    <>
      <circle cx="8.5" cy="6.5" r="1.8" />
      <circle cx="15.5" cy="6.5" r="1.8" />
      <circle cx="4.8" cy="11.2" r="1.6" />
      <circle cx="19.2" cy="11.2" r="1.6" />
      <path d="M12 11c-3 0-6 3.6-6 6.2 0 1.6 1.3 2.6 2.8 2.6 1.2 0 2-.6 3.2-.6s2 .6 3.2.6c1.5 0 2.8-1 2.8-2.6 0-2.6-3-6.2-6-6.2z" />
    </>
  ),
  "/pplcar": (
    <>
      <path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8" />
      <path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8" />
      <path d="M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16" />
      <path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 17c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  code: (
    <>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
    </>
  ),
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
};

function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.star}
    </svg>
  );
}

/* ==========================================================
   One project card
   ========================================================== */
function ProjectCard({ project, index }) {
  const color = COLORS[index % COLORS.length];
  const shape = SHAPES[index % SHAPES.length];

  return (
    <Link
      to={project.path}
      className="hb-card"
      style={{ ...colorVars(color), "--i": index }}
      data-reveal
    >
      <span className={`hb-deco hb-deco--${shape}`} aria-hidden="true" />
      <span className="hb-tile">
        <Icon name={project.path} size={26} />
      </span>
      <span className="hb-card-name">{project.name}</span>
      <span className="hb-card-text">{project.description}</span>
      <span className="hb-btn hb-btn--small">
        Open
        <Icon name="arrow" size={16} />
      </span>
    </Link>
  );
}

/* ==========================================================
   The page
   ========================================================== */
export default function Landing({ management = [], ai = [] }) {
  const pageRef = useRef(null);

  // Fades sections in as they scroll into view
  useEffect(() => {
    const items = pageRef.current.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const totalProjects = management.length + ai.length;
  const year = new Date().getFullYear();

  return (
    <div className="hb" ref={pageRef}>
      {/* Top bar */}
      <header className="hb-nav">
        <div className="hb-wrap hb-nav-inner">
          <a href="#top" className="hb-logo">
            <span className="hb-logo-tile">HB</span>
            <span className="hb-logo-name">
              {PROFILE.firstName} {PROFILE.lastName}
            </span>
          </a>
          <nav className="hb-nav-links" aria-label="Sections">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hb-btn hb-btn--small"
            style={colorVars(COLORS[0])}
          >
            Email me
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hb-hero hb-wrap" id="top">
        <div className="hb-hero-text">
          <span className="hb-chip hb-in" style={{ "--d": 0 }}>
            <span className="hb-chip-dot" />
            {PROFILE.role}
          </span>
          <h1 className="hb-title hb-in" style={{ "--d": 1 }}>
            {PROFILE.firstName}
            <br />
            <span className="hb-title-accent">{PROFILE.lastName}</span>
          </h1>
          <p className="hb-lead hb-in" style={{ "--d": 2 }}>
            {PROFILE.intro}
          </p>
          <div className="hb-actions hb-in" style={{ "--d": 3 }}>
            <a
              href="#projects"
              className="hb-btn"
              style={colorVars(COLORS[0])}
            >
              See my projects
              <Icon name="arrow" size={18} />
            </a>
            <a href="#contact" className="hb-btn hb-btn--ghost">
              Get in touch
            </a>
          </div>
          <div className="hb-stats hb-in" style={{ "--d": 4 }}>
            <div className="hb-stat" style={colorVars(COLORS[1])}>
              <strong>{totalProjects}</strong>
              <span>live projects</span>
            </div>
            <div className="hb-stat" style={colorVars(COLORS[2])}>
              <strong>{ai.length}</strong>
              <span>AI models</span>
            </div>
            <div className="hb-stat" style={colorVars(COLORS[6])}>
              <strong>{EXPERIENCE.length}</strong>
              <span>internships</span>
            </div>
          </div>
        </div>

        <div className="hb-hero-art hb-in" style={{ "--d": 2 }} aria-hidden="true">
          <span className="hb-float hb-float--a" />
          <span className="hb-float hb-float--b" />
          <span className="hb-float hb-float--c" />
          <div className="hb-id">
            <div className="hb-id-top">
              <span className="hb-id-avatar">HB</span>
              <div>
                <div className="hb-id-name">
                  {PROFILE.firstName} {PROFILE.lastName}
                </div>
                <div className="hb-id-role">{PROFILE.role}</div>
              </div>
            </div>
            <ul className="hb-id-list">
              <li>
                <span>Studying</span>
                BSc Computer Science (AI)
              </li>
              <li>
                <span>University</span>
                Asia Pacific University
              </li>
              <li>
                <span>Building</span>
                Web apps and ML models
              </li>
            </ul>
            <div className="hb-id-tags">
              <span style={colorVars(COLORS[0])}>React</span>
              <span style={colorVars(COLORS[1])}>Python</span>
              <span style={colorVars(COLORS[4])}>MySQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="hb-section hb-wrap" id="projects">
        <div className="hb-head" data-reveal>
          <h2>Projects</h2>
          <p>Click any card to open the project and try it.</p>
        </div>

        <div className="hb-group" data-reveal>
          <h3>Management systems</h3>
          <span className="hb-count">{management.length}</span>
        </div>
        <div className="hb-grid">
          {management.map((project, i) => (
            <ProjectCard key={project.path} project={project} index={i} />
          ))}
        </div>

        <div className="hb-group" data-reveal>
          <h3>AI models</h3>
          <span className="hb-count">{ai.length}</span>
        </div>
        <div className="hb-grid">
          {ai.map((project, i) => (
            <ProjectCard
              key={project.path}
              project={project}
              index={i + management.length}
            />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="hb-section hb-wrap" id="skills">
        <div className="hb-head" data-reveal>
          <h2>Skills</h2>
          <p>What I work with day to day.</p>
        </div>
        <div className="hb-skills">
          {SKILLS.map((block, i) => (
            <div
              key={block.group}
              className="hb-panel"
              style={colorVars(COLORS[[1, 0, 2][i]])}
              data-reveal
            >
              <h3>{block.group}</h3>
              <div className="hb-tags">
                {block.items.map((item) => (
                  <span key={item} className="hb-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience and education */}
      <section className="hb-section hb-wrap" id="experience">
        <div className="hb-head" data-reveal>
          <h2>Experience and education</h2>
        </div>
        <div className="hb-two">
          <div>
            <h3 className="hb-sub" data-reveal>Experience</h3>
            <ol className="hb-timeline">
              {EXPERIENCE.map((job, i) => (
                <li
                  key={job.title + job.place}
                  className="hb-panel"
                  style={colorVars(COLORS[[3, 5][i % 2]])}
                  data-reveal
                >
                  <span className="hb-date">{job.dates}</span>
                  <h4>
                    {job.title}
                    <span className="hb-at"> at {job.place}</span>
                  </h4>
                  <p>{job.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="hb-sub" data-reveal>Education</h3>
            <ol className="hb-timeline">
              {EDUCATION.map((item, i) => (
                <li
                  key={item.title}
                  className="hb-panel"
                  style={colorVars(COLORS[[7, 6][i % 2]])}
                  data-reveal
                >
                  <span className="hb-date">{item.dates}</span>
                  <h4>{item.title}</h4>
                  <p>{item.place}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="hb-section hb-wrap" id="contact">
        <div className="hb-contact" data-reveal>
          <div>
            <h2>Get in touch</h2>
            <p>
              Have a project, an internship or a question? Send me an email and
              I will get back to you.
            </p>
          </div>
          <div className="hb-actions">
            <a
              href={`mailto:${PROFILE.email}`}
              className="hb-btn"
              style={colorVars(COLORS[4])}
            >
              <Icon name="mail" size={18} />
              Email me
            </a>
            <a
              href={PROFILE.github}
              className="hb-btn hb-btn--ghost"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="code" size={18} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="hb-footer hb-wrap">
        <span>
          © {year} {PROFILE.firstName} {PROFILE.lastName}
        </span>
        <span>Built with React, Node.js and MySQL</span>
      </footer>
    </div>
  );
}
