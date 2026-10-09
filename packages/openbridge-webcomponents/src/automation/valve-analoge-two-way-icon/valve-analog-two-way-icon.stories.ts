import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type LitElement} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {ObcValveAnalogTwoWayIcon} from './valve-analog-two-way-icon.js';
import './valve-analog-two-way-icon.js';
import '../../icons/icon-twoway-analog-open.js';
import '../../icons/icon-twoway-analog-75.js';
import '../../icons/icon-twoway-analog-50.js';
import '../../icons/icon-twoway-analog-25.js';
import '../../icons/icon-twoway-analog-10.js';
import '../../icons/icon-twoway-analog-closed.js';

const meta: Meta<typeof ObcValveAnalogTwoWayIcon> = {
  title: 'Automation/Icon/Valve Analog Two Way',
  tags: ['autodocs'],
  component: 'obc-valve-analog-two-way-icon',
  args: {},
} satisfies Meta<ObcValveAnalogTwoWayIcon>;

export default meta;
type Story = StoryObj<ObcValveAnalogTwoWayIcon>;

export const Open: Story = {
  args: {
    value: 100,
    closed: false,
  },
};

export const Closed: Story = {
  args: {
    value: 0,
    closed: true,
  },
};

export const HalfOpen: Story = {
  args: {
    value: 50,
    closed: false,
  },
};

export const NearClosed: Story = {
  args: {
    value: 0,
    closed: false,
  },
};

export const Continuous: Story = {
  args: {
    value: 63,
    closed: false,
  },
};

/**
 * Top row: the `obi-twoway-analog-*` icons. Bottom row: this component at the
 * same opening; open and closed match exactly, the steps between are close.
 */
export const MatchesIcons: Story = {
  play: async ({canvasElement}) => {
    const elements = [...canvasElement.querySelectorAll('*')].filter((el) =>
      el.localName.includes('-')
    );
    await Promise.all(
      elements.map((el) => customElements.whenDefined(el.localName))
    );
    await Promise.all(
      elements.map((el) => (el as Partial<LitElement>).updateComplete)
    );
  },
  render: () => {
    const columns: {icon: string; value: number; closed: boolean}[] = [
      {icon: 'open', value: 100, closed: false},
      {icon: '75', value: 75, closed: false},
      {icon: '50', value: 50, closed: false},
      {icon: '25', value: 25, closed: false},
      {icon: '10', value: 10, closed: false},
      {icon: 'closed', value: 0, closed: true},
    ];
    return html`<div
      style="display: grid; grid-template-columns: repeat(${columns.length}, 96px); gap: 8px"
    >
      ${columns.map(
        ({icon}) =>
          html`<div style="width: 96px; height: 96px">
            ${unsafeHTML(
              `<obi-twoway-analog-${icon} usecsscolor></obi-twoway-analog-${icon}>`
            )}
          </div>`
      )}
      ${columns.map(
        ({value, closed}) =>
          html`<obc-valve-analog-two-way-icon
            style="width: 96px; height: 96px"
            .value=${value}
            .closed=${closed}
          ></obc-valve-analog-two-way-icon>`
      )}
    </div>`;
  },
};
