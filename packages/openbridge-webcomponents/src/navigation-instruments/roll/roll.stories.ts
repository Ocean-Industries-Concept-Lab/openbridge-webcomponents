import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRoll} from './roll.js';
import './roll.js';
import {widthDecorator} from '../../storybook-util.js';
import {VesselImage} from '../watch/vessel.js';
import {foreVessels} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcRoll> = {
  title: 'Instruments/Roll',
  tags: ['autodocs', '6.0'],
  component: 'obc-roll',
  args: {
    width: 400,
    roll: -10,
    minAvgRoll: -10,
    maxAvgRoll: 10,
    maxRollAdvice: 15,
    triggerRollAdvice: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    roll: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    vesselImageFore: {
      control: 'select',
      options: foreVessels,
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRoll>;

export default meta;
type Story = StoryObj<ObcRoll>;

export const Primary: Story = {
  args: {},
};

export const Rov: Story = {
  args: {
    vesselImageFore: VesselImage.rovFront,
  },
};

export const ZoomedIn: Story = {
  args: {
    zoomToFitArc: true,
  },
};

export const ZoomedInNarrow: Story = {
  args: {
    zoomToFitArc: true,
    arcAngle: 15,
    roll: 6,
    minAvgRoll: -4,
    maxAvgRoll: 8,
    maxRollAdvice: 10,
  },
};
