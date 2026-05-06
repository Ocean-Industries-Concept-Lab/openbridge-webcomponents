import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcGround, GroundAlternativeIcon} from './ground.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './ground.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcGround> = {
  title: 'Automation/Automation Devices/Ground',
  tags: ['autodocs'],
  component: 'obc-ground',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
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
      options: Object.values(GroundAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcGround>;

export default meta;
type Story = StoryObj<ObcGround>;

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
