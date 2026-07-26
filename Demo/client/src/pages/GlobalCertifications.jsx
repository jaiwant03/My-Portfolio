import { Link } from "react-router-dom";
import "../styles/GlobalCertifications.css";

// Certification images
import oracleFoundations from "../assets/certifications/global/oracle1.png";
import oracleAiFoundations from "../assets/certifications/global/oracle2.png";
import oracleDataScience from "../assets/certifications/global/oracle3.png";
import oracleGenerativeAi from "../assets/certifications/global/oracle4.png";
import netsuiteAiFoundations from "../assets/certifications/global/netsuite.png";
import Calico from "../assets/certifications/global/Calico.png";

function GlobalCertifications() {
  return (
    <div className="global-certifications-page">

      {/* ── Same ambient blobs as About page ─────────────── */}
      <div aria-hidden="true" style={{
        position:'absolute', borderRadius:'50%', pointerEvents:'none',
        filter:'blur(110px)', zIndex:0,
        width:'520px', height:'520px', background:'rgba(255,215,0,0.07)',
        top:'-80px', left:'-140px',
        animation:'blobFloat 22s ease-in-out infinite'
      }}/>
      <div aria-hidden="true" style={{
        position:'absolute', borderRadius:'50%', pointerEvents:'none',
        filter:'blur(110px)', zIndex:0,
        width:'420px', height:'420px', background:'rgba(255,193,7,0.055)',
        bottom:'60px', right:'-100px',
        animation:'blobFloat 18s ease-in-out infinite reverse',
        animationDelay:'-8s'
      }}/>
      <div aria-hidden="true" style={{
        position:'absolute', borderRadius:'50%', pointerEvents:'none',
        filter:'blur(110px)', zIndex:0,
        width:'340px', height:'340px', background:'rgba(244,196,48,0.045)',
        top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        animation:'blobFloat 26s ease-in-out infinite',
        animationDelay:'-14s'
      }}/>

      
      {/* 🔙 Back Button */}
      <Link to="/certifications" className="back-button">
        ← Back
      </Link>

      <h1>Certifications & Credentials</h1>

      <div className="global-cert-grid">
        {/* 1 */}
        <div className="global-cert-card">
          <img
            src={oracleFoundations}
            alt="Oracle Cloud Infrastructure 2025 Certified Foundations Associate badge"
            className="global-cert-image"
          />
          <h3>
            Oracle Cloud Infrastructure 2025 Certified Foundations Associate
          </h3>

          <div className="global-cert-links">
            <a
              href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=2AAAC42B1B887D5C189FB2D01EF3F5CEA651BFDB9A2C0213E8172ABD53AB1F6D"
              target="_blank"
              rel="noreferrer"
            >
              Badge Verification
            </a>
            <a href={oracleFoundations} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>

        {/* 2 */}
        <div className="global-cert-card">
          <img
            src={oracleAiFoundations}
            alt="Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate badge"
            className="global-cert-image"
          />
          <h3>
            Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate
          </h3>

          <div className="global-cert-links">
            <a
              href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=FBAE4CD30DCF4D333F34A5F68B2721BB459840CA63D9050190FA8FE2272AF53F"
              target="_blank"
              rel="noreferrer"
            >
              Badge Verification
            </a>
            <a href={oracleAiFoundations} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>

        {/* 3 */}
        <div className="global-cert-card">
          <img
            src={oracleDataScience}
            alt="Oracle Cloud Infrastructure 2025 Certified Data Science Professional badge"
            className="global-cert-image"
          />
          <h3>
            Oracle Cloud Infrastructure 2025 Certified Data Science Professional
          </h3>

          <div className="global-cert-links">
            <a
              href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=D4DBB105EA2DDD2A96CF683D70BAEB8A0C854F27A6461B6E20EB87084E8C56F2"
              target="_blank"
              rel="noreferrer"
            >
              Badge Verification
            </a>
            <a href={oracleDataScience} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>

        {/* 4 */}
        <div className="global-cert-card">
          <img
            src={oracleGenerativeAi}
            alt="Oracle Cloud Infrastructure 2025 Certified Generative AI Professional badge"
            className="global-cert-image"
          />
          <h3>
            Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
          </h3>

          <div className="global-cert-links">
            <a
              href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=C658BF1A7904815B40C844EBA423E574C2932D9D4DAE924BAF254C357064BAC9"
              target="_blank"
              rel="noreferrer"
            >
              Badge Verification
            </a>
            <a href={oracleGenerativeAi} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>

        {/* 5 */}
        <div className="global-cert-card">
          <img
            src={netsuiteAiFoundations}
            alt="Oracle NetSuite Certified AI Foundations Associate badge"
            className="global-cert-image"
          />
          <h3>Oracle NetSuite Certified AI Foundations Associate</h3>

          <div className="global-cert-links">
            <a
              href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=35095BFB3F28880ABAB76DB8E90324C4E00E5704097ECBB910D4C5EE4D090B0E"
              target="_blank"
              rel="noreferrer"
            >
              Badge Verification
            </a>
            <a href={netsuiteAiFoundations} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>

        {/* 6 */}
        <div className="global-cert-card">
          <img
            src={Calico}
            alt="Certified Calico Operator:EBPF by Tigera"
            className="global-cert-image"
          />
          <h3>Certified Calico Operator:EBPF by Tigera</h3>

          <div className="global-cert-links">
            <a
              href="https://courses.academy.tigera.io/certificates/eb727fedbcfa48d7b292fddaa0b228e2"
              target="_blank"
              rel="noreferrer"
            >
              Badge Verification
            </a>
            <a href={Calico} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalCertifications;
