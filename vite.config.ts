import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compression from 'vite-plugin-compression';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  build : {
    minify: true, // enable minification
    target: "esbuild", // target modern browsers
    outDir: "dist", // output directory
    sourcemap: true, // generate source maps for debugging
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      }
    }
  },
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz', // optional: .gz extension
      threshold: 1024, // only assets bigger than 1KB are compressed
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
