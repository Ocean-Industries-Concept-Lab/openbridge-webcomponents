import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotIndicator} from './rot-indicator.js';
import './rot-indicator.js';

const meta: Meta<typeof ObcRotIndicator> = {
  title: 'Indicators/Rate of Turn Indicator',
  tags: ['6.0'],
  component: 'obc-rot-indicator',
  args: {},
  argTypes: {
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

export const Primary: Story = {
  args: {},
};

export const RateOfTurnDegreesPerMinute: Story = {
  tags: ['skip-test'],
  args: {
    rateOfTurnDegreesPerMinute: 20,
    rotDotAnimationFactor: 18,
  },
};
