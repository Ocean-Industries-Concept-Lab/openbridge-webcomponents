import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {DateItemSize, EventItemType, ObcDateItem} from './date-item.js';
import './date-item.js';
import {widthDecorator} from '../../storybook-util.js';

interface DateItemStoryArgs extends Partial<ObcDateItem> {
  width?: number;
  height?: number;
}

const meta: Meta<DateItemStoryArgs> = {
  title: 'Application components/Calendar/Date Item',
  tags: ['6.0'],
  component: 'obc-date-item',
  argTypes: {
    width: {
      control: {
        type: 'range',
        min: 32,
        max: 1028,
        step: 1,
      },
    },
    size: {
      control: 'select',
      options: Object.values(DateItemSize),
      description: 'The size of the date item',
    },
    date: {
      control: 'number',
    },
    isToday: {
      control: 'boolean',
      description:
        'Whether the date item is today (shows Today label in large size and uses amplified styling)',
    },
    checked: {
      control: 'boolean',
      description:
        'Whether the date item is checked/selected (uses selected styling)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date item is disabled',
    },
    events: {
      control: 'object',
      description: 'Array of events to display on this date',
    },
    eventCount: {
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
      },
      description:
        'Number of events to display from the events array (0 = show all)',
      defaultValue: 2,
    },
  },
  args: {
    width: 300,
    size: DateItemSize.Small,
    isToday: false,
    checked: false,
    events: [
      {
        title: 'Morning Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Code Review',
        startTime: '10:30',
        endTime: '11:30',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Client Call',
        startTime: '13:00',
        endTime: '14:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Lunch & Learn',
        startTime: '12:00',
        endTime: '13:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
    eventCount: 2,
    date: 1,
    disabled: false,
  },
  decorators: [
    widthDecorator as never,
    (story, context) => {
      const args = {...context.args};
      if (
        args.eventCount &&
        args.eventCount > 0 &&
        args.events &&
        args.events.length > args.eventCount
      ) {
        const events = args.events.slice(0, args.eventCount);
        return story({...context, args: {...args, events}});
      }
      return story({...context, args});
    },
  ],
};

export default meta;
type Story = StoryObj<DateItemStoryArgs>;

export const Large: Story = {
  args: {
    size: DateItemSize.Large,
  },
};

export const LargeWithEvent: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeWithMultipleEvents: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Deadline',
        startTime: '14:00',
        endTime: '15:30',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeWithDoubleLineEvent: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Appointment title',
        description: 'Short description of what the event is about',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: true,
        eventItemType: EventItemType.DoubleLine,
      },
    ],
  },
};

export const LargeWithAggregatedEvent: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Aggregated',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
        eventItemType: EventItemType.Aggregated,
        aggregatedCount: 3,
      },
    ],
  },
};

export const LargeWithColorCodedEvent: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
        colorCoded: true,
      },
    ],
  },
};

export const LargeWithDisabledEvent: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
        disabled: true,
      },
    ],
  },
};

export const SmallIsToday: Story = {
  args: {
    isToday: true,
    events: [],
  },
};

export const Today: Story = {
  args: {
    size: DateItemSize.Large,
    isToday: true,
    eventCount: 2,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Regular: Story = {
  args: {
    isToday: false,
    checked: false,
  },
};

export const DisabledIsToday: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Small,
    isToday: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Small,
    checked: true,
  },
};

export const DisabledRegular: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Small,
    isToday: false,
    checked: false,
  },
};

export const LargeTodayDisabled: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Large,
    isToday: true,
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeCheckedDisabled: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Large,
    checked: true,
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeRegularDisabled: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Large,
    isToday: false,
    checked: false,
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const WithEvent: Story = {
  args: {
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const CheckedWithEvent: Story = {
  args: {
    checked: true,
    events: [
      {
        title: 'Event',
        startTime: '13:00',
        endTime: '14:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const RegularWithEvent: Story = {
  args: {
    isToday: false,
    checked: false,
    events: [
      {
        title: 'Event',
        startTime: '15:00',
        endTime: '16:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const WithMultipleEvents: Story = {
  args: {
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Deadline',
        startTime: '14:00',
        endTime: '15:30',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const TestEventCount: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {
        title: 'Event 1',
        startTime: '08:00',
        endTime: '09:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Event 2',
        startTime: '10:00',
        endTime: '11:30',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Event 3',
        startTime: '13:00',
        endTime: '14:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Event 4',
        startTime: '15:00',
        endTime: '16:30',
        hasTime: true,
        hasEndTime: true,
      },
    ],
    eventCount: 2,
  },
};

export const LargeTodayEnabled: Story = {
  args: {
    size: DateItemSize.Large,
    isToday: true,
    checked: false,
    date: 31,
    events: [
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeRegularEnabled: Story = {
  args: {
    size: DateItemSize.Large,
    isToday: false,
    checked: false,
    date: 31,
    events: [
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeRegularChecked: Story = {
  args: {
    size: DateItemSize.Large,
    isToday: false,
    checked: true,
    date: 31,
    events: [
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const LargeTodayChecked: Story = {
  args: {
    size: DateItemSize.Large,
    isToday: true,
    checked: true,
    date: 31,
    events: [
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Appointment title',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};

export const AutoAggregation: Story = {
  args: {
    size: DateItemSize.Large,
    isToday: true,
    date: 31,
    eventCount: 0,
    height: 150,
    events: [
      {
        title: 'Morning Meeting',
        startTime: '08:00',
        endTime: '09:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Code Review',
        startTime: '10:00',
        endTime: '11:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Lunch',
        startTime: '12:00',
        endTime: '13:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Client Call',
        startTime: '14:00',
        endTime: '15:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Team Sync',
        startTime: '15:30',
        endTime: '16:00',
        hasTime: true,
        hasEndTime: true,
      },
      {
        title: 'Planning',
        startTime: '16:00',
        endTime: '17:00',
        hasTime: true,
        hasEndTime: true,
      },
    ],
  },
};
