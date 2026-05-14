import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import './true-relative.js';
import { SensorPosition, SpeedType } from '../interfaces.js';
import { TrueRelativeDirection } from './true-relative.js';

const meta: Meta<typeof TrueRelative> = {
  title: 'INSTRUMENT/TrueRelative',
  tags: ['autodocs', '6.0'],
  component: 'ob-true-relative',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  args: {
    width: 512
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    speedType: {
      options: [
        SpeedType.SOG,
        SpeedType.STW
      ],
      control: {type: 'select'},
    },
    sensorPosition: {
      options: [
        SensorPosition.bow,
        SensorPosition.middle,
        SensorPosition.aft,
      ],
      control: {type: 'select'},
    },
    maxSpeed: {control: {type: 'range', min: 1, max: 50, step: 1}},
    hdgSpeed: {control: {type: 'range', min: 0, max: 100, step: 0.5}},
    hdgDirection: {control: {type: 'range', min: 0, max: 360, step: 0.5}},
    cogSpeed: {control: {type: 'range', min: 0, max: 100, step: 0.5}},
    cogDirection: {control: {type: 'range', min: 0, max: 360, step: 0.5}},
    windSpeed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    windAngle: {control: {type: 'range', min: 0, max: 360, step: 0.5}},
    currentSpeed: {control: {type: 'range', min: 0, max: 3, step: 0.1}},
    currentAngle: {control: {type: 'range', min: 0, max: 360, step: 0.5}},
    rotationsPerMinute: {control: {type: 'range', min: -10, max: 10, step: 1}},
    direction: {
      control: {type: 'select'},
      options: Object.values(TrueRelativeDirection),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<TrueRelative>;

export default meta;
type Story = StoryObj<TrueRelative>;

export const TrueRelative: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    maxSpeed: 25,
    hdgSpeed: 23.7,
    hdgDirection: 0,
    cogSpeed: 19.7,
    cogDirection: 25,
    windSpeed: 17,
    windAngle: 30,
    currentSpeed: 0.65,
    currentAngle: 60,
    rotationsPerMinute: 5,
    direction: TrueRelativeDirection.NorthUp,
    hasNorthArrow: false
  },
};

export const NoRot: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    maxSpeed: 25,
    hdgSpeed: 23.7,
    hdgDirection: 0,
    cogSpeed: 19.7,
    cogDirection: 25,
    windSpeed: 17,
    windAngle: 30,
    currentSpeed: 0.65,
    currentAngle: 60,
    rotationsPerMinute: undefined,
    direction: TrueRelativeDirection.NorthUp,
  },
};

export const NoHdg: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    maxSpeed: 25,
    hdgSpeed: undefined,
    hdgDirection: 0,
    cogSpeed: 19.7,
    cogDirection: 25,
    windSpeed: 17,
    windAngle: 30,
    currentSpeed: 0.65,
    currentAngle: 60,
    rotationsPerMinute: undefined,
    direction: TrueRelativeDirection.NorthUp,
  },
};

export const NoCog: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    maxSpeed: 25,
    hdgSpeed: 23.7,
    hdgDirection: 0,
    cogSpeed: 19.7,
    cogDirection: undefined,
    windSpeed: 17,
    windAngle: 30,
    currentSpeed: 0.65,
    currentAngle: 60,
    rotationsPerMinute: undefined,
    direction: TrueRelativeDirection.NorthUp
  },
};

export const NoWindAndCurrent: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    maxSpeed: 25,
    hdgSpeed: 23.7,
    hdgDirection: 0,
    cogSpeed: 19.7,
    cogDirection: 20.67,
    windSpeed: undefined,
    windAngle: 30,
    currentSpeed: undefined,
    currentAngle: 60,
    rotationsPerMinute: 5,
    direction: TrueRelativeDirection.NorthUp
  },
};