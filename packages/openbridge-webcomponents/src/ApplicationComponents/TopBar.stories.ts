import type { Meta, StoryObj } from '@storybook/web-components';
import { TopBar } from './TopBar';
import './TopBar';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof TopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs'],
  component: "ob-top-bar",
  argTypes: {
  },
} satisfies Meta<TopBar>;

export default meta;
type Story = StoryObj<TopBar>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
  },
};