import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNotificationMessageItem} from './notification-message-item.js';
import './notification-message-item.js';
import {html} from 'lit';

const meta: Meta<typeof ObcNotificationMessageItem> = {
  title:
    'Application Components/Notifications/Notification message/Notification Message Item',
  tags: ['6.0'],
  component: 'obc-notification-message-item',
  args: {
    title: 'Notification title',
    description: 'Message text goes here, something informative',
    time: '09:12:46',
    actionType: 'none',
    actionLabel: 'Label',
    large: false,
    empty: false,
    emptyText: 'No active notification',
  },
  argTypes: {
    actionType: {
      control: {type: 'select'},
      options: ['none', 'button', 'icon'],
      description: 'Type of action to display',
    },
    large: {
      control: {type: 'boolean'},
      description: 'Use tall/large layout variant',
    },
    empty: {
      control: {type: 'boolean'},
      description: 'Show empty state instead of notification',
    },
    title: {
      control: {type: 'text'},
      description: 'Notification title/heading',
    },
    description: {
      control: {type: 'text'},
      description: 'Notification body text',
    },
    time: {
      control: {type: 'text'},
      description: 'Timestamp to display',
    },
    actionLabel: {
      control: {type: 'text'},
      description: 'Label for action button (when actionType is "button")',
    },
    emptyText: {
      control: {type: 'text'},
      description: 'Text to show in empty state',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A notification message item component for displaying alerts, messages, and notifications in the topbar or notification panels.',
      },
    },
  },
} satisfies Meta<ObcNotificationMessageItem>;

export default meta;
type Story = StoryObj<ObcNotificationMessageItem>;

// Primary/default story
export const Primary: Story = {
  args: {
    title: 'Notification title',
    description: 'Message text goes here, something informative',
    time: '09:12:46',
    actionType: 'none',
  },
};

// Simple notification (no action)
export const Simple: Story = {
  name: 'Simple',
  args: {
    title: 'System Update',
    description: 'Your system has been updated successfully',
    time: '10:30:15',
    actionType: 'none',
  },
};

// With text button action
export const WithButton: Story = {
  name: 'With Button',
  args: {
    title: 'New Message',
    description: 'You have received a new message from John Doe',
    time: '09:12:46',
    actionType: 'button',
    actionLabel: 'View',
  },
};

// With icon button (close)
export const WithIconButton: Story = {
  name: 'With Icon Button',
  args: {
    title: 'Download Complete',
    description: 'Your file has been downloaded successfully',
    time: '14:23:10',
    actionType: 'icon',
  },
};

// Empty state
export const Inactive: Story = {
  name: 'Inactive',
  args: {
    empty: true,
    emptyText: 'No active notification',
  },
};

// Large/tall layout variants
export const SimpleTall: Story = {
  name: 'Simple (Tall)',
  args: {
    title: 'System Alert',
    description: 'Critical system maintenance scheduled for tonight',
    time: '16:45:00',
    actionType: 'none',
    large: true,
  },
};

export const WithButtonTall: Story = {
  name: 'With Button (Tall)',
  args: {
    title: 'Security Alert',
    description: 'Unusual login activity detected on your account',
    time: '09:12:46',
    actionType: 'button',
    actionLabel: 'Review',
    large: true,
  },
};

export const WithIconButtonTall: Story = {
  name: 'With Icon Button (Tall)',
  args: {
    title: 'Update Available',
    description: 'A new version of the application is ready to install',
    time: '11:00:00',
    actionType: 'icon',
    large: true,
  },
};

export const InactiveTall: Story = {
  name: 'Inactive (Tall)',
  args: {
    empty: true,
    emptyText: 'No active notification',
    large: true,
  },
};

// Interactive examples with event handlers
export const InteractiveExample: Story = {
  name: 'Interactive Example',
  args: {
    title: 'Interactive Notification',
    description: 'Click the message or action to see events',
    time: '12:00:00',
    actionType: 'button',
    actionLabel: 'Action',
  },
  render: (args) => html`
    <div>
      <obc-notification-message-item
        .title=${args.title}
        .description=${args.description}
        .time=${args.time}
        .actionType=${args.actionType}
        .actionLabel=${args.actionLabel}
        .large=${args.large}
        .empty=${args.empty}
        .emptyText=${args.emptyText}
        @message-click=${(e: CustomEvent) => {
          console.log('Message clicked:', e.detail);
          alert(`Message clicked: ${e.detail.title}`);
        }}
        @action-click=${(e: CustomEvent) => {
          console.log('Action clicked:', e.detail);
          alert(`Action clicked: ${e.detail.actionType}`);
        }}
      ></obc-notification-message-item>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Click the message area or action button to trigger events. Check the
        console for event details.
      </p>
    </div>
  `,
};

// Multiple notifications example
export const MultipleNotifications: Story = {
  name: 'Multiple Notifications',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 640px;"
    >
      <obc-notification-message-item
        title="System Update"
        description="Your system has been updated to version 2.1.0"
        time="10:30:15"
        actionType="button"
        actionLabel="Details"
      ></obc-notification-message-item>

      <obc-notification-message-item
        title="New Message"
        description="You have 3 unread messages in your inbox"
        time="09:45:22"
        actionType="button"
        actionLabel="View"
      ></obc-notification-message-item>

      <obc-notification-message-item
        title="Download Complete"
        description="Report_Q4_2024.pdf has been downloaded"
        time="08:15:00"
        actionType="icon"
      ></obc-notification-message-item>

      <obc-notification-message-item
        title="Security Alert"
        description="Password will expire in 5 days"
        time="Yesterday"
        actionType="button"
        actionLabel="Update"
      ></obc-notification-message-item>
    </div>
  `,
};

// Long content handling
export const LongContent: Story = {
  name: 'Long Content (Truncation)',
  args: {
    title:
      'This is a very long notification title that should be truncated when it exceeds the available space',
    description:
      'This is an extremely long description that contains a lot of information and should be properly truncated with an ellipsis when it exceeds the available width of the notification component',
    time: '23:59:59',
    actionType: 'button',
    actionLabel: 'View Details',
  },
};
