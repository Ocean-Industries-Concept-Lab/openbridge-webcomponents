import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcPitchRollHeave,
  PitchRollHeavePriorityElement,
  PitchRollHeaveType,
} from './pitch-roll-heave.js';
import './pitch-roll-heave.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';
import {AdviceType} from '../watch/advice.js';
import {VesselImage} from '../watch/vessel.js';
import {
  foreVessels,
  fadedSideVessels,
} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcPitchRollHeave> = {
  title: 'Instruments/Pitch Roll Heave',
  tags: ['autodocs', 'wip'],
  component: 'obc-pitch-roll-heave',
  args: {
    width: 400,
    type: PitchRollHeaveType.singleScale,
    pitch: 3,
    roll: -10,
    heave: 2,
    minAvgPitch: -6,
    maxAvgPitch: 6,
    minAvgRoll: -10,
    maxAvgRoll: 10,
    minTrendHeave: -3,
    maxTrendHeave: 3,
    heaveRange: 10,
    priority: Priority.regular,
    priorityElements: [
      PitchRollHeavePriorityElement.pitch,
      PitchRollHeavePriorityElement.roll,
      PitchRollHeavePriorityElement.heave,
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {control: 'select', options: Object.values(PitchRollHeaveType)},
    pitch: {control: {type: 'range', min: -30, max: 30, step: 0.1}},
    roll: {control: {type: 'range', min: -45, max: 45, step: 0.1}},
    heave: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    heaveRange: {control: {type: 'range', min: 1, max: 20, step: 1}},
    scaleForeImage: {control: {type: 'range', min: 0, max: 2, step: 0.01}},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(PitchRollHeavePriorityElement),
    },
    vesselImageSide: {
      control: 'select',
      options: fadedSideVessels,
    },
    vesselImageFore: {
      control: 'select',
      options: foreVessels,
    },
    pitchLabel: {control: 'text'},
    rollLabel: {control: 'text'},
    heaveLabel: {control: 'text'},
    unit: {control: 'text'},
    heaveUnit: {control: 'text'},
    fractionDigits: {control: 'number'},
    heaveFractionDigits: {control: 'number'},
    pitchArcAngle: {control: {type: 'range', min: 5, max: 45, step: 1}},
    rollArcAngle: {control: {type: 'range', min: 5, max: 45, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitchRollHeave>;

export default meta;
type Story = StoryObj<ObcPitchRollHeave>;

export const Primary: Story = {
  args: {},
};

export const DualScale: Story = {
  args: {
    type: PitchRollHeaveType.dualScale,
  },
};

export const Readout: Story = {
  args: {
    type: PitchRollHeaveType.readout,
  },
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const WithAdvices: Story = {
  args: {
    maxPitchAdvice: 5,
    maxRollAdvice: 15,
    triggerPitchAdvice: true,
    heaveAdvice: [
      {min: 5, max: 10, type: AdviceType.caution, hinted: true},
      {min: -10, max: -5, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const Rov: Story = {
  args: {
    vesselImageSide: VesselImage.rovSideFaded,
    vesselImageFore: VesselImage.rovFront,
  },
};
