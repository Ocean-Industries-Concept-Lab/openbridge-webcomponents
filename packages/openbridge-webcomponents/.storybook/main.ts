import {dirname, join} from 'path';
import type {StorybookConfig} from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-storysource'),
    getAbsolutePath('storybook-addon-tag-badges'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },

  staticDirs: [{from: '../public', to: '/assets'}],

  previewHead: (head, options) => `
    <dialog> ${options.configType}</dialog>
    ${head}
    <style>
    @font-face {
    font-family: Noto Sans;
    src: url(/assets/NotoSans.ttf);
    }

     @font-face {
    font-family: 'noto-sans';
    src: url(/assets/NotoSans.ttf);
    }
</style>
  `,

  managerHead: (head, options) => `
  ${head}
  ${
    options.configType !== 'DEVELOPMENT'
      ? `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BBSXX2P5P8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-BBSXX2P5P8');
  </script>`
      : ''
  }
  `,

  docs: {},
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
