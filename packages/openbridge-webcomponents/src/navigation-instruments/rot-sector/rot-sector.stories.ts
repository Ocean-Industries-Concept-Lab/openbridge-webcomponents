import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotSector, ObcGaugeRadialType} from './rot-sector.js';
import './rot-sector.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';

const meta: Meta<typeof ObcRotSector> = {
  title: 'Ship Instruments/Rate of Turn/Rot Sector',
  tags: ['6.0'],
  component: 'obc-rot-sector',
  decorators: [widthDecorator],
  args: {
    width: 400,
    maxValue: 60,
    primaryTickmarkInterval: 30,
    secondaryTickmarkInterval: 10,
  },
} satisfies Meta<ObcRotSector>;

export default meta;
type Story = StoryObj<ObcRotSector>;

export const Positive: Story = {
  args: {
    value: 50,
    portStarboard: false,
  },
};

export const Negative: Story = {
  args: {
    value: -50,
    portStarboard: true,
  },
};

export const WithLabels: Story = {
  args: {
    value: 50,
    type: ObcGaugeRadialType.filled,
    labels: true,
  },
};

export const WithAdvices: Story = {
  args: {
    value: 50,
    portStarboard: true,
    advices: [
      {
        minValue: 30,
        maxValue: 60,
        type: AdviceType.caution,
        hinted: true,
      },
      {
        minValue: 0,
        maxValue: 30,
        type: AdviceType.advice,
        hinted: true,
      },
    ],
  },
};
