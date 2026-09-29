import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {PitchIndicatorType} from './pitch-indicator.js';
import './pitch-indicator.js';

type PitchIndicatorArgs = {
  type: PitchIndicatorType;
  value: number;
};

function renderPitchIndicator(args: PitchIndicatorArgs) {
  return html`
    <obc-pitch-indicator
      .type=${args.type}
      .value=${args.value}
    ></obc-pitch-indicator>
  `;
}

function pitchIndicatorPreviewDecorator(story: () => unknown) {
  return html`<div style="width:48px;height:48px;box-sizing:border-box">
    ${story()}
  </div>`;
}

const defaultPitchControls = {
  value: 0.5,
};

const meta = {
  title: 'Indicators/Pitch Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-pitch-indicator',
  parameters: {
    layout: 'centered',
  },
  render: renderPitchIndicator,
  args: {
    type: PitchIndicatorType.enhanced,
    ...defaultPitchControls,
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
  decorators: [pitchIndicatorPreviewDecorator],
} satisfies Meta<PitchIndicatorArgs>;

export default meta;
type Story = StoryObj<PitchIndicatorArgs>;

export const Enhanced = {
  args: {
    type: PitchIndicatorType.enhanced,
    ...defaultPitchControls,
  },
} satisfies Story;

export const Regular = {
  args: {
    type: PitchIndicatorType.regular,
    ...defaultPitchControls,
  },
} satisfies Story;
