import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    build: {
      lib: {
        entry: "src/index.ts",
        name: "openbridge-webcomponents",
        fileName: 'openbridge-webcomponents',
      },
      rollupOptions: {
        external: mode === "production" ? "" : /^lit-element/,
      },
    },
    plugins: [dts()],
  };
});