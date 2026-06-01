import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import {
  gaugeBarIndicatorDirections,
  gaugeBarIndicatorTypes,
  ObcGaugeBarIndicator,
} from './gauge-bar-indicator.js';
import './gauge-bar-indicator.js';

function canvasDecorator(story: () => unknown): HTMLTemplateResult {
  return html`<div
    style="display:flex; align-items:center; justify-content:center; width:100%; min-height:280px; padding:24px; box-sizing:border-box;"
  >
    ${story()}
  </div>`;
}

const meta: Meta<ObcGaugeBarIndicator> = {
  title: 'Indicators/Gauge Bar Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-bar-indicator',
  decorators: [canvasDecorator],
  parameters: {
    controls: {
      include: ['value'],
    },
  },
  args: {
    value: 44,
    direction: gaugeBarIndicatorDirections[0],
    type: gaugeBarIndicatorTypes[0],
  },
  argTypes: {
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      table: {category: 'Attributes'},
    },
    direction: {
      control: false,
      table: {category: 'Attributes'},
    },
    type: {
      control: false,
      table: {category: 'Attributes'},
    },
  },
  render: (args) => html`
    <obc-gauge-bar-indicator
      .value=${args.value}
      .direction=${args.direction}
      .type=${args.type}
    ></obc-gauge-bar-indicator>
  `,
} satisfies Meta<ObcGaugeBarIndicator>;

export default meta;
type Story = StoryObj<ObcGaugeBarIndicator>;

export const Overview: Story = {
  render: (args) => html`
    <div
      style="display:grid; grid-template-columns:repeat(2, var(--global-size-spacing-touch-target-min)); gap:80px 160px; align-items:center; justify-items:center;"
    >
      <obc-gauge-bar-indicator
        .value=${args.value}
        direction="vertical"
        type="fill"
      ></obc-gauge-bar-indicator>
      <obc-gauge-bar-indicator
        .value=${args.value}
        direction="horizontal"
        type="fill"
      ></obc-gauge-bar-indicator>
      <obc-gauge-bar-indicator
        .value=${args.value}
        direction="vertical"
        type="tinted"
      ></obc-gauge-bar-indicator>
      <obc-gauge-bar-indicator
        .value=${args.value}
        direction="horizontal"
        type="tinted"
      ></obc-gauge-bar-indicator>
    </div>
  `,
};

export const VerticalFill: Story = {
  args: {
    direction: 'vertical',
    type: 'fill',
  },
};

export const HorizontalFill: Story = {
  args: {
    direction: 'horizontal',
    type: 'fill',
  },
};

export const VerticalTinted: Story = {
  args: {
    direction: 'vertical',
    type: 'tinted',
  },
};

export const HorizontalTinted: Story = {
  args: {
    direction: 'horizontal',
    type: 'tinted',
  },
};
