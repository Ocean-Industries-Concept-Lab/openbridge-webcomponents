import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSpeedDirections} from './speed-directions.js';
import './speed-directions.js';
import {
  SpeedDirectionsType,
  SpeedDirectionsFrameStyle,
} from './speed-directions-geometry.js';

const meta: Meta<typeof ObcSpeedDirections> = {
  title: 'Instruments/Speed Directions',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-speed-directions',
  args: {
    type: SpeedDirectionsType.alongAthwartArrows,
    frameStyle: SpeedDirectionsFrameStyle.standalone,
  },
  argTypes: {
    type: {control: 'select', options: Object.values(SpeedDirectionsType)},
    frameStyle: {
      control: 'select',
      options: Object.values(SpeedDirectionsFrameStyle),
    },
  },
  decorators: [
    (story) => {
      const div = document.createElement('div');
      div.style.width = '384px';
      div.style.height = '384px';
      div.appendChild(story() as Node);
      return div;
    },
  ],
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
