import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import { COLORS, colorVars, Icon } from "./theme.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import ContourBackground from "./ContourBackground.jsx";
import GrainLight from "./GrainLight.jsx";

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
    title: "IT Intern",
    place: "SimplyIT",
    dates: "May 2025 to June 2025",
    text: "Supported the project management and technical teams with daily IT operations, troubleshooting and workflow documentation.",
  },
  {
    title: "Technical Intern",
    place: "Beem",
    dates: "July 2025 to October 2025",
    text: "Worked with the engineering team on backend connectivity and system integration, and learned how fintech systems are optimised and rolled out.",
  },
  {
    title: "Junior Developer",
    place: "Imperial Marketing and Communication",
    dates: "September 2026 to December 2026",
    text: "Built and deployed this website, then moved into AI: machine learning models, face recognition, CCTV person tracking and a mobile app with on-device object detection.",
  },
];

const EDUCATION = [
  {
    title: "Diploma in Information and Communication Technology",
    place: "Asia Pacific University of Innovation and Technology",
    dates: "Sep 2023 to Jun 2025",
  },
  {
    title: "BSc (Hons) Computer Science, Artificial Intelligence",
    place: "Asia Pacific University of Innovation and Technology",
    dates: "Nov 2025 to Nov 2027",
  },
  
];

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "Java", "C#", "C++", "SQL", "R", "HTML", "CSS", "Dart"],
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
   One project card
   ========================================================== */
function ProjectCard({ project, index }) {
  const color = COLORS[index % COLORS.length];

  return (
    <Link
      to={project.path}
      className="hb-card"
      style={{ ...colorVars(color), "--i": index }}
      data-reveal
    >
      <span className="hb-card-icon">
        <Icon name={project.path} size={26} />
      </span>
      <span className="hb-card-name">{project.name}</span>
      <span className="hb-card-text">{project.description}</span>
      <span className="hb-card-open">
        Open
        <Icon name="arrow" size={15} />
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
            <span className="hb-logo-mark">HB</span>
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
          <ThemeToggle />
          <a href={`mailto:${PROFILE.email}`} className="hb-btn hb-btn--small hb-btn--light">
            Email me
          </a>
        </div>
      </header>

      {/* Hero: dark band with name, intro and profile */}
      <section className="hb-hero" id="top">
        <ContourBackground />
        <div className="hb-wrap hb-hero-inner">
          <div className="hb-hero-text">
            <span className="hb-label">{PROFILE.role}</span>
            <h1 className="hb-title">
              <span className="hb-line">
                <span>{PROFILE.firstName}</span>
              </span>
              <span className="hb-line">
                <span>{PROFILE.lastName}</span>
              </span>
            </h1>
            <p className="hb-lead hb-in" style={{ "--d": 3 }}>
              {PROFILE.intro}
            </p>
            <div className="hb-actions hb-in" style={{ "--d": 4 }}>
              <a href="#projects" className="hb-btn hb-btn--light">
                See my projects
                <Icon name="arrow" size={17} />
              </a>
              <a href="#contact" className="hb-btn hb-btn--outline">
                Get in touch
              </a>
            </div>
            <div className="hb-stats hb-in" style={{ "--d": 5 }}>
              <div className="hb-stat">
                <strong>{totalProjects}</strong>
                <span>live projects</span>
              </div>
              <div className="hb-stat">
                <strong>{ai.length}</strong>
                <span>AI models</span>
              </div>
              <div className="hb-stat">
                <strong>{EXPERIENCE.length}</strong>
                <span>internships</span>
              </div>
            </div>
          </div>

          <div className="hb-id hb-in" style={{ "--d": 3 }} aria-hidden="true">
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
              <span>React</span>
              <span>Python</span>
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Everything below the name sits on the grain light */}
      <GrainLight>
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
          {SKILLS.map((block) => (
            <div key={block.group} className="hb-panel" data-reveal>
              <h3 className="hb-panel-label">{block.group}</h3>
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
              {EXPERIENCE.map((job) => (
                <li key={job.title + job.place} className="hb-panel" data-reveal>
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
              {EDUCATION.map((item) => (
                <li key={item.title} className="hb-panel" data-reveal>
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
            <a href={`mailto:${PROFILE.email}`} className="hb-btn hb-btn--light">
              <Icon name="mail" size={17} />
              Email me
            </a>
            <a
              href={PROFILE.github}
              className="hb-btn hb-btn--outline"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" size={17} />
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
      </GrainLight>
    </div>
  );
}
