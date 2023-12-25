import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'openbridge-webcomponents',
        fileName: 'openbridge-webcomponents',
        formats: ['es'],
      },
      rollupOptions: {
        external: mode === 'production' ? '' : /^lit-element/,
        preserveEntrySignatures: "strict",
        output: {
          format: 'es',
          entryFileNames: (opt) => {
            return `${opt.name}.js`},
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: 'src',
          inlineDynamicImports: false
        },
      },
    },
    plugins: [dts()],
  };
});
