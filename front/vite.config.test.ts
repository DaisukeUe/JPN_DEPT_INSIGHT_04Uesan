import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    exclude: ["e2e/**", "**/*.e2e.test.*", "node_modules/**", "dist/**"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
