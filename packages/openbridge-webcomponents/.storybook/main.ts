// This file has been automatically migrated to valid ESM format by Storybook.
import {createRequire} from 'node:module';
import {dirname, join} from 'path';
import type {StorybookConfig} from '@storybook/web-components-vite';
import FullReload from 'vite-plugin-full-reload';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../docs/**/*.mdx',
    '../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('storybook-addon-tag-badges'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
    // getAbsolutePath('storybook-addon-vis'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },

  staticDirs: [{from: '../public', to: '/assets'}],

  async viteFinal(viteConfig) {
    // full reload whenever a TypeScript, CSS (or HTML) file in /src changes
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(FullReload(['src/**/*.{ts,css,html}']));
    return viteConfig;
  },

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
  <style>
    /* OpenBridge Storybook UI Fixes */

    /* Search results - improve readability */
    /* Make the path/subtitle text more visible */
    [data-search] mark,
    .search-result-item mark,
    mark {
      background: transparent !important;
      color: rgb(150, 196, 254) !important; /* bright blue for highlights */
      font-weight: 600 !important;
    }

    /* Search result path text - increase contrast */
    [data-search] [class*="Result"] > div:last-child,
    .search-result-item__path,
    [class*="SearchResult"] span:not(:first-child) {
      color: rgb(180, 180, 180) !important; /* lighter gray for paths */
    }

    /* Sidebar item text - ensure good contrast */
    button[data-nodetype] > span,
    [data-nodetype="component"] span,
    [data-nodetype="story"] span {
      color: rgb(220, 220, 220) !important;
    }

    /* Selected/active sidebar item */
    [data-selected="true"] span {
      color: rgb(255, 255, 255) !important;
    }

    /* Search input placeholder */
    input::placeholder {
      color: rgb(140, 140, 140) !important;
    }

    /* Hide sidebar type icons but keep chevrons */
    /* Target only the icon next to the label, not the expand/collapse chevron */
    [data-nodetype="story"] > svg:last-of-type,
    [data-nodetype="component"] > svg:last-of-type,
    [data-nodetype="docs"] > svg:last-of-type {
      display: none !important;
    }
  </style>
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

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
