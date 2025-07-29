import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTopbarMessageItem,
  ObcTopbarMessageItemAction,
} from './topbar-message-item.js';
import './topbar-message-item.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<typeof ObcTopbarMessageItem> = {
  title: 'UI Components/Message and alerts/Topbar Message Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-topbar-message-item',
  args: {
    action: ObcTopbarMessageItemAction.TextButton,
    empty: false,
    large: false,
    title: 'Message title',
    description: 'Message text goes here, something informative',
    hasSecondaryIcon: true,
  },
  render: (args) => html`
    <obc-topbar-message-item 
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
    </obc-topbar-message-item>
  `,
} satisfies Meta<ObcTopbarMessageItem>;

export default meta;
type Story = StoryObj<ObcTopbarMessageItem>;

export const TextAction: Story = {
  args: {
    action: ObcTopbarMessageItemAction.TextButton,
  },
};

export const ShortText: Story = {
  args: {
    action: ObcTopbarMessageItemAction.TextButton,
    description: 'Short message',
    title: 'Title',
  },
};

export const VeryLongTitleText: Story = {
  args: {
    action: ObcTopbarMessageItemAction.TextButton,
    description: 'Short message',
    title:
      'A very long title that should be truncated, this is a very long title that should be truncated',
  },
};

export const IconAction: Story = {
  args: {
    action: ObcTopbarMessageItemAction.IconButton,
  },
};

export const NoAction: Story = {
  args: {
    action: ObcTopbarMessageItemAction.None,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const TextActionLarge: Story = {
  args: {
    action: ObcTopbarMessageItemAction.TextButton,
    large: true,
  },
};

export const IconActionLarge: Story = {
  args: {
    action: ObcTopbarMessageItemAction.IconButton,
    large: true,
  },
};

export const IconNoClick: Story = {
  args: {
    action: ObcTopbarMessageItemAction.IconNoClick,
  },
};

export const NoActionLarge: Story = {
  args: {
    action: ObcTopbarMessageItemAction.None,
    large: true,
  },
};

export const EmptyLarge: Story = {
  args: {
    empty: true,
    large: true,
  },
};
