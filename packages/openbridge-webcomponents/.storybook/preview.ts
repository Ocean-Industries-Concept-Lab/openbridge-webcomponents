import type {Preview} from '@storybook/web-components';

import '../src/palettes/variables.css';
import {setCustomElementsManifest} from '@storybook/web-components';

import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

import {withThemeByDataAttribute} from '@storybook/addon-themes';
import { crossDecorator } from '../src/storybook-util';

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
  globalTypes: {
    cross: {
      description: "Center components in the middle of the screen",
      defaultValue: "cross",
      toolbar: {
        title: "Center",
        items: [
          { value: 'default', title: 'Default' },
          { value: 'center', title: 'Center' },
          { value: 'cross', title: 'Cross' },
        ],
      },
    }
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      grid: {
        cellSize: 8,
      },
      default: 'container-background-color',
      values: [
        {
          name: 'container-section-color',
          value: 'var(--container-section-color)',
        },
        {
          name: 'container-background-color',
          value: 'var(--container-background-color)',
        },
      ],
    },
  },
};

export default preview;
