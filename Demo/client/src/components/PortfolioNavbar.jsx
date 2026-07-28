import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { id: "home",           label: "Home"           },
  { id: "about",          label: "About"          },
  { id: "skills",         label: "Skills"         },
  { id: "coding-activity",label: "Activity"       },
  { id: "projects",       label: "Projects"       },
  { id: "experience",     label: "Experience"     },
  { id: "achievements",   label: "Achievements"   },
  { id: "certifications", label: "Certifications" },
  { id: "ai-tools",       label: "AI Tools"       },
  { id: "contact",        label: "Contact"        },
];

export default function PortfolioNavbar({
  activeSection,
  onNavClick,
  theme = "dark",
  onToggleTheme,
}) {
  const navigate  = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* darken nav slightly once user has scrolled */
  useEffect(() => {
    const el = document.querySelector(".portfolio-scroll");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    if (onNavClick) onNavClick(item.id);
  };

  /* ── colours driven by theme ──────────────────────────── */
  const isDark = theme === "dark";
  const navBg  = isDark
    ? `rgba(5,5,5,${scrolled ? 0.88 : 0.72})`
    : `rgba(248,246,240,${scrolled ? 0.95 : 0.82})`;
  const borderCol = isDark
    ? "rgba(255,215,0,0.18)"
    : "rgba(184,134,11,0.20)";
  const activeColor   = isDark ? "#FFD700" : "#B8860B";
  const inactiveColor = isDark ? "rgba(255,255,255,0.60)" : "rgba(13,11,8,0.62)";
  const activeBg      = isDark ? "rgba(255,215,0,0.10)" : "rgba(184,134,11,0.10)";
  const activeBorder  = isDark ? "rgba(255,215,0,0.30)" : "rgba(184,134,11,0.30)";
  const logoGrad      = isDark
    ? "linear-gradient(135deg,#FFC107,#FFD700)"
    : "linear-gradient(135deg,#B8860B,#C9A84C)";
  const logoutBg      = isDark ? "rgba(255,215,0,0.07)" : "rgba(184,134,11,0.07)";
  const logoutBorder  = isDark ? "rgba(255,215,0,0.25)" : "rgba(184,134,11,0.25)";
  const logoutColor   = isDark ? "rgba(255,215,0,0.85)" : "rgba(139,105,20,0.88)";

  return (
    <nav style={{
      position:       "fixed",
      top: 0, left: 0, right: 0,
      zIndex:         1000,
      height:         "68px",
      padding:        "0 clamp(12px,3vw,36px)",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      gap:            "2px",
      flexWrap:       "nowrap",
      background:     navBg,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderBottom:   `1px solid ${borderCol}`,
      boxShadow:      `0 1px 0 ${borderCol}, 0 4px 32px rgba(0,0,0,${isDark?0.5:0.08})`,
      transition:     "background 0.4s ease, box-shadow 0.4s ease",
    }}>

      {/* ── Logo ──────────────────────────────────────────── */}
      <span style={{
        position:   "absolute",
        left:       "clamp(12px,3vw,36px)",
        fontFamily: "'Playfair Display',Georgia,serif",
        fontWeight: 900,
        fontSize:   "1.15rem",
        letterSpacing: "-0.02em",
        background: logoGrad,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:  "transparent",
        backgroundClip: "text",
        userSelect: "none",
        cursor:     "default",
      }}>JK</span>

      {/* ── Nav links ─────────────────────────────────────── */}
      {navItems.map(item => {
        const active = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={e => handleClick(e, item)}
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              padding:        "6px 12px",
              borderRadius:   "999px",
              fontSize:       "0.82rem",
              fontWeight:     active ? 700 : 500,
              letterSpacing:  "0.02em",
              color:          active ? activeColor : inactiveColor,
              background:     active ? activeBg    : "transparent",
              border:         `1px solid ${active ? activeBorder : "transparent"}`,
              textDecoration: "none",
              textShadow:     active ? `0 0 14px ${isDark?"rgba(255,215,0,0.4)":"rgba(184,134,11,0.35)"}` : "none",
              transition:     "all 0.25s ease",
              cursor:         "pointer",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.color      = activeColor;
                e.currentTarget.style.background = activeBg;
                e.currentTarget.style.border     = `1px solid ${activeBorder}`;
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.color      = inactiveColor;
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.border     = "1px solid transparent";
              }
            }}
          >
            {item.label}
          </a>
        );
      })}

      {/* ── Right controls ────────────────────────────────── */}
      <div style={{
        position:   "absolute",
        right:      "clamp(12px,3vw,36px)",
        display:    "flex",
        alignItems: "center",
        gap:        "10px",
      }}>
        {/* Theme toggle */}
        {onToggleTheme && (
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle colour theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            display:      "inline-flex",
            alignItems:   "center",
            gap:          "6px",
            padding:      "7px 16px",
            borderRadius: "999px",
            background:   logoutBg,
            border:       `1px solid ${logoutBorder}`,
            color:        logoutColor,
            fontWeight:   600,
            fontSize:     "0.8rem",
            letterSpacing:"0.04em",
            cursor:       "pointer",
            transition:   "all 0.25s ease",
            whiteSpace:   "nowrap",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background  = isDark?"rgba(255,215,0,0.14)":"rgba(184,134,11,0.14)";
            e.currentTarget.style.borderColor = isDark?"rgba(255,215,0,0.50)":"rgba(184,134,11,0.50)";
            e.currentTarget.style.color       = activeColor;
            e.currentTarget.style.boxShadow   = "0 4px 18px var(--gold-dim)";
            e.currentTarget.style.transform   = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background  = logoutBg;
            e.currentTarget.style.borderColor = logoutBorder;
            e.currentTarget.style.color       = logoutColor;
            e.currentTarget.style.boxShadow   = "none";
            e.currentTarget.style.transform   = "none";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
