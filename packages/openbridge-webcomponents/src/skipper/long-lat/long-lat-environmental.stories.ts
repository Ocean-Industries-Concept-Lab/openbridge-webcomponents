import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import './long-lat-environmental.js';
import { MeasurementPosition, SensorPosition, SpeedType } from '../interfaces.js';

const meta: Meta<typeof LongLatEnvironmental> = {
  title: 'INSTRUMENT/LongLatEnvironmental',
  tags: ['autodocs', '6.0'],
  component: 'ob-long-lat-environmental',
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
    measurementPosition: {
      options: [
        MeasurementPosition.CCRP,
        MeasurementPosition.Sensor,
        MeasurementPosition.Bow
      ],
      control: {type: 'select'},
    },
    bowToCCRP: {control: {type: 'range', min: 0, max: 100, step: 0.5}},
    sternToCCRP: {control: {type: 'range', min: 0, max: 100, step: 0.5}},
    sensorToCCRP: {control: {type: 'range', min: -100, max: 100, step: 0.5}},
    longSpeed: {control: {type: 'range', min: -25, max: 100, step: 0.5}},
    latFrontSpeed: {control: {type: 'range', min: -5, max: 5, step: 0.5}},
    latMiddleSpeed: {control: {type: 'range', min: -5, max: 5, step: 0.5}},
    latAftSpeed: {control: {type: 'range', min: -5, max: 5, step: 0.5}},
    longMaxSpeed: {control: {type: 'range', min: 1, max: 50, step: 1}},
    latMaxSpeed: {control: {type: 'range', min: 1, max: 50, step: 1}},
    windSpeed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    windAngle: {control: {type: 'range', min: 0, max: 360, step: 0.5}},
    currentSpeed: {control: {type: 'range', min: 0, max: 3, step: 0.1}},
    currentAngle: {control: {type: 'range', min: 0, max: 360, step: 0.5}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    rotationsPerMinute: {control: {type: 'range', min: -10, max: 10, step: 1}}
  },
  decorators: [widthDecorator],
} satisfies Meta<LongLatEnvironmental>;

export default meta;
type Story = StoryObj<LongLatEnvironmental>;

export const LongLatEnvironmental: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    longMaxSpeed: 25,
    latMaxSpeed: 5,
    longSpeed: 23.7,
    latFrontSpeed: 2.5,
    latMiddleSpeed: 4,
    latAftSpeed: 4,
    windSpeed: 17,
    windAngle: 17,
    currentSpeed: 0.15,
    currentAngle: 5,
    heading: 10,
    rotationsPerMinute: 5,
    showVesselTrail: false,
    showSensorIcon: true,
    measurementPosition: MeasurementPosition.CCRP,
    bowToCCRP: 100,
    sternToCCRP: 100,
    sensorToCCRP: 25
  },
};