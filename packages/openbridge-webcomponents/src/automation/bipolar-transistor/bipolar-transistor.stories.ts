import type {Meta, StoryObj} from '@storybook/web-vite';
import {
  ObcBipolarTransistor,
  BipolarTransistorAlternativeIcon,
} from './bipolar-transistor.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './bipolar-transistor.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcBipolarTransistor> = {
  title: 'Automation/Automation devices/Bipolar Transistor',
  tags: ['autodocs'],
  component: 'obc-bipolar-transistor',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    hideReadoutStack: false,
    hasIdTag: true,
  },
  argTypes: {
    alternativeIcon: {
      control: 'radio',
      options: Object.values(BipolarTransistorAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcBipolarTransistor>;

export default meta;
type Story = StoryObj<ObcBipolarTransistor>;

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
