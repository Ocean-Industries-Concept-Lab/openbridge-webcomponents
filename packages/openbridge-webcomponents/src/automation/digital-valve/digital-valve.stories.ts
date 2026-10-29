import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  DigitalValveVariant,
  ObcDigitalValve,
  ObcValveHandle,
} from './digital-valve.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './digital-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import { Direction } from '../../types.js';

const meta: Meta<typeof ObcDigitalValve> = {
  title: 'Automation/Automation Devices/Digital Valve',
  tags: ['autodocs'],
  component: 'obc-digital-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    flowDirection: {
      options: Object.values(Direction),
      control: {type: 'radio'},
    },
    handle: {
      options: Object.values(ObcValveHandle),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcDigitalValve>;

export default meta;
type Story = StoryObj<ObcDigitalValve>;

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};

export const Manual: Story = {
  args: {
    handle: ObcValveHandle.manual,
  },
};

export const ManualFlat: Story = {
  args: {
    handle: ObcValveHandle.manual,
    variant: DigitalValveVariant.flat,
  },
};

export const ManualDown: Story = {
  args: {
    flowDirection: Direction.Down,
    handle: ObcValveHandle.manual,
    open: true,
  },
};

export const ManualLeft: Story = {
  args: {
    flowDirection: Direction.Left,
    handle: ObcValveHandle.manual,
    open: true,
  },
};
