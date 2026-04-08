import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  CompassFlatPriorityElement,
  ObcCompassFlat,
  RotType,
} from './compass-flat.js';
import './compass-flat.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcCompassFlat> = {
  title: 'Instruments/Compass Flat',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass-flat',
  args: {
    width: 512,
    height: 512,
    heading: 45,
    courseOverGround: 50,
    FOVIndicator: false,
    minFOV: 90,
    priority: Priority.enhanced,
    priorityElements: [CompassFlatPriorityElement.hdg],
    rotType: undefined,
    rotationsPerMinute: 1,
    rotMaxValue: 10,
    rotArcExtent: 60,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    height: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(CompassFlatPriorityElement),
    },
    rotType: {
      control: 'select',
      options: [undefined, ...Object.values(RotType)],
    },
    rotationsPerMinute: {
      control: {type: 'range', min: -10, max: 10, step: 0.5},
    },
    rotMaxValue: {control: {type: 'range', min: 1, max: 60, step: 1}},
    rotArcExtent: {control: {type: 'range', min: 10, max: 180, step: 5}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcCompassFlat>;

export default meta;
type Story = StoryObj<ObcCompassFlat>;

export const Primary: Story = {};

export const WithFOVIndicator: Story = {
  args: {
    FOVIndicator: true,
  },
};

export const WithRotDots: Story = {
  name: 'ROT Dots',
  args: {
    rotType: RotType.dots,
    rotationsPerMinute: 2,
    courseOverGround: 80,
  },
};

export const WithRotBar: Story = {
  name: 'ROT Bar',
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 5,
    courseOverGround: 80,
  },
};

export const WithRotBarFOV: Story = {
  name: 'ROT Bar + FOV Indicator',
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 3,
    courseOverGround: 80,
    FOVIndicator: true,
  },
};

export const WithRotBarWideFOV: Story = {
  name: 'ROT Bar Wide FOV',
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 3,
    heading: 0,
    courseOverGround: 150,
    minFOV: 90,
  },
};
