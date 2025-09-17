import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDateItem, DateItemType, DateItemSize} from './date-item.js';
import './date-item.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcDateItem> = {
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
    disabled: {
      control: 'boolean',
      description: 'Whether the date item is enabled',
    },
    events: {
      control: {
        type: 'array',
        schema: {
          type: 'object',
          properties: {
            title: {type: 'string'},
            description: {type: 'string'},
          },
          required: ['title', 'description'],
        },
      },
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
    type: DateItemType.Today,
    size: DateItemSize.Small,
    events: [
      {title: 'Morning Meeting', description: 'Daily standup at 9 AM'},
      {title: 'Code Review', description: 'Review PR #123'},
      {title: 'Client Call', description: 'Project update discussion'},
      {title: 'Lunch & Learn', description: 'Tech talk on new framework'},
    ],
    eventCount: 2,
    date: 1,
    disabled: false,
  },
  decorators: [
    widthDecorator,
    (story, context) => {
      const {args} = context;
      if (args.eventCount > 0 && args.events?.length > args.eventCount) {
        args.events = args.events.slice(0, args.eventCount);
      }
      return story();
    },
  ],
} satisfies Meta<ObcDateItem>;

export default meta;
type Story = StoryObj<ObcDateItem>;

export const Large: Story = {
  args: {
    size: DateItemSize.Large,
  },
};

export const LargeWithEvent: Story = {
  args: {
    size: DateItemSize.Large,
    events: [{title: 'Meeting', description: 'Team standup at 9 AM'}],
  },
};

export const LargeWithMultipleEvents: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {title: 'Meeting', description: 'Team standup at 9 AM'},
      {title: 'Deadline', description: 'Project review due'},
    ],
  },
};

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

export const DisabledToday: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Small,
    type: DateItemType.Today,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Small,
    type: DateItemType.Checked,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Small,
    type: DateItemType.Unchecked,
  },
};
export const LargeTodayDisabled: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Large,
    type: DateItemType.Today,
    events: [{title: 'Meeting', description: 'Team standup at 9 AM'}],
  },
};

export const LargeCheckedDisabled: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Large,
    type: DateItemType.Checked,
    events: [{title: 'Meeting', description: 'Team standup at 9 AM'}],
  },
};

export const LargeUncheckedDisabled: Story = {
  args: {
    disabled: true,
    size: DateItemSize.Large,
    type: DateItemType.Unchecked,
    events: [{title: 'Meeting', description: 'Team standup at 9 AM'}],
  },
};

export const WithEvent: Story = {
  args: {
    events: [{title: 'Meeting', description: 'Team standup at 9 AM'}],
  },
};

export const CheckedWithEvent: Story = {
  args: {
    type: DateItemType.Checked,
    events: [{title: 'Event', description: 'Description'}],
  },
};

export const UncheckedWithEvent: Story = {
  args: {
    type: DateItemType.Unchecked,
    events: [{title: 'Event', description: 'Description'}],
  },
};

export const WithMultipleEvents: Story = {
  args: {
    events: [
      {title: 'Meeting', description: 'Team standup at 9 AM'},
      {title: 'Deadline', description: 'Project review due'},
    ],
  },
};

export const TestEventCount: Story = {
  args: {
    size: DateItemSize.Large,
    events: [
      {title: 'Event 1', description: 'First event description'},
      {title: 'Event 2', description: 'Second event description'},
      {title: 'Event 3', description: 'Third event description'},
      {title: 'Event 4', description: 'Fourth event description'},
    ],
    eventCount: 2,
  },
};
