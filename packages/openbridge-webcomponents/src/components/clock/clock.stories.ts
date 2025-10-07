import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcClock} from './clock.js';
import './clock.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcClock> = {
  title: 'UI Building Blocks/Clock',
  tags: ['autodocs'],
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
    noClick: true,
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
  },
};

export const MonthBeforeDay: Story = {
  args: {
    showTimezone: true,
    showDate: true,
    showYear: true,
    monthBeforeDay: true,
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
