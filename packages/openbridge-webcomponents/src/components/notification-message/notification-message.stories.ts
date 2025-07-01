import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNotificationMessage,
  ObcNotificationMessageAction,
} from './notification-message.js';
import './notification-message.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<typeof ObcNotificationMessage> = {
  title: 'Application Components/Notification message',
  tags: ['autodocs', '6.0'],
  component: 'obc-notification-message',
  args: {
    action: ObcNotificationMessageAction.TextButton,
    empty: false,
    large: false,
    title: 'Message title',
    description: 'Message text goes here, something informative',
    hasSecondaryIcon: true,
  },
  render: (args) => html`
    <obc-notification-message 
        .action=${args.action} 
        .empty=${args.empty}
        .large=${args.large}
        .hasSecondaryIcon=${args.hasSecondaryIcon}
        >
      <obi-placeholder slot="primary-icon"></obi-placeholder>
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
      <div slot="title">${args.title}</div>
      <div slot="description">${args.description}</div>
      <div slot="time">09:12:46</div>
      <div slot="action-text">Label</div>
      <obi-placeholder slot="action-icon"></obi-placeholder></div>
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

export const ShortText: Story = {
  args: {
    action: ObcNotificationMessageAction.TextButton,
    description: 'Short message',
    title: 'Title',
  },
};

export const VeryLongTitleText: Story = {
  args: {
    action: ObcNotificationMessageAction.TextButton,
    description: 'Short message',
    title:
      'A very long title that should be truncated, this is a very long title that should be truncated',
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

export const IconNoClick: Story = {
  args: {
    action: ObcNotificationMessageAction.IconNoClick,
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
