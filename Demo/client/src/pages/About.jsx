import "../styles/about.css";

/* ── Static content blocks ───────────────────────────────── */
const STATS = [
  { value: "3+",   label: "Internships" },
  { value: "25+",  label: "Projects Built" },
  { value: "30+",  label: "Certifications" },
  { value: "MERN", label: "Core Stack" },
];

const HIGHLIGHTS = [
  {
    icon: "⚡",
    title: "Full-Stack Development",
    body: "End-to-end web applications using React, Angular, Node.js, Express.js, MongoDB, and modern frontend technologies. Clean, maintainable, production-ready code.",
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    body: "Data preprocessing, feature engineering, model building, evaluation and deployment. Applying core AI concepts to solve real-world problems with data-driven approaches.",
  },
  {
    icon: "🔐",
    title: "Secure Authentication",
    body: "JWT-based authentication, Google OAuth integration, and role-based access control — ensuring applications are scalable, secure, and enterprise-ready.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design Principles",
    body: "Visually appealing, intuitive, and user-centered interfaces. Great software is not just functional — it also delivers an exceptional user experience.",
  },
];

export default function About() {
  return (
    <section className="about-section">
      <div className="snowfall" aria-hidden="true" />

      <div className="about-wrap">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="about-header">
          <span className="about-eyebrow">Who I Am</span>
          <h2 className="about-heading">About Me</h2>
          <p className="about-lead">
            I am a highly motivated <strong>AI &amp; Data Science</strong> undergraduate
            at KPR Institute of Engineering and Technology, with a strong passion for
            building intelligent, scalable, and real-world software solutions. My interests
            span full-stack development, machine learning, data science, and AI-driven
            systems that create measurable impact.
          </p>
        </div>

        {/* ── Stats row ───────────────────────────────────── */}
        <div className="about-stats">
          {STATS.map((s, i) => (
            <div className="about-stat" key={i} style={{ animationDelay: `${0.08 + i * 0.10}s` }}>
              <span className="about-stat__value">{s.value}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Highlight cards grid ────────────────────────── */}
        <div className="about-grid">
          {HIGHLIGHTS.map((h, i) => (
            <div
              className="about-card"
              key={i}
              style={{ animationDelay: `${0.18 + i * 0.12}s` }}
            >
              <div className="about-card__sweep"  aria-hidden="true" />
              <div className="about-card__corner" aria-hidden="true" />
              <span className="about-card__icon">{h.icon}</span>
              <h3 className="about-card__title">{h.title}</h3>
              <p  className="about-card__body">{h.body}</p>
            </div>
          ))}
        </div>

        {/* ── Full bio paragraph ──────────────────────────── */}
        <div className="about-bio">
          <div className="about-bio__sweep"  aria-hidden="true" />
          <div className="about-bio__corner" aria-hidden="true" />
          <div className="about-bio__inner">
            <p>
              My goal is to grow as a high-impact software engineer in teams that build
              cutting-edge technology products. I continuously push myself to learn,
              innovate, and deliver scalable systems that combine <strong>AI intelligence</strong> with
              robust full-stack engineering.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
