import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".portfolio-scroll");
    if (!el) return;

    const handleScroll = () => {
      // Display standard scroll up button when scrolled down by 400px
      setIsVisible(el.scrollTop > 400);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(".portfolio-scroll");
    if (el) {
      el.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <button
      className={`scroll-to-top-btn ${isVisible ? "visible" : ""}`}
      onClick={handleClick}
      aria-label="Scroll to Top"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}
