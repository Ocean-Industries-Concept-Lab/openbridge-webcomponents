import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAnalogValve} from './analog-valve.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './analog-valve.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcAnalogValve> = {
  title: 'Automation/Automation devices/Analog Valve',
  tags: ['autodocs'],
  component: 'obc-analog-valve',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
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
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
    alert: {control: {type: 'boolean'}},
    progress: {control: {type: 'boolean'}},
    vertical: {control: {type: 'boolean'}},
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
