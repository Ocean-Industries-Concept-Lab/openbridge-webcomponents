import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcValveAnalogTwoWayIcon } from './valve-analog-two-way-icon';
import './valve-analog-two-way-icon';

const meta: Meta<typeof ObcValveAnalogTwoWayIcon> = {
  title: 'Automation/Icon/Valve analog two way',
  tags: ['autodocs'],
  component: "obc-valve-analog-two-way-icon",
  args: {
  },
} satisfies Meta<ObcValveAnalogTwoWayIcon>;

export default meta;
type Story = StoryObj<ObcValveAnalogTwoWayIcon>;

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