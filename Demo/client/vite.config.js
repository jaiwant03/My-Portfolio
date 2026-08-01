/**
 * vite.config.js
 *
 * Changes made for production deployment:
 *
 * 1. build.outDir — explicitly set to "dist" (Vercel default; makes it
 *    unambiguous when the deploy command is run from the client/ folder).
 *
 * 2. build.sourcemap — false in production to keep bundle size small and
 *    avoid leaking source code on Vercel.
 *
 * No other options changed — plugins, routing, or component behaviour
 * are completely untouched.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
