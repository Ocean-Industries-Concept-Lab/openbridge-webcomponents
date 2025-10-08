import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcMotor} from './motor.js';
import './motor.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  AutomationButtonDirection,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';

const meta: Meta<typeof ObcMotor> = {
  title: 'Automation/Automation devices/Motor',
  tags: ['autodocs', '6.0'],
  component: 'obc-motor',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
  },
  globals: {
    componentSize: 'obc-component-size-regular',
  },
} satisfies Meta<ObcMotor>;

export default meta;
type Story = StoryObj<ObcMotor>;

export const OnVertical: Story = {
  args: {
    on: true,
    vertical: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: 'up',
  },
};

export const OnHorizontal: Story = {
  args: {
    on: true,
    vertical: false,
    direction: AutomationButtonDirection.backwardFast,
    labelDirection: 'left',
  },
};

export const OffVertical: Story = {
  args: {
    on: false,
    vertical: true,
    direction: AutomationButtonDirection.standby,
    labelDirection: 'up',
  },
};

export const OffHorizontal: Story = {
  args: {
    on: false,
    vertical: false,
    direction: AutomationButtonDirection.backwardStopped,
    labelDirection: 'right',
  },
};

export const VariantDoubleSizeLarge: Story = {
  args: {
    on: true,
    vertical: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: 'up',
    variant: AutomationButtonVariant.double,
  },
  globals: {
    componentSize: 'obc-component-size-large',
  },
};
