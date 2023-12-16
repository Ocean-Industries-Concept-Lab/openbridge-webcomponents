import type { Meta, StoryObj } from '@storybook/web-components';
import { Demo } from './demo';
import './demo';

const meta: Meta<typeof Demo> = {
  title: '/Demo',
  component: "obc-demo",
  args: {
  },
  argTypes: {
  },
} satisfies Meta<Demo>;

export default meta;
type Story = StoryObj<Demo>;

export const Primary: Story = {
  args: {
  },
};