import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcClock} from './clock';
import './clock';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcClock> = {
  title: 'Application/Clock',
  tags: ['autodocs'],
  component: 'obc-clock',
} satisfies Meta<ObcClock>;

export default meta;
type Story = StoryObj<ObcClock>;
export const Normal: Story = {
  args: {},
};

export const FullDate: Story = {
  args: {
    showDate: true,
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
