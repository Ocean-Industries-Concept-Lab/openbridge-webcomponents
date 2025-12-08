import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcBatteryIcon } from './battery-icon.js';
import './battery-icon.js';

const meta: Meta<typeof ObcBatteryIcon> = {
  title: 'UI Components/Visual feedback/Battery Icon',
  tags: ['6.0'],
  component: "obc-battery-icon",
  args: {
    level: 100,
    charging: false,
  },
  argTypes: {
    level: {
      control: {type: 'range', min: 0, max: 100},
    },
  },
} satisfies Meta<ObcBatteryIcon>;

export default meta;
type Story = StoryObj<ObcBatteryIcon>;

export const Full: Story = {
  args: {
    level: 100,
  },
}

export const Empty: Story = {
  args: {
    level: 0,
  },
}

export const Low: Story = {
  args: {
    level: 9,
  },
}

export const HalfFull: Story = {
  args: {
    level: 50,
  },
}

export const NearFull: Story = {
  args: {
    level: 99,
  },
}

export const Charging: Story = {
  args: {
    level: 50,
    charging: true,
  },
}

export const Notification: Story = {
  args: {
    level: 5,
    notification: true,
  },
}