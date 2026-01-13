import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-trend.js';
import {AdviceType} from '../watch/advice.js';

const SAMPLE_DATA = [
  {label: 'Jan', value: 3.5},
  {label: 'Feb', value: 4.2},
  {label: 'Mar', value: 5},
  {label: 'Apr', value: 4},
  {label: 'May', value: 7},
  {label: 'Jun', value: 3},
  {label: 'Jul', value: 4.6},
  {label: 'Aug', value: 3.2},
  {label: 'Sep', value: 5.2},
  {label: 'Oct', value: 4.2},
  {label: 'Nov', value: 4.8},
  {label: 'Dec', value: 6},
];

const meta: Meta = {
  title: 'Instruments/Gauge Trend',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-trend',

  argTypes: {
    width: {
      control: {type: 'range', min: 240, max: 960, step: 40},
    },
    height: {
      control: {type: 'range', min: 240, max: 960, step: 40},
    },
    enhanced: {
      control: 'boolean',
    },
    showPoints: {
      control: 'boolean',
    },
    scaleMinValue: {
      control: {type: 'number'},
    },
    scaleMaxValue: {
      control: {type: 'number'},
    },
    scaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleHasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    scaleHasAdvice: {
      control: 'boolean',
    },
    scaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    scaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
    },
  },
  args: {
    width: 480,
    height: 480,
    enhanced: false,
    showPoints: true,
    scaleMinValue: 3.0,
    scaleMaxValue: 7.0,
    scaleValue: 5,
    scaleSetpoint: 5,
    scaleHasBar: true,
    hasScale: true,
    scaleHasAdvice: false,
    scaleFillMode: 'fill',
    scaleFillMin: 3,
    scaleFillMax: 5,
    scaleAdvicePosition: 'inner',
  },
  render: (args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${args.width}
      .height=${args.height}
      .enhanced=${args.enhanced}
      .showPoints=${args.showPoints}
      .scaleMinValue=${args.scaleMinValue}
      .scaleMaxValue=${args.scaleMaxValue}
      .scaleValue=${args.scaleValue}
      .scaleSetpoint=${args.scaleSetpoint}
      .scaleHasBar=${args.scaleHasBar}
      .hasScale=${args.hasScale}
      .scaleHasAdvice=${args.scaleHasAdvice}
      .scaleFillMode=${args.scaleFillMode}
      .scaleFillMin=${args.scaleFillMin}
      .scaleFillMax=${args.scaleFillMax}
      .scaleAdvicePosition=${args.scaleAdvicePosition}
      .scaleAdvice=${[
        {min: 3, max: 5, type: AdviceType.caution, hinted: true},
        {min: 6, max: 7, type: AdviceType.advice, hinted: false},
      ]}
      .scalePrimaryInterval=${1}
      .scaleSecondaryInterval=${0.5}
      .scaleTertiaryInterval=${0.125}
      .scaleHasPrimaryTickbars=${false}
      .scaleHasTertiaryTickbars=${false}
    >
    </obc-gauge-trend>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const GaugeTrend: Story = {
  name: 'Gauge trend (default)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    width: {
      control: {type: 'range', min: 240, max: 960, step: 40},
    },
    height: {
      control: {type: 'range', min: 240, max: 960, step: 40},
    },
    enhanced: {
      control: 'boolean',
    },
    showPoints: {
      control: 'boolean',
    },
    scaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleHasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    scaleHasAdvice: {
      control: 'boolean',
    },
    scaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    scaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
    },
  },
  args: {
    showPoints: true,
    width: 480,
    height: 480,
    enhanced: false,
    scaleValue: 5,
    scaleSetpoint: 5,
    scaleHasBar: true,
    hasScale: true,
    scaleHasAdvice: false,
    scaleFillMode: 'fill',
    scaleFillMin: 3,
    scaleFillMax: 5,
    scaleAdvicePosition: 'inner',
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .showPoints=${_args.showPoints}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .scaleMinValue=${3.0}
      .scaleMaxValue=${7.0}
      .scaleValue=${_args.scaleValue}
      .scaleSetpoint=${_args.scaleSetpoint}
      .scaleHasBar=${_args.scaleHasBar}
      .hasScale=${_args.hasScale}
      .scaleHasAdvice=${_args.scaleHasAdvice}
      .scaleFillMode=${_args.scaleFillMode}
      .scaleFillMin=${_args.scaleFillMin}
      .scaleFillMax=${_args.scaleFillMax}
      .scaleAdvicePosition=${_args.scaleAdvicePosition}
      .scaleAdvice=${[
        {min: 3, max: 5, type: AdviceType.caution, hinted: true},
        {min: 6, max: 7, type: AdviceType.advice, hinted: false},
      ]}
      .scalePrimaryInterval=${1}
      .scaleSecondaryInterval=${0.5}
      .scaleTertiaryInterval=${0.125}
      .scaleHasPrimaryTickbars=${false}
      .scaleHasTertiaryTickbars=${false}
    >
    </obc-gauge-trend>
  `,
};
