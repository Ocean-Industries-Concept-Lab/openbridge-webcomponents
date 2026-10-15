import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDigitalThreewayValve} from './digital-threeway-valve.js';
import {
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './digital-threeway-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {ThreewayValveOrientation} from '../threeway-valve-shared/threeway-valve-shared.js';

const meta: Meta<typeof ObcDigitalThreewayValve> = {
  title: 'Automation/Automation Devices/Digital Threeway Valve',
  tags: ['autodocs', 'experimental'],
  component: 'obc-digital-threeway-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
    orientation: ThreewayValveOrientation.bottom,
    open1: true,
    open2: true,
    open3: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    orientation: {
      options: Object.values(ThreewayValveOrientation),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcDigitalThreewayValve>;

export default meta;
type Story = StoryObj<ObcDigitalThreewayValve>;

const D = AutomationButtonLabelDirection;

export const Open: Story = {
  args: {},
};

export const OpenExplicit: Story = {
  args: {
    flows: [
      {direction: D.right, open: true},
      {direction: D.down, open: true},
    ],
  },
};

export const Closed: Story = {
  args: {open1: false, open2: false, open3: false},
};

export const Port1Closed: Story = {
  args: {open1: false, flows: [{direction: D.right, open: true}]},
};
export const Port1ExplicitClosed: Story = {
  args: {
    open1: false,
    flows: [
      {direction: D.right, open: true},
      {direction: D.left, open: false},
    ],
  },
};

export const Port2Closed: Story = {
  args: {open2: false, flows: [{direction: D.right, open: true}]},
};

export const Port3Closed: Story = {
  args: {open3: false, flows: [{direction: D.down, open: true}]},
};

export const OrientationLeft: Story = {
  args: {
    orientation: ThreewayValveOrientation.left,
    open1: false,
    flows: [{direction: D.down, open: true}],
  },
};

export const OrientationTop: Story = {
  args: {
    orientation: ThreewayValveOrientation.top,
    open1: false,
    flows: [{direction: D.up, open: true}],
  },
};

export const OrientationRight: Story = {
  args: {
    orientation: ThreewayValveOrientation.right,
    open1: false,
    flows: [{direction: D.right, open: true}],
  },
};

export const WithValueFlows: Story = {
  args: {
    flows: [
      {direction: D.right, value: 8, unit: 'm³/h'},
      {direction: D.down, value: 12, unit: 'm³/h'},
    ],
  },
};

export const WithValuePercentageFlows: Story = {
  args: {
    flows: [
      {direction: D.right, value: 100},
      {direction: D.down, value: 100},
    ],
  },
};
