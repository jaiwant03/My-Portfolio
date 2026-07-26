import { useEffect, useRef, useState, useCallback } from "react";

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────────────
 * Premium luxury gold cursor with:
 *  • Smooth lagging outer ring
 *  • Glowing center dot
 *  • Trailing sparkle particles
 *  • Magnetic expansion on interactive elements
 *  • Ripple on click
 *  • Text cursor on text, pointer on links/buttons
 *  • Auto-hidden on mobile
 */
export default function CustomCursor() {
  const outerRef    = useRef(null);
  const innerRef    = useRef(null);
  const trailsRef   = useRef([]);
  const posRef      = useRef({ x: -200, y: -200 });
  const outerPosRef = useRef({ x: -200, y: -200 });
  const rafRef      = useRef(null);
  const [visible, setVisible] = useState(false);
  const [state, setState]     = useState("default"); // default | pointer | text | expand

  // ── Detect mobile ───────────────────────────────────────── //
  const isMobile = () =>
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    window.matchMedia("(pointer: coarse)").matches;

  // ── Determine cursor state from hovered element ─────────── //
  const getCursorState = useCallback((el) => {
    if (!el) return "default";
    const tag  = el.tagName?.toLowerCase() ?? "";
    const role = el.getAttribute?.("role") ?? "";
    const cursor = window.getComputedStyle(el).cursor;

    if (cursor === "text" || tag === "input" || tag === "textarea") return "text";
    if (
      tag === "a" || tag === "button" ||
      role === "button" || role === "link" ||
      cursor === "pointer" ||
      el.classList?.contains("project-card") ||
      el.classList?.contains("skill-card") ||
      el.classList?.contains("cert-category-card") ||
      el.classList?.contains("ai-tool-card") ||
      el.classList?.contains("global-cert-card") ||
      el.classList?.contains("technical-cert-card") ||
      el.classList?.contains("info-card") ||
      el.classList?.contains("primary-btn") ||
      el.classList?.contains("secondary-btn") ||
      el.classList?.contains("send-btn") ||
      el.classList?.contains("btn-gold") ||
      el.classList?.contains("orbit-icon")
    ) return "pointer";
    return "default";
  }, []);

  useEffect(() => {
    if (isMobile()) return;

    const NUM_TRAILS = 8;

    // Build trail DOM elements
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:999998;overflow:hidden;";
    document.body.appendChild(container);

    for (let i = 0; i < NUM_TRAILS; i++) {
      const t = document.createElement("div");
      const size = Math.max(3, 9 - i * 1.0);
      t.style.cssText = `
        position:fixed;
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:radial-gradient(circle, rgba(255,215,0,${0.7 - i * 0.07}) 0%, transparent 70%);
        pointer-events:none;
        transform:translate(-50%,-50%);
        will-change:transform;
        transition:opacity 0.12s ease;
      `;
      container.appendChild(t);
      trailsRef.current.push({ el: t, x: -200, y: -200 });
    }

    setVisible(true);

    // ── Mouse tracking ──────────────────────────────────────── //
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const hovered = document.elementFromPoint(e.clientX, e.clientY);
      let el = hovered;
      let found = "default";
      while (el && el !== document.body) {
        const s = getCursorState(el);
        if (s !== "default") { found = s; break; }
        el = el.parentElement;
      }
      setState(found);
    };

    // ── Click ripple ────────────────────────────────────────── //
    const onClick = (e) => {
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position:fixed;
        left:${e.clientX}px; top:${e.clientY}px;
        width:4px; height:4px;
        border-radius:50%;
        border:1.5px solid rgba(255,215,0,0.9);
        transform:translate(-50%,-50%) scale(1);
        pointer-events:none;
        z-index:999999;
        animation:cursorRipple 0.6s cubic-bezier(0,0.2,0.8,1) forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };

    window.addEventListener("mousemove",   onMove,   { passive: true });
    window.addEventListener("click",       onClick);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter",  () => setVisible(true));

    // ── Animation loop ──────────────────────────────────────── //
    const EASE_OUTER = 0.12;

    const animate = () => {
      const { x, y }   = posRef.current;
      const op          = outerPosRef.current;
      op.x += (x - op.x) * EASE_OUTER;
      op.y += (y - op.y) * EASE_OUTER;

      // outer ring
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${op.x}px, ${op.y}px) translate(-50%,-50%)`;
      }
      // inner dot — snaps immediately
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      }

      // trails — each follows the previous
      const trails = trailsRef.current;
      let prevX = x, prevY = y;
      trails.forEach((trail, i) => {
        const ease = 0.28 - i * 0.022;
        trail.x += (prevX - trail.x) * ease;
        trail.y += (prevY - trail.y) * ease;
        trail.el.style.left = `${trail.x}px`;
        trail.el.style.top  = `${trail.y}px`;
        prevX = trail.x;
        prevY = trail.y;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("click",      onClick);
      window.removeEventListener("mouseleave", () => setVisible(false));
      window.removeEventListener("mouseenter", () => setVisible(true));
      container.remove();
      trailsRef.current = [];
    };
  }, [getCursorState]);

  if (isMobile()) return null;

  // ── Cursor ring size / style by state ──────────────────── //
  const ringSize  = state === "pointer" ? 52 : state === "expand" ? 64 : 36;
  const ringBg    = state === "pointer"
    ? "rgba(255,215,0,0.10)"
    : state === "text"
    ? "transparent"
    : "transparent";
  const ringBorder = state === "text"
    ? "1.5px solid rgba(255,215,0,0.4)"
    : "1.5px solid rgba(255,215,0,0.75)";
  const ringMix   = state === "pointer" ? "difference" : "normal";
  const dotSize   = state === "text" ? 2 : 5;

  return (
    <>
      {/* Inject ripple keyframe once */}
      <style>{`
        @keyframes cursorRipple {
          0%   { transform:translate(-50%,-50%) scale(1);  opacity:1; }
          100% { transform:translate(-50%,-50%) scale(18); opacity:0; }
        }
        * { cursor: none !important; }
      `}</style>

      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          width:        `${ringSize}px`,
          height:       `${ringSize}px`,
          borderRadius: "50%",
          background:   ringBg,
          border:       ringBorder,
          boxShadow:    state === "pointer"
            ? "0 0 18px rgba(255,215,0,0.55), 0 0 40px rgba(255,215,0,0.20)"
            : "0 0 12px rgba(255,215,0,0.35)",
          pointerEvents: "none",
          zIndex:        999999,
          willChange:    "transform",
          transition:    "width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, box-shadow 0.2s ease",
          opacity:       visible ? 1 : 0,
          mixBlendMode:  ringMix,
        }}
        aria-hidden="true"
      />

      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          width:        `${dotSize}px`,
          height:       `${dotSize}px`,
          borderRadius: "50%",
          background:   "radial-gradient(circle, #FFD700 0%, #FFC107 100%)",
          boxShadow:    "0 0 10px rgba(255,215,0,0.9), 0 0 22px rgba(255,215,0,0.5)",
          pointerEvents: "none",
          zIndex:        999999,
          willChange:    "transform",
          transition:    "width 0.15s ease, height 0.15s ease",
          opacity:       visible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </>
  );
}
