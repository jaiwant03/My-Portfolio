import "../styles/auth.css";
import "../styles/bear.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CustomCursor from "../components/CustomCursor";
import AuthBackground from "../components/AuthBackground";
import API_BASE_URL from "../config/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // 🐻 Bear state
  const [look, setLook] = useState("center");
  const [hideEyes, setHideEyes] = useState(false);

  // ✅ GOOGLE LOGIN HANDLER (MOST IMPORTANT FIX)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true }); // 👉 GO TO HOME
    }
  }, [navigate]);

  // 👀 Bear looks while typing email
  const handleEmail = (e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });

    if (value.length < 4) setLook("left");
    else if (value.length < 10) setLook("center");
    else setLook("right");
  };

  // 🔐 Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google login redirect
  const handleGoogleLogin = () => {
    const url = `${API_BASE_URL}/auth/google`;
    console.log("Google OAuth redirect →", url); // debug: confirm correct URL
    window.location.href = url;
  };

  return (
    <div className="auth-page">
      <div className="auth-scroll-wrapper">
        <div className="auth-sticky-container">
          <AuthBackground />
          <CustomCursor />
          <div className="auth-card">

            {/* 🐻 Bear */}
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

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* 🌐 GOOGLE LOGIN BUTTON */}
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </button>

            <p>
              Don’t have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
