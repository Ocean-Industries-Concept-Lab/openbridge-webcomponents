import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcAnalogValve} from './analog-valve.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './analog-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';

const meta: Meta<typeof ObcAnalogValve> = {
  title: 'Automation/Automation Devices/Analog Valve',
  tags: ['autodocs'],
  component: 'obc-analog-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
    showReadoutStack: true,
    hasIdTag: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
  },
} as Meta<typeof ObcAnalogValve>;

export default meta;
type Story = StoryObj<ObcAnalogValve>;

export const Open: Story = {
  args: {
    open: true,
    value: 20,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    value: 0,
  },
};

export const WithBadges: Story = {
  args: {
    open: true,
    value: 20,
    badgeAlert: AutomationButtonBadgeAlert.Silence,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
  },
};
