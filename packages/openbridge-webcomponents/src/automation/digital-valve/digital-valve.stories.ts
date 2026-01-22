import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcDigitalValve } from './digital-valve.js';
import { AutomationButtonReadoutPosition } from '../automation-button/automation-button.js';
import { AutomationButtonReadoutStackSize } from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './digital-valve.js';
import { crossDecorator } from '../../storybook-util.js';
import { argTypesAbstractAutomationButtonPassiveRound } from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcDigitalValve> = {
  title: 'Automation/Automation devices/Digital Valve',
  tags: ['autodocs'],
  component: 'obc-digital-valve',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
    hideReadoutStack: false,
    hasIdTag: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
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
