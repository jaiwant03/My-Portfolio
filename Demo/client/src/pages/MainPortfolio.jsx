import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Home           from "./Home";
import About          from "./About";
import Skills         from "./Skills";
import CodingStats    from "../components/CodingStats/CodingStats";
import Projects       from "./Projects";
import Experience     from "./Experience";
import Achievements from "./Achievements";
import Certifications from "./Certifications";
import AIToolsKnown   from "./AIToolsKnown";
import Contact        from "./Contact";
import PortfolioNavbar    from "../components/PortfolioNavbar";
import LuxuryBackground   from "../components/LuxuryBackground";
import CustomCursor       from "../components/CustomCursor";
import ScrollToTop        from "../components/CodingStats/ScrollToTop";

const SECTION_IDS = [
  "home","about","skills","coding-activity","projects",
  "experience","achievements","certifications","ai-tools","contact",
];

/* ── helpers ────────────────────────────────────────────── */
function getStoredTheme() {
  try {
    return localStorage.getItem("portfolio-theme") || "dark";
  } catch { return "dark"; }
}

export default function MainPortfolio({ initialSection }) {
  const [activeSection, setActiveSection] = useState(initialSection || "home");
  const [theme,         setTheme]         = useState(getStoredTheme);
  const [scrollPct,     setScrollPct]     = useState(0);
  const containerRef   = useRef(null);
  const isScrollingRef = useRef(false);
  const rafRef         = useRef(null);
  const location       = useLocation();

  /* ── Apply theme to <html> ──────────────────────────────── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === "dark" ? "light" : "dark");
  }, []);

  /* ── Scroll helpers ─────────────────────────────────────── */
  const scrollToSection = useCallback((sectionId) => {
    const el        = document.getElementById(sectionId);
    const container = containerRef.current;
    if (!el || !container) return;

    isScrollingRef.current = true;
    const top = sectionId === "home" ? 0 : Math.max(0, el.offsetTop - 72);
    container.scrollTo({ top, behavior: "smooth" });
    setActiveSection(sectionId);
    setTimeout(() => { isScrollingRef.current = false; }, 900);
  }, []);

  /* ── Scroll to initial section ──────────────────────────── */
  useEffect(() => {
    let target = initialSection;
    if (!target) {
      const p = location.pathname.replace("/", "");
      if (SECTION_IDS.includes(p)) target = p;
    }
    if (target) {
      const t = setTimeout(() => scrollToSection(target), 200);
      return () => clearTimeout(t);
    }
  }, [initialSection, location.pathname, scrollToSection]);

  /* ── Active-section tracker + scroll-progress ──────────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = container;

        /* progress bar */
        const pct = scrollHeight - clientHeight > 0
          ? scrollTop / (scrollHeight - clientHeight)
          : 0;
        setScrollPct(pct);

        /* active section */
/* active section */
if (isScrollingRef.current) return;

let current = "home";

for (const id of SECTION_IDS) {
  const el = document.getElementById(id);

  if (!el) continue;

  if (scrollTop >= el.offsetTop - 120) {
    current = id;
  }
}

setActiveSection(current);
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Experience inline card styles ─────────────────────── */
  const expCardStyle = {
    position:             "relative",
    zIndex:               1,
    background:           "var(--glass-bg)",
    backdropFilter:       "blur(32px) saturate(180%)",
    WebkitBackdropFilter: "blur(32px) saturate(180%)",
    border:               "1px solid var(--glass-border)",
    borderRadius:         "28px",
    padding:              "56px 60px",
    maxWidth:             "780px",
    width:                "100%",
    boxSizing:            "border-box",
    boxShadow:            "0 32px 100px rgba(0,0,0,0.72), 0 0 80px rgba(255,215,0,0.04), inset 0 1px 0 rgba(255,215,0,0.08)",
  };

  return (
    <>
      {/* ── Premium custom cursor ─────────────────────────── */}
      <CustomCursor />

      {/* ── Floating scroll to top button ─────────────────── */}
      <ScrollToTop />

      {/* ── Scroll progress bar ──────────────────────────── */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPct * 100}%` }}
      />

      {/* ── Continuous animated background ───────────────── */}
      <LuxuryBackground theme={theme} />

      {/* ── Scrollable content container ─────────────────── */}
      <div
        ref={containerRef}
        className="portfolio-scroll"
        style={{
          position:       "relative",
          zIndex:         1,
          height:         "100vh",
          overflowY:      "scroll",
          overflowX:      "hidden",
          scrollBehavior: "smooth",
        }}
      >
        <PortfolioNavbar
          activeSection={activeSection}
          onNavClick={scrollToSection}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* ── HOME ────────────────────────────────────────── */}
        <div id="home" className="section-wrapper">
          <Home />
        </div>

        {/* ── ABOUT ───────────────────────────────────────── */}
        <div id="about" className="section-wrapper">
          <About />
        </div>

        {/* ── SKILLS ──────────────────────────────────────── */}
        <div id="skills" className="section-wrapper">
          <Skills />
        </div>

        {/* ── CODING ACTIVITY ─────────────────────────────── */}
        <div id="coding-activity" className="section-wrapper">
          <CodingStats />
        </div>

        {/* ── PROJECTS ────────────────────────────────────── */}
        <div id="projects" className="section-wrapper">
          <Projects />
        </div>

        {/* ── EXPERIENCE ──────────────────────────────────── */}
        <div id="experience" className="section-wrapper">
          <Experience />
        </div>

        <div id="achievements" className="section-wrapper">
        <Achievements />
        </div>

        {/* ── CERTIFICATIONS ──────────────────────────────── */}
        <div id="certifications" className="section-wrapper">
          <Certifications />
        </div>

        {/* ── AI TOOLS ────────────────────────────────────── */}
        <div id="ai-tools" className="section-wrapper">
          <AIToolsKnown />
        </div>

        {/* ── CONTACT ─────────────────────────────────────── */}
        <div id="contact" className="section-wrapper">
          <Contact />
        </div>
      </div>

      <style>{`
        .section-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: auto;
        }
        .portfolio-scroll::-webkit-scrollbar { width: 3px; }
        .portfolio-scroll::-webkit-scrollbar-track { background: transparent; }
        .portfolio-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--gold), var(--gold-warm));
          border-radius: 999px;
        }
      `}</style>
    </>
  );
}
