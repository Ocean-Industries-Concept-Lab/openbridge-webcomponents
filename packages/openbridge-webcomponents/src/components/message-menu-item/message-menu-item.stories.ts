import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcMessageMenuItem,
  ObcMessageMenuItemSize,
} from './message-menu-item.js';
import './message-menu-item.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcMessageMenuItem> = {
  title: 'UI Components/Message and alerts/Message Menu Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-message-menu-item',
  argTypes: {
    // Layout
    size: {
      control: {type: 'select'},
      options: [
        ObcMessageMenuItemSize.SingleLine,
        ObcMessageMenuItemSize.DoubleLine,
      ],
      description:
        'The collapsed size of the item. When opened, it expands to multi-line.',
    },
    stackVertical: {control: 'boolean'},
    enhancedIcon: {control: 'boolean'},
    open: {
      control: 'boolean',
      description:
        'When true, the item expands to show full content (multi-line).',
    },
    // Text content
    title: {control: 'text'},
    description: {control: 'text'},
    day: {control: 'text'},
    time: {control: 'text'},
    primaryActionLabel: {control: 'text'},
    secondaryActionLabel: {control: 'text'},
    // Icon slots
    hasPrimaryIcon: {control: 'boolean'},
    hasSecondaryIcon: {control: 'boolean'},
    hasTrailingIcon: {
      control: 'boolean',
      description: 'Only applies to horizontal layout.',
    },
    isShelved: {control: 'boolean'},
  },
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    stackVertical: false,
    enhancedIcon: false,
    open: false,
    title: 'Title',
    description:
      'A long notification message of more than one line of text and meaningful content. Sometimes it might be quite long and that is ok.',
    day: '',
    time: '',
    primaryActionLabel: '',
    secondaryActionLabel: '',
    hasPrimaryIcon: false,
    hasSecondaryIcon: false,
    hasTrailingIcon: false,
    isShelved: false,
  },
  render: (args) => {
    return html`
      <obc-message-menu-item
        .size=${args.size}
        .stackVertical=${args.stackVertical}
        .enhancedIcon=${args.enhancedIcon}
        .open=${args.open}
        .title=${args.title}
        .description=${args.description}
        .day=${args.day}
        .time=${args.time}
        .primaryActionLabel=${args.primaryActionLabel}
        .secondaryActionLabel=${args.secondaryActionLabel}
        .hasPrimaryIcon=${args.hasPrimaryIcon}
        .hasSecondaryIcon=${args.hasSecondaryIcon}
        .hasTrailingIcon=${args.hasTrailingIcon}
        .isShelved=${args.isShelved}
        style="width: 560px; display: block;"
      >
        <obi-placeholder slot="primary-icon"></obi-placeholder>
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
      </obc-message-menu-item>
    `;
  },
};

export default meta;
type Story = StoryObj<ObcMessageMenuItem>;

// =============================================================================
// HORIZONTAL LAYOUT - Regular Icons
// =============================================================================

export const HorizontalSingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const HorizontalDoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const HorizontalOpen: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    open: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

// =============================================================================
// HORIZONTAL LAYOUT - Enhanced Icons
// =============================================================================

export const HorizontalEnhancedSingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const HorizontalEnhancedDoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const HorizontalEnhancedOpen: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    enhancedIcon: true,
    open: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

// =============================================================================
// VERTICAL LAYOUT - Regular Icons
// =============================================================================

export const VerticalSingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    stackVertical: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const VerticalDoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const VerticalOpen: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    open: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

// =============================================================================
// VERTICAL LAYOUT - Enhanced Icons
// =============================================================================

export const VerticalEnhancedSingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
    stackVertical: true,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const VerticalEnhancedDoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    enhancedIcon: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const VerticalEnhancedOpen: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    enhancedIcon: true,
    open: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

// =============================================================================
// ACTIONS & ICONS - Horizontal
// =============================================================================

export const HorizontalWithTwoActions: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
    secondaryActionLabel: 'Action 2',
  },
};

export const HorizontalWithTrailingIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    hasTrailingIcon: true,
  },
};

export const HorizontalWithSecondaryIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    hasPrimaryIcon: true,
    hasSecondaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

// =============================================================================
// ACTIONS & ICONS - Vertical
// =============================================================================

export const VerticalWithTwoActions: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
    secondaryActionLabel: 'Action 2',
  },
};

export const VerticalWithSecondaryIcon: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    hasPrimaryIcon: true,
    hasSecondaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

// =============================================================================
// SHELVED STATE
// =============================================================================

export const Shelved: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    isShelved: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};

export const ShelvedVertical: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    stackVertical: true,
    isShelved: true,
    hasPrimaryIcon: true,
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
  },
};
