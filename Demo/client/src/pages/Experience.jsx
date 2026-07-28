import "../styles/experience.css";
import yaaneLogo from "../assets/experience/yaane.png";
import bookmyvenueLogo from "../assets/experience/bookmyWenue.png";
import infosysLogo from "../assets/experience/infosys.png";

export default function Experience() {
  const experiences = [
    {
      company: "Yaane Technologies",
      logo: yaaneLogo,
      role: "Full Stack Developer Intern",
      type: "Internship",
      duration: "Dec 2025 – Jan 2026",
      description:
        "Worked as a Full Stack Developer Intern, developing modern web applications with the MERN stack by implementing responsive frontends, secure backend APIs, JWT authentication, and MongoDB database integration.",
     achievements: [
   "Developed responsive frontend interfaces using React for improved user experience.",
   "Built secure RESTful APIs with Node.js and Express.js for application functionality.",
   "Implemented JWT-based authentication and authorization for secure user access.",
   "Integrated MongoDB for efficient data storage and management across applications."
],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Database Integration","JWT"]
    },
   {
  company: "BookMyWenue",
  logo: bookmyvenueLogo,
  role: "R&D Executive Intern",
  type: "Internship",
  duration: "Mar 2026 – May 2026",
  description:
    "Contributed to research and data-driven decision-making by collecting, validating, cleaning, and organizing real-world datasets while developing interactive Power BI dashboards to generate meaningful business insights.",
  achievements: [
    "Collected and validated large datasets to ensure data quality and consistency.",
    "Cleaned and organized raw data for accurate analysis and reporting.",
    "Developed interactive Power BI dashboards to visualize key business metrics.",
    "Transformed raw data into actionable business insights to support strategic decisions."
  ],
  tech: [
    "Power BI","Data Collection","Data Validation","Data Cleaning","Data Analysis","Business Intelligence"]
},
    {
  company: "Infosys Springboard Internship 7.0",
  logo: infosysLogo,
  role: "Artificial Intelligence Intern",
  type: "Internship",
  duration: "Jun 2026 – Aug 2026",
  description:
    "Designed and developed an AI Powered Query Resolution System by leveraging Retrieval-Augmented Generation (RAG), Large Language Models, and vector search to deliver accurate, context-aware responses from knowledge bases.",
  achievements: [
    "Developed an AI Powered Query Resolution System using LangChain and Ollama.",
    "Implemented Retrieval-Augmented Generation (RAG) with FAISS for efficient semantic document retrieval.",
    "Integrated Large Language Models (LLMs) to generate accurate and context-aware responses.",
    "Built an end-to-end intelligent query resolution pipeline using Python, LangChain, FAISS, and Ollama."
  ],
  tech: ["FAISS", "RAG", "LLMs", "Ollama", "Python", "LangChain"]
}
  ];

  return (
    <section className="exp-section">

      {/* ── Ambient background layers ──────────────────────── */}
      <div className="exp-blob exp-blob--a" aria-hidden="true" />
      <div className="exp-blob exp-blob--b" aria-hidden="true" />
      <div className="exp-blob exp-blob--c" aria-hidden="true" />

      {/* ── Section header ─────────────────────────────────── */}
      <div className="exp-header">
        <span className="exp-header__eyebrow">Career Journey</span>
        <h2 className="exp-header__title">Professional Experience</h2>
        <p className="exp-header__sub">
          My professional journey through internships, Full-Stack Development,
          Artificial Intelligence, and Data-driven innovations.
        </p>
      </div>

      {/* ── Timeline wrapper ───────────────────────────────── */}
      <div className="exp-timeline">

        {/* Center line */}
        <div className="exp-timeline__line" aria-hidden="true">
          <div className="exp-timeline__line-glow" />
        </div>

        {/* ── Cards ──────────────────────────────────────────── */}
        {experiences.map((exp, index) => {
          const side = index % 2 === 0 ? "left" : "right";
          return (
            <div className={`exp-item exp-item--${side}`} key={index}>

              {/* Date badge — opposite side */}
              <div className="exp-item__date-wrap">
                <div className="exp-item__date">
                  <span className="exp-item__date-icon">📅</span>
                  {exp.duration}
                </div>
              </div>

              {/* Timeline node */}
              <div className="exp-item__node" aria-hidden="true">
                <div className="exp-item__node-ring" />
                <div className="exp-item__node-core" />
              </div>

              {/* Card */}
              <div className="exp-card">
                {/* inner shine sweep */}
                <div className="exp-card__sweep" aria-hidden="true" />
                {/* corner glow */}
                <div className="exp-card__corner" aria-hidden="true" />

                {/* Card header */}
                <div className="exp-card__head">
                  <div className="exp-card__company-badge">
                     <img src={exp.logo}
                      alt={exp.company}
                      className="exp-card__logo-img"
                     />
                  </div>
                  <div className="exp-card__meta">
                    <h3 className="exp-card__role">{exp.role}</h3>
                    <div className="exp-card__company-row">
                      <span className="exp-card__company">{exp.company}</span>
                      <span className="exp-card__type">{exp.type}</span>
                    </div>
                  </div>
                </div>

                {/* Duration inline (mobile) */}
                <div className="exp-card__duration-mobile">
                  <span>📅</span>{exp.duration}
                </div>

                {/* Divider */}
                <div className="exp-card__divider" aria-hidden="true" />

                {/* Description */}
                <p className="exp-card__desc">{exp.description}</p>

                {/* Achievements */}
                <h4 className="exp-card__contrib-label">Key Contributions</h4>
                <ul className="exp-card__list">
                  {exp.achievements.map((item, i) => (
                    <li key={i}>
                      <span className="exp-card__bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                <div className="exp-card__tags">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="exp-card__tag">
                      <span className="exp-card__tag-shine" aria-hidden="true" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}

      </div>{/* /exp-timeline */}

    </section>
  );
}
