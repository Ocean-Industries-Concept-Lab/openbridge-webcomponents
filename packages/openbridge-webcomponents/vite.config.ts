import postcssLit from 'rollup-plugin-postcss-lit';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import glob from 'glob';

const input = glob.sync('src/**/*.ts', {ignore: ['src/**/*.stories.ts']});

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
        input: input,
        external: (id) =>
          (id.startsWith('.') && !id.endsWith('?inline')) ||
          id.startsWith('lit') ||
          id.startsWith('@lit'),
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
    plugins: [
      postcssLit(),
      dts({
        clearPureImport: false,
      }),
    ],
  };
});
