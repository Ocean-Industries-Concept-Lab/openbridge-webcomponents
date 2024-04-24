import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcValveAnalogeTwoWayIcon } from './valve-analoge-two-way-icon';
import './valve-analoge-two-way-icon';

const meta: Meta<typeof ObcValveAnalogeTwoWayIcon> = {
  title: 'Automation/Icon/Valve analoge two way',
  tags: ['autodocs'],
  component: "obc-valve-analoge-two-way-icon",
  args: {
  },
} satisfies Meta<ObcValveAnalogeTwoWayIcon>;

export default meta;
type Story = StoryObj<ObcValveAnalogeTwoWayIcon>;

export const Open: Story = {
  args: {
    value: 100,
    closed: false,
  },
}

export const Closed: Story = {
  args: {
    value: 0,
    closed: true,
  },
}

export const HalfOpen: Story = {
  args: {
    value: 50,
    closed: false,
  },
}

export const NearClosed: Story = {
  args: {
    value: 0,
    closed: false,
  },
}