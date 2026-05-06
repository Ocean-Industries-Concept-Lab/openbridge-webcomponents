import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcWind, WindHistogramData, WindSize} from './wind.js';
import './wind.js';
import {widthDecorator} from '../../storybook-util.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';

// Needs to go from 0 to 360
const windHistogramData: WindHistogramData[] = [
  {
    direction: 0,
    occurrences: 0,
  },
  {
    direction: 10,
    occurrences: 0,
  },
  {
    direction: 20,
    occurrences: 5,
  },
  {
    direction: 30,
    occurrences: 3,
  },
  {
    direction: 40,
    occurrences: 10,
  },
  {
    direction: 50,
    occurrences: 30,
  },
  {
    direction: 60,
    occurrences: 30,
  },
  {
    direction: 70,
    occurrences: 30,
  },
  {
    direction: 80,
    occurrences: 35,
  },
  {
    direction: 90,
    occurrences: 32,
  },
  {
    direction: 100,
    occurrences: 30,
  },
  {
    direction: 110,
    occurrences: 20,
  },
  {
    direction: 120,
    occurrences: 0,
  },
  ...[
    130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270,
    280, 290, 300, 310, 320, 330, 340, 350,
  ].map((direction) => ({
    direction,
    occurrences: 0,
  })),
];

const meta: Meta<typeof ObcWind> = {
  title: 'Instruments/Wind',
  tags: ['6.0'],
  component: 'obc-wind',
  decorators: [widthDecorator],
  args: {
    width: 400,
    vesselHeadingDeg: 60,
    currentWindFromDirection: 100,
    currentWindSpeedBeaufort: 5,
    windHistogramData: windHistogramData,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1000, step: 1}},
    vesselHeadingDeg: {control: {type: 'range', min: 0, max: 360, step: 1}},
    currentWindFromDirection: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    currentWindSpeedBeaufort: {
      control: {type: 'range', min: 0, max: 12, step: 1},
    },
    windHistogramData: {control: 'object'},
    vesselImage: {
      control: 'select',
      options: topVessels,
    },
    size: {
      control: 'inline-radio',
      options: [WindSize.auto, WindSize.small, WindSize.medium, WindSize.large],
    },
  },
} satisfies Meta<ObcWind>;

export default meta;
type Story = StoryObj<ObcWind>;

export const Primary: Story = {
  args: {},
};

export const Large: Story = {
  args: {width: 400, size: WindSize.large},
};

export const Medium: Story = {
  args: {width: 200, size: WindSize.medium},
};

export const Small: Story = {
  args: {width: 80, size: WindSize.small},
};

export const Auto: Story = {
  args: {width: 300, size: WindSize.auto},
};
