import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcMessageMenuItem,
  ObcMessageMenuItemSize,
} from './message-menu-item.js';
import './message-menu-item.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcMessageMenuItem> = {
  title: 'Menu/Menu Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-message-menu-item',
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    enhancedIcon: false,
    open: false,
    hasActionButton: true,
  },
  render: (args) => {
    return html`
      <obc-message-menu-item
        .size=${args.size}
        .enhancedIcon=${args.enhancedIcon}
        .open=${args.open}
        .hasActionButton=${args.hasActionButton}
        style="width: 560px; display: block; --action-width: 84px;"
      >
        <obi-placeholder slot="primary-icon"></obi-placeholder>
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
        <span slot="title">Title</span>
        <span slot="description"
          >A long notification message of more than one line of text and
          meaningful content. Sometimes it might be quite long and that is ok.
        </span>
        <span slot="action-label">Action</span>
        <span slot="day">Yesterday</span>
        <span slot="time">12:00:00</span>
      </obc-message-menu-item>
    `;
  },
} satisfies Meta<ObcMessageMenuItem>;

export default meta;
type Story = StoryObj<ObcMessageMenuItem>;

export const SingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
  },
};

export const DoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const MultiLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.MultiLine,
  },
};

export const EnhancedIconSingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    enhancedIcon: true,
  },
};

export const EnhancedIconDoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    enhancedIcon: true,
  },
};

export const EnhancedIconOpen: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    enhancedIcon: true,
    open: true,
  },
};

export const EnhancedIconMultiLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.MultiLine,
    enhancedIcon: true,
  },
};

export const ShortItem: Story = {
  render: (args) => {
    return html`
      <obc-message-menu-item
        .size=${args.size}
        .enhancedIcon=${args.enhancedIcon}
        .open=${args.open}
        style="width: 560px; display: block; --action-width: 88px;"
      >
        <obi-placeholder slot="primary-icon"></obi-placeholder>
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
        <span slot="title">Title</span>
        <span slot="description">short </span>
        <span slot="action-label">ACK</span>
        <span slot="time">12:00:00</span>
      </obc-message-menu-item>
    `;
  },
};
