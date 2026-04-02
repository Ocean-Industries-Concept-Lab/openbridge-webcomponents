import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './calendar.js';
import {CalendarType, type CalendarEvent} from './calendar-utils.js';
import {html} from 'lit';

interface CalendarStoryArgs {
  type: CalendarType;
  date: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  hasEventList: boolean;
  hasFooter: boolean;
  locale?: string;
  firstDayOfWeek: number;
  width?: number;
  height?: number;
}

function generateSampleEvents(year: number, month: number): CalendarEvent[] {
  return [
    {
      date: new Date(year, month, 2),
      title: 'Team Standup',
      startTime: '08:00',
      endTime: '08:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 3),
      title: 'Morning Meeting',
      startTime: '09:00',
      endTime: '10:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 3),
      title: 'Code Review',
      startTime: '14:00',
      endTime: '15:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 5),
      title: 'Client Call',
      startTime: '10:00',
      endTime: '11:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 7),
      title: 'Sprint Planning',
      startTime: '09:30',
      endTime: '11:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 7),
      title: 'Lunch & Learn',
      startTime: '12:00',
      endTime: '13:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 7),
      title: 'Design Review',
      startTime: '15:00',
      endTime: '16:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 10),
      title: 'Safety Briefing',
      startTime: '07:00',
      endTime: '08:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 10),
      title: 'Maintenance Check',
      startTime: '13:00',
      endTime: '14:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 11),
      title: 'Team Standup',
      startTime: '08:00',
      endTime: '08:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 14),
      title: 'Architecture Review',
      startTime: '10:00',
      endTime: '12:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 16),
      title: 'Client Demo',
      startTime: '14:00',
      endTime: '15:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 16),
      title: 'Retrospective',
      startTime: '16:00',
      endTime: '17:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 20),
      title: 'Workshop',
      startTime: '09:00',
      endTime: '12:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 22),
      title: 'Performance Review',
      startTime: '11:00',
      endTime: '12:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 25),
      title: 'Release Planning',
      startTime: '09:00',
      endTime: '10:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 25),
      title: 'Stakeholder Update',
      startTime: '14:00',
      endTime: '15:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 28),
      title: 'Training Session',
      startTime: '10:00',
      endTime: '12:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 30),
      title: 'End of Month Review',
      startTime: '15:00',
      endTime: '16:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
  ];
}

function generateManyEvents(year: number, month: number): CalendarEvent[] {
  const base = generateSampleEvents(year, month);
  const extra: CalendarEvent[] = [
    {
      date: new Date(year, month, 7),
      title: 'Budget Review',
      startTime: '08:00',
      endTime: '09:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 7),
      title: 'QA Session',
      startTime: '16:30',
      endTime: '17:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 11),
      title: 'Incident Debrief',
      startTime: '09:00',
      endTime: '10:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 11),
      title: 'Vendor Meeting',
      startTime: '11:00',
      endTime: '12:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 11),
      title: 'System Check',
      startTime: '14:00',
      endTime: '15:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 14),
      title: 'Onboarding Session',
      startTime: '08:00',
      endTime: '09:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 14),
      title: 'Security Audit',
      startTime: '13:00',
      endTime: '14:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 14),
      title: 'All Hands',
      startTime: '16:00',
      endTime: '17:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 20),
      title: 'Strategy Meeting',
      startTime: '13:00',
      endTime: '14:30',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 20),
      title: 'Tech Talk',
      startTime: '15:00',
      endTime: '16:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 20),
      title: 'Documentation Sprint',
      startTime: '16:30',
      endTime: '18:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 22),
      title: 'Compliance Review',
      startTime: '08:00',
      endTime: '09:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
    {
      date: new Date(year, month, 22),
      title: 'Deployment Window',
      startTime: '14:00',
      endTime: '16:00',
      hasTime: true,
      hasEndTime: true,
      hasArrow: true,
    },
  ];
  return [...base, ...extra];
}

function renderCalendar(args: CalendarStoryArgs) {
  const w = args.width ? `${args.width}px` : '100%';
  return html`
    <div style="width: ${w}; height: ${args.height}px">
      <obc-calendar
        .type=${args.type}
        .date=${args.date}
        .selectedDate=${args.selectedDate}
        .events=${args.events}
        .hasEventList=${args.hasEventList}
        .hasFooter=${args.hasFooter}
        .locale=${args.locale}
        .firstDayOfWeek=${args.firstDayOfWeek}
      ></obc-calendar>
    </div>
  `;
}

const meta: Meta<CalendarStoryArgs> = {
  title: 'Application Components/Calendar/Calendar',
  tags: ['autodocs', '6.0'],
  component: 'obc-calendar',
  render: renderCalendar,
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(CalendarType),
    },
    hasEventList: {control: 'boolean'},
    hasFooter: {control: 'boolean'},
    locale: {control: 'text'},
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
    },
    date: {control: 'date'},
    events: {control: 'object'},
    width: {
      control: {type: 'range', min: 200, max: 1600, step: 10},
      if: {arg: 'type', neq: CalendarType.XLarge},
    },
    height: {
      control: {type: 'range', min: 200, max: 1000, step: 10},
    },
  },
  args: {
    type: CalendarType.Regular,
    date: new Date(2026, 0, 11),
    selectedDate: new Date(2026, 0, 11),
    events: generateSampleEvents(2026, 0),
    hasEventList: true,
    hasFooter: true,
    firstDayOfWeek: 1,
    width: 400,
    height: 600,
  },
};

export default meta;
type Story = StoryObj<CalendarStoryArgs>;

export const Regular: Story = {
  args: {
    type: CalendarType.Regular,
    width: 400,
    height: 600,
  },
};

export const Small: Story = {
  args: {
    type: CalendarType.Small,
    width: 380,
    height: 410,
  },
};

export const Large: Story = {
  args: {
    type: CalendarType.Large,
    width: 830,
    height: 400,
  },
};

export const Xlarge: Story = {
  args: {
    type: CalendarType.XLarge,
    width: undefined,
    height: 900,
    hasFooter: false,
  },
};

export const WithoutEventList: Story = {
  args: {
    type: CalendarType.Regular,
    hasEventList: false,
    width: 340,
    height: 600,
  },
};

export const WithoutFooter: Story = {
  args: {
    type: CalendarType.Regular,
    hasFooter: false,
    width: 400,
    height: 600,
  },
};

export const EmptyCalendar: Story = {
  args: {
    type: CalendarType.Regular,
    events: [],
    width: 400,
    height: 600,
  },
};

export const ManyEvents: Story = {
  args: {
    type: CalendarType.Regular,
    events: generateManyEvents(2026, 0),
    width: 400,
    height: 600,
  },
};
