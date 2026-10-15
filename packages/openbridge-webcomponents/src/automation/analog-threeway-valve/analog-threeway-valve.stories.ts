import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAnalogThreewayValve} from './analog-threeway-valve.js';
import {
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './analog-threeway-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {ThreewayValveOrientation} from '../threeway-valve-shared/threeway-valve-shared.js';

const meta: Meta<typeof ObcAnalogThreewayValve> = {
  title: 'Automation/Automation Devices/Analog Threeway Valve',
  tags: ['autodocs', 'experimental'],
  component: 'obc-analog-threeway-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
    orientation: ThreewayValveOrientation.bottom,
    open1: 100,
    open2: 60,
    open3: 40,
    flows: [
      {direction: AutomationButtonLabelDirection.down, value: 12, unit: 'm³/h'},
      {direction: AutomationButtonLabelDirection.right, value: 8, unit: 'm³/h'},
    ],
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    open1: {control: {type: 'range', min: 0, max: 100, step: 1}},
    open2: {control: {type: 'range', min: 0, max: 100, step: 1}},
    open3: {control: {type: 'range', min: 0, max: 100, step: 1}},
    orientation: {
      options: Object.values(ThreewayValveOrientation),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcAnalogThreewayValve>;

export default meta;
type Story = StoryObj<ObcAnalogThreewayValve>;

const D = AutomationButtonLabelDirection;

export const Split: Story = {};

export const Open: Story = {
  args: {
    open1: 100,
    open2: 100,
    open3: 100,
    flows: [
      {direction: D.down, value: 10, unit: 'm³/h'},
      {direction: D.right, value: 10, unit: 'm³/h'},
    ],
  },
};

export const Closed: Story = {
  args: {open1: 0, open2: 0, open3: 0},
};

export const Port3Closed: Story = {
  args: {
    open1: 100,
    open2: 100,
    open3: 0,
    flows: [{direction: D.down, value: 20, unit: 'm³/h'}],
  },
};

export const OrientationLeft: Story = {
  args: {
    orientation: ThreewayValveOrientation.left,
    flows: [
      {direction: D.left, value: 12, unit: 'm³/h'},
      {direction: D.down, value: 8, unit: 'm³/h'},
    ],
  },
};

export const OrientationTop: Story = {
  args: {
    orientation: ThreewayValveOrientation.top,
    flows: [
      {direction: D.up, value: 12, unit: 'm³/h'},
      {direction: D.left, value: 8, unit: 'm³/h'},
    ],
  },
};

export const OrientationRight: Story = {
  args: {
    orientation: ThreewayValveOrientation.right,
    flows: [
      {direction: D.right, value: 12, unit: 'm³/h'},
      {direction: D.up, value: 8, unit: 'm³/h'},
    ],
  },
};
