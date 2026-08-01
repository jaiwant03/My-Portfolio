/**
 * authService.js
 *
 * Changed: baseURL now reads from import.meta.env.VITE_API_URL
 * instead of the hardcoded "http://localhost:5000/api" string.
 *
 * Why required: hardcoded localhost URLs break in production because
 * Vercel's browser bundle cannot reach localhost — it must point at
 * the live Render backend URL, which is injected via the env var.
 */
import axios from "axios";
import API_BASE_URL from "../config/api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export default API;
