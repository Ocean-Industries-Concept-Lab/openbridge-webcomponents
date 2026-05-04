import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcSwitch, SwitchAlternativeIcon} from './switch.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './switch.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcSwitch> = {
  title: 'Automation/Automation Devices/Switch',
  tags: ['autodocs'],
  component: 'obc-switch',
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
    alternativeIcon: {
      control: 'radio',
      options: Object.values(SwitchAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
  },
} as Meta<typeof ObcSwitch>;

export default meta;
type Story = StoryObj<ObcSwitch>;

export const On: Story = {
  args: {
    on: true,
  },
};

export const Off: Story = {
  args: {
    on: false,
  },
};
