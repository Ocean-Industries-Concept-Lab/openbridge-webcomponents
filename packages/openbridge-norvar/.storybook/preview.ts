import '@oicl/openbridge-webcomponents/dist/openbridge.css';
import {
  Preview,
  setCustomElementsManifest,
} from '@storybook/web-components-vite';
import {withThemeByDataAttribute} from '@storybook/addon-themes';
import {html} from 'lit';
import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

// The theme attribute, the size class and the backgrounds match the
// OpenBridge Storybook, so a component renders here as it does there.
const preview: Preview = {
  decorators: [
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
  ],
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
      },
    },
    // Storybook types toolbar values as strings; crossDecorator reads a boolean.
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
      },
    } as unknown as NonNullable<Preview['globalTypes']>[string],
  },
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      grid: {cellSize: 8},
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
  },
  tags: ['autodocs', 'snapshot'],
  initialGlobals: {
    componentSize: 'obc-component-size-regular',
  },
};

export default preview;
