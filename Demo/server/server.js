/**
 * server.js
 *
 * Changes made for production deployment:
 *
 * 1. PORT fallback — process.env.PORT || 5000
 *    Render injects its own PORT at runtime. Without the fallback, if PORT
 *    is ever undefined the server crashes silently.
 *
 * 2. CORS — now accepts an array of allowed origins (CLIENT_URL for
 *    production + localhost:5173 for local development). A single
 *    CLIENT_URL string that only contains the Vercel URL would break
 *    local development; the array covers both environments without
 *    opening CORS to every origin.
 *
 * 3. Health-check route — GET /health returns 200 OK.
 *    Render uses this to confirm the service started successfully and
 *    to route its keep-alive pings. Without it the first request after
 *    a cold-start may time out.
 *
 * Everything else (routes, middleware order, passport config) is identical
 * to the original file.
 */

const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const connectDB        = require("./config/db");
require("./config/passport");
const passport         = require("passport");
const contactRoutes    = require("./routes/contactRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Database ─────────────────────────────────────────────────
connectDB();

// ── CORS ─────────────────────────────────────────────────────
// Allowed origins:
//   • CLIENT_URL  → production Vercel frontend (set in Render env vars)
//   • localhost   → local Vite dev server
const allowedOrigins = [
  process.env.CLIENT_URL,          // e.g. https://your-app.vercel.app
  "http://localhost:5173",          // Vite default dev port
  "http://localhost:4173",          // Vite preview port
].filter(Boolean);                  // removes undefined if CLIENT_URL not set

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Render health pings)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json());

// ── Passport ──────────────────────────────────────────────────
app.use(passport.initialize());

// ── Health check (required by Render) ────────────────────────
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ── Routes ────────────────────────────────────────────────────
app.use("/api",          require("./routes/authRoutes"));
app.use("/auth",         require("./routes/googleAuthRoutes"));
app.use("/api/contact",  contactRoutes);

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
