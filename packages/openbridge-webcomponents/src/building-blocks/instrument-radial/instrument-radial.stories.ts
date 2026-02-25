import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcInstrumentRadial, ObcGaugeRadialType} from './instrument-radial.js';
import './instrument-radial.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';

const meta: Meta<typeof ObcInstrumentRadial> = {
  title: 'Building Blocks/Instrument Radial',
  tags: ['6.0'],
  component: 'obc-instrument-radial',
  decorators: [widthDecorator],
  args: {
    width: 400,
    getAngle: (v: number) => (v / 100) * 270 - 135,
  },
  argTypes: {
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
  },
} satisfies Meta<ObcInstrumentRadial>;

export default meta;
type Story = StoryObj<ObcInstrumentRadial>;

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
    getAngle: (v: number) => (v / 100) * 135,
    type: ObcGaugeRadialType.filled,
  },
};

export const EnhancedFilled: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    state: InstrumentState.active,
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
    state: InstrumentState.active,
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
    state: InstrumentState.active,
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
