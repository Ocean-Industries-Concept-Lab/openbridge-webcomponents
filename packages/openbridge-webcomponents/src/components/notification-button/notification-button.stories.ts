import type {Meta, StoryObj} from '@storybook/web-components';
import {NotificationButton} from './notification-button';
import './notification-button';
import '../icon/icon';
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof NotificationButton> = {
  title: 'Button/Notification button',
  tags: ['autodocs'],
  component: 'obc-notification-button',
} satisfies Meta<NotificationButton>;

export default meta;
type Story = StoryObj<NotificationButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Ack: Story = {
  render: () => `
  <obc-notification-button>
    ACK
  </obc-notification-button>`,
};

export const Mute: Story = {
  render: () => `
  <obc-notification-button icon>
    <obc-icon icon="14-mute" size="24"></obc-icon>
  </obc-notification-button>`,
};

export const MuteDisabled: Story = {
  render: () => `
  <obc-notification-button icon disabled>
    <obc-icon icon="14-mute" size="24"></obc-icon>
  </obc-notification-button>`,
};

export const MuteIndent: Story = {
  render: () => `
  <obc-notification-button icon disabled indent>
    <obc-icon icon="14-mute" size="24"></obc-icon>
  </obc-notification-button>`,
};

export const MuteOpenRight: Story = {
  render: () => `
  <obc-notification-button icon open-right>
    <obc-icon icon="14-mute" size="24"></obc-icon>
  </obc-notification-button>`,
};
