import type {Preview} from '@storybook/web-components-vite';

import '../src/main.css';
import {setCustomElementsManifest} from '@storybook/web-components-vite';

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
    cross: {
      name: 'Cross',
      description: 'Cross',
      defaultValue: true,
      toolbar: {
        icon: 'cross',
        items: [
          {value: false, title: 'Cross: off'},
          {value: true, title: 'Cross: on'},
        ],
        showName: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          ['Introduction', 'Getting Started'],
          'Application Components',
          'Pages',
          'UI Components',
          'Bars and Graphs',
          'Navigation Instruments',
          'Automation',
          'AR',
          '*',
          'Building Blocks',
        ],
      },
    },
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
      options: {
        'container-section-color': {
          name: 'container-section-color',
          value: 'var(--container-section-color)',
          default: true,
        },
        'container-background-color': {
          name: 'container-background-color',
          value: 'var(--container-background-color)',
        },
      },
    },

    docs: {
      codePanel: true,
    },
  },
  tags: ['autodocs'],

  initialGlobals: {
    componentSize: 'obc-component-size-regular',
  },
};

export default preview;
