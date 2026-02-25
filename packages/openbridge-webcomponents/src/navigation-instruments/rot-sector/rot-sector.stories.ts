import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotSector} from './rot-sector.js';
import './rot-sector.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcRotSector> = {
  title: 'Instruments/Rate of Turn Sector',
  tags: ['6.0'],
  component: 'obc-rot-sector',
  decorators: [widthDecorator],
  args: {
    width: 400,
    maxValue: 60,
    primaryTickmarkInterval: 30,
    secondaryTickmarkInterval: 10,
  },

  argTypes: {
    width: {
      control: {type: 'range', min: 100, max: 1000, step: 50},
    },
    value: {
      control: {type: 'range', min: -60, max: 60, step: 1},
    },
    priority: {control: 'select', options: Object.values(Priority)},
  },
} satisfies Meta<ObcRotSector>;

export default meta;
type Story = StoryObj<ObcRotSector>;

export const Regular: Story = {
  args: {
    value: 50,
    portStarboard: false,
  },
};

export const Enhanced: Story = {
  args: {
    value: -50,
    priority: Priority.enhanced,
  },
};

export const EnhancedPortStarboard: Story = {
  args: {
    value: -50,
    priority: Priority.enhanced,
    portStarboard: true,
  },
};

export const WithLabels: Story = {
  args: {
    value: 50,
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
