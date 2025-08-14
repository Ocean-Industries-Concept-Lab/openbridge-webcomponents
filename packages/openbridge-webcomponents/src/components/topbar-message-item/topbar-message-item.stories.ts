import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTopbarMessageItem,
  ObcTopbarMessageItemAction,
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
  title: 'UI Components/Message and alerts/Topbar Message Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-topbar-message-item',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    size: ObcTopbarMessageItemSize.Regular,
    hasTitle: true,
    hasDescription: true,
    hasTimestamp: true,
    hasTimestamp2: false,
    hasSecondaryIcon: true,
    // Don't set action in default args - let it default to None
    empty: false,
    large: false,
    // Slot content
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
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcTopbarMessageItemSize),
    },
    action: {
      control: {type: 'select'},
      options: Object.values(ObcTopbarMessageItemAction),
      description: 'DEPRECATED - Use type property instead',
    },
    large: {
      description: 'DEPRECATED - Use size property instead',
    },
    empty: {
      description: 'DEPRECATED - Use type="inactive" instead',
    },
  },
  render: (args) => html`
    <obc-topbar-message-item
      .type=${args.type}
      .size=${args.size}
      .hasTitle=${args.hasTitle}
      .hasDescription=${args.hasDescription}
      .hasTimestamp=${args.hasTimestamp}
      .hasTimestamp2=${args.hasTimestamp2}
      .hasSecondaryIcon=${args.hasSecondaryIcon}
      .action=${args.action || ObcTopbarMessageItemAction.None}
      .empty=${args.empty}
      .large=${args.large}
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

export const IconNoClick: Story = {
  args: {
    type: ObcTopbarMessageItemType.WithIconButton,
    action: ObcTopbarMessageItemAction.IconNoClick,
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
  name: 'No Title (Hidden)',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasTitle: false,
    hasDescription: true,
  },
};

export const NoDescription: Story = {
  name: 'No Description (Hidden)',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasTitle: true,
    hasDescription: false,
  },
};

export const NoTimestamp: Story = {
  name: 'No Timestamp (Hidden)',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasTimestamp: false,
  },
};

export const SecondaryTimestamp: Story = {
  name: 'Secondary Timestamp Format',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasTimestamp: false,
    hasTimestamp2: true,
    timeSecondaryContent: '2m 12s',
  },
};

export const BothTimestamps: Story = {
  name: 'Both Timestamps (Show Side by Side)',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasTimestamp: true,
    hasTimestamp2: true,
    timeContent: '09:12:46',
    timeSecondaryContent: '2m 12s',
  },
};

export const NoSecondaryIcon: Story = {
  name: 'No Secondary Icon',
  args: {
    type: ObcTopbarMessageItemType.WithButton,
    hasSecondaryIcon: false,
  },
};

export const MinimalMessage: Story = {
  name: 'Minimal Message (Title Only)',
  args: {
    type: ObcTopbarMessageItemType.Simple,
    hasTitle: true,
    hasDescription: false,
    hasTimestamp: false,
    hasSecondaryIcon: false,
  },
};