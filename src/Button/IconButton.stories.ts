import type { Meta, StoryObj } from '@storybook/web-components';
import { IconButton } from './IconButton';
import './IconButton';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title: 'Button/Icon',
  tags: ['autodocs'],
  component: "ob-icon-button",
  argTypes: {
    icon: {
      options: ['placeholder', 'apps', 'dimming', 'menu', 'alerts'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<IconButton>;

export default meta;
type Story = StoryObj<IconButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    icon: 'apps'
  },
};