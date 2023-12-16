import type { Preview } from "@storybook/web-components";

import "../src/palettes/variables.css";

import { withThemeByDataAttribute } from '@storybook/addon-themes';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      night: 'night',
      dusk: 'dusk',
      day: 'day',
      bright: 'bright',
    },
    defaultTheme: 'day',
    attributeName: 'data-obc-theme',
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      grid: {
        cellSize: 8,
      }
    }
  },

};

export default preview;
