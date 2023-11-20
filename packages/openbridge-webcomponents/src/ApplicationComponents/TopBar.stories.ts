import type { Meta, StoryObj } from '@storybook/web-components';
import { TopBar } from './TopBar';
import './TopBar';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof TopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs'],
  component: "ob-top-bar",
  args: {
    showMenuButton: true,
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
  },
  argTypes: {
    showMenuButton: {
      control: { type: 'boolean' },
    },
    showAppsButton: {
      control: { type: 'boolean' },
    },
    showDimmingButton: {
      control: { type: 'boolean' },
    },
    showClock: {
      control: { type: 'boolean' },
    },
    wideMenuButton: {
      control: { type: 'boolean' },
    },
    inactive: {
      control: { type: 'boolean' },
    },
    sizeSmall: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<TopBar>;

export default meta;
type Story = StoryObj<TopBar>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Regular: Story = {
};

export const WideRailRegular: Story = {
  args: {
    wideMenuButton: true,
  },
};

export const Inactive: Story = {
  args: {
    inactive: true,
  },
};

export const Small: Story = {
  args: {
    sizeSmall: true,
  },
};