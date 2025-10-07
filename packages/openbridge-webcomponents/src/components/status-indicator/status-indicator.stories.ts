import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcStatusIndicator, StatusIndicatorStatus} from './status-indicator.js';
import './status-indicator.js';
import {html} from 'lit';

const meta: Meta<typeof ObcStatusIndicator> = {
  title: 'UI components/Message and alerts/Status indicator',
  tags: ['alpha'],
  component: 'obc-status-indicator',
  args: {},
  render: (args) => {
    return html`<obc-status-indicator .status=${args.status}
      >Label</obc-status-indicator
    >`;
  },
} satisfies Meta<ObcStatusIndicator>;

export default meta;
type Story = StoryObj<ObcStatusIndicator>;

export const Active: Story = {
  args: {
    status: StatusIndicatorStatus.active,
  },
};

export const Inactive: Story = {
  args: {
    status: StatusIndicatorStatus.inactive,
  },
};

export const Caution: Story = {
  args: {
    status: StatusIndicatorStatus.caution,
  },
};

export const Warning: Story = {
  args: {
    status: StatusIndicatorStatus.warning,
  },
};

export const Alarm: Story = {
  args: {
    status: StatusIndicatorStatus.alarm,
  },
};

export const Running: Story = {
  args: {
    status: StatusIndicatorStatus.running,
  },
};
