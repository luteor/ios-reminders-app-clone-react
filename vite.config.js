import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": `${path.resolve(__dirname, "src/assets")}`,
      "@components": `${path.resolve(__dirname, "src/components")}`,
      "@contexts": `${path.resolve(__dirname, "src/contexts")}`,
      "@hooks": `${path.resolve(__dirname, "src/hooks")}`,
      "@utils": `${path.resolve(__dirname, "src/utils")}`,
      "@public": `${path.resolve(__dirname, "public")}`,
    },
  },
});
