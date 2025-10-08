import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNotificationMessageItem} from './notification-message-item.js';
import './notification-message-item.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<typeof ObcNotificationMessageItem> = {
  title: 'Application Components/Notifications/Notification Message Item',
  tags: ['6.0'],
  component: 'obc-notification-message-item',
  args: {
    title: 'Notification title',
    description: 'Message text goes here, something informative',
    time: '09:12:46',
    timeSecondary: '2m ago',
    actionLabel: 'Label',
    type: 'simple',
    size: 'regular',
    hasTitle: true,
    hasDescription: true,
    hasTimestamp: true,
    hasTimestamp2: false,
    hasSecondaryIcon: false,
    large: false,
    empty: false,
    emptyText: 'No active notification',
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: ['simple', 'with-button', 'with-icon-button', 'inactive'],
      description: 'Display type of the notification',
    },
    size: {
      control: {type: 'select'},
      options: ['regular', 'tall'],
      description: 'Size variant of the notification',
    },
    hasTitle: {
      control: {type: 'boolean'},
      description: 'Whether to show the title',
    },
    hasDescription: {
      control: {type: 'boolean'},
      description: 'Whether to show the description',
    },
    hasTimestamp: {
      control: {type: 'boolean'},
      description: 'Whether to show the primary timestamp',
    },
    hasTimestamp2: {
      control: {type: 'boolean'},
      description: 'Whether to show the secondary timestamp',
    },
    hasSecondaryIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show the secondary icon overlay',
    },
    large: {
      control: {type: 'boolean'},
      description: 'DEPRECATED - Use size="tall" instead',
    },
    empty: {
      control: {type: 'boolean'},
      description: 'DEPRECATED - Use type="inactive" instead',
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
      description: 'Primary timestamp to display',
    },
    timeSecondary: {
      control: {type: 'text'},
      description: 'Secondary timestamp (e.g., duration, relative time)',
    },
    actionLabel: {
      control: {type: 'text'},
      description: 'Label for action button (when type is "with-button")',
    },
    emptyText: {
      control: {type: 'text'},
      description: 'Text to show in empty state',
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
    type: 'simple',
  },
};

// Simple notification (no action)
export const Simple: Story = {
  args: {
    title: 'System Update',
    description: 'Your system has been updated successfully',
    time: '10:30:15',
    type: 'simple',
  },
};

// With text button action
export const WithButton: Story = {
  args: {
    title: 'New Message',
    description: 'You have received a new message from John Doe',
    time: '09:12:46',
    type: 'with-button',
    actionLabel: 'View',
  },
};

// With icon button (close)
export const WithIconButton: Story = {
  args: {
    title: 'Download Complete',
    description: 'Your file has been downloaded successfully',
    time: '14:23:10',
    type: 'with-icon-button',
  },
};

// Empty state
export const Inactive: Story = {
  args: {
    type: 'inactive',
    emptyText: 'No active notifications',
  },
};

// Large/tall layout variants
export const SimpleTall: Story = {
  args: {
    title: 'System Alert',
    description: 'Critical system maintenance scheduled for tonight',
    time: '16:45:00',
    type: 'simple',
    size: 'tall',
  },
};

export const WithButtonTall: Story = {
  args: {
    title: 'Security Alert',
    description: 'Unusual login activity detected on your account',
    time: '09:12:46',
    type: 'with-button',
    actionLabel: 'Review',
    size: 'tall',
  },
};

export const WithIconButtonTall: Story = {
  args: {
    title: 'Update Available',
    description: 'A new version of the application is ready to install',
    time: '11:00:00',
    type: 'with-icon-button',
    size: 'tall',
  },
};

export const InactiveTall: Story = {
  args: {
    type: 'inactive',
    emptyText: 'No active notifications',
    size: 'tall',
  },
};

// Stories showcasing additional properties
export const WithSecondaryIcon: Story = {
  args: {
    title: 'High Priority Alert',
    description: 'This notification has a secondary indicator',
    time: '12:00:00',
    hasSecondaryIcon: true,
    type: 'with-button',
    actionLabel: 'Acknowledge',
  },
  render: (args) => html`
    <obc-notification-message-item
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .type=${args.type}
      .actionLabel=${args.actionLabel}
      .hasSecondaryIcon=${args.hasSecondaryIcon}
    >
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
    </obc-notification-message-item>
  `,
};

export const WithBothTimestamps: Story = {
  args: {
    title: 'Long Running Process',
    description: 'Database backup in progress',
    time: '14:30:00',
    timeSecondary: '15m elapsed',
    hasTimestamp: true,
    hasTimestamp2: true,
    type: 'simple',
  },
};

export const OnlySecondaryTimestamp: Story = {
  args: {
    title: 'Recent Activity',
    description: 'File uploaded successfully',
    timeSecondary: '2 minutes ago',
    hasTimestamp: false,
    hasTimestamp2: true,
    type: 'with-icon-button',
  },
};

