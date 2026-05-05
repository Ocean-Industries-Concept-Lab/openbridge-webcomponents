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
    src: url(./assets/NotoSans.ttf);
    }

     @font-face {
    font-family: 'noto-sans';
    src: url(./assets/NotoSans.ttf);
    }
</style>
  `,

  managerHead: (head, options) => `
  ${head}
  <style>
    /* OpenBridge Storybook UI Fixes */

    /* ========== DARK THEME ========== */
    @media (prefers-color-scheme: dark) {
      /* Search results - non-matched letters */
      #storybook-explorer-searchfield ~ div li,
      #storybook-explorer-searchfield ~ div li span,
      #storybook-explorer-searchfield ~ div li div,
      [id*="search"] ~ * li,
      [role="listbox"] li,
      [role="listbox"] li span,
      [role="option"],
      [role="option"] span {
        color: rgb(140, 140, 140) !important;
      }

      /* Matched/searched letters */
      #storybook-explorer-searchfield ~ div mark,
      [id*="search"] ~ * mark,
      [role="listbox"] mark,
      [role="option"] mark,
      mark {
        background: transparent !important;
        color: rgb(233, 233, 233) !important;
        font-weight: 600 !important;
      }

      /* Search result path text */
      [role="option"] > div:last-child,
      [role="listbox"] li > div:last-child {
        color: rgb(140, 140, 140) !important;
      }

      /* Search result icons */
      [role="listbox"] svg,
      [role="option"] svg {
        color: rgb(180, 180, 180) !important;
      }

      /* Search results background */
      [role="listbox"],
      [role="listbox"] li,
      [role="option"] {
        background: rgb(24, 24, 24) !important;
      }

      /* Sidebar item text */
      button[data-nodetype] > span,
      [data-nodetype="component"] span,
      [data-nodetype="story"] span {
        color: rgb(220, 220, 220) !important;
      }

      /* Selected/active sidebar item text */
      [data-selected="true"] span {
        color: rgb(255, 255, 255) !important;
      }

      /* Search input placeholder */
      input::placeholder {
        color: rgb(140, 140, 140) !important;
      }

      /* Sidebar icons */
      #storybook-explorer-tree .sidebar-item svg {
        color: rgb(180, 180, 180) !important;
      }

      /* Selected sidebar item background */
      [data-selected="true"] {
        background: rgb(60, 60, 60) !important;
      }

      /* Remove box-shadow on selected items */
      [data-selected="true"] *,
      [data-selected="true"] [class*="css-"] {
        box-shadow: none !important;
      }
    }

    /* ========== LIGHT THEME ========== */
    @media (prefers-color-scheme: light) {
      /* Search results - non-matched letters */
      #storybook-explorer-searchfield ~ div li,
      #storybook-explorer-searchfield ~ div li span,
      #storybook-explorer-searchfield ~ div li div,
      [id*="search"] ~ * li,
      [role="listbox"] li,
      [role="listbox"] li span,
      [role="option"],
      [role="option"] span {
        color: rgb(112, 112, 112) !important;
      }

      /* Matched/searched letters */
      #storybook-explorer-searchfield ~ div mark,
      [id*="search"] ~ * mark,
      [role="listbox"] mark,
      [role="option"] mark,
      mark {
        background: transparent !important;
        color: rgb(31, 31, 31) !important;
        font-weight: 600 !important;
      }

      /* Search result path text */
      [role="option"] > div:last-child,
      [role="listbox"] li > div:last-child {
        color: rgb(112, 112, 112) !important;
      }

      /* Search result icons */
      [role="listbox"] svg,
      [role="option"] svg {
        color: rgb(83, 83, 83) !important;
      }

      /* Search results background */
      [role="listbox"],
      [role="listbox"] li,
      [role="option"] {
        background: rgb(247, 247, 247) !important;
      }

      /* Sidebar item text */
      button[data-nodetype] > span,
      [data-nodetype="component"] span,
      [data-nodetype="story"] span {
        color: rgb(31, 31, 31) !important;
      }


      /* Search input placeholder */
      input::placeholder {
        color: rgb(112, 112, 112) !important;
      }

      /* Sidebar icons */
      #storybook-explorer-tree .sidebar-item svg {
        color: rgb(83, 83, 83) !important;
      }

      /* Non-selected sidebar item HOVER state - gray background */
      [data-nodetype]:not([data-selected="true"]):hover,
      [data-nodetype="story"]:not([data-selected="true"]):hover,
      [data-nodetype="component"]:not([data-selected="true"]):hover,
      [data-nodetype="docs"]:not([data-selected="true"]):hover,
      .css-wzf5rv:hover,
      .css-wzf5rv:focus {
        --tree-node-background-hover: rgb(224, 224, 224) !important;
        background: rgb(224, 224, 224) !important;
        box-shadow: none !important;
      }

      /* Selected sidebar item background - light blue */
      [data-selected="true"],
      button[data-selected="true"],
      a[data-selected="true"],
      [data-nodetype][data-selected="true"],
      [data-nodetype="story"][data-selected="true"],
      [data-nodetype="component"][data-selected="true"],
      [data-nodetype="docs"][data-selected="true"] {
        background: #DBECFF !important;
      }

      /* Selected sidebar item text - dark for contrast on light blue */
      [data-selected="true"] span,
      [data-selected="true"] > span,
      [data-selected="true"] div,
      [data-selected="true"] [class*="css-"],
      button[data-selected="true"] span,
      a[data-selected="true"] span,
      [data-nodetype][data-selected="true"] span,
      [data-nodetype="story"][data-selected="true"] span,
      [data-nodetype="component"][data-selected="true"] span,
      [data-nodetype="docs"][data-selected="true"] span {
        color: rgb(31, 31, 31) !important;
      }

      /* Remove box-shadow on selected items */
      [data-selected="true"] *,
      [data-selected="true"] [class*="css-"] {
        box-shadow: none !important;
      }

      /* Selected sidebar item HOVER state - slightly darker light blue */
      [data-selected="true"]:hover,
      button[data-selected="true"]:hover,
      a[data-selected="true"]:hover,
      [data-nodetype][data-selected="true"]:hover,
      [data-nodetype="story"][data-selected="true"]:hover,
      [data-nodetype="component"][data-selected="true"]:hover,
      [data-nodetype="docs"][data-selected="true"]:hover {
        background: #C8E0FF !important;
        box-shadow: none !important;
      }

      /* Remove box-shadow on selected item hover */
      [data-selected="true"]:hover * {
        box-shadow: none !important;
      }

      /* Selected sidebar item text on hover - keep dark */
      [data-selected="true"]:hover span,
      [data-selected="true"]:hover div,
      [data-selected="true"]:hover [class*="css-"],
      button[data-selected="true"]:hover span,
      a[data-selected="true"]:hover span,
      [data-nodetype][data-selected="true"]:hover span {
        color: rgb(31, 31, 31) !important;
      }

      /* Fix context menu button (three dots) blue background */
      [data-selected="true"] button,
      [data-selected="true"]:hover button,
      [data-selected="true"] [aria-label],
      [data-selected="true"]:hover [aria-label],
      button[aria-label*="menu" i],
      button[aria-label*="actions" i],
      .sidebar-item button,
      [data-nodetype] button {
        background: transparent !important;
        background-color: transparent !important;
      }

      /* Fix boolean toggle buttons - use white background with dark text */
      [class*="css-"] input:checked ~ span:last-of-type,
      [class*="css-"] input:not(:checked) ~ span:first-of-type {
        background: rgb(255, 255, 255) !important;
        color: rgb(31, 31, 31) !important;
      }
    }

  </style>
  `,

  docs: {},
};
export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
