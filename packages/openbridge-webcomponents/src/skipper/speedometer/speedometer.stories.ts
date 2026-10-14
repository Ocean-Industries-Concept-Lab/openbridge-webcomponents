import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import { AlertTypes, SpeedType } from '../interfaces.js';
import './speedometer.js';

const meta: Meta<typeof Speedometer> = {
  title: 'INSTRUMENT/Speedometer',
  tags: ['autodocs', '6.0'],
  component: 'ob-speedometer',
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
    mainSpeedType: {
      options: [
        SpeedType.SOG,
        SpeedType.STW
      ],
      control: {type: 'select'},
    },
    sogSpeed: {control: {type: 'range', min: -15, max: 100, step: 0.5}},
    stwSpeed: {control: {type: 'range', min: -15, max: 100, step: 0.5}},
    alertLow: {control: {type: 'range', min: -10, max: 50, step: 0.5}},
    alertHigh: {control: {type: 'range', min: -10, max: 50, step: 0.5}},
    alertLowType: {
      options: [
        AlertTypes.caution,
        AlertTypes.warning,
        AlertTypes.alarm,
        AlertTypes.none
      ],
      control: {type: 'select'},
    },
    alertHighType: {
      options: [
        AlertTypes.caution,
        AlertTypes.warning,
        AlertTypes.alarm,
        AlertTypes.none
      ],
      control: {type: 'select'}
    },
    maxSpeed: {control: {type: 'range', min: 1, max: 50, step: 1}},
    useAlerts: {
      options: [
        false,
        true
      ],
      control: {type: 'select'},
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<Speedometer>;

export default meta;
type Story = StoryObj<Speedometer>;

export const Speedometer: Story = {
  args: {
    width: 512,
    maxSpeed: 27,
    mainSpeedType: SpeedType.SOG,
    sogSpeed: 22.7,
    stwSpeed: 23.7,
    alertLow: -2,
    alertHigh: 24,
    alertLowType: AlertTypes.none,
    alertHighType: AlertTypes.caution,
    showSog: true,
    showStw: true,
    useAlerts: true,
    showSpeedAsNumber: false
  },
};

export const SpeedometerSogOnly: Story = {
  args: {
    width: 512,
    maxSpeed: 27,
    mainSpeedType: SpeedType.SOG,
    sogSpeed: 5.49,
    alertLow: -2,
    alertHigh: 22,
    alertLowType: AlertTypes.alarm,
    alertHighType: AlertTypes.caution,
    showSog: true,
    showStw: false,
    useAlerts: true
  },
};

export const SpeedometerStwOnly: Story = {
  args: {
    width: 512,
    maxSpeed: 27,
    mainSpeedType: SpeedType.STW,
    stwSpeed: 5.49,
    alertLow: -2,
    alertHigh: 22,
    alertLowType: AlertTypes.alarm,
    alertHighType: AlertTypes.caution,
    showSog: false,
    showStw: true,
    useAlerts: true
  },
};