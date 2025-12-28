import postcssLit from 'rollup-plugin-postcss-lit';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import {globbySync} from 'globby';
import postcss from 'postcss';
import postcssConfig from './postcss.config.mjs';
import fs from 'fs';
import path from 'path';

const input = globbySync('src/**/*.ts', {ignore: ['src/**/*.stories.ts']});

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const isBundleMode = mode === 'bundle';

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
        input: isBundleMode ? 'bundle.ts' : input,
        external: isBundleMode
          ? // For bundle mode, bundle everything (no externals)
            []
          : // For regular mode, externalize as before
            (id) =>
              id.startsWith('lit') ||
              id.startsWith('@lit') ||
              id.startsWith('uplot') ||
              id.startsWith('chart.js') ||
              id.startsWith('@kurkle/color'),
        preserveEntrySignatures: 'strict',
        output: isBundleMode
          ? // Bundle mode: single file output
            {
              format: 'es',
              entryFileNames: 'openbridge-webcomponents.bundle.js',
              dir: 'bundle',
              sourcemap: true,
              preserveModules: false,
              inlineDynamicImports: true,
            }
          : // Regular mode: preserve modules
            {
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
          // Make dist folder if it doesn't exist
          if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
            fs.mkdirSync(path.resolve(__dirname, 'dist'));
          }
          const outputCSS = path.resolve(__dirname, 'dist/openbridge.css'); // Destination

          if (fs.existsSync(inputCSS)) {
            const css = fs.readFileSync(inputCSS, 'utf-8');
            const result = await postcss(postcssConfig({}).plugins).process(
              css,
              {
                from: inputCSS,
                to: outputCSS,
              }
            );

            fs.writeFileSync(outputCSS, result.css);
          }
        },
      },
    ],
  };
});
