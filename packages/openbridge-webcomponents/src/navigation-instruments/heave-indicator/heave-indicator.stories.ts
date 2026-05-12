import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import {HeaveIndicatorType} from './heave-indicator.js';
import './heave-indicator.js';

type HeaveIndicatorArgs = {
  type: HeaveIndicatorType;
  value: number;
};

function heaveIndicatorDecorator(story: () => unknown): HTMLTemplateResult {
  return html`<div
    style="display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%; min-height: 280px; padding: 24px"
  >
    <div
      style="width: 48px; height: 48px; box-sizing: border-box; flex-shrink: 0"
    >
      ${story()}
    </div>
  </div>`;
}

function renderHeaveIndicator(args: HeaveIndicatorArgs) {
  return html`
    <obc-heave-indicator
      .type=${args.type}
      .value=${args.value}
    ></obc-heave-indicator>
  `;
}

const meta = {
  title: 'Indicators/Heave Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-heave-indicator',
  render: renderHeaveIndicator,
  args: {
    type: HeaveIndicatorType.enhanced,
    value: 0.25,
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
  decorators: [heaveIndicatorDecorator],
} satisfies Meta<HeaveIndicatorArgs>;

export default meta;
type Story = StoryObj<HeaveIndicatorArgs>;

export const Enhanced = {
  args: {
    type: HeaveIndicatorType.enhanced,
    value: 0.6,
  },
} satisfies Story;

export const Regular = {
  args: {
    type: HeaveIndicatorType.regular,
    value: 0.6,
  },
} satisfies Story;
