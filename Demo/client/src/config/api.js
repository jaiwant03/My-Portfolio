/**
 * api.js — single source of truth for the backend base URL.
 *
 * In development:  reads VITE_API_URL from client/.env  → http://localhost:5000
 * In production:   reads VITE_API_URL from Vercel env vars → https://your-app.onrender.com
 *
 * Vite exposes only variables prefixed with VITE_ to the browser bundle.
 * Falls back to localhost so the app still works if the variable is missing.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default API_BASE_URL;
