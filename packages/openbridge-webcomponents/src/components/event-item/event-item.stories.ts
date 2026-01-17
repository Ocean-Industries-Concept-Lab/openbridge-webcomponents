import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcEventItem, EventItemType} from './event-item.js';
import './event-item.js';
import {widthDecorator} from '../../storybook-util.js';

interface EventItemStoryArgs extends Partial<ObcEventItem> {
  width?: number;
}

const meta: Meta<EventItemStoryArgs> = {
  title: 'Application Components/Calendar/Event Item',
  tags: ['6.0'],
  component: 'obc-event-item',
  decorators: [widthDecorator],
  argTypes: {
    eventItemType: {
      control: 'select',
      options: Object.values(EventItemType),
    },
    color: {
      control: 'color',
    },
  },
  args: {
    width: 300,
    title: 'Event Title',
    startTime: '09:00',
    endTime: '10:00',
    eventItemType: EventItemType.SingleLine,
    hasTime: true,
    hasEndTime: true,
    disabled: false,
    hasArrow: false,
  },
};

export default meta;
type Story = StoryObj<EventItemStoryArgs>;

export const SingleLine: Story = {
  args: {
    eventItemType: EventItemType.SingleLine,
  },
};

export const SingleLineNoTime: Story = {
  args: {
    eventItemType: EventItemType.SingleLine,
    hasTime: false,
  },
};

export const SingleLineWithArrow: Story = {
  args: {
    eventItemType: EventItemType.SingleLine,
    hasArrow: true,
  },
};

export const DoubleLine: Story = {
  args: {
    eventItemType: EventItemType.DoubleLine,
    description: 'This is a detailed description of the event.',
  },
};

export const Aggregated: Story = {
  args: {
    eventItemType: EventItemType.Aggregated,
    aggregatedCount: 3,
    hasTime: false,
  },
};

export const ColorCoded: Story = {
  args: {
    eventItemType: EventItemType.SingleLine,
    color: '#4caf50',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DoubleLineDisabled: Story = {
  args: {
    eventItemType: EventItemType.DoubleLine,
    description: 'This is a detailed description of the event.',
    disabled: true,
  },
};

export const AggregatedDisabled: Story = {
  args: {
    eventItemType: EventItemType.Aggregated,
    aggregatedCount: 5,
    disabled: true,
  },
};
