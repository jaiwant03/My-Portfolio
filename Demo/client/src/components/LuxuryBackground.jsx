import { useEffect, useRef } from "react";

/**
 * LuxuryBackground  v2
 * ─────────────────────────────────────────────────────────────
 * Premium animated canvas background — fixed behind entire portfolio.
 *
 * Features (enhanced):
 *  • Deep multi-layered radial bloom (mouse-reactive)
 *  • Flowing metallic gold light waves  (4 layers)
 *  • Glowing ribbon lines               (3 layers)
 *  • Floating shimmer particles         (100 particles)
 *  • Constellation connecting lines     (proximity graph)
 *  • Rotating aurora arcs               (2 slow arcs)
 *  • Scroll-reactive bloom expansion
 *  • Golden fog streaks                 (3 drifting blobs)
 *  • Subtle vignette frame
 *  • GPU-accelerated via will-change / transform
 */

export default function LuxuryBackground({ theme = "dark" }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const frameRef = useRef(null);
  const timeRef = useRef(0);

  /* ── Particle pool ───────────────────────────────────────── */
  const NUM_PARTICLES = 100;
  const particlesRef = useRef([]);

  useEffect(() => {
    const isDark = theme === "dark";

    /* ── Canvas setup ──────────────────────────────────────── */
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Particle factory ──────────────────────────────────── */
    const makeParticle = (forceBottom = false) => ({
      x: Math.random(),
      y: forceBottom ? 1.05 : Math.random() + 0.1,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: -(Math.random() * 0.00045 + 0.00008),
      r: Math.random() * 2.8 + 0.5,
      a: Math.random() * 0.65 + 0.20,
      life: Math.random(),
      speed: Math.random() * 0.0028 + 0.0008,
    });

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particlesRef.current.push(makeParticle());
      }
    }

    /* ── Mouse tracking ────────────────────────────────────── */
    const onMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* ── Scroll tracking ───────────────────────────────────── */
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

    /* ── Colour helpers ────────────────────────────────────── */
    const gold = (a) => isDark
      ? `rgba(255,215,0,${a})`
      : `rgba(184,118,11,${a})`;
    const gold2 = (a) => isDark
      ? `rgba(255,193,7,${a})`
      : `rgba(212,160,23,${a})`;
    const white = (a) => isDark
      ? `rgba(255,255,255,${a})`
      : `rgba(255,255,255,${a * 0.6})`;

    /* ── Draw ──────────────────────────────────────────────── */
    const draw = (timestamp) => {
      const t = timestamp * 0.00038;
      timeRef.current = t;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const sc = scrollRef.current;

      /* ─ Clear ─ */
      ctx.clearRect(0, 0, W, H);

      /* ─ 1. Deep background fill ─ */
      ctx.fillStyle = isDark ? "#050505" : "#F5F2EA";
      ctx.fillRect(0, 0, W, H);

      /* ─ 2. Primary radial bloom (mouse-reactive) ─ */
      const bx = (0.5 + (mx - 0.5) * 0.14) * W;
      const by = (0.5 + (my - 0.5) * 0.14) * H;
      const br = (0.60 + sc * 0.28) * Math.max(W, H);
      const gBloom = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      if (isDark) {
        gBloom.addColorStop(0, `rgba(255,215,0,${0.09 + sc * 0.05})`);
        gBloom.addColorStop(0.25, `rgba(255,193,7,${0.05 + sc * 0.03})`);
        gBloom.addColorStop(0.55, `rgba(255,140,0,${0.02})`);
        gBloom.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        gBloom.addColorStop(0, `rgba(212,160,23,${0.14 + sc * 0.07})`);
        gBloom.addColorStop(0.25, `rgba(184,118,11,${0.07 + sc * 0.04})`);
        gBloom.addColorStop(1, "rgba(245,242,234,0)");
      }
      ctx.fillStyle = gBloom;
      ctx.fillRect(0, 0, W, H);

      /* ─ 3. Secondary offset bloom (opposite corner) ─ */
      const bx2 = (1 - mx * 0.10) * W;
      const by2 = (1 - my * 0.10) * H;
      const br2 = 0.40 * Math.max(W, H);
      const gBloom2 = ctx.createRadialGradient(bx2, by2, 0, bx2, by2, br2);
      gBloom2.addColorStop(0, gold(isDark ? 0.05 : 0.08));
      gBloom2.addColorStop(1, gold(0));
      ctx.fillStyle = gBloom2;
      ctx.fillRect(0, 0, W, H);

      /* ─ 4. Gold light waves (4 layers) ─ */
      for (let w = 0; w < 4; w++) {
        const phase = t + w * Math.PI * 0.55;
        const amp = H * (0.055 + w * 0.012);
        const yBase = H * (0.18 + w * 0.19);
        const alpha = isDark ? (0.032 - w * 0.006) : (0.048 - w * 0.009);

        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 3) {
          const y = yBase
            + Math.sin((x / W) * Math.PI * 3.2 + phase) * amp
            + Math.sin((x / W) * Math.PI * 5.8 - phase * 1.4) * amp * 0.38
            + Math.sin((x / W) * Math.PI * 1.5 + phase * 0.6) * amp * 0.22;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();

        const wg = ctx.createLinearGradient(0, yBase - amp, 0, yBase + amp * 2);
        wg.addColorStop(0, gold(0));
        wg.addColorStop(0.42, gold(alpha * 1.3));
        wg.addColorStop(0.7, gold(alpha));
        wg.addColorStop(1, gold(0));
        ctx.fillStyle = wg;
        ctx.fill();
      }

      /* ─ 5. Glowing ribbon strokes (3 layers) ─ */
      for (let r = 0; r < 3; r++) {
        const rp = t * 0.65 + r * 2.2;
        ctx.beginPath();
        ctx.moveTo(-50, H * (0.28 + r * 0.22));
        for (let x = 0; x <= W + 50; x += 2) {
          const y = H * (0.28 + r * 0.22)
            + Math.sin((x / W) * Math.PI * 2.2 + rp) * H * 0.065
            + Math.sin((x / W) * Math.PI * 4.5 - rp * 0.75) * H * 0.028;
          ctx.lineTo(x, y);
        }
        const rAlpha = isDark ? (0.07 - r * 0.015) : (0.06 - r * 0.012);
        ctx.strokeStyle = gold(rAlpha);
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      /* ─ 6. Aurora arcs (2 slow rotating) ─ */
      for (let a = 0; a < 2; a++) {
        const aPhase = t * 0.18 + a * Math.PI;
        const aCx = W * (0.5 + Math.cos(aPhase) * 0.22);
        const aCy = H * (0.5 + Math.sin(aPhase * 0.7) * 0.18);
        const aRx = W * (0.38 + a * 0.08);
        const aRy = H * (0.24 + a * 0.06);

        ctx.beginPath();
        ctx.ellipse(aCx, aCy, aRx, aRy, aPhase * 0.3, 0, Math.PI * 2);
        const aAlpha = isDark ? 0.018 : 0.025;
        ctx.strokeStyle = a === 0 ? gold(aAlpha) : gold2(aAlpha * 0.8);
        ctx.lineWidth = a === 0 ? 1.5 : 1.0;
        ctx.stroke();
      }

      /* ─ 7. Particles + constellation lines ─ */
      const particles = particlesRef.current;
      const px = [], py = [];

      particles.forEach((p, i) => {
        /* update */
        p.x += p.vx + (mx - 0.5) * 0.00006;
        p.y += p.vy;
        p.life += p.speed;

        if (p.y < -0.06 || p.life > 1) {
          Object.assign(p, makeParticle(true));
        }

        const fade = Math.sin(p.life * Math.PI);
        const wpx = p.x * W;
        const wpy = p.y * H;
        px[i] = wpx;
        py[i] = wpy;

        /* Core dot */
        ctx.beginPath();
        ctx.arc(wpx, wpy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = gold(p.a * fade * (isDark ? 0.75 : 0.55));
        ctx.fill();

        /* Halo glow */
        const halo = ctx.createRadialGradient(wpx, wpy, 0, wpx, wpy, p.r * 4);
        halo.addColorStop(0, gold(p.a * fade * 0.18));
        halo.addColorStop(1, gold(0));
        ctx.beginPath();
        ctx.arc(wpx, wpy, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      });

      /* Constellation connecting lines (proximity graph) */
      const CONNECT_DIST = W * 0.088;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const lineAlpha = (1 - d / CONNECT_DIST) * (isDark ? 0.12 : 0.09);
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.strokeStyle = gold(lineAlpha);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* ─ 8. Golden fog streak blobs (3 drifting) ─ */
      for (let s = 0; s < 3; s++) {
        const sx = W * (0.08 + s * 0.38 + Math.sin(t * 0.28 + s * 1.9) * 0.07);
        const sy = H * (0.12 + s * 0.30 + Math.cos(t * 0.22 + s * 1.5) * 0.05);
        const sr = W * (0.20 + sc * 0.07);
        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
        const sa = isDark ? (0.045 + s * 0.005) : 0.065;
        sg.addColorStop(0, gold(sa));
        sg.addColorStop(0.5, gold(sa * 0.35));
        sg.addColorStop(1, gold(0));
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, W, H);
      }

      /* ─ 9. Subtle corner vignette ─ */
      {
        const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, Math.max(W, H) * 0.85);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, isDark ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0.06)");
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, W, H);
      }

      /* ─ 10. Mouse spotlight highlight ─ */
      {
        const spR = 180 + sc * 80;
        const sp = ctx.createRadialGradient(mx * W, my * H, 0, mx * W, my * H, spR);
        sp.addColorStop(0, gold(isDark ? 0.06 : 0.04));
        sp.addColorStop(0.5, gold(isDark ? 0.025 : 0.018));
        sp.addColorStop(1, gold(0));
        ctx.fillStyle = sp;
        ctx.fillRect(0, 0, W, H);
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", onScroll);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
