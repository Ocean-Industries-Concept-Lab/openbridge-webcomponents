import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcValveAnalogeThreeWayIcon } from './valve-analoge-three-way-icon';
import './valve-analoge-three-way-icon';

const meta: Meta<typeof ObcValveAnalogeThreeWayIcon> = {
  title: 'Automation/Icon/Valve analoge three way',
  tags: ['autodocs'],
  component: "obc-valve-analoge-three-way-icon",
  args: {
  },
} satisfies Meta<ObcValveAnalogeThreeWayIcon>;

export default meta;
type Story = StoryObj<ObcValveAnalogeThreeWayIcon>;


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