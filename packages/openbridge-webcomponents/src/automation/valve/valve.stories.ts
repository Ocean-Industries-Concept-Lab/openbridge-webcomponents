import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcValve} from './valve.js';
import {
  AutomationButtonReadoutPosition,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {
  AutomationButtonReadoutStackSize,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {Direction} from '../../types.js';

const meta: Meta<typeof ObcValve> = {
  title: 'Automation/Automation devices/Valve',
  tags: ['autodocs'],
  component: 'obc-valve',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    direction: Direction.Right,
    value: 100,
    closed: false,
    showDirectionLabel: false,
    variant: AutomationButtonVariant.regular,
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
    direction: {
      options: Object.values(Direction),
      control: {type: 'select'},
    },
    variant: {
      options: Object.values(AutomationButtonVariant),
      control: {type: 'select'},
    },
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
    alert: {control: {type: 'boolean'}},
    progress: {control: {type: 'boolean'}},
    closed: {control: {type: 'boolean'}},
    showDirectionLabel: {control: {type: 'boolean'}},
  },
} as Meta<typeof ObcValve>;

export default meta;
type Story = StoryObj<ObcValve>;

export const Open: Story = {
  args: {
    closed: false,
    value: 100,
  },
};

export const Closed: Story = {
  args: {
    closed: true,
    value: 0,
  },
};

export const WithDirectionLabel: Story = {
  args: {
    closed: false,
    value: 75,
    showDirectionLabel: true,
  },
};

export const Vertical: Story = {
  args: {
    closed: false,
    value: 50,
    direction: Direction.Up,
    showDirectionLabel: true,
  },
};

