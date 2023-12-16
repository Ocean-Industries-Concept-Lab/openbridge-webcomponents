import type {Meta, StoryObj} from '@storybook/web-components';
import {NavigationItem} from './navigation-item';
import './navigation-item';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof NavigationItem> = {
  title: 'Menu/Navigation item',
  tags: ['autodocs'],
  component: 'obc-navigation-item',
  args: {
    icon: '01-placeholder',
    label: 'Label',
  },
  argTypes: {
    icon: {
      options: [
        '01-placeholder',
        '01-apps',
        '14-alerts',
        '04-dimming',
        '01-menu',
      ],
      control: {type: 'select'},
    },
    label: {
      control: {type: 'text'},
    },
    checked: {
      control: {type: 'boolean'},
    },
    href: {
      control: {type: 'text'},
    },
  },
} satisfies Meta<NavigationItem>;

export default meta;
type Story = StoryObj<NavigationItem>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
