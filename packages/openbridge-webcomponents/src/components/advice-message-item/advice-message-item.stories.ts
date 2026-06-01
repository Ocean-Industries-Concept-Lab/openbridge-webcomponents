import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAdviceMessageItem} from './advice-message-item.js';
import './advice-message-item.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<typeof ObcAdviceMessageItem> = {
  title: 'Application Components/Notifications/Advice Message Item',
  tags: ['6.0'],
  component: 'obc-advice-message-item',
  args: {
    title: 'Advice title',
    description: 'Message text goes here, something informative',
    time: '09:12:46',
    timeSecondary: '2m ago',
    actionLabel: 'Label',
    type: 'simple',
    size: 'regular',
    showTitle: true,
    showDescription: true,
    showTimestamp: true,
    hasTimestamp2: false,
    hasSecondaryIcon: false,
    large: false,
    empty: false,
    emptyText: 'No active advice',
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: ['simple', 'with-button', 'with-icon-button', 'inactive'],
      description: 'Display type of the advice',
    },
    size: {
      control: {type: 'select'},
      options: ['regular', 'tall'],
      description: 'Size variant of the advice',
    },
    showTitle: {
      control: {type: 'boolean'},
      description: 'Whether to show the title',
    },
    showDescription: {
      control: {type: 'boolean'},
      description: 'Whether to show the description',
    },
    showTimestamp: {
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
      description: 'Advice title/heading',
    },
    description: {
      control: {type: 'text'},
      description: 'Advice body text',
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
} satisfies Meta<ObcAdviceMessageItem>;

export default meta;
type Story = StoryObj<ObcAdviceMessageItem>;

export const Default: Story = {
  args: {
    title: 'Advice title',
    description: 'Message text goes here, something informative',
    time: '09:12:46',
    type: 'simple',
  },
};

export const BasicAdvice: Story = {
  args: {
    title: 'System Recommendation',
    description: 'Your system performance can be improved',
    time: '10:30:15',
    type: 'simple',
  },
};

export const AdviceWithButton: Story = {
  args: {
    title: 'New Suggestion',
    description: 'You have received a new recommendation from the system',
    time: '09:12:46',
    type: 'with-button',
    actionLabel: 'View',
  },
};

export const AdviceWithIconButton: Story = {
  args: {
    title: 'Optimization Complete',
    description: 'Your settings have been optimized successfully',
    time: '14:23:10',
    type: 'with-icon-button',
  },
};

export const NoAdvice: Story = {
  args: {
    type: 'inactive',
    emptyText: 'No active advice',
  },
};

export const BasicAdviceTall: Story = {
  args: {
    title: 'System Recommendation',
    description: 'Critical performance optimization available',
    time: '16:45:00',
    type: 'simple',
    size: 'tall',
  },
};

export const AdviceWithButtonTall: Story = {
  args: {
    title: 'Security Recommendation',
    description: 'Unusual patterns detected in your configuration',
    time: '09:12:46',
    type: 'with-button',
    actionLabel: 'Review',
    size: 'tall',
  },
};

export const AdviceWithIconButtonTall: Story = {
  args: {
    title: 'Optimization Available',
    description: 'A new performance improvement is ready to apply',
    time: '11:00:00',
    type: 'with-icon-button',
    size: 'tall',
  },
};

export const NoAdviceTall: Story = {
  args: {
    type: 'inactive',
    emptyText: 'No active advice',
    size: 'tall',
  },
};

export const AdviceWithSecondaryIcon: Story = {
  args: {
    title: 'High Priority Recommendation',
    description: 'This advice has a secondary indicator',
    time: '12:00:00',
    hasSecondaryIcon: true,
    type: 'with-button',
    actionLabel: 'Acknowledge',
  },
  render: (args) => html`
    <obc-advice-message-item
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .type=${args.type}
      .actionLabel=${args.actionLabel}
      .hasSecondaryIcon=${args.hasSecondaryIcon}
    >
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
    </obc-advice-message-item>
  `,
};

export const AdviceWithBothTimestamps: Story = {
  args: {
    title: 'Long Running Analysis',
    description: 'System optimization in progress',
    time: '14:30:00',
    timeSecondary: '15m elapsed',
    showTimestamp: true,
    hasTimestamp2: true,
    type: 'simple',
  },
};

export const AdviceOnlySecondaryTimestamp: Story = {
  args: {
    title: 'Recent Suggestion',
    description: 'Configuration updated successfully',
    timeSecondary: '2 minutes ago',
    showTimestamp: false,
    hasTimestamp2: true,
    type: 'with-icon-button',
  },
};

export const AdviceNoTitle: Story = {
  args: {
    description: 'Advice with description only',
    time: '09:00:00',
    showTitle: false,
    showDescription: true,
    type: 'with-button',
    actionLabel: 'OK',
  },
};

