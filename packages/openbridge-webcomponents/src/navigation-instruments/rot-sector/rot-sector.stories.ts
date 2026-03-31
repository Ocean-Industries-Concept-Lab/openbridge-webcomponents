import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotSector} from './rot-sector.js';
import './rot-sector.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcRotSector> = {
  title: 'Instruments/Rate of Turn Sector',
  tags: ['autodocs', '6.0'],
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
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    zoomToFitArc: {control: 'boolean'},
    arcExtent: {
      control: {type: 'range', min: 10, max: 60, step: 5},
    },
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
    showLabels: true,
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

export const ZoomedIn: Story = {
  args: {
    value: 30,
    maxValue: 60,
    arcExtent: 40,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    showLabels: true,
    zoomToFitArc: true,
  },
};

export const ZoomedInNarrow: Story = {
  args: {
    value: 10,
    maxValue: 60,
    arcExtent: 20,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    showLabels: true,
    zoomToFitArc: true,
  },
};
