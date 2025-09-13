import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcEventItem, EventItemType } from './event-item.js';
import './event-item.js';

const meta: Meta<typeof ObcEventItem> = {
  title: 'Application components/Calendar/Event Item',
  tags: ['6.0'],
  component: "obc-event-item",
  argTypes: {
    enabled: {
      control: 'boolean',
      description: 'Whether the item is enabled',
    },
    type: {
      control: 'select',
      options: Object.values(EventItemType),
      description: 'Layout type of the event item',
    },
    hasDescription: {
      control: 'boolean',
      description: 'Toggle description visibility',
    },
    event: {
      control: 'text',
      description: 'Event title text',
    },
    description: {
      control: 'text',
      description: 'Event description text',
    },
    time: {
      control: 'text',
      description: 'Time in 24h format (HH:MM)',
    },
  },
  args: {
    enabled: true,
    type: EventItemType.SingleLine,
    hasDescription: true,
    event: 'Meeting',
    description: 'Team standup in the morning',
    time: '09:00',
  },
} satisfies Meta<ObcEventItem>;

export default meta;
type Story = StoryObj<ObcEventItem>;

export const EnabledFalse: Story = {
  args: {
    enabled: false,
  },
};

export const TypeMultiLine: Story = {
  args: {
    type: EventItemType.MultiLine,
  },
};

export const NoDescription: Story = {
  args: {
    hasDescription: false,
  },
};

export const WithEventText: Story = {
  args: {
    event: 'Project review',
  },
};

export const WithDescriptionText: Story = {
  args: {
    description: 'Slides due EOD',
  },
};

export const CustomTime: Story = {
  args: {
    time: '14:30',
  },
};
