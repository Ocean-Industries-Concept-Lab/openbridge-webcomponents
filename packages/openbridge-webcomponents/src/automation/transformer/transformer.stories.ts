import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcTransformer, TransformerAlternativeIcon} from './transformer.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './transformer.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveSquare} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcTransformer> = {
  title: 'Automation/Automation Devices/Transformer',
  tags: ['autodocs'],
  component: 'obc-transformer',
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
      options: Object.values(TransformerAlternativeIcon),
    },
    ...argTypesAbstractAutomationButtonPassiveSquare,
  },
} as Meta<typeof ObcTransformer>;

export default meta;
type Story = StoryObj<ObcTransformer>;

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
