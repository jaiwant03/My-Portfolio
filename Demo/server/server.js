const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const connectDB     = require("./config/db");
require("./config/passport");
const passport      = require("passport");
const contactRoutes = require("./routes/contactRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Database ──────────────────────────────────────────────────
connectDB();

// ── CORS ──────────────────────────────────────────────────────
// Strip any accidental trailing slash from CLIENT_URL so the
// origin comparison never fails due to a formatting difference.
const clientUrl = (process.env.CLIENT_URL || "").replace(/\/$/, "");

const allowedOrigins = [
  clientUrl,
  "http://localhost:5173",
  "http://localhost:4173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Render health pings, mobile)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(`CORS blocked: ${origin}`);
      console.error(`Allowed: ${allowedOrigins.join(", ")}`);
      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json());

// ── Passport ──────────────────────────────────────────────────
app.use(passport.initialize());

// ── Health check ──────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ── Routes ────────────────────────────────────────────────────
app.use("/api",         require("./routes/authRoutes"));
app.use("/auth",        require("./routes/googleAuthRoutes"));
app.use("/api/contact", contactRoutes);

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
