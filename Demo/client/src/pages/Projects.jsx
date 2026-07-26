import "../styles/projects.css";

/* =========================
   Project Images
========================= */
import project1 from "../assets/projects/project1.png";
import project2 from "../assets/projects/project2.png";
import project3 from "../assets/projects/project3.png";
import project4 from "../assets/projects/project4.png";
import project5 from "../assets/projects/project5.png";
import project6 from "../assets/projects/project6.png";

/* =========================
   Small inline icons
   (no icon-library dependency needed)
========================= */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55
      0-.27-.01-1.16-.02-2.11-3.16.69-3.83-1.34-3.83-1.34-.52-1.32-1.27-1.67-1.27-1.67
      -1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53
      -2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16
      a10.9 10.9 0 0 1 5.74 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04
      0 4.36-2.65 5.32-5.18 5.6.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55
      C20 21.02 23.25 16.77 23.25 11.75 23.25 5.48 18.27.5 12 .5z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);



/* =========================
   Projects Data (14 TOTAL)
========================= */
const projects = [
  {
    title: "Collaborative Kanban Board",
    image: project1,
    description: "A full-stack Kanban board with real-time collaboration, drag-and-drop task management, and secure JWT authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
    github: "https://github.com/jaiwant03/Collaborative-Kanban-Board",
    live: "https://collaborative-kanban-board-chi.vercel.app/"
  },
  {
    title: "Idea-to-Startup Predictor",
    image: project2,
    description: "An intelligent platform that predicts the feasibility of startup ideas using AI by analyzing market demand, competition, scalability, and potential business success.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT"],
    github: "https://github.com/jaiwant03/Idea-to-startup",
    live: "https://idea-to-startup.vercel.app/"
  },
  {
    title: "SmartPrep AI",
    image: project3,
    description: "An AI academic assistant featuring document-based chat, intelligent question paper generation, and automated answer grading using RAG and local LLMs.",
    tech: ["React", "FastAPI", "MongoDB", "LangChain", "FAISS", "Ollama"],
    github: "https://github.com/jaiwant03/SmartPrep-AI"
  },
  {
    title: "RoadFix System",
    image: project4,
    description: "A web-based road maintenance platform for reporting infrastructure issues, tracking repairs, and managing workflows through worker and admin dashboards.",
    tech: ["React", "Node.js", "Express", "MongoDB","JWT"],
    github: "https://github.com/jaiwant03/Citizen-Feedback-System"
  },
  {
    title: "Deal Mind Contract",
    image: project5,
    description: "An AI-powered contract management platform with intelligent document analysis, risk detection, contract comparison, and automated insights across multiple brands.",
    tech: ["React", "Node.js", "Express", "MongoDB","JWT"],
    github: "https://github.com/jaiwant03/deal-scribe-91"
  },
  {
    title: "Code to flowchart Generator",
    image: project6,
    description: "An intelligent code visualization tool that generates flowcharts from source code and enables real-time code execution for better understanding.",
    tech: ["React", "Node.js", "Express", "MongoDB","Mermaid"],
    github: "https://github.com/jaiwant03/Cotoflow"
  }
];

/* =========================
   Projects Component
========================= */
export default function Projects() {
  return (
    <section className="projects-page">
      <div className="snow-layer"></div>
      <div className="snow-ground"></div>
      <h2 className="projects-title">Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />

              {(project.github || project.live) && (
                <div className="project-image-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              {project.features && project.features.length > 0 && (
                <div className="project-features">
                  <strong>Features:</strong>
                  <ul>
                    {project.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="project-tech" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
              {project.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View More Projects — centered below the grid, links to GitHub profile */}
      <div className="view-more-wrap">
        <a
          href="https://github.com/jaiwant03?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="view-more-btn"
        >
          View More Projects
        </a>
      </div>
    </section>
  );
}