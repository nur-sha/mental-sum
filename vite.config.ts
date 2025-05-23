import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/mental-sum",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

//https://app.uizard.io/prototypes/8XgqYRzj43uqX63e09Pl
