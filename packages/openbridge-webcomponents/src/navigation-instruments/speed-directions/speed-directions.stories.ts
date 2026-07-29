import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSpeedDirections} from './speed-directions.js';
import './speed-directions.js';
import {widthDecorator} from '../../storybook-util.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';
import {
  SpeedDirectionsType,
  SpeedDirectionsFrameStyle,
} from './speed-directions-geometry.js';

const meta: Meta<typeof ObcSpeedDirections> = {
  title: 'Instruments/Speed Directions',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-speed-directions',
  args: {
    width: 384,
    type: SpeedDirectionsType.alongAthwartArrows,
    frameStyle: SpeedDirectionsFrameStyle.standalone,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {control: 'select', options: Object.values(SpeedDirectionsType)},
    frameStyle: {
      control: 'select',
      options: Object.values(SpeedDirectionsFrameStyle),
    },
    speedAlongKnots: {control: {type: 'range', min: -12, max: 12, step: 0.1}},
    speedAthwartBowKnots: {
      control: {type: 'range', min: -4, max: 4, step: 0.1},
    },
    speedAthwartSternKnots: {
      control: {type: 'range', min: -4, max: 4, step: 0.1},
    },
    speedAthwartKnots: {control: {type: 'range', min: -4, max: 4, step: 0.1}},
    vesselImage: {control: 'select', options: topVessels},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcSpeedDirections>;

export default meta;
type Story = StoryObj<ObcSpeedDirections>;

export const AlongAthwartArrowsStandalone: Story = {
  args: {
    speedAlongKnots: 4.2,
    speedAthwartBowKnots: 0.8,
    speedAthwartSternKnots: -0.6,
  },
};

export const LongLatArrowsStandalone: Story = {
  args: {
    type: SpeedDirectionsType.longLatArrows,
    speedAlongKnots: 4.2,
    speedAthwartKnots: 0.8,
  },
};

export const AlongAthwartBarsStandalone: Story = {
  args: {
    type: SpeedDirectionsType.alongAthwartBars,
    speedAlongKnots: 6.5,
    speedAthwartBowKnots: 0.7,
    speedAthwartSternKnots: -0.7,
  },
};

export const AlongAthwartArrowsFramed: Story = {
  args: {
    frameStyle: SpeedDirectionsFrameStyle.framed,
    speedAlongKnots: 4.2,
    speedAthwartBowKnots: 0.8,
    speedAthwartSternKnots: -0.6,
  },
};

export const LongLatArrowsFramed: Story = {
  args: {
    type: SpeedDirectionsType.longLatArrows,
    frameStyle: SpeedDirectionsFrameStyle.framed,
    speedAlongKnots: 4.2,
    speedAthwartKnots: 0.8,
  },
};

export const AlongAthwartBarsFramed: Story = {
  args: {
    type: SpeedDirectionsType.alongAthwartBars,
    frameStyle: SpeedDirectionsFrameStyle.framed,
    speedAlongKnots: 6.5,
    speedAthwartBowKnots: 0.7,
    speedAthwartSternKnots: -0.7,
  },
};

export const AlongAthwartArrowsCompass: Story = {
  args: {
    frameStyle: SpeedDirectionsFrameStyle.compass,
    speedAlongKnots: 4.2,
    speedAthwartBowKnots: 0.8,
    speedAthwartSternKnots: -0.6,
  },
};

export const LongLatArrowsCompass: Story = {
  args: {
    type: SpeedDirectionsType.longLatArrows,
    frameStyle: SpeedDirectionsFrameStyle.compass,
    speedAlongKnots: 4.2,
    speedAthwartKnots: 0.8,
  },
};

export const AlongAthwartBarsCompass: Story = {
  args: {
    type: SpeedDirectionsType.alongAthwartBars,
    frameStyle: SpeedDirectionsFrameStyle.compass,
    speedAlongKnots: 6.5,
    speedAthwartBowKnots: 0.7,
    speedAthwartSternKnots: -0.7,
  },
};

export const ZeroSpeedTinted: Story = {
  args: {
    speedAlongKnots: 0,
    speedAthwartBowKnots: 0,
    speedAthwartSternKnots: 0,
    tintedArrows: true,
  },
};

export const NegativeSpeeds: Story = {
  args: {
    type: SpeedDirectionsType.longLatArrows,
    frameStyle: SpeedDirectionsFrameStyle.compass,
    speedAlongKnots: -2.5,
    speedAthwartKnots: -0.4,
  },
};

export const PartialAxes: Story = {
  name: 'Partial Axes (Undefined Hidden)',
  args: {
    frameStyle: SpeedDirectionsFrameStyle.framed,
    speedAlongKnots: 4.2,
  },
};

export const BarsMaxClamped: Story = {
  args: {
    type: SpeedDirectionsType.alongAthwartBars,
    frameStyle: SpeedDirectionsFrameStyle.compass,
    speedAlongKnots: 25,
    speedAthwartBowKnots: 5,
    speedAthwartSternKnots: -5,
  },
};
