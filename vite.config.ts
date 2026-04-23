import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/intelligent-octopus-slots-card.ts",
      formats: ["es"],
      fileName: () => "intelligent-octopus-slots-card.js",
    },
    outDir: "dist",
    sourcemap: false,
    target: "es2021",
  },
});
