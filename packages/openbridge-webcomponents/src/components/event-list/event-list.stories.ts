import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcEventList, type DateItemEvent} from './event-list.js';
import './event-list.js';
import {widthDecorator} from '../../storybook-util.js';

interface EventListStoryArgs extends Partial<ObcEventList> {
  width?: number;
}

const sampleEvents: DateItemEvent[] = [
  {
    title: 'Appointment title',
    startTime: '07:00',
    endTime: '10:00',
    hasTime: true,
    hasEndTime: true,
    hasArrow: true,
  },
  {
    title: 'Appointment title',
    startTime: '07:00',
    endTime: '10:00',
    hasTime: true,
    hasEndTime: true,
    hasArrow: true,
  },
];

const meta: Meta<EventListStoryArgs> = {
  title: 'Application Components/Calendar/Event List',
  tags: ['6.0'],
  component: 'obc-event-list',
  decorators: [widthDecorator],
  argTypes: {
    showHeader: {
      control: 'boolean',
    },
    date: {
      control: 'date',
    },
    width: {
      control: {
        type: 'range',
        min: 200,
        max: 600,
        step: 10,
      },
    },
    // Hide private/internal properties from Storybook
    locale: {table: {disable: true}},
  },
  args: {
    width: 320,
    showHeader: true,
    date: new Date(2025, 0, 11), // January 11, 2025 (Saturday)
    events: sampleEvents,
  },
};

export default meta;
type Story = StoryObj<EventListStoryArgs>;

export const Primary: Story = {
  args: {},
};

export const WithoutHeader: Story = {
  args: {
    showHeader: false,
  },
};

export const SingleEvent: Story = {
  args: {
    events: [
      {
        title: 'Morning Meeting',
        startTime: '09:00',
        endTime: '10:30',
        hasTime: true,
        hasEndTime: true,
        hasArrow: true,
      },
    ],
  },
};

export const MultipleEvents: Story = {
  args: {
    events: [
      {
        title: 'Morning Meeting',
        startTime: '07:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: true,
      },
      {
        title: 'Lunch Break',
        startTime: '12:00',
        endTime: '13:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: true,
      },
      {
        title: 'Afternoon Workshop',
        startTime: '14:00',
        endTime: '16:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: true,
      },
      {
        title: 'Evening Review',
        startTime: '17:00',
        endTime: '18:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: true,
      },
    ],
  },
};

export const NoArrows: Story = {
  args: {
    events: [
      {
        title: 'Meeting',
        startTime: '09:00',
        endTime: '10:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: false,
      },
      {
        title: 'Workshop',
        startTime: '14:00',
        endTime: '15:00',
        hasTime: true,
        hasEndTime: true,
        hasArrow: false,
      },
    ],
  },
};

export const NoEndTime: Story = {
  args: {
    events: [
      {
        title: 'All Day Event',
        startTime: '09:00',
        endTime: '',
        hasTime: true,
        hasEndTime: false,
        hasArrow: true,
      },
    ],
  },
};
