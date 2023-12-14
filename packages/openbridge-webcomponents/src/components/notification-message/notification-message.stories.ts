import type { Meta, StoryObj } from '@storybook/web-components';
import { NotificationMessage } from './notification-message';
import './notification-message';
import '../notification-message-item/notification-message-item';
import '../icon/icon';

const meta: Meta<typeof NotificationMessage> = {
  title: 'Application/Notification message',
  tags: ['autodocs'],
  component: "ob-notification-message",
  args: {
  },
  argTypes: {
  },
} satisfies Meta<NotificationMessage>;

export default meta;
type Story = StoryObj<NotificationMessage>;

export const Primary: Story = {
  render: () => `
  <ob-notification-message>
    <ob-notification-message-item time="2023-01-01T13:37:01+01:00">
      <ob-icon slot="icon" icon="14-alarm-unack" size="24" useCssColor></ob-icon>
      <div slot="message">This is a message</div>
    </ob-notification-message-item>
    <div slot="empty">No active alerts</div>
  </ob-notification-message>
`
};

export const Empty: Story = {
    render: () => `
    <ob-notification-message empty>
        <div slot="empty">No active alerts</div>
    </ob-notification-message>
  `
  };

  export const Large: Story = {
    render: () => `
    <ob-notification-message large>
        <ob-notification-message-item time="2023-01-01T13:37:01+01:00">
            <ob-icon slot="icon" icon="14-alarm-unack" size="24" useCssColor></ob-icon>
            <div slot="message">This is a message</div>
        </ob-notification-message-item>
        <ob-notification-message-item time="2023-01-01T13:37:01+01:00">
            <ob-icon slot="icon" icon="14-alarm-unack" size="24" useCssColor></ob-icon>
            <div slot="message">This is a message</div>
        </ob-notification-message-item>
        <div slot="empty">No active alerts</div>
    </ob-notification-message>
  `
  };


  export const LargeSingleMessage: Story = {
    render: () => `
    <ob-notification-message large>
        <ob-notification-message-item time="2023-01-01T13:37:01+01:00">
            <ob-icon slot="icon" icon="14-alarm-unack" size="24" useCssColor></ob-icon>
            <div slot="message">This is a message</div>
        </ob-notification-message-item>
        <div slot="empty">No active alerts</div>
    </ob-notification-message>
  `
  };