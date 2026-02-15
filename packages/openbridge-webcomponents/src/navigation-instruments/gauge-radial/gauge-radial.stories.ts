import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcGaugeRadial, ObcGaugeRadialType} from './gauge-radial.js';
import './gauge-radial.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcGaugeRadial> = {
  title: 'Instruments/Gauge radial',
  tags: ['6.0'],
  component: 'obc-gauge-radial',
  decorators: [widthDecorator],
  args: {
    width: 400,
  },
  argTypes: {
    priority: {control: 'select', options: Object.values(Priority)},
  },
} satisfies Meta<ObcGaugeRadial>;

export default meta;
type Story = StoryObj<ObcGaugeRadial>;

export const Positive: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
  },
};

export const Negative: Story = {
  args: {
    value: -50,
    maxValue: 100,
    minValue: -100,
    type: ObcGaugeRadialType.filled,
  },
};

export const EnhancedFilled: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    priority: Priority.enhanced,
    setpoint: 75,
  },
};

export const EnhancedBar: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.bar,
    priority: Priority.enhanced,
    setpoint: 75,
  },
};

export const EnhancedNeedle: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.needle,
    priority: Priority.enhanced,
    setpoint: 75,
  },
};

export const WithLabels: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    labels: true,
  },
};

export const WithAdvices: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    advices: [
      {
        minValue: 70,
        maxValue: 100,
        type: AdviceType.caution,
        hinted: true,
      },
      {
        minValue: 25,
        maxValue: 60,
        type: AdviceType.advice,
        hinted: true,
      },
    ],
  },
};
