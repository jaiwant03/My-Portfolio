import "../styles/auth.css";
import "../styles/bear.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CustomCursor from "../components/CustomCursor";
import AuthBackground from "../components/AuthBackground";
import API_BASE_URL from "../config/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // 🐻 Bear state (EXACT SAME AS LOGIN)
  const [look, setLook] = useState("center");
  const [hideEyes, setHideEyes] = useState(false);

  // 👀 Bear looks while typing email
  const handleEmail = (e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });

    if (value.length < 4) setLook("left");
    else if (value.length < 10) setLook("center");
    else setLook("right");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/signup`,
        form
      );
      alert(res.data.message || "Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-scroll-wrapper">
        <div className="auth-sticky-container">
          <AuthBackground />
          <CustomCursor />
          <div className="auth-card">

            {/* 🐻 SAME BEAR AS LOGIN */}
            <div className="bear-wrapper">
              <div className={`bear ${hideEyes ? "hide-eyes" : ""} ${look}`}>
                <div className="ear left-ear"></div>
                <div className="ear right-ear"></div>

                <div className="face">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                  <div className="nose"></div>
                </div>

                <div className="hand left-hand"></div>
                <div className="hand right-hand"></div>
              </div>
            </div>

            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                onFocus={() => setHideEyes(false)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleEmail}
                onFocus={() => setHideEyes(false)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                onFocus={() => setHideEyes(true)}
                onBlur={() => setHideEyes(false)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>

            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
