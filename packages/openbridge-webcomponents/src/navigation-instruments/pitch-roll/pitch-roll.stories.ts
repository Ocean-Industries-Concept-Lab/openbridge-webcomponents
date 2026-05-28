import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPitchRoll, PitchRollPriorityElement} from './pitch-roll.js';
import './pitch-roll.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';
import {VesselImage} from '../watch/vessel.js';
import {
  foreVessels,
  fadedSideVessels,
} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcPitchRoll> = {
  title: 'Instruments/Pitch Roll',
  tags: ['autodocs', '6.0'],
  component: 'obc-pitch-roll',
  args: {
    width: 400,
    pitch: 3,
    roll: -10,
    minAvgPitch: -6,
    maxAvgPitch: 6,
    minAvgRoll: -10,
    maxAvgRoll: 10,
    maxPitchAdvice: 5,
    maxRollAdvice: 15,
    triggerPitchAdvice: true,
    triggerRollAdvice: false,
    scaleForeImage: 1,
    priority: Priority.enhanced,
    priorityElements: [
      PitchRollPriorityElement.pitch,
      PitchRollPriorityElement.roll,
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    roll: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    scaleForeImage: {control: {type: 'range', min: 0, max: 2, step: 0.01}},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(PitchRollPriorityElement),
    },
    vesselImageSide: {
      control: 'select',
      options: fadedSideVessels,
    },
    vesselImageFore: {
      control: 'select',
      options: foreVessels,
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitchRoll>;

export default meta;
type Story = StoryObj<ObcPitchRoll>;

export const Primary: Story = {
  args: {},
};

export const Rov: Story = {
  args: {
    vesselImageSide: VesselImage.rovSideFaded,
    vesselImageFore: VesselImage.rovFront,
  },
};

export const ScaledForeImage: Story = {
  args: {
    vesselImageSide: VesselImage.carFerrySideFaded,
    vesselImageFore: VesselImage.carFerryFore,
    scaleForeImage: 1.6,
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
    arcAngle: 10,
    pitch: 4,
    roll: 6,
    minAvgPitch: -3,
    maxAvgPitch: 5,
    minAvgRoll: -4,
    maxAvgRoll: 7,
    maxPitchAdvice: 6,
    maxRollAdvice: 8,
  },
};

export const ZoomedInRectangular: Story = {
  args: {
    zoomToFitArc: true,
    pitchArcAngle: 6,
    rollArcAngle: 14,
    pitch: 3,
    roll: 8,
    minAvgPitch: -2,
    maxAvgPitch: 4,
    minAvgRoll: -6,
    maxAvgRoll: 10,
    maxPitchAdvice: 4,
    maxRollAdvice: 12,
  },
};
