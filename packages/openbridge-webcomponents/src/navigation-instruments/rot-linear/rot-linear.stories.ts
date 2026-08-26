import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotLinear} from './rot-linear.js';
import './rot-linear.js';
import {Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcRotLinear> = {
  title: 'Instruments/Rot Linear',
  tags: ['autodocs', '6.1'],
  component: 'obc-rot-linear',
  args: {
    width: 512,
    height: 170,
    rateOfTurnDegreesPerMinute: 45,
    rotMaxValue: 90,
    tickInterval: 5,
    rotPortStarboard: false,
    priority: Priority.regular,
    hasReadout: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1028, step: 1}},
    height: {control: {type: 'range', min: 60, max: 512, step: 1}},
    rateOfTurnDegreesPerMinute: {
      control: {type: 'range', min: -120, max: 120, step: 1},
    },
    rotMaxValue: {control: {type: 'range', min: 10, max: 180, step: 5}},
    tickInterval: {control: {type: 'range', min: 1, max: 45, step: 1}},
    rotPortStarboard: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    hasReadout: {control: 'boolean'},
    label: {control: 'text'},
    unit: {control: 'text'},
    fractionDigits: {control: 'number'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRotLinear>;

export default meta;
type Story = StoryObj<ObcRotLinear>;

export const Default: Story = {};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const PortStarboard: Story = {
  args: {
    rotPortStarboard: true,
  },
};

export const PortStarboardPort: Story = {
  args: {
    rotPortStarboard: true,
    rateOfTurnDegreesPerMinute: -45,
  },
};

export const WithReadout: Story = {
  args: {
    hasReadout: true,
    height: 230,
  },
};

export const WithReadoutEnhanced: Story = {
  args: {
    hasReadout: true,
    priority: Priority.enhanced,
    height: 230,
  },
};