export const AdviceNoDescription: Story = {
  args: {
    title: 'Quick Tip',
    time: '10:15:00',
    showTitle: true,
    showDescription: false,
    type: 'with-icon-button',
  },
};

export const MinimalAdvice: Story = {
  args: {
    title: 'Minimal',
    showDescription: false,
    showTimestamp: false,
    hasSecondaryIcon: false,
    type: 'simple',
  },
};

export const FullFeaturedAdvice: Story = {
  args: {
    title: 'Complete Advice',
    description: 'This advice uses all available features',
    time: '15:45:30',
    timeSecondary: '5m ago',
    showTitle: true,
    showDescription: true,
    showTimestamp: true,
    hasTimestamp2: true,
    hasSecondaryIcon: true,
    type: 'with-button',
    actionLabel: 'View Details',
    size: 'tall',
  },
  render: (args) => html`
    <obc-advice-message-item
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .timeSecondary=${args.timeSecondary}
      .showTitle=${args.showTitle}
      .showDescription=${args.showDescription}
      .showTimestamp=${args.showTimestamp}
      .hasTimestamp2=${args.hasTimestamp2}
      .hasSecondaryIcon=${args.hasSecondaryIcon}
      .type=${args.type}
      .actionLabel=${args.actionLabel}
      .size=${args.size}
    >
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
    </obc-advice-message-item>
  `,
};

export const InteractiveAdvice: Story = {
  args: {
    title: 'Interactive Advice',
    description: 'Click the message or action to see events',
    time: '12:00:00',
    type: 'with-button',
    actionLabel: 'Action',
  },
  render: (args) => html`
    <div>
      <obc-advice-message-item
        .title=${args.title}
        .description=${args.description}
        .time=${args.time}
        .timeSecondary=${args.timeSecondary}
        .type=${args.type}
        .actionLabel=${args.actionLabel}
        .size=${args.size}
        .showTitle=${args.showTitle}
        .showDescription=${args.showDescription}
        .showTimestamp=${args.showTimestamp}
        .hasTimestamp2=${args.hasTimestamp2}
        .hasSecondaryIcon=${args.hasSecondaryIcon}
        .emptyText=${args.emptyText}
        @message-click=${() => {
          console.log('Message clicked');
          alert('Message area clicked!');
        }}
        @action-click=${() => {
          console.log('Action clicked');
          alert('Action button clicked!');
        }}
      ></obc-advice-message-item>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Click the message area or action button to trigger events. Check the
        console for event details.
      </p>
    </div>
  `,
};

export const MultipleAdviceItems: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 640px;"
    >
      <obc-advice-message-item
        title="System Optimization"
        description="Your system can be optimized for better performance"
        time="10:30:15"
        type="with-button"
        actionLabel="Details"
      ></obc-advice-message-item>

      <obc-advice-message-item
        title="New Recommendations"
        description="You have 3 unread system recommendations"
        time="09:45:22"
        timeSecondary="5m ago"
        hasTimestamp2
        type="with-button"
        actionLabel="View"
      ></obc-advice-message-item>

      <obc-advice-message-item
        title="Analysis Complete"
        description="Performance_Report_Q4.pdf has been generated"
        time="08:15:00"
        type="with-icon-button"
        hasSecondaryIcon
      >
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
      </obc-advice-message-item>

      <obc-advice-message-item
        title="Configuration Advice"
        description="Settings optimization available"
        time="Yesterday"
        type="with-button"
        actionLabel="Update"
      ></obc-advice-message-item>
    </div>
  `,
};

export const LongAdviceContent: Story = {
  args: {
    title:
      'This is a very long advice title that should be truncated when it exceeds the available space',
    description:
      'This is an extremely long description that contains a lot of information and should be properly truncated with an ellipsis when it exceeds the available width of the advice component',
    time: '23:59:59',
    timeSecondary: '1h ago',
    hasTimestamp2: true,
    type: 'with-button',
    actionLabel: 'View Details',
  },
};

export const AdviceSizeComparison: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; max-width: 640px;"
    >
      <h3 style="margin: 0; font-size: 14px; color: #666;">Regular Size:</h3>
      <obc-advice-message-item
        title="Regular Advice"
        description="This is a regular sized advice"
        time="10:00:00"
        timeSecondary="Now"
        hasTimestamp2
        type="with-button"
        actionLabel="Action"
        size="regular"
      ></obc-advice-message-item>

      <h3 style="margin: 16px 0 0 0; font-size: 14px; color: #666;">
        Tall Size:
      </h3>
      <obc-advice-message-item
        title="Tall Advice"
        description="This is a tall sized advice with different layout"
        time="10:00:00"
        timeSecondary="Now"
        hasTimestamp2
        type="with-button"
        actionLabel="Action"
        size="tall"
      ></obc-advice-message-item>
    </div>
  `,
};
