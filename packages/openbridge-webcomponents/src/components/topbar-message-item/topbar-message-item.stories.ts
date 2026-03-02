import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTopbarMessageItem,
  ObcTopbarMessageItemType,
  ObcTopbarMessageItemSize,
} from './topbar-message-item.js';
import './topbar-message-item.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

interface StoryArgs extends Partial<ObcTopbarMessageItem> {
  title?: string;
  description?: string;
  timeContent?: string;
  timeSecondaryContent?: string;
  actionTextContent?: string;
  emptyMessageContent?: string;
}

const meta: Meta<StoryArgs> = {
  title: 'UI Components/Message and Alerts/Topbar Message Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-topbar-message-item',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    size: ObcTopbarMessageItemSize.Regular,
    hideTitle: false,
    hideDescription: false,
    hideTimestamp: false,
    hasTimestamp2: false,
    hasSecondaryIcon: true,
    title: 'Message title',
    description: 'Message text goes here, something informative',
    timeContent: '09:12:46',
    timeSecondaryContent: '2m 12s',
    actionTextContent: 'Label',
    emptyMessageContent: 'No active messages',
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcTopbarMessageItemType),
      description:
        'Controls the visual and interactive type of the message item',
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcTopbarMessageItemSize),
      description: 'Sets the vertical size of the message item',
    },
    hideTitle: {
      control: {type: 'boolean'},
      description: 'Whether to display the title slot',
    },
    hideDescription: {
      control: {type: 'boolean'},
      description: 'Whether to display the description slot',
    },
    hideTimestamp: {
      control: {type: 'boolean'},
      description: 'Whether to display the primary timestamp slot',
    },
    hasTimestamp2: {
      control: {type: 'boolean'},
      description: 'Whether to display the secondary timestamp slot',
    },
    hasSecondaryIcon: {
      control: {type: 'boolean'},
      description: 'Whether to display the secondary icon slot',
    },
  },
  render: (args) => html`
    <obc-topbar-message-item
      .type=${args.type ?? ObcTopbarMessageItemType.WithButton}
      .size=${args.size ?? ObcTopbarMessageItemSize.Regular}
      .hideTitle=${args.hideTitle ?? false}
      .hideDescription=${args.hideDescription ?? false}
      .hideTimestamp=${args.hideTimestamp ?? false}
      .hasTimestamp2=${args.hasTimestamp2 ?? false}
      .hasSecondaryIcon=${args.hasSecondaryIcon ?? false}
    >
      <obi-placeholder slot="primary-icon"></obi-placeholder>
      <obi-placeholder slot="secondary-icon"></obi-placeholder>
      <div slot="title">${args.title}</div>
      <div slot="description">${args.description}</div>
      <div slot="time">${args.timeContent}</div>
      <div slot="time-secondary">${args.timeSecondaryContent}</div>
      <div slot="action-text">${args.actionTextContent}</div>
      <obi-placeholder slot="action-icon"></obi-placeholder>
      <div slot="empty">${args.emptyMessageContent}</div>
    </obc-topbar-message-item>
  `,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const TextAction: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
  },
};

export const ShortText: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    description: 'Short message',
    title: 'Title',
  },
};

export const VeryLongTitleText: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    description: 'Short message',
    title:
      'A very long title that should be truncated, this is a very long title that should be truncated',
  },
};

export const IconAction: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithIconButton,
  },
};

export const NoAction: Story = {
  args: {
    type: ObcTopbarMessageItemType.Simple,
  },
};

export const Empty: Story = {
  args: {
    type: ObcTopbarMessageItemType.Inactive,
  },
};

export const TextActionLarge: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    size: ObcTopbarMessageItemSize.Tall,
  },
};

export const IconActionLarge: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithIconButton,
    size: ObcTopbarMessageItemSize.Tall,
  },
};

export const LargeWithLongTextAndDescription: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    size: ObcTopbarMessageItemSize.Tall,
    title:
      'A very long title that should be truncated, this is a very long title that should be truncated',
    description:
      'A very long description that should be truncated, this is a very long description that should be truncated',
  },
};

export const LargeWithLongTextAndDescriptionAndBothTimestamps: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    size: ObcTopbarMessageItemSize.Tall,
    hasTimestamp2: true,
    timeContent: '09:12:46',
    timeSecondaryContent: '2m 12s',
    title:
      'A very long title that should be truncated, this is a very long title that should be truncated',
    description:
      'A very long description that should be truncated, this is a very long description that should be truncated',
  },
};

export const NoActionLarge: Story = {
  args: {
    type: ObcTopbarMessageItemType.Simple,
    size: ObcTopbarMessageItemSize.Tall,
  },
};

export const EmptyLarge: Story = {
  args: {
    type: ObcTopbarMessageItemType.Inactive,
    size: ObcTopbarMessageItemSize.Tall,
  },
};

export const NoTitle: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hideTitle: true,
  },
};

export const NoDescription: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hideDescription: true,
  },
};

export const NoTimestamp: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hideTimestamp: true,
  },
};

export const SecondaryTimestamp: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hideTimestamp: true,
    hasTimestamp2: true,
    timeSecondaryContent: '2m 12s',
  },
};

export const BothTimestamps: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasTimestamp2: true,
    timeContent: '09:12:46',
    timeSecondaryContent: '2m 12s',
  },
};

export const NoSecondaryIcon: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasSecondaryIcon: false,
  },
};

export const MinimalMessage: Story = {
  args: {
    type: ObcTopbarMessageItemType.Simple,
    hideDescription: true,
    hideTimestamp: true,
    hasSecondaryIcon: false,
  },
};

// Interactive example
export const InteractiveExample: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    title: 'Interactive Message',
    description: 'Click the message or action button to see events',
    actionTextContent: 'Click Me',
  },
  render: (args) => html`
    <div>
      <obc-topbar-message-item
        .type=${args.type ?? ObcTopbarMessageItemType.WithButton}
        .size=${args.size ?? ObcTopbarMessageItemSize.Regular}
        .hideTitle=${args.hideTitle ?? false}
        .hideDescription=${args.hideDescription ?? false}
        .hideTimestamp=${args.hideTimestamp ?? false}
        .hasTimestamp2=${args.hasTimestamp2 ?? false}
        .hasSecondaryIcon=${args.hasSecondaryIcon ?? false}
        @message-click=${() => {
          console.log('Message clicked');
          alert('Message area clicked!');
        }}
        @action-click=${() => {
          console.log('Action clicked');
          alert('Action button clicked!');
        }}
      >
        <obi-placeholder slot="primary-icon"></obi-placeholder>
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
        <div slot="title">${args.title}</div>
        <div slot="description">${args.description}</div>
        <div slot="time">${args.timeContent}</div>
        <div slot="time-secondary">${args.timeSecondaryContent}</div>
        <div slot="action-text">${args.actionTextContent}</div>
        <obi-placeholder slot="action-icon"></obi-placeholder>
        <div slot="empty">${args.emptyMessageContent}</div>
      </obc-topbar-message-item>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Click the message area or action button to trigger events. Check the
        console for details.
      </p>
    </div>
  `,
};
