import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/ha-light-card.ts"),
      formats: ["es"],
      fileName: () => "ha-light-card.js"
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    target: "es2022",
    rollupOptions: {
      output: {
        entryFileNames: "ha-light-card.js",
        inlineDynamicImports: true
      }
    }
  }
});
