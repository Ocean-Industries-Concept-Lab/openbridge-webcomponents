import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcFan} from './fan.js';
import './fan.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  AutomationButtonDirection,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';

const meta: Meta<typeof ObcFan> = {
  title: 'Automation/Automation devices/Motors and pumpts/Fan',
  tags: ['autodocs', '6.0'],
  component: 'obc-fan',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
  },
  globals: {
    componentSize: 'obc-component-size-regular',
  },
} satisfies Meta<ObcFan>;

export default meta;
type Story = StoryObj<ObcFan>;

export const FanOn: Story = {
  args: {
    on: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: 'up',
  },
};

export const FanOff: Story = {
  args: {
    on: false,
    direction: AutomationButtonDirection.backwardFast,
    labelDirection: 'left',
  },
};

export const FanComponentSize: Story = {
  args: {
    on: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: 'up',
    variant: AutomationButtonVariant.double,
  },
  globals: {
    componentSize: 'obc-component-size-large',
  },
};
