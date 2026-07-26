import { Link } from "react-router-dom";
import "../styles/certifications.css";

function Certifications() {
  return (
    <div className="certifications-page">
      <h1>Certifications</h1>

      <div className="cert-category-grid">
        {/* Global Certifications */}
        <Link to="/certifications/global" className="cert-category-card">
          <span className="cert-card-corner cert-card-corner--tl" />
          <span className="cert-card-corner cert-card-corner--br" />

          <div className="cert-card-icon">
            <span>🌍</span>
          </div>

          <span className="cert-card-label">Certification Track</span>
          <h2>Global Certifications</h2>
          <p>
            Explore my internationally recognized certifications earned from
            leading global platforms, showcasing my expertise, continuous
            learning, and commitment to professional excellence.
          </p>

          <span className="cert-card-cta">
            Explore Certifications
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Certifications;