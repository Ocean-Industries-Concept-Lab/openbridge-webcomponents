import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationAppBar} from './integration-app-bar.js';
import './integration-app-bar.js';
import '../../components/app-button/app-button.js';
import '../../icons/icon-ship.js';
import {html} from 'lit';

const appLabels = [
  'Navigation',
  'Fleet Analytics',
  'Maintenance',
  'Weather Data',
  'Sea Chart',
  'Engine Monitor',
  'Playback',
  'Radar',
];

const appBar = (labels: string[]) => html`
  <obc-integration-app-bar>
    ${labels.map(
      (label, i) => html`
        <obc-app-button
          slot="apps"
          size="small"
          label=${label}
          integration
          ?checked=${i === 0}
        >
          <obi-ship slot="icon"></obi-ship>
        </obc-app-button>
      `
    )}
  </obc-integration-app-bar>
`;

const meta: Meta<typeof ObcIntegrationAppBar> = {
  title: 'Integration Systems/App Bar/Sizing',
  tags: ['experimental', 'autodocs'],
  component: 'obc-integration-app-bar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Stories documenting how `obc-integration-app-bar` sizes labelled app buttons with the current CSS Grid layout. The app row uses auto-placed columns with `minmax(var(--obc-integration-app-bar-app-width, max-content), 1fr)`, so the cases below show how equal-width tracks respond to realistic labels, narrow containers and wrapper elements.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ObcIntegrationAppBar>;

export const EightLabelledApps: Story = {
  render: () => appBar(appLabels),
  parameters: {
    docs: {
      description: {
        story:
          'In a wide bar, the grid gives every app the same column width, resolved from the widest label in the set. Short labels keep extra inline space, long labels stay on one line, and the row remains centred because every track uses the same size.',
      },
    },
  },
};

export const NarrowBar: Story = {
  render: () => html`
    <div style="width: 560px; outline: 1px dashed magenta;">
      ${appBar(appLabels)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'The same eight buttons in a 560px wide bar. The grid keeps equal columns, but their combined minimum width can still exceed the available space, so the centred app row overflows the dashed frame instead of shrinking the buttons.',
      },
    },
  },
};

export const LabelsSetAfterFirstRender: Story = {
  render: () =>
    appBar(['App', 'App', 'App', 'App', 'App', 'App', 'App', 'App']),
  play: async ({canvasElement}) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const buttons = canvasElement.querySelectorAll('obc-app-button');
    buttons.forEach((button, i) => {
      button.label = appLabels[i];
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'The bar renders with placeholder labels and the real labels are assigned a second later, which matches data-bound or translated labels. CSS Grid recalculates the column sizing from the updated content, so the buttons expand from the placeholder width to the widest final label without a second measurement pass.',
      },
    },
  },
};

export const ButtonsWrappedInAnElement: Story = {
  render: () => html`
    <obc-integration-app-bar>
      ${appLabels.map(
        (label, i) => html`
          <div slot="apps">
            <obc-app-button
              size="small"
              label=${label}
              integration
              ?checked=${i === 0}
            >
              <obi-ship slot="icon"></obi-ship>
            </obc-app-button>
          </div>
        `
      )}
    </obc-integration-app-bar>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Every app button is wrapped in an element - here a plain `div`, in our case a tooltip trigger emitted by a framework wrapper. The slotted wrapper is flattened with `display: contents`, so the button still becomes the grid item and keeps the same equal-width column sizing as the unwrapped case.',
      },
    },
  },
};
