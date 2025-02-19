import postcssLit from 'rollup-plugin-postcss-lit';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import glob from 'glob';
import postcss from 'postcss';
import postcssConfig from './postcss.config.mjs';
import fs from 'fs';
import path from 'path';


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
      {
        name: 'custom-postcss',
        async generateBundle() {
          const inputCSS = path.resolve(__dirname, 'src/main.css'); // Your source CSS
          const outputCSS = path.resolve(__dirname, 'dist/openbridge.css'); // Destination

          if (fs.existsSync(inputCSS)) {
            const css = fs.readFileSync(inputCSS, 'utf-8');
            const result = await postcss(postcssConfig({}).plugins).process(css, {
              from: inputCSS,
              to: outputCSS,
            });

            fs.writeFileSync(outputCSS, result.css);
          }
        },
      }
    ],
  };
});
