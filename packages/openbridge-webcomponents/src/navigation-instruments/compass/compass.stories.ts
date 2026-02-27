import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {CompassDirection, ObcCompass} from './compass.js';
import './compass.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {VesselImage} from '../watch/watch.js';
import {InstrumentState, Priority} from '../types.js';

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
    vesselImage: VesselImage.psvTop,
    direction: CompassDirection.NorthUp,
    touching: false,
    priority: Priority.enhanced,
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
      control: {type: 'range', min: -2, max: 10, step: 0.1},
      description:
        'Rotations per minute. NB: storybook recreates the component on change, which resets the animation.',
    },
    vesselImage: {
      control: {type: 'select'},
      options: Object.values(VesselImage).filter((image) =>
        image.includes('top')
      ),
    },
    direction: {
      control: {type: 'select'},
      options: Object.values(CompassDirection),
    },
    touching: {control: 'boolean'},
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
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
