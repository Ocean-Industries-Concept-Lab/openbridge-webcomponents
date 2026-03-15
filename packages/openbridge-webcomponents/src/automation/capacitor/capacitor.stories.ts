import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcCapacitor, CapacitorAlternativeIcon} from './capacitor.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './capacitor.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcCapacitor> = {
  title: 'Automation/Automation devices/Capacitor',
  tags: ['autodocs'],
  component: 'obc-capacitor',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
    hasIdTag: true,
  },
  argTypes: {
    alternativeIcon: {
      control: 'radio',
      options: Object.values(CapacitorAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcCapacitor>;

export default meta;
type Story = StoryObj<ObcCapacitor>;

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