export const NoTitle: Story = {
  args: {
    description: 'Notification with description only',
    time: '09:00:00',
    hasTitle: false,
    hasDescription: true,
    type: 'with-button',
    actionLabel: 'OK',
  },
};

export const NoDescription: Story = {
  args: {
    title: 'Quick Alert',
    time: '10:15:00',
    hasTitle: true,
    hasDescription: false,
    type: 'with-icon-button',
  },
};

export const MinimalNotification: Story = {
  args: {
    title: 'Minimal',
    hasDescription: false,
    hasTimestamp: false,
    hasSecondaryIcon: false,
    type: 'simple',
  },
};

export const FullFeatured: Story = {
  args: {
    title: 'Complete Notification',
    description: 'This notification uses all available features',
    time: '15:45:30',
    timeSecondary: '5m ago',
    hasTitle: true,
    hasDescription: true,
    hasTimestamp: true,
    hasTimestamp2: true,
    hasSecondaryIcon: true,
    type: 'with-button',
    actionLabel: 'View Details',
    size: 'tall',
  },
  render: (args) => html`
    <obc-notification-message-item
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .timeSecondary=${args.timeSecondary}
      .hasTitle=${args.hasTitle}
      .hasDescription=${args.hasDescription}
      .hasTimestamp=${args.hasTimestamp}
      .hasTimestamp2=${args.hasTimestamp2}
      .hasSecondaryIcon=${args.hasSecondaryIcon}
      .type=${args.type}
      .actionLabel=${args.actionLabel}
      .size=${args.size}
    >
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
    </obc-notification-message-item>
  `,
};

// Interactive examples with event handlers
export const InteractiveExample: Story = {
  args: {
    title: 'Interactive Notification',
    description: 'Click the message or action to see events',
    time: '12:00:00',
    type: 'with-button',
    actionLabel: 'Action',
  },
  render: (args) => html`
    <div>
      <obc-notification-message-item
        .title=${args.title}
        .description=${args.description}
        .time=${args.time}
        .timeSecondary=${args.timeSecondary}
        .type=${args.type}
        .actionLabel=${args.actionLabel}
        .size=${args.size}
        .hasTitle=${args.hasTitle}
        .hasDescription=${args.hasDescription}
        .hasTimestamp=${args.hasTimestamp}
        .hasTimestamp2=${args.hasTimestamp2}
        .hasSecondaryIcon=${args.hasSecondaryIcon}
        .large=${args.large}
        .empty=${args.empty}
        .emptyText=${args.emptyText}
        @message-click=${() => {
          console.log('Message clicked');
          alert('Message area clicked!');
        }}
        @action-click=${() => {
          console.log('Action clicked');
          alert('Action button clicked!');
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
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 640px;"
    >
      <obc-notification-message-item
        title="System Update"
        description="Your system has been updated to version 2.1.0"
        time="10:30:15"
        type="with-button"
        actionLabel="Details"
      ></obc-notification-message-item>

      <obc-notification-message-item
        title="New Message"
        description="You have 3 unread messages in your inbox"
        time="09:45:22"
        timeSecondary="5m ago"
        hasTimestamp2
        type="with-button"
        actionLabel="View"
      ></obc-notification-message-item>

      <obc-notification-message-item
        title="Download Complete"
        description="Report_Q4_2024.pdf has been downloaded"
        time="08:15:00"
        type="with-icon-button"
        hasSecondaryIcon
      >
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
      </obc-notification-message-item>

      <obc-notification-message-item
        title="Security Alert"
        description="Password will expire in 5 days"
        time="Yesterday"
        type="with-button"
        actionLabel="Update"
      ></obc-notification-message-item>
    </div>
  `,
};

// Long content handling
export const LongContent: Story = {
  args: {
    title:
      'This is a very long notification title that should be truncated when it exceeds the available space',
    description:
      'This is an extremely long description that contains a lot of information and should be properly truncated with an ellipsis when it exceeds the available width of the notification component',
    time: '23:59:59',
    timeSecondary: '1h ago',
    hasTimestamp2: true,
    type: 'with-button',
    actionLabel: 'View Details',
  },
};

// Comparison of sizes
export const SizeComparison: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; max-width: 640px;"
    >
      <h3 style="margin: 0; font-size: 14px; color: #666;">Regular Size:</h3>
      <obc-notification-message-item
        title="Regular Notification"
        description="This is a regular sized notification"
        time="10:00:00"
        timeSecondary="Now"
        hasTimestamp2
        type="with-button"
        actionLabel="Action"
        size="regular"
      ></obc-notification-message-item>

      <h3 style="margin: 16px 0 0 0; font-size: 14px; color: #666;">
        Tall Size:
      </h3>
      <obc-notification-message-item
        title="Tall Notification"
        description="This is a tall sized notification with different layout"
        time="10:00:00"
        timeSecondary="Now"
        hasTimestamp2
        type="with-button"
        actionLabel="Action"
        size="tall"
      ></obc-notification-message-item>
    </div>
  `,
};
