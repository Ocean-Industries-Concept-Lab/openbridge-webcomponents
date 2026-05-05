import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSliderDouble, ObcSliderDoubleVariant} from './slider-double.js';
import './slider-double.js';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcSliderDouble> = {
  title: 'UI Components/Input Controls/Slider Double',
  tags: ['autodocs', '6.0'],
  component: 'obc-slider-double',
  args: {
    low: 20,
    high: 80,
    min: 0,
    max: 100,
    step: 1,
    labelUnit: '',
    labelDecimals: 0,
    labelWidth: '3ch',
    variant: ObcSliderDoubleVariant.Normal,
    showLeftReadout: true,
    showRightReadout: true,
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
    allowSeeking: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    showLeftReadout: {
      control: {type: 'boolean'},
    },
    showRightReadout: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => html`
    <obc-slider-double
      .low=${args.low}
      .high=${args.high}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .labelUnit=${args.labelUnit}
      .labelDecimals=${args.labelDecimals}
      .labelWidth=${args.labelWidth}
      .variant=${args.variant}
      ?hugcontainer=${args.hugContainer}
      ?allowSeeking=${args.allowSeeking}
      .disabled=${args.disabled}
      .showLeftReadout=${args.showLeftReadout}
      .showRightReadout=${args.showRightReadout}
    ></obc-slider-double>
  `,
} satisfies Meta<typeof ObcSliderDouble>;

export default meta;
type Story = StoryObj<typeof ObcSliderDouble>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    labelUnit: ' %',
    labelDecimals: 0,
    labelWidth: '5ch',
  },
};

export const Enhanced: Story = {
  args: {
    min: 0,
    max: 20,
    step: 1,
    low: 10,
    high: 15,
    labelUnit: ' kn',
    labelWidth: '6ch',
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

export const Disabled: Story = {
  args: {
    low: 20,
    high: 80,
    disabled: true,
  },
};

export const NoReadouts: Story = {
  args: {
    showLeftReadout: false,
    showRightReadout: false,
  },
};

export const SlottedReadouts: Story = {
  args: {
    labelWidth: '6ch',
  },
  render: (args) => html`
    <obc-slider-double
      .low=${args.low}
      .high=${args.high}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .labelUnit=${args.labelUnit}
      .labelDecimals=${args.labelDecimals}
      .labelWidth=${args.labelWidth}
      .variant=${args.variant}
      ?hugcontainer=${args.hugContainer}
      .showLeftReadout=${args.showLeftReadout}
      .showRightReadout=${args.showRightReadout}
      ?allowSeeking=${args.allowSeeking}
      .disabled=${args.disabled}
    >
      <span slot="left-readout">Min</span>
      <span slot="right-readout">Max</span>
    </obc-slider-double>
  `,
};
