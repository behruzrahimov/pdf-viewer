import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.MODE,
  root: __dirname,
  base: "",
  server: {
    fs: {
      strict: true,
    },
    port: 3000,
  },
  build: {
    sourcemap: true,
    target: "chrome106",
    outDir: process.env.MODE !== "development" ? "build" : "_",
    assetsDir: ".",
    rollupOptions: {
      input: path.join(__dirname, "index.html"),
    },
    // emptyOutDir: true,
    reportCompressedSize: false,
    // commonjsOptions: {
    //   include: [
    //   ],
    // },
  },
  esbuild: {
    keepNames: true,
  },
  optimizeDeps: {
    // include: [],
    // target: es2020 added as workaround to make big ints work
    // https://github.com/vitejs/vite/issues/9062#issuecomment-1182818044
    esbuildOptions: {
      target: "esnext",
    },
  },

  plugins: [
    react(),
    // @ts-ignore
    typeof wasm.default === "function" ? wasm.default() : wasm(),
    // @ts-ignore
    typeof topLevelAwait.default === "function"
      ? // @ts-ignore
        topLevelAwait.default()
      : // @ts-ignore
        topLevelAwait(),
    // renderer.vite({
    //   preloadEntry: path.join(__dirname, "../desktop-preload/src/index.tsx"),
    // }),
  ],
  define:
    process.env.MODE !== "development"
      ? {
          "process.env.NODE_DEBUG": "false",
        }
      : {
          "process.env.NODE_DEBUG": "false",
          global: "globalThis",
        },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
