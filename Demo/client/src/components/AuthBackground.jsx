import { useEffect, useRef } from "react";
import "../styles/AuthBackground.css";

export default function AuthBackground() {
  const containerRef = useRef(null);
  const layer1GlowsRef = useRef(null);
  const layer2RibbonsRef = useRef(null);
  const layer3ReflectionsRef = useRef(null);
  const layer4ContoursRef = useRef(null);

  const scrollState = useRef({
    current: 0,
    target: 0,
    active: true,
  });

  useEffect(() => {
    scrollState.current.active = true;

    // Detect scroll container (usually .auth-page) and calculate normalized progress (0 to 1)
    const handleScroll = () => {
      if (!scrollState.current.active) return;
      
      const authPage = document.querySelector(".auth-page");
      if (authPage) {
        const pageScroll = authPage.scrollTop;
        const pageMax = authPage.scrollHeight - authPage.clientHeight;
        if (pageMax > 0) {
          scrollState.current.target = pageScroll / pageMax;
          return;
        }
      }

      // Fallback to window-level scrolling just in case
      const winScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const winMax = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      if (winMax > 0) {
        scrollState.current.target = winScroll / winMax;
      }
    };

    // Attach listeners on both window and auth-page
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const authPage = document.querySelector(".auth-page");
    if (authPage) {
      authPage.addEventListener("scroll", handleScroll, { passive: true });
    }

    let frameId;
    
    // Core update loop using requestAnimationFrame
    const updateTransforms = () => {
      if (!scrollState.current.active) return;

      const state = scrollState.current;
      
      // Let's use interpolation (lerping) for buttery-smooth kinetic scrolling
      const lerpingFactor = 0.08;
      state.current += (state.target - state.current) * lerpingFactor;

      const progress = state.current;

      // Base target updates: translateX goes 0% to -32%, translateY goes 0% to -20%
      const baseTx = progress * -32;
      const baseTy = progress * -20;

      // Apply GPU-accelerated parallax matrices using translate3d & will-change
      if (layer1GlowsRef.current) {
        // Layer 1: Large blurred lighting - Very Slow (0.4x speed)
        const tx = baseTx * 0.4;
        const ty = baseTy * 0.4;
        layer1GlowsRef.current.style.transform = `translate3d(${tx}%, ${ty}%, 0px)`;
      }

      if (layer2RibbonsRef.current) {
        // Layer 2: Golden ribbons - Slow (0.75x speed)
        const tx = baseTx * 0.75;
        const ty = baseTy * 0.75;
        layer2RibbonsRef.current.style.transform = `translate3d(${tx}%, ${ty}%, 0px)`;
      }

      if (layer3ReflectionsRef.current) {
        // Layer 3: Glass panels / reflections - Medium (1.0x speed)
        const tx = baseTx * 1.0;
        const ty = baseTy * 1.0;
        layer3ReflectionsRef.current.style.transform = `translate3d(${tx}%, ${ty}%, 0px)`;
      }

      if (layer4ContoursRef.current) {
        // Layer 4: Thin contour lines - Fast (1.3x speed)
        const tx = baseTx * 1.35;
        const ty = baseTy * 1.35;
        layer4ContoursRef.current.style.transform = `translate3d(${tx}%, ${ty}%, 0px)`;
      }

      frameId = requestAnimationFrame(updateTransforms);
    };

    frameId = requestAnimationFrame(updateTransforms);
    
    // Sync initial positions
    handleScroll();

    return () => {
      scrollState.current.active = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      if (authPage) {
        authPage.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="auth-bg-container" ref={containerRef} aria-hidden="true">
      {/* Layer 1: Large blurred lighting (Very Slow) */}
      <div className="auth-bg-layer-glows" ref={layer1GlowsRef}>
        <div className="auth-bg-glow auth-bg-glow-1" />
        <div className="auth-bg-glow auth-bg-glow-2" />
        <div className="auth-bg-glow auth-bg-glow-3" />
        <div className="auth-bg-glow auth-bg-glow-4" />
        <div className="auth-bg-glow auth-bg-glow-5" />
      </div>

      {/* Layer 2: Golden ribbons (Slow) */}
      <div className="auth-bg-layer-ribbons" ref={layer2RibbonsRef}>
        <svg
          width="300vw"
          height="300vh"
          viewBox="0 0 3000 3000"
          preserveAspectRatio="none"
          style={{ display: "block", position: "absolute", width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="premium-gold-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9C74F" stopOpacity="0.02" />
              <stop offset="25%" stopColor="#FFC107" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#FFE082" stopOpacity="0.25" />
              <stop offset="75%" stopColor="#FFD54A" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#FFC107" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="premium-gold-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.02" />
              <stop offset="35%" stopColor="#FFD54A" stopOpacity="0.20" />
              <stop offset="65%" stopColor="#FFC107" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F9C74F" stopOpacity="0.03" />
            </linearGradient>
            <filter id="master-blur-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="25" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ribbon 1 - Main swoosh across canvas */}
          <path
            d="M -200,300 C 600,600 1200,300 1800,900 C 2400,1500 2000,2100 3200,2400 L 3200,2650 C 2000,2350 2400,1750 1800,1150 C 1200,550 600,850 -200,550 Z"
            fill="url(#premium-gold-grad-1)"
            filter="url(#master-blur-glow)"
          />

          {/* Ribbon 2 - Crossing overlay sweep */}
          <path
            d="M -200,1100 C 800,900 1600,1955 2400,1400 C 2700,1200 2900,1800 3200,2100 L 3200,2350 C 2900,2050 2700,1450 2400,1650 C 1600,2205 800,1150 -200,1350 Z"
            fill="url(#premium-gold-grad-2)"
            filter="url(#master-blur-glow)"
          />

          {/* Ribbon 3 - Vertical loop sweep */}
          <path
            d="M 500,-200 C 1000,900 900,1800 2100,2200 C 2600,2400 2800,2900 3200,3100 L 3050,3200 C 2650,3000 2450,2500 1950,2300 C 750,1900 850,900 350,-200 Z"
            fill="url(#premium-gold-grad-1)"
            filter="url(#master-blur-glow)"
          />
        </svg>
      </div>

      {/* Layer 3: Glass Reflections (Medium) */}
      <div className="auth-bg-layer-reflections" ref={layer3ReflectionsRef}>
        <div className="auth-bg-glass-panel auth-bg-glass-panel-1" />
        <div className="auth-bg-glass-panel auth-bg-glass-panel-2" />
        <div className="auth-bg-glass-panel auth-bg-glass-panel-3" />
      </div>

      {/* Layer 4: Thin Contour Lines (Fast) */}
      <div className="auth-bg-layer-contours" ref={layer4ContoursRef}>
        <svg
          width="300vw"
          height="300vh"
          viewBox="0 0 3000 3000"
          preserveAspectRatio="none"
          style={{ display: "block", position: "absolute", width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="contour-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#FFD54A" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#FFC107" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#FFE082" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFC107" stopOpacity="0.05" />
            </linearGradient>
            <filter id="contour-light-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Contour traces nested to Ribbon 1 */}
          <path
            d="M -200,240 C 600,540 1200,240 1800,840 C 2400,1440 2000,2040 3200,2340"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="1.2"
            filter="url(#contour-light-glow)"
          />
          <path
            d="M -200,360 C 600,660 1200,360 1800,960 C 2400,1560 2000,2160 3200,2460"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="0.8"
            opacity="0.65"
          />
          <path
            d="M -200,480 C 600,780 1200,480 1800,1080 C 2400,1680 2000,2280 3200,2580"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="0.8"
            opacity="0.8"
          />

          {/* Contour traces nested to Ribbon 2 */}
          <path
            d="M -200,1040 C 800,840 1600,1895 2400,1340 C 2700,1140 2900,1740 3200,2040"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="1.4"
            filter="url(#contour-light-glow)"
          />
          <path
            d="M -200,1160 C 800,960 1600,2015 2400,1460 C 2700,1260 2900,1860 3200,2160"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="0.8"
            opacity="0.55"
          />

          {/* Contour traces nested to Ribbon 3 */}
          <path
            d="M 440,-200 C 940,900 840,1800 2040,2200 C 2540,2400 2740,2900 3140,3100"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="1.2"
            filter="url(#contour-light-glow)"
          />
          <path
            d="M 560,-200 C 1060,900 960,1800 2160,2200 C 2660,2400 2860,2900 3260,3100"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="0.8"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Sweep overlay light spotlight (Rolls-Royce aesthetic) */}
      <div className="auth-bg-spotlight" />
    </div>
  );
}
