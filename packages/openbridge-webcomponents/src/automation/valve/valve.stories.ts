import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcValve } from './valve';
import './valve';
import { crossDecorator } from '../../storybook-util';
import { AutomationButtonLabelPosition } from '../automation-button/automation-button';

const meta: Meta<typeof ObcValve> = {
  title: 'Automation/Valve',
  tags: ['autodocs'],
  decorators: [crossDecorator],
  component: "obc-valve",
  args: {
  },
} satisfies Meta<ObcValve>;

export default meta;
type Story = StoryObj<ObcValve>;

export const Right: Story = {
  args: {
  },
}

export const RightClosed: Story = {
  args: {
    closed: true
  },
}


export const RightFlat: Story = {
  args: {
    flat: true
  },
}

export const Up: Story = {
  args: {
    direction: 'up',
    labelPosition: AutomationButtonLabelPosition.right,
  },
}

export const Down: Story = {
  args: {
    direction: 'down',
    labelPosition: AutomationButtonLabelPosition.right,
  },
}