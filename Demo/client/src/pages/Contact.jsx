import { useState } from "react";
import "../styles/contact.css";
import API_BASE_URL from "../config/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully! ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "Failed to send message ❌");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
       <div className="snow-layer"></div>
      <div className="snow-ground"></div>
      {/* HEADER */}
      <div className="contact-header">
        <h1>Let&apos;s Build Something Together</h1>
        <p>Have a project in mind? Let&apos;s connect and make it happen!</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="contact-wrapper">
        {/* LEFT - FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "✈️ Send Message"}
          </button>
        </form>

        {/* RIGHT - CONTACT INFO */}
        <div className="contact-info">
          <h2>Connect With Me</h2>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/jaiwant-karrun-s-a-93792a327"
            target="_blank"
            rel="noreferrer"
            className="info-card"
          >
            💼 LinkedIn
          </a>

          {/* EMAIL (GMAIL COMPOSE) */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jaisam710@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="info-card"
          >
            ✉️ Email
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/jaiwant03"
            target="_blank"
            rel="noreferrer"
            className="info-card"
          >
            🧑‍💻 GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
