import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCurrent, CurrentType} from './current.js';
import './current.js';
import {Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcCurrent> = {
  title: 'Instruments/Current',
  tags: ['autodocs', 'wip'],
  component: 'obc-current',
  decorators: [widthDecorator],
  args: {
    width: 400,
    type: CurrentType.vessel,
    currentSpeed: 3,
    currentFromDirection: 330,
    vesselHeadingDeg: 15,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1000, step: 1}},
    type: {
      control: 'inline-radio',
      options: [CurrentType.vessel, CurrentType.direction],
    },
    currentSpeed: {
      control: {type: 'range', min: 0, max: 4, step: 1},
      description: 'Current strength bucket (number of chevrons).',
    },
    currentFromDirection: {control: {type: 'range', min: 0, max: 360, step: 1}},
    vesselHeadingDeg: {control: {type: 'range', min: 0, max: 360, step: 1}},
    priority: {
      control: 'inline-radio',
      options: [Priority.regular, Priority.enhanced],
    },
    vesselImage: {
      control: 'select',
      options: topVessels,
    },
  },
} satisfies Meta<ObcCurrent>;

export default meta;
type Story = StoryObj<ObcCurrent>;

export const Default: Story = {
  args: {},
};

export const Direction: Story = {
  args: {type: CurrentType.direction},
};

export const VesselEnhanced: Story = {
  args: {priority: Priority.enhanced},
};

export const DirectionEnhanced: Story = {
  args: {type: CurrentType.direction, priority: Priority.enhanced},
};
