import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcMosfet, MosfetAlternativeIcon} from './mosfet.js';
import {
  AutomationButtonPositioning,
  AutomationButtonReadoutPosition,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './mosfet.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcMosfet> = {
  title: 'Automation/Automation Devices/Mosfet',
  tags: ['autodocs'],
  component: 'obc-mosfet',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    positioning: AutomationButtonPositioning.button,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    alternativeIcon: {
      control: 'radio',
      options: Object.values(MosfetAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcMosfet>;

export default meta;
type Story = StoryObj<ObcMosfet>;

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
