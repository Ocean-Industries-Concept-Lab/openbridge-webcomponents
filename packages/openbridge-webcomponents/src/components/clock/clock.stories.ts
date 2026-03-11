import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcClock} from './clock.js';
import './clock.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcClock> = {
  title: 'Application Components/Top Elements/Clock',
  tags: ['autodocs', '6.0'],
  component: 'obc-clock',
  args: {
    date: '2024-12-12T13:30:12.111Z',
    timeZoneOffsetHours: 1,
  },
} satisfies Meta<ObcClock>;

export default meta;
type Story = StoryObj<ObcClock>;
export const Normal: Story = {
  args: {},
};

export const NoClick: Story = {
  args: {
    isClickable: false,
  },
};

export const WithTimezone: Story = {
  args: {
    showTimezone: true,
    timeZoneOffsetHours: 0,
  },
};

export const FullDate: Story = {
  args: {
    showTimezone: true,
    timeZoneOffsetHours: 2,
    showDate: true,
    showYear: true,
    showWeekday: true,
    showSeconds: true,
  },
};

export const Double: Story = {
  args: {
    double: true,
    showTimezone: true,
    timeZoneOffsetHours: 2,
    showDate: true,
    showYear: true,
    showWeekday: true,
    showSeconds: true,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    showTimezone: true,
    timeZoneOffsetHours: 2,
    showDate: true,
    showYear: true,
    showWeekday: true,
    showSeconds: true,
  },
};

export const Activated: Story = {
  args: {
    activated: true,
    showTimezone: true,
    timeZoneOffsetHours: 2,
    showDate: true,
    showYear: true,
    showWeekday: true,
    showSeconds: true,
  },
};

export const USDate: Story = {
  args: {
    showTimezone: true,
    showDate: true,
    showYear: true,
    showWeekday: true,
    locale: 'en-US',
    showSeconds: true,
    hour12: true,
  },
};

export const NorwegianDate: Story = {
  args: {
    showTimezone: true,
    showDate: true,
    showYear: true,
    showWeekday: true,
    locale: 'nb-NO',
    showSeconds: true,
  },
};

export const LiveClock: Story = {
  args: {
    date: new Date().toISOString(),
    showTimezone: true,
    showDate: true,
    hour12: true,
    showYear: true,
    showWeekday: true,
    timeZoneOffsetHours: new Date().getTimezoneOffset() / -60,
    locale: 'en-GB',
    showSeconds: true,
  },
  tags: ['!snapshot'],
  render: (args) => {
    const clock = document.createElement('obc-clock');
    clock.date = args.date;
    clock.showSeconds = args.showSeconds;
    clock.showTimezone = args.showTimezone;
    clock.showDate = args.showDate;
    clock.showYear = args.showYear;
    clock.showWeekday = args.showWeekday;
    clock.locale = args.locale;
    clock.timeZoneOffsetHours = args.timeZoneOffsetHours;
    setInterval(() => {
      clock.date = new Date().toISOString();
    }, 100);
    return clock;
  },
};

export const BlinkOnly: Story = {
  args: {
    blinkOnlyBreakpointPx: 1_000_000,
  },
};

export const BlinkOnlyResponsive: Story = {
  args: {
    blinkOnlyBreakpointPx: 600,
  },
};
