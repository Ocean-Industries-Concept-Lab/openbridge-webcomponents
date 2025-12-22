import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcFan} from './fan.js';
import './fan.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  AutomationButtonDirection,
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

const meta: Meta<typeof ObcFan> = {
  title: 'Automation/Automation devices/Fan',
  tags: ['autodocs', '6.0'],
  component: 'obc-fan',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
  },
  argTypes: {
    readoutPosition: {
      options: Object.values(AutomationButtonReadoutPosition),
      control: {type: 'select'},
    },
    readoutSize: {
      options: Object.values(AutomationButtonReadoutStackSize),
      control: {type: 'select'},
    },
    alert: {control: {type: 'boolean'}},
    progress: {control: {type: 'boolean'}},
  },
  globals: {
    componentSize: 'obc-component-size-regular',
  },
} as Meta<typeof ObcFan>;

export default meta;
type Story = StoryObj<ObcFan>;

export const FanOn: Story = {
  args: {
    on: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: AutomationButtonLabelDirection.up,
  },
};

export const FanOff: Story = {
  args: {
    on: false,
    direction: AutomationButtonDirection.backwardFast,
    labelDirection: AutomationButtonLabelDirection.left,
  },
};

export const FanComponentSize: Story = {
  args: {
    on: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: AutomationButtonLabelDirection.up,
    variant: AutomationButtonVariant.double,
  },
  globals: {
    componentSize: 'obc-component-size-large',
  },
};
