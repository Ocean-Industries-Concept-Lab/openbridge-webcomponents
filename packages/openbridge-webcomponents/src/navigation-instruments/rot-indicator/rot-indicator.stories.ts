import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotIndicator} from './rot-indicator.js';
import './rot-indicator.js';
import {RotIndicatorType} from './rot-indicator.js';

const meta: Meta<ObcRotIndicator> = {
  title: 'Indicators/Rate of Turn Indicator',
  tags: ['6.0'],
  component: 'obc-rot-indicator',
  args: {
    type: RotIndicatorType.radial,
    rotationsPerMinute: 1,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(RotIndicatorType),
    },
    rotationsPerMinute: {
      control: {
        type: 'range',
        min: -3,
        max: 3,
        step: 0.1,
      },
      description: '**Deprecated.** Use `rateOfTurnDegreesPerMinute` instead.',
    },
    rateOfTurnDegreesPerMinute: {
      control: {type: 'range', min: -180, max: 180, step: 1},
      description:
        'Measured rate of turn in degrees per minute (positive = starboard).',
    },
    rotDotAnimationFactor: {
      control: {type: 'range', min: 1, max: 60, step: 1},
      description: 'Visual amplification for the spinning dot animation.',
    },
  },
} satisfies Meta<ObcRotIndicator>;

export default meta;
type Story = StoryObj<ObcRotIndicator>;

export const Radial: Story = {
  args: {type: RotIndicatorType.radial, rotationsPerMinute: 1},
};
export const Linear: Story = {
  args: {type: RotIndicatorType.linear, rotationsPerMinute: 0},
};

export const RateOfTurnDegreesPerMinute: Story = {
  tags: ['skip-test'],
  args: {
    rateOfTurnDegreesPerMinute: 20,
    rotDotAnimationFactor: 18,
  },
};
