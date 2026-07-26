import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

import avatar from "../assets/avatar.png";

// Tech logos
import html from "../assets/tech/html.png";
import css from "../assets/tech/css.png";
import js from "../assets/tech/js.png";
import react from "../assets/tech/react.png";
import node from "../assets/tech/node.png";
import express from "../assets/tech/express.png";
import mongodb from "../assets/tech/mongodb.png";

const techIcons = [
  html,
  css,
  js,
  react,
  node,
  express,
  mongodb
];

const Home = () => {
  const navigate = useNavigate();

  // ✅ Google login token handling (UNCHANGED)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-content">
        <span className="intro"> Hey, I am Jaiwant Karrun SA</span>
        

        <h1>
          Web <br />
          <span className="typing">Developer</span>
        </h1>

        <p className="description">
          Passionate <b>MERN Stack Developer</b> building secure, scalable,
          and modern web applications with clean UI and strong authentication.
        </p>

        <ul className="highlights">
          <li>⚡ Full-Stack Specialist</li>
          <li>🔐 JWT & Google OAuth</li>
          <li>🎨 UI Animations & UX</li>
          <li>🚀 Production-Ready Code</li>
        </ul>

        <div className="hero-buttons">
          <button className="primary-btn">Hire me</button>

          {/* ✅ RESUME DOWNLOAD */}
        <a
  href="/Jaiwant_Karrun_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="secondary-btn"
>
  View Resume
</a>
        </div>
      </div>

      {/* RIGHT SIDE VISUAL */}
      <div className="hero-visual">
        <div className="orbit-container">
          {techIcons.map((icon, index) => (
            <div
              key={index}
              className="orbit-icon"
              style={{ "--i": index }}
            >
              <img src={icon} alt="tech" />
            </div>
          ))}
        </div>

        <img
          src={avatar}
          alt="Developer Avatar"
          className="avatar"
        />
      </div>
    </section>
  );
};

export default Home;
