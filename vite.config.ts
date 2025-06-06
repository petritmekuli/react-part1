import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    // hey! 👋 over here
    globals: true,
    setupFiles: "./tests/setup.js", // assuming the test folder is in the root of our project
    coverage: {
      enabled: true,
      reporter: ["text", "html"], // 'html' enables the UI tab
      reportsDirectory: "./coverage", // optional
    },
  },
} as UserConfig);
