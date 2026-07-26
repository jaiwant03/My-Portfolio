import { useEffect, useRef, useState } from "react";
import "./activityBackground.css";

export default function ActivityBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const frameRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);
  const NUM_PARTICLES = 70; // Optimized for isolated container performance

  // Dynamically observe theme attribute from documentElement (preventing global props modification)
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Particle factory
    const makeParticle = (forceBottom = false) => ({
      x: Math.random(),
      y: forceBottom ? 1.05 : Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: -(Math.random() * 0.00035 + 0.00006),
      r: Math.random() * 2.2 + 0.4,
      a: Math.random() * 0.55 + 0.15,
      life: Math.random(),
      speed: Math.random() * 0.0022 + 0.0006
    });

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particlesRef.current.push(makeParticle());
      }
    }

    // Mouse tracker
    const onMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scroll tracker relative to portfolio container
    const onScroll = (e) => {
      const el = e.target;
      if (el && el.scrollHeight) {
        scrollRef.current = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
      }
    };
    const scrollContainer = document.querySelector(".portfolio-scroll");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    }

    // Colors
    const gold = (a) => isDark ? `rgba(255,215,0,${a})` : `rgba(184,118,11,${a})`;
    const gold2 = (a) => isDark ? `rgba(255,193,7,${a})` : `rgba(212,160,23,${a})`;

    const draw = (timestamp) => {
      const t = timestamp * 0.00035;
      timeRef.current = t;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const sc = scrollRef.current;

      ctx.clearRect(0, 0, W, H);

      // 1. Deep luxury base background
      ctx.fillStyle = isDark ? "#050505" : "#fdfbf7";
      ctx.fillRect(0, 0, W, H);

      // 2. Primary radial bloom matching luxury mouse highlight
      const bx = (0.5 + (mx - 0.5) * 0.12) * W;
      const by = (0.4 + (my - 0.4) * 0.12) * H;
      const br = (0.55 + sc * 0.22) * Math.max(W, H);
      const gBloom = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      
      if (isDark) {
        gBloom.addColorStop(0, `rgba(255,215,0,${0.08 + sc * 0.04})`);
        gBloom.addColorStop(0.3, `rgba(255,193,7,${0.04 + sc * 0.02})`);
        gBloom.addColorStop(0.6, `rgba(255,140,0,0.015)`);
        gBloom.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        gBloom.addColorStop(0, `rgba(212,160,23,${0.12 + sc * 0.05})`);
        gBloom.addColorStop(0.3, `rgba(184,118,11,${0.06 + sc * 0.02})`);
        gBloom.addColorStop(1, "rgba(253,251,247,0)");
      }
      ctx.fillStyle = gBloom;
      ctx.fillRect(0, 0, W, H);

      // 3. Golden waves (3 layers)
      for (let w = 0; w < 3; w++) {
        const phase = t + w * Math.PI * 0.6;
        const amp = H * (0.045 + w * 0.01);
        const yBase = H * (0.22 + w * 0.24);
        const alpha = isDark ? (0.026 - w * 0.005) : (0.04 - w * 0.007);

        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 4) {
          const y = yBase
            + Math.sin((x / W) * Math.PI * 2.8 + phase) * amp
            + Math.sin((x / W) * Math.PI * 4.8 - phase * 1.25) * amp * 0.32;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();

        const wg = ctx.createLinearGradient(0, yBase - amp, 0, yBase + amp * 1.8);
        wg.addColorStop(0, gold(0));
        wg.addColorStop(0.4, gold(alpha * 1.2));
        wg.addColorStop(0.7, gold(alpha));
        wg.addColorStop(1, gold(0));
        ctx.fillStyle = wg;
        ctx.fill();
      }

      // 4. Floating gold constellations
      const particles = particlesRef.current;
      const px = [];
      const py = [];

      particles.forEach((p, idx) => {
        p.x += p.vx + (mx - 0.5) * 0.00004;
        p.y += p.vy;
        p.life += p.speed;

        if (p.y < -0.05 || p.life > 1) {
          Object.assign(p, makeParticle(true));
        }

        const fade = Math.sin(p.life * Math.PI);
        const wpx = p.x * W;
        const wpy = p.y * H;
        px[idx] = wpx;
        py[idx] = wpy;

        // Draw dot
        ctx.beginPath();
        ctx.arc(wpx, wpy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = gold(p.a * fade * (isDark ? 0.65 : 0.45));
        ctx.fill();
        
        // Draw glow aura
        const halo = ctx.createRadialGradient(wpx, wpy, 0, wpx, wpy, p.r * 3.5);
        halo.addColorStop(0, gold(p.a * fade * 0.15));
        halo.addColorStop(1, gold(0));
        ctx.beginPath();
        ctx.arc(wpx, wpy, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      });

      // Connections
      const CONNECT_DIST = W * 0.09;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const lineAlpha = (1 - d / CONNECT_DIST) * (isDark ? 0.08 : 0.06);
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.strokeStyle = gold(lineAlpha);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // 5. Ambient fog blobs (2 drifting)
      for (let s = 0; s < 2; s++) {
        const sx = W * (0.15 + s * 0.45 + Math.sin(t * 0.22 + s * 2.2) * 0.08);
        const sy = H * (0.2 + s * 0.35 + Math.cos(t * 0.18 + s * 1.6) * 0.06);
        const sr = W * (0.24 + sc * 0.06);
        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
        const sa = isDark ? 0.038 : 0.05;
        sg.addColorStop(0, gold(sa));
        sg.addColorStop(0.5, gold(sa * 0.3));
        sg.addColorStop(1, gold(0));
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, W, H);
      }

      // 6. Corner Vignette
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, Math.max(W, H) * 0.85);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, isDark ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.05)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", onScroll);
      }
    };
  }, [theme]);

  return (
    <div className="activity-background-container" aria-hidden="true">
      <canvas ref={canvasRef} className="activity-bg-canvas" />
    </div>
  );
}
