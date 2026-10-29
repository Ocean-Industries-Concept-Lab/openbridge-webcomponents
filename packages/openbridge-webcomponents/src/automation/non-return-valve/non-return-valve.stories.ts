import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNonReturnValve} from './non-return-valve.js';
import {DirectionValveVariant} from '../direction-valve-shared/direction-valve-shared.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {Direction} from '../../types.js';
import './non-return-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNonReturnValve> = {
  title: 'Automation/Automation Devices/Non Return Valve',
  tags: ['autodocs', 'experimental'],
  component: 'obc-non-return-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
    flowDirection: Direction.Right,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    flowDirection: {
      options: Object.values(Direction),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNonReturnValve>;

export default meta;
type Story = StoryObj<ObcNonReturnValve>;

export const FlowRight: Story = {
  args: {
    flowDirection: Direction.Right,
  },
};

export const FlowLeft: Story = {
  args: {
    flowDirection: Direction.Left,
  },
};

export const FlowUp: Story = {
  args: {
    flowDirection: Direction.Up,
  },
};

export const FlowDown: Story = {
  args: {
    flowDirection: Direction.Down,
  },
};

export const FlatFlowRight: Story = {
  args: {
    variant: DirectionValveVariant.flat,
    flowDirection: Direction.Right,
  },
};

export const FlatFlowLeft: Story = {
  args: {
    variant: DirectionValveVariant.flat,
    flowDirection: Direction.Left,
  },
};

export const FlatFlowUp: Story = {
  args: {
    variant: DirectionValveVariant.flat,
    flowDirection: Direction.Up,
  },
};

export const FlatFlowDown: Story = {
  args: {
    variant: DirectionValveVariant.flat,
    flowDirection: Direction.Down,
  },
};
