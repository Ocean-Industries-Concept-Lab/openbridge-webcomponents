import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcPitchRollHeave,
  ObcPitchRollHeaveType,
  PitchRollHeavePriorityElement,
} from './pitch-roll-heave.js';
import './pitch-roll-heave.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';
import {AdviceType} from '../watch/advice.js';
import {
  foreVessels,
  fadedSideVessels,
} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcPitchRollHeave> = {
  title: 'Instruments/Pitch Roll Heave',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-pitch-roll-heave',
  args: {
    width: 384,
    type: ObcPitchRollHeaveType.singleScale,
    pitch: 3,
    roll: -10,
    heave: 0.5,
    minAvgPitch: -6,
    maxAvgPitch: 6,
    minAvgRoll: -10,
    maxAvgRoll: 10,
    minTrendHeave: -1,
    maxTrendHeave: 1,
    heaveRange: 10,
    pitchArcAngle: 30,
    rollArcAngle: 45,
    scaleForeImage: 1,
    priority: Priority.regular,
    priorityElements: [
      PitchRollHeavePriorityElement.pitch,
      PitchRollHeavePriorityElement.roll,
      PitchRollHeavePriorityElement.heave,
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {control: 'select', options: Object.values(ObcPitchRollHeaveType)},
    pitch: {control: {type: 'range', min: -30, max: 30, step: 0.1}},
    roll: {control: {type: 'range', min: -45, max: 45, step: 0.1}},
    heave: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    heaveRange: {control: {type: 'range', min: 1, max: 50, step: 1}},
    pitchArcAngle: {control: {type: 'range', min: 5, max: 45, step: 1}},
    rollArcAngle: {control: {type: 'range', min: 5, max: 60, step: 1}},
    scaleForeImage: {control: {type: 'range', min: 0, max: 2, step: 0.01}},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(PitchRollHeavePriorityElement),
    },
    vesselImageSide: {control: 'select', options: fadedSideVessels},
    vesselImageFore: {control: 'select', options: foreVessels},
    hasReadout: {control: 'boolean'},
    zoomToFitArc: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitchRollHeave>;

export default meta;
type Story = StoryObj<ObcPitchRollHeave>;

export const Primary: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const DualScale: Story = {
  args: {
    type: ObcPitchRollHeaveType.dualScale,
  },
};

export const DualScaleEnhanced: Story = {
  args: {
    type: ObcPitchRollHeaveType.dualScale,
    priority: Priority.enhanced,
  },
};

export const WithReadout: Story = {
  args: {
    hasReadout: true,
  },
};

export const WithReadoutEnhanced: Story = {
  args: {
    hasReadout: true,
    priority: Priority.enhanced,
  },
};

export const Advice: Story = {
  args: {
    maxPitchAdvice: 5,
    maxRollAdvice: 15,
    triggerPitchAdvice: true,
    triggerRollAdvice: false,
    heaveAdvice: [
      {min: -10, max: -2, type: AdviceType.caution, hinted: true},
      {min: 2, max: 10, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const ZoomedIn: Story = {
  args: {
    zoomToFitArc: true,
  },
};

export const ZoomedInDualScale: Story = {
  args: {
    zoomToFitArc: true,
    type: ObcPitchRollHeaveType.dualScale,
  },
};

export const ZoomedInNarrow: Story = {
  args: {
    zoomToFitArc: true,
    pitchArcAngle: 10,
    rollArcAngle: 14,
    pitch: 4,
    roll: 6,
    heave: 1.2,
    minAvgPitch: -3,
    maxAvgPitch: 5,
    minAvgRoll: -4,
    maxAvgRoll: 7,
    minTrendHeave: -2,
    maxTrendHeave: 2,
    heaveRange: 5,
  },
};
