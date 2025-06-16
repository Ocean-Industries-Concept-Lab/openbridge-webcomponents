import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPump} from './pump.js';
import './pump.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  AutomationButtonDirection,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';

const meta: Meta<typeof ObcPump> = {
  title: 'Automation/Pump',
  tags: ['6.0'],
  component: 'obc-pump',
  decorators: [crossDecorator],
  args: {
    tag: '007',
  },
} satisfies Meta<ObcPump>;

export default meta;
type Story = StoryObj<ObcPump>;

export const OnVerical: Story = {
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
