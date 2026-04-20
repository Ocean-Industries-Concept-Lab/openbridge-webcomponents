import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  PITCH_INDICATOR_MAX_PITCH_DEG,
  PitchIndicatorType,
} from './pitch-indicator.js';
import './pitch-indicator.js';

type PitchIndicatorArgs = {
  type: PitchIndicatorType;
  pitch: number;
};

function renderPitchIndicator(args: PitchIndicatorArgs) {
  return html`
    <obc-pitch-indicator
      .type=${args.type}
      .pitch=${args.pitch}
    ></obc-pitch-indicator>
  `;
}

function pitchIndicatorPreviewDecorator(story: () => unknown) {
  return html`<div style="width:48px;height:48px;box-sizing:border-box">
    ${story()}
  </div>`;
}

const defaultPitchControls = {
  pitch: 15,
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
    pitch: {
      control: {
        type: 'range',
        min: -PITCH_INDICATOR_MAX_PITCH_DEG,
        max: PITCH_INDICATOR_MAX_PITCH_DEG,
        step: 0.2,
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
