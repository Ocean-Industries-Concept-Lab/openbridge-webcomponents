import type {Preview} from '@storybook/web-components';

import '../src/main.css';
import {setCustomElementsManifest} from '@storybook/web-components';

import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

import {withThemeByDataAttribute} from '@storybook/addon-themes';
import {DecoratorFunction} from 'storybook/internal/types';
import {html} from 'lit';

export const decorators: DecoratorFunction[] = [
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
  (story, context) => {
    const sizeClass =
      context.globals.componentSize || 'obc-component-size-regular';
    return html`<div class="${sizeClass}">${story()}</div>`;
  },
];

const preview: Preview = {
  globals: {
    componentSize: 'obc-component-size-regular',
  },
  globalTypes: {
    componentSize: {
      name: 'Component Size',
      description: 'Global component size class',
      defaultValue: 'obc-component-size-regular',
      toolbar: {
        icon: 'expandalt',
        items: [
          {value: 'obc-component-size-regular', title: 'Regular'},
          {value: 'obc-component-size-medium', title: 'Medium'},
          {value: 'obc-component-size-large', title: 'Large'},
          {value: 'obc-component-size-xl', title: 'XL'},
        ],
        showName: true,
      },
    },
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

  tags: ['autodocs'],
};

export default preview;
