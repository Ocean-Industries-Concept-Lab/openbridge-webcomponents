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
          'Stories reproducing the sizing defects of `obc-integration-app-bar` when it is filled with a realistic set of labelled app buttons. The bar equalises its buttons by measuring them once in a `requestAnimationFrame` callback on `slotchange` and writing the largest width back as an inline style, and every story below is a case where that single measurement is wrong.',
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
          'The measurement runs while the web font is still loading, so all eight buttons are frozen at 76.3px - the widest label in the fallback font. With the real font loaded the widest button needs 87.1px, so "Fleet Analytics", "Weather Data" and "Engine Monitor" wrap onto two lines while "Radar" sits in a box twice as wide as its text. Running the exact same measurement again once `document.fonts.status` is `loaded` returns 87.1px, so nothing recovers it.',
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
          'The same eight buttons in a 560px wide bar. Eight equal buttons plus the gaps need 666px, and nothing shrinks, wraps, truncates or scrolls, so the row is drawn about 110px outside the bar background and past the dashed frame. The centre column also stops being centred, because it is wider than the track it sits in.',
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
          'The bar renders with placeholder labels and the real labels are assigned a second later, which is what happens when the labels come from a data binding or a translation file. `slotchange` does not fire again, so the buttons keep the 48px width measured from the placeholders and every label is now too wide for its button.',
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
          'Every app button is wrapped in an element - here a plain `div`, in our case a tooltip trigger emitted by a framework wrapper. The bar measures and writes the width onto the slotted `div`, but `obc-app-button` is an `inline-block` sized to its own content, so it never fills the `div` it sits in. The equalisation therefore does nothing at all: the divs are all 76.3px, the buttons keep their own widths between 48px and 76.3px, each sits left aligned in its slot, and the icons end up unevenly spaced across the bar.',
      },
    },
  },
};
