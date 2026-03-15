import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcDiodes, DiodesAlternativeIcon} from './diodes.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './diodes.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcDiodes> = {
  title: 'Automation/Automation devices/Diodes',
  tags: ['autodocs'],
  component: 'obc-diodes',
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
      options: Object.values(DiodesAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcDiodes>;

export default meta;
type Story = StoryObj<ObcDiodes>;

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
