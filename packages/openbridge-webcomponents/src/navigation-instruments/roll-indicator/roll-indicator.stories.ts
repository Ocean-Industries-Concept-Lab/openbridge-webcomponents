import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {RollIndicatorType} from './roll-indicator.js';
import './roll-indicator.js';

type RollIndicatorArgs = {
  type: RollIndicatorType;
  value: number;
};

function renderRollIndicator(args: RollIndicatorArgs) {
  return html`
    <obc-roll-indicator
      .type=${args.type}
      .value=${args.value}
    ></obc-roll-indicator>
  `;
}

function rollIndicatorPreviewDecorator(story: () => unknown) {
  return html`<div style="width:48px;height:48px;box-sizing:border-box">
    ${story()}
  </div>`;
}

const meta = {
  title: 'Indicators/Roll Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-roll-indicator',
  parameters: {
    layout: 'centered',
  },
  render: renderRollIndicator,
  args: {
    type: RollIndicatorType.enhanced,
    value: 0,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: ['enhanced', 'regular'],
      table: {category: 'Attributes'},
    },
    value: {
      control: {
        type: 'range',
        min: -1,
        max: 1,
        step: 0.01,
      },
      table: {category: 'Attributes'},
    },
  },
  decorators: [rollIndicatorPreviewDecorator],
} satisfies Meta<RollIndicatorArgs>;

export default meta;
type Story = StoryObj<RollIndicatorArgs>;

export const Enhanced = {
  args: {
    type: RollIndicatorType.enhanced,
  },
} satisfies Story;

export const Regular = {
  args: {
    type: RollIndicatorType.regular,
  },
} satisfies Story;
