import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcResistor, ResistorAlternativeIcon} from './resistor.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './resistor.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcResistor> = {
  title: 'Automation/Automation devices/Resistor',
  tags: ['autodocs'],
  component: 'obc-resistor',
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
      options: Object.values(ResistorAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcResistor>;

export default meta;
type Story = StoryObj<ObcResistor>;

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
