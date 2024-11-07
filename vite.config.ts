import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import path from "path";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: ["./src/projects/svg-guide/project.ts"],
    }),
    ffmpeg(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
