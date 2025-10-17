import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcMessageMenuItem,
  ObcMessageMenuItemSize,
  ObcMessageMenuItemStackDirection,
} from './message-menu-item.js';
import './message-menu-item.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcMessageMenuItem> = {
  title: 'UI Components/Message and alerts/Message Menu Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-message-menu-item',
  argTypes: {
    size: {
      control: {type: 'select'},
      options: [
        ObcMessageMenuItemSize.SingleLine,
        ObcMessageMenuItemSize.DoubleLine,
        ObcMessageMenuItemSize.MultiLine,
      ],
    },
    stackDirection: {
      control: {type: 'select'},
      options: [
        ObcMessageMenuItemStackDirection.Horizontal,
        ObcMessageMenuItemStackDirection.Vertical,
      ],
    },
    enhancedIcon: {control: 'boolean'},
    open: {control: 'boolean'},
    hasPrimaryAction: {control: 'boolean'},
    hasSecondaryAction: {control: 'boolean'},
    hasTrailingIcon: {control: 'boolean'},
    hasPrimaryIcon: {control: 'boolean'},
    hasSecondaryIcon: {control: 'boolean'},
    isShelved: {control: 'boolean'},
    hasTimestamp: {control: 'boolean'},
    hasDay: {control: 'boolean'},
  },

  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    stackDirection: ObcMessageMenuItemStackDirection.Horizontal,
    enhancedIcon: false,
    open: false,
    hasPrimaryAction: false,
    hasSecondaryAction: false,
    hasTrailingIcon: false,
    hasPrimaryIcon: false,
    hasSecondaryIcon: false,
    isShelved: false,
    hasTimestamp: false,
    hasDay: false,
  },
  render: (args) => {
    return html`
      <obc-message-menu-item
        .size=${args.size}
        .enhancedIcon=${args.enhancedIcon}
        .open=${args.open}
        .hasPrimaryAction=${args.hasPrimaryAction}
        .hasSecondaryAction=${args.hasSecondaryAction}
        .hasTrailingIcon=${args.hasTrailingIcon}
        .hasPrimaryIcon=${args.hasPrimaryIcon}
        .hasSecondaryIcon=${args.hasSecondaryIcon}
        .hasTimestamp=${args.hasTimestamp}
        .isShelved=${args.isShelved}
        stackDirection=${args.stackDirection}
        .hasDay=${args.hasDay}
        style="width: 560px; display: block; --action-width: 84px;"
      >
        <obi-placeholder slot="primary-icon"></obi-placeholder>
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
        <span slot="title">Title</span>
        <span slot="description"
          >A long notification message of more than one line of text and
          meaningful content. Sometimes it might be quite long and that is ok.
        </span>
        <span slot="primary-action-label">Action</span>
        <span slot="secondary-action-label">Action 2</span>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <span slot="day">Yesterday</span>
        <span slot="time">12:00:00</span>
      </obc-message-menu-item>
    `;
  },
} satisfies Meta<ObcMessageMenuItem>;

export default meta;
type Story = StoryObj<ObcMessageMenuItem>;

// Basic variations
export const SingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    hasPrimaryIcon: true,
    hasTimestamp: true,
  },
};

export const DoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasDay: true,
  },
};

export const MultiLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.MultiLine,
    hasPrimaryIcon: true,
    hasTimestamp: true,
  },
};

// With actions
export const WithPrimaryAction: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasPrimaryAction: true,
  },
};

export const WithBothActions: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasPrimaryAction: true,
    hasSecondaryAction: true,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasTrailingIcon: true,
  },
};

// Shelved notification
export const Shelved: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    isShelved: true,
    hasTimestamp: true,
    hasDay: true,
    hasPrimaryAction: true,
  },
};

// Enhanced icon variations
export const EnhancedIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    hasTimestamp: true,
  },
};

export const EnhancedIconWithActions: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasPrimaryAction: true,
    hasSecondaryAction: true,
  },
};

// Multiple icons
export const WithSecondaryIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    hasSecondaryIcon: true,
    hasTimestamp: true,
  },
};

// Stack direction variations
export const VerticalStack: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackDirection: ObcMessageMenuItemStackDirection.Vertical,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasPrimaryAction: true,
    hasSecondaryAction: true,
  },
};

export const VerticalStackWithTrailingIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackDirection: ObcMessageMenuItemStackDirection.Vertical,
    hasPrimaryIcon: true,
    hasTimestamp: true,
    hasTrailingIcon: true,
  },
};

// Full featured example
export const FullFeatured: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    hasSecondaryIcon: true,
    isShelved: true,
    hasTimestamp: true,
    hasDay: true,
    hasPrimaryAction: true,
    hasSecondaryAction: true,
    hasTrailingIcon: true,
  },
};
