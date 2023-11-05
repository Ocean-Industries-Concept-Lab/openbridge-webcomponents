import type { Meta, StoryObj } from '@storybook/web-components';
import { NavigationItem } from './NavigationItem';
import './NavigationItem';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof NavigationItem> = {
  title: 'Menu/Navigation item',
  tags: ['autodocs'],
  component: "ob-navigation-item",
  args: {
    icon: 'placeholder',
    label: 'Label'
  },
  argTypes: {
    icon: {
      options: ['placeholder', 'apps', 'alerts', 'dimming', 'menu'],
      control: { type: 'select' }
    },
    label: {
      control: { type: 'text' }
    },
    checked: {
      control: { type: 'boolean' }
    },
    href: {
      control: { type: 'text' }
    }
  },
} satisfies Meta<NavigationItem>;

export default meta;
type Story = StoryObj<NavigationItem>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
  },
};

export const Checked: Story = {
  args: {
    checked: true
  },
};