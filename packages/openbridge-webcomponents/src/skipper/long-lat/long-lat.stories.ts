import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import './long-lat.js';
import { MeasurementPosition, SpeedType } from '../interfaces.js';

const meta: Meta<typeof LongLat> = {
  title: 'INSTRUMENT/LongLat',
  tags: ['alpha'],
  component: 'ob-long-lat',
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
    longSpeed: {control: {type: 'range', min: -25, max: 100, step: 0.1}},
    latFrontSpeed: {control: {type: 'range', min: -5, max: 5, step: 0.1}},
    latMiddleSpeed: {control: {type: 'range', min: -5, max: 5, step: 0.1}},
    latAftSpeed: {control: {type: 'range', min: -5, max: 5, step: 0.1}},
    longMaxSpeed: {control: {type: 'range', min: 1, max: 50, step: 1}},
    latMaxSpeed: {control: {type: 'range', min: 1, max: 50, step: 1}},
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
  },
  decorators: [widthDecorator],
} satisfies Meta<LongLat>;

export default meta;
type Story = StoryObj<LongLat>;

export const LongLat: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    longMaxSpeed: 25,
    latMaxSpeed: 5,
    longSpeed: 23.7,
    latFrontSpeed: 2.5,
    latAftSpeed: -4,
    measurementPosition: MeasurementPosition.Sensor,
    bowToCCRP: 100,
    sternToCCRP: 100,
    sensorToCCRP: 50
  },
};

export const LongLatWithoutLatFrontSpeed: Story = {
  args: {
    width: 512,
    speedType: SpeedType.SOG,
    longMaxSpeed: 25,
    latMaxSpeed: 5,
    longSpeed: 23.7,
    latFrontSpeed: undefined,
    latMiddleSpeed: 2.5,
    latAftSpeed: -4,
    measurementPosition: MeasurementPosition.Sensor,
    bowToCCRP: 100,
    sternToCCRP: 100,
    sensorToCCRP: 100
  },
};