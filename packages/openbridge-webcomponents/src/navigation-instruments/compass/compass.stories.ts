import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  CompassDirection,
  CompassPriorityElement,
  ObcCompass,
  RotType,
} from './compass.js';
import './compass.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {VesselImage} from '../watch/watch.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';
import {InstrumentState, Priority} from '../types.js';
import {RotPosition} from '../rate-of-turn/rot-renderer.js';

const meta: Meta<typeof ObcCompass> = {
  title: 'Instruments/Compass',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass',
  args: {
    width: 512,
    heading: 311,
    courseOverGround: 338,
    headingAdvices: [
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        hinted: false,
      },
    ],
    headingSetpoint: 311,
    windSpeed: 4,
    windFromDirection: 45,
    currentSpeed: 3,
    currentFromDirection: 60,
    rotationsPerMinute: 1,
    rotType: RotType.dots,
    rotPosition: RotPosition.innerCircle,
    rotMaxValue: 10,
    vesselImage: VesselImage.psvTop,
    direction: CompassDirection.NorthUp,
    touching: false,
    priority: Priority.enhanced,
    showLabels: true,
    tickmarksInside: false,
    priorityElements: [CompassPriorityElement.hdg],
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    headingSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
    windSpeed: {control: {type: 'range', min: 0, max: 14, step: 1}},
    windFromDirection: {control: {type: 'range', min: 0, max: 360, step: 1}},
    currentSpeed: {control: {type: 'range', min: 0, max: 4, step: 1}},
    currentFromDirection: {control: {type: 'range', min: 0, max: 360, step: 1}},
    rotationsPerMinute: {
      control: {type: 'range', min: -10, max: 10, step: 0.1},
      description:
        'Rotations per minute. NB: storybook recreates the component on change, which resets the animation.',
    },
    rotType: {
      control: 'select',
      options: Object.values(RotType),
      description:
        'Rate-of-turn display mode: rotating dots or banana-shaped bar (HDG→COG).',
    },
    rotPosition: {
      control: 'select',
      options: Object.values(RotPosition),
      description:
        'Rate-of-turn track position: on the outer scale ring or inner circle.',
    },
    vesselImage: {
      control: 'select',
      options: topVessels,
    },
    direction: {
      control: {type: 'select'},
      options: Object.values(CompassDirection),
    },
    touching: {control: 'boolean'},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(CompassPriorityElement),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcCompass>;

export default meta;
type Story = StoryObj<ObcCompass>;

export const NorthUpInCommand: Story = {
  args: {},
};

export const NorthUpNotInCommand: Story = {
  args: {
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const HeadingUpInCommand: Story = {
  args: {
    direction: CompassDirection.HeadingUp,
  },
};

export const CourseUpInCommand: Story = {
  args: {
    direction: CompassDirection.CourseUp,
  },
};

export const WithLabelsOutside: Story = {
  args: {
    showLabels: true,
    tickmarksInside: false,
  },
};

export const WithLabelsInside: Story = {
  args: {
    showLabels: true,
    tickmarksInside: true,
  },
};

export const WithRotBar: Story = {
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 5,
  },
};

export const WithRotBarEnhanced: Story = {
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 5,
    priorityElements: [CompassPriorityElement.hdg, CompassPriorityElement.rot],
  },
};
