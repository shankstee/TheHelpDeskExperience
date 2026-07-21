import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// HELPDESK_BASE lets the built app be served from a subpath
// (e.g. shanks.software/work/helpdesk) without code changes.
export default defineConfig({
  plugins: [react()],
  base: process.env.HELPDESK_BASE ?? "/",
});
