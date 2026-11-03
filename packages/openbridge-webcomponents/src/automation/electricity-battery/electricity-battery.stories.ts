import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcElectricityBattery} from './electricity-battery.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './electricity-battery.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcElectricityBattery> = {
  title: 'Automation/Automation Devices/Electricity Battery',
  tags: ['autodocs', 'experimental'],
  component: 'obc-electricity-battery',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcElectricityBattery>;

export default meta;
type Story = StoryObj<ObcElectricityBattery>;

export const On: Story = {
  args: {
    turnedOn: true,
  },
};

export const Off: Story = {
  args: {
    turnedOn: false,
  },
};
