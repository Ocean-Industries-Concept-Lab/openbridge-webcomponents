import postcssLit from 'rollup-plugin-postcss-lit';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return {
    build: {
      minify: false,
      lib: {
        entry: 'src/index.ts',
        name: 'openbridge-webcomponents',
        fileName: 'openbridge-webcomponents',
        formats: ['es'],
      },
      rollupOptions: {
        input: [
          'src/index.ts',
          'src/components/app-button/app-button.ts',
          'src/icons/index.ts',
        ],
        external: [/^lit/, /^@lit/],
        preserveEntrySignatures: 'strict',
        output: {
          format: 'es',
          entryFileNames: (opt) => {
            return `${opt.name}.js`;
          },
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: 'src',
          inlineDynamicImports: false,
        },
      },
    },
    plugins: [postcssLit(), dts()],
  };
});
