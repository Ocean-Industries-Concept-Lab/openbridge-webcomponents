import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import type {StorybookConfig} from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  staticDirs: [{from: '../public', to: '/assets'}],

  async viteFinal(viteConfig) {
    // Vite applies a tsconfig only to the files its include matches; naming
    // it keeps the Lit decorators in the stories transformed.
    viteConfig.tsconfig = fileURLToPath(
      new URL('../tsconfig.json', import.meta.url)
    );
    viteConfig.define = {
      ...viteConfig.define,
      'process.env.VITE_STORYBOOK_BRANCH': JSON.stringify(
        process.env.VITE_STORYBOOK_BRANCH || ''
      ),
    };
    return viteConfig;
  },

  previewHead: (head) => `
    ${head}
    <style>
      @font-face {
        font-family: Noto Sans;
        src: url(./assets/NotoSans.ttf);
        font-weight: 400 700;
      }
      @font-face {
        font-family: 'noto-sans';
        src: url(./assets/NotoSans.ttf);
        font-weight: 400 700;
      }
    </style>
  `,

  managerHead: (head) => `
    ${head}
    <script>
      window.VITE_STORYBOOK_BRANCH = "${process.env.VITE_STORYBOOK_BRANCH || ''}";
    </script>
  `,
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
