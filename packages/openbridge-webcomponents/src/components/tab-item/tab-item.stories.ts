import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTabItem} from './tab-item.js';
import './tab-item.js';
import '../../icons/icon-placeholder.js';
import {BadgeType, BadgeSize} from '../badge/badge.js';

const meta: Meta<typeof ObcTabItem> = {
  title: 'UI Components/Navigation/Tab Item',
  tags: ['6.0'],
  component: 'obc-tab-item',
  render: (args) => html`
    <obc-tab-item
      ?hug=${args.hug}
      ?has-close=${args.hasClose}
      ?has-leading-icon=${args.hasLeadingIcon}
      ?has-title=${args.hasTitle}
      ?has-divider=${args.hasDivider}
      ?has-badge=${args.hasBadge}
      .disabled=${args.disabled}
      title=${args.title}
      .checked=${args.checked}
      badgeCount=${args.badgeCount}
      badgeType=${args.badgeType}
      badgeSize=${args.badgeSize}
      .badgeHideNumber=${args.badgeHideNumber}
      .showLeadingBadgeIcon=${args.showLeadingBadgeIcon}
    >
      ${args.hasLeadingIcon
        ? html`<obi-placeholder slot="leading-icon"></obi-placeholder>`
        : null}
      ${args.hasBadge
        ? html`<obi-placeholder slot="badge-icon"></obi-placeholder>`
        : null}
    </obc-tab-item>
  `,
  argTypes: {
    hug: {
      control: {type: 'boolean'},
    },
    hasClose: {
      control: {type: 'boolean'},
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
    },
    checked: {
      control: {type: 'boolean'},
      description: 'Whether the tab is checked (selected)',
    },
    hasTitle: {
      control: {type: 'boolean'},
    },
    hasDivider: {
      control: {type: 'boolean'},
    },
    hasBadge: {
      control: {type: 'boolean'},
    },
    icon: {
      control: {type: 'text'},
    },
    title: {
      control: {type: 'text'},
    },
    badgeCount: {
      control: {type: 'number', min: 0},
    },
    badgeType: {
      control: {type: 'select'},
      options: Object.values(BadgeType),
      description: 'The badge visual style/type',
    },
    badgeSize: {
      control: {type: 'select'},
      options: Object.values(BadgeSize),
      description: 'The badge size',
    },
    badgeHideNumber: {
      control: {type: 'boolean'},
      description: 'Hide the badge number',
    },
    showLeadingBadgeIcon: {
      control: {type: 'boolean'},
      description: 'Show an icon in the badge',
    },
    disabled: {
      control: {type: 'boolean'},
    },
  },
  args: {
    hug: true,
    hasClose: false,
    hasLeadingIcon: true,
    checked: true,
    hasTitle: true,
    hasDivider: true,
    hasBadge: true,
    icon: 'placeholder',
    title: 'Tab title',
    badgeCount: 0,
    disabled: false,
    badgeType: BadgeType.regular,
    badgeSize: BadgeSize.regular,
    badgeHideNumber: false,
    showLeadingBadgeIcon: false,
  },
} satisfies Meta<ObcTabItem>;

export default meta;
type Story = StoryObj<ObcTabItem>;
export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: false,
    hasBadge: false,
    title: 'Default Tab',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: true,
    hasBadge: false,
    title: 'Checked Tab',
  },
};

export const CheckedWithBadge: Story = {
  args: {
    checked: true,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: false,
    hasBadge: true,
    badgeCount: 8,
    badgeType: BadgeType.alarm,
    badgeSize: BadgeSize.regular,
    title: 'Checked & Badge',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: false,
    hasBadge: false,
    title: 'Disabled Tab',
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: false,
    hasBadge: false,
    title: 'Checked & Disabled',
  },
};

export const WithClose: Story = {
  args: {
    checked: false,
    disabled: false,
    hasClose: true,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: true,
    hasBadge: false,
    title: 'Closable Tab',
  },
};

export const BadgeOnly: Story = {
  args: {
    checked: false,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: false,
    hasTitle: false,
    hasDivider: false,
    hasBadge: true,
    badgeCount: 4,
    badgeType: BadgeType.regular,
    title: 'Badge Only',
  },
};

export const IconOnly: Story = {
  args: {
    checked: false,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: false,
    hasDivider: false,
    hasBadge: false,
    title: '',
  },
};

export const LongTitle: Story = {
  args: {
    checked: false,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: false,
    hasBadge: false,
    title: 'This is a really, really long tab title for overflow and truncation testing',
  },
};
