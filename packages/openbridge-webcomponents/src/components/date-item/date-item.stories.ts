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
    date: {
      control: 'number',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the date item is enabled',
    },
    hasEvent: {
      control: 'boolean',
      description: 'Whether it has an event or not',
    },
    moreEvent: {
      control: 'boolean',
      description: 'Whether there are more than one event (only available when hasEvent is true)',
      if: { arg: 'hasEvent', truthy: true },
    },
    eventTitle1: {
      control: 'text',
      description: 'Title for the first event (only visible in large size)',
    },
    eventDescription1: {
      control: 'text',
      description: 'Description for the first event (only visible in large size)',
    },
    eventTitle2: {
      control: 'text',
      description: 'Title for the second event (only visible in large size)',
    },
    eventDescription2: {
      control: 'text',
      description: 'Description for the second event (only visible in large size)',
    }
  },
  args: {
    type: DateItemType.Today,
    size: DateItemSize.Small,
    hasEvent: false,
    moreEvent: false,
    eventTitle1: 'Event',
    eventDescription1: 'Description',
    eventTitle2: 'Event',
    eventDescription2: 'Description',
    date: 1,
    enabled: true,
  },
} satisfies Meta<ObcDateItem>;

export default meta;
type Story = StoryObj<ObcDateItem>;

export const Today: Story = {};

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

export const WithEvent: Story = {
  args: {
    hasEvent: true,
    eventTitle1: 'Meeting',
    eventDescription1: 'Team standup at 9 AM',
  },
};

export const WithMultipleEvents: Story = {
  args: {
    hasEvent: true,
    moreEvent: true,
    eventTitle1: 'Meeting',
    eventDescription1: 'Team standup at 9 AM',
    eventTitle2: 'Deadline',
    eventDescription2: 'Project review due',
  },
};

export const LargeWithEvent: Story = {
  args: {
    size: DateItemSize.Large,
    hasEvent: true,
    eventTitle1: 'Meeting',
    eventDescription1: 'Team standup at 9 AM',
  },
};

export const LargeWithMultipleEvents: Story = {
  args: {
    size: DateItemSize.Large,
    hasEvent: true,
    moreEvent: true,
    eventTitle1: 'Meeting',
    eventDescription1: 'Team standup at 9 AM',
    eventTitle2: 'Deadline',
    eventDescription2: 'Project review due',
  },
};