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
        "Contributed to scalable full-stack applications and automation tools by building backend services and intelligent data collection systems.",
      achievements: [
        "Designed and developed a Notification Rule Builder capable of managing 500+ automated notifications.",
        "Built scalable backend services using Python, REST APIs, and database integration.",
        "Engineered a Reddit Web Scraping Tool that collected 10,000+ posts and comments.",
        "Automated trend analysis and sentiment data collection using Python APIs."
      ],
      tech: ["Python", "REST APIs", "Database Integration", "Web Scraping", "Automation"]
    },
    {
      company: "BookMyWenue",
      logo: bookmyvenueLogo,
      role: "R&D Executive Intern",
      type: "Internship",
      duration: "Mar 2026 – May 2026",
      description:
        "Worked on collecting, cleaning, and preparing real-world datasets for analytics and machine learning applications.",
      achievements: [
        "Performed data collection and preprocessing for AI and analytics projects.",
        "Prepared high-quality datasets for machine learning workflows.",
        "Created interactive dashboards and visualizations using Power BI."
      ],
      tech: ["Power BI", "Data Collection", "Data Cleaning", "Data Preprocessing"]
    },
    {
      company: "Infosys Springboard Internship 7.0",
      logo: infosysLogo,
      role: "Artificial Intelligence Intern",
      type: "Internship",
      duration: "Jun 2026 – Jul 2026",
      description:
        "Applied Artificial Intelligence concepts to develop intelligent solutions using machine learning and natural language processing.",
      achievements: [
        "Learned and implemented Machine Learning, Deep Learning, and NLP concepts.",
        "Developed AI-based solutions using intelligent algorithms.",
        "Worked on automation and data-driven decision-making systems."
      ],
      tech: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Natural Language Processing", "Python"]
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
          My professional journey through internships, full-stack development,
          artificial intelligence, and data-driven innovation.
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
