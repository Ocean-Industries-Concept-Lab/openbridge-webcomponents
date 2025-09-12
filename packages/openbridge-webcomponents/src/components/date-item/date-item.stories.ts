import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcDateItem, DateItemType, DateItemSize } from './date-item.js';
import './date-item.js';

const meta: Meta<typeof ObcDateItem> = {
  title: 'Application components/Calendar/Date Item',
  tags: ['6.0'],
  component: "obc-date-item",
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(DateItemType),
      description: 'The variant type of date item to display',
    },
    size: {
      control: 'select',
      options: Object.values(DateItemSize),
      description: 'The size of the date item',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the date item is enabled',
    },
  },
  args: {
    type: DateItemType.Today,
    size: DateItemSize.Small,
    enabled: true,
  },
} satisfies Meta<ObcDateItem>;

export default meta;
type Story = StoryObj<ObcDateItem>;

export const Primary: Story = {};

export const Checked: Story = {
  args: {
    type: DateItemType.Checked,
  },
};

export const Unchecked: Story = {
  args: {
    type: DateItemType.Unchecked,
  },
};

export const Large: Story = {
  args: {
    size: DateItemSize.Large,
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
  },
};