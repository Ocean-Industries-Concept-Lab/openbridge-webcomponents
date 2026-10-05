import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type LitElement} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {ObcValveAnalogThreeWayIcon} from './valve-analog-three-way-icon.js';
import './valve-analog-three-way-icon.js';
import {ThreewayValveOrientation} from '../threeway-valve-shared/threeway-valve-shared.js';

import '../../icons/icon-threeway-analog-closed.js';
import '../../icons/icon-threeway-analog-inleft-bottom-0.js';
import '../../icons/icon-threeway-analog-inleft-bottom-100.js';
import '../../icons/icon-threeway-analog-inleft-bottom-25.js';
import '../../icons/icon-threeway-analog-inleft-bottom-50.js';
import '../../icons/icon-threeway-analog-inleft-bottom-75.js';
import '../../icons/icon-threeway-analog-inleft-left-0.js';
import '../../icons/icon-threeway-analog-inleft-left-100.js';
import '../../icons/icon-threeway-analog-inleft-left-25.js';
import '../../icons/icon-threeway-analog-inleft-left-50.js';
import '../../icons/icon-threeway-analog-inleft-left-75.js';
import '../../icons/icon-threeway-analog-inleft-right-0.js';
import '../../icons/icon-threeway-analog-inleft-right-100.js';
import '../../icons/icon-threeway-analog-inleft-right-25.js';
import '../../icons/icon-threeway-analog-inleft-right-50.js';
import '../../icons/icon-threeway-analog-inleft-right-75.js';
import '../../icons/icon-threeway-analog-open.js';

const meta: Meta<typeof ObcValveAnalogThreeWayIcon> = {
  title: 'Automation/Icon/Valve Analog Three Way',
  tags: ['autodocs'],
  component: 'obc-valve-analog-three-way-icon',
  args: {
    open1: 100,
    open2: 50,
    open3: 50,
    orientation: ThreewayValveOrientation.bottom,
  },
  argTypes: {
    open1: {control: {type: 'range', min: 0, max: 100, step: 1}},
    open2: {control: {type: 'range', min: 0, max: 100, step: 1}},
    open3: {control: {type: 'range', min: 0, max: 100, step: 1}},
    orientation: {
      options: Object.values(ThreewayValveOrientation),
      control: {type: 'radio'},
    },
    value: {table: {disable: true}},
    value2: {table: {disable: true}},
    closed: {table: {disable: true}},
    horisontal: {table: {disable: true}},
  },
  render: (args) =>
    html`<obc-valve-analog-three-way-icon
      style="width: 96px; height: 96px"
      .open1=${args.open1}
      .open2=${args.open2}
      .open3=${args.open3}
      .orientation=${args.orientation}
    ></obc-valve-analog-three-way-icon>`,
} satisfies Meta<ObcValveAnalogThreeWayIcon>;

export default meta;
type Story = StoryObj<ObcValveAnalogThreeWayIcon>;

export const Split: Story = {};

export const Open: Story = {
  args: {open1: 100, open2: 100, open3: 100},
};

export const Closed: Story = {
  args: {open1: 0, open2: 0, open3: 0},
};

export const Plugged: Story = {
  args: {open1: 100, open2: 100, open3: 0},
};

export const Continuous: Story = {
  args: {open1: 100, open2: 63, open3: 37},
};

export const Orientations: Story = {
  render: (args) =>
    html`<div style="display: flex; gap: 16px">
      ${Object.values(ThreewayValveOrientation).map(
        (orientation) =>
          html`<obc-valve-analog-three-way-icon
            style="width: 96px; height: 96px"
            .open1=${args.open1}
            .open2=${args.open2}
            .open3=${args.open3}
            .orientation=${orientation}
          ></obc-valve-analog-three-way-icon>`
      )}
    </div>`,
  args: {open1: 100, open2: 75, open3: 25},
};

/** Top row: the `obi-threeway-analog-*` icons. Bottom row: this component at the same openings. */
export const MatchesIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Each column is one `obi-threeway-analog-inleft-*` icon above this component at the same openings. ' +
          'The 0 and 100 % steps match exactly; the symbol is linear in between, so the 25/50/75 steps differ slightly. ' +
          'The `inleft-bottom` and `inleft-right` series are compared at their 25/50/75 steps and at the opposite end step, ' +
          'because their 0 and 100 steps are named the other way round.',
      },
    },
  },
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
    const columns: {icon: string; ports: [number, number, number]}[] = [];
    for (const step of [0, 25, 50, 75, 100]) {
      columns.push({
        icon: `inleft-left-${step}`,
        ports: [100, 100 - step, step],
      });
    }
    for (const step of [0, 25, 50, 75, 100]) {
      const name = step === 0 || step === 100 ? 100 - step : step;
      columns.push({
        icon: `inleft-bottom-${name}`,
        ports: [step, 100, 100 - step],
      });
    }
    for (const step of [0, 25, 50, 75, 100]) {
      const name = step === 0 || step === 100 ? 100 - step : step;
      columns.push({
        icon: `inleft-right-${name}`,
        ports: [step, 100 - step, 100],
      });
    }
    columns.push({icon: 'open', ports: [100, 100, 100]});
    columns.push({icon: 'closed', ports: [0, 0, 0]});
    return html`<div
      style="display: grid; grid-template-columns: repeat(${columns.length}, 48px); gap: 8px"
    >
      ${columns.map(
        ({icon}) =>
          html`<div style="width: 48px; height: 48px">
            ${unsafeHTML(
              `<obi-threeway-analog-${icon} usecsscolor></obi-threeway-analog-${icon}>`
            )}
          </div>`
      )}
      ${columns.map(
        ({ports}) =>
          html`<obc-valve-analog-three-way-icon
            style="width: 48px; height: 48px"
            .open1=${ports[0]}
            .open2=${ports[1]}
            .open3=${ports[2]}
          ></obc-valve-analog-three-way-icon>`
      )}
    </div>`;
  },
};

/** The deprecated `value`/`value2` properties draw the symbol stem up with the left port fully open. */
export const DeprecatedValueProperties: Story = {
  render: () =>
    html`<obc-valve-analog-three-way-icon
      style="width: 96px; height: 96px"
      .value=${50}
      .value2=${50}
    ></obc-valve-analog-three-way-icon>`,
};
