import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcNotificationMessage,
  ObcNotificationMessageAction,
} from './notification-message.js';
import './notification-message.js';
import '../notification-message-item/notification-message-item.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';
import {renderTime} from '../../time.js';

const meta: Meta<typeof ObcNotificationMessage> = {
  title: 'Application/Notification message',
  tags: ['autodocs'],
  component: 'obc-notification-message',
  args: {
    action: ObcNotificationMessageAction.TextButton,
    empty: false,
    large: false,
  },
  render: (args) => html`
    <obc-notification-message 
        .action=${args.action} 
        .empty=${args.empty}
        .large=${args.large}
        >
      <obi-placeholder slot="primary-icon"></obi-placeholder>
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
      <div slot="title">Message title</div>
      <div slot="description">Message text goes here, something informative</div>
      <div slot="time">${renderTime(new Date('2021-01-01T11:11:11.111Z'))}</div>
      <div slot="action-text">Label</div>
      <div slot="action-label">Icon
      <div slot="empty">No active messages</div>
    </obc-notification-message>
  `,
} satisfies Meta<ObcNotificationMessage>;

export default meta;
type Story = StoryObj<ObcNotificationMessage>;

export const TextAction: Story = {
  args: {
    action: ObcNotificationMessageAction.TextButton,
  },
};

export const IconAction: Story = {
  args: {
    action: ObcNotificationMessageAction.IconButton,
  },
};

export const NoAction: Story = {
  args: {
    action: ObcNotificationMessageAction.None,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const TextActionLarge: Story = {
  args: {
    action: ObcNotificationMessageAction.TextButton,
    large: true,
  },
};

export const IconActionLarge: Story = {
  args: {
    action: ObcNotificationMessageAction.IconButton,
    large: true,
  },
};

export const NoActionLarge: Story = {
  args: {
    action: ObcNotificationMessageAction.None,
    large: true,
  },
};

export const EmptyLarge: Story = {
  args: {
    empty: true,
    large: true,
  },
};
