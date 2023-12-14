import type { Meta, StoryObj } from '@storybook/web-components';
import { NotificationButton } from './notification-button';
import './notification-button';
import '../icon/icon';
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof NotificationButton> = {
  title: 'Button/Notification button',
  tags: ['autodocs'],
  component: "ob-notification-button",
} satisfies Meta<NotificationButton>;

export default meta;
type Story = StoryObj<NotificationButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Ack: Story = {
  render: () => `
  <ob-notification-button>
    ACK
  </ob-notification-button>`
};

export const Mute: Story = {
  render: () => `
  <ob-notification-button icon>
    <ob-icon icon="14-mute" size="24"></ob-icon>
  </ob-notification-button>`
};

export const MuteDisabled: Story = {
  render: () => `
  <ob-notification-button icon disabled>
    <ob-icon icon="14-mute" size="24"></ob-icon>
  </ob-notification-button>`
};

export const MuteIndent: Story = {
  render: () => `
  <ob-notification-button icon disabled indent>
    <ob-icon icon="14-mute" size="24"></ob-icon>
  </ob-notification-button>`
};

export const MuteOpenRight: Story = {
  render: () => `
  <ob-notification-button icon openRight>
    <ob-icon icon="14-mute" size="24"></ob-icon>
  </ob-notification-button>`
};
