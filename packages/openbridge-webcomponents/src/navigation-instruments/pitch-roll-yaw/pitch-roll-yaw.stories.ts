import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcPitchRollYaw,
  PitchRollYawType,
  type PitchRollSample,
} from './pitch-roll-yaw.js';
import './pitch-roll-yaw.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';
import {VesselImage} from '../watch/vessel.js';

const historySamples: PitchRollSample[] = Array.from({length: 60}, (_, i) => {
  const t = i / 59;
  return {
    pitch: -7 + 15 * t + 2 * Math.sin(i * 1.7),
    roll: -5 + 10 * t + 1.5 * Math.sin(i * 2.3),
  };
});

const meta: Meta<typeof ObcPitchRollYaw> = {
  title: 'Instruments/Pitch Roll Yaw',
  tags: ['autodocs', 'wip'],
  component: 'obc-pitch-roll-yaw',
  args: {
    width: 400,
    type: PitchRollYawType.level,
    pitch: 8,
    roll: 5,
    yaw: 13,
    minAvgYaw: -42,
    maxAvgYaw: 27,
    range: 20,
    priority: Priority.regular,
    showLabels: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {control: 'select', options: Object.values(PitchRollYawType)},
    pitch: {control: {type: 'range', min: -30, max: 30, step: 0.1}},
    roll: {control: {type: 'range', min: -30, max: 30, step: 0.1}},
    yaw: {control: {type: 'range', min: -180, max: 180, step: 0.1}},
    minAvgYaw: {control: {type: 'range', min: -180, max: 180, step: 1}},
    maxAvgYaw: {control: {type: 'range', min: -180, max: 180, step: 1}},
    range: {control: {type: 'range', min: 5, max: 45, step: 1}},
    motionRadius: {control: {type: 'range', min: 0, max: 30, step: 0.5}},
    priority: {control: 'select', options: Object.values(Priority)},
    vesselImage: {control: 'select', options: topVessels},
    showLabels: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitchRollYaw>;

export default meta;
type Story = StoryObj<ObcPitchRollYaw>;

export const Level: Story = {
  args: {},
};

export const LevelEnhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const ActualMotion: Story = {
  args: {
    type: PitchRollYawType.actualMotion,
    yaw: 55,
    motionRadius: 10,
    pitch: 9,
    roll: 4,
  },
};

export const ActualMotionEnhanced: Story = {
  args: {
    ...ActualMotion.args,
    priority: Priority.enhanced,
  },
};

export const HistoricalMotion: Story = {
  args: {
    type: PitchRollYawType.historicalMotion,
    motionHistory: historySamples,
    pitch: 9,
    roll: 6,
  },
};

export const HistoricalMotionEnhanced: Story = {
  args: {
    ...HistoricalMotion.args,
    priority: Priority.enhanced,
  },
};

export const RovVessel: Story = {
  args: {
    ...ActualMotion.args,
    vesselImage: VesselImage.rovTop,
  },
};

export const DroneVessel: Story = {
  args: {
    ...ActualMotion.args,
    vesselImage: VesselImage.droneMediumTop,
  },
};

export const WithLabels: Story = {
  args: {
    showLabels: true,
  },
};
