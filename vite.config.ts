import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const isStaticBuild = process.env.STATIC_BUILD === "1";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        entry: "server",
        ...(isStaticBuild && {
          preset: "static",
          prerender: { routes: ["/"] },
        }),
      },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  base: process.env.VITE_BASE_URL ?? "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
