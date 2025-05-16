import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcSliderDouble, ObcSliderDoubleVariant} from './slider-double.js';
import './slider-double.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcSliderDouble> = {
  title: 'Input/Slider Double',
  tags: ['autodocs'],
  component: 'obc-slider-double',
  args: {
    low: 20,
    high: 80,
  },
  argTypes: {
    low: {
      control: {type: 'number', min: 0, max: 100, step: 1},
    },
    high: {
      control: {type: 'number', min: 0, max: 100, step: 1},
    },
    step: {
      control: {type: 'number', min: 1, max: 100, step: 0.01},
    },
    variant: {
      options: Object.values(ObcSliderDoubleVariant),
      control: {type: 'select'},
    },
    hugContainer: {
      control: {type: 'boolean'},
    },
    allowSeeking: {
      control: {type: 'boolean'},
    },
  },
  render: (args: any) => {
    return html` <obc-slider-double
      .low=${args.low}
      .high=${args.high}
      step=${ifDefined(args.step)}
      min="0"
      max="100"
      ?hugcontainer=${args.hugContainer}
      ?allowseeking=${args.allowSeeking}
      .variant=${args.variant}
    >
    </obc-slider-double>`;
  },
} satisfies Meta<typeof ObcSliderDouble>;

export default meta;
type Story = StoryObj<typeof ObcSliderDouble>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    hugContainer: false,
  },
};

export const Enhanced: Story = {
  args: {
    value: 20,
    variant: ObcSliderDoubleVariant.Enhanced,
  },
};

export const HugContainer: Story = {
  args: {
    hugContainer: true,
  },
};

export const NoValue: Story = {
  args: {
    variant: 'no-input',
  },
};

export const Step: Story = {
  args: {
    step: 10,
  },
};

export const AllowSeeking: Story = {
  args: {
    allowSeeking: true,
  },
};
