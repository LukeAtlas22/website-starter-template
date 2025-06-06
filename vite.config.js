import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Root folder where source files are
  root:  resolve(__dirname, "src/"),
  publicDir: '../public',
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/index.html"),
      },
    },
  },
});