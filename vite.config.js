import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/macos-reminders-app-clone-react/",
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": `${path.resolve(__dirname, "src/assets")}`,
      "@components": `${path.resolve(__dirname, "src/components")}`,
      "@contexts": `${path.resolve(__dirname, "src/contexts")}`,
      "@hooks": `${path.resolve(__dirname, "src/hooks")}`,
      "@lib": `${path.resolve(__dirname, "src/lib")}`,
      "@pages": `${path.resolve(__dirname, "src/pages")}`,
      "@routes": `${path.resolve(__dirname, "src/routes")}`,
      "@stores": `${path.resolve(__dirname, "src/stores")}`,
      "@utils": `${path.resolve(__dirname, "src/utils")}`,
      public: `${path.resolve(__dirname, "public")}`,
    },
  },
});
