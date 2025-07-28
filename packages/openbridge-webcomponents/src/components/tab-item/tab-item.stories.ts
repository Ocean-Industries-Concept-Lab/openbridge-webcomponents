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

export const LongTitle: Story = {
  args: {
    checked: false,
    disabled: false,
    hasClose: false,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: true,
    hasBadge: false,
    title:
      'This is a really, really long tab title for overflow and truncation testing',
  },
};

export const CheckedWithLongTitle: Story = {
  args: {
    checked: true,
    hasTitle: true,
    title:
      'Checked and this title is very very long and should not overflow or overlap badge or close button',
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 9,
    badgeType: BadgeType.alarm,
    hasClose: true,
    hasDivider: true,
    disabled: false,
  },
};

export const AllOptionsOn: Story = {
  args: {
    checked: true,
    hasClose: true,
    hasLeadingIcon: true,
    hasTitle: true,
    hasDivider: true,
    hasBadge: true,
    badgeCount: 7,
    badgeType: BadgeType.running,
    badgeSize: BadgeSize.large,
    badgeHideNumber: false,
    showLeadingBadgeIcon: true,
    disabled: false,
    title: 'Everything Enabled',
  },
};

export const ShowLeadingBadgeIcon: Story = {
  args: {
    checked: false,
    hasTitle: true,
    title: 'Leading badge icon',
    hasLeadingIcon: false,
    hasBadge: true,
    badgeCount: 3,
    showLeadingBadgeIcon: true,
    hasClose: false,
    hasDivider: false,
    disabled: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    hasTitle: true,
    title: 'Disabled and Checked',
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 1,
    hasClose: true,
    hasDivider: true,
  },
};

export const DividerNoTitle: Story = {
  args: {
    checked: false,
    hasTitle: false,
    hasLeadingIcon: false,
    hasBadge: false,
    hasClose: false,
    hasDivider: true,
    disabled: false,
    title: '',
  },
};

export const DividerWithAll: Story = {
  args: {
    checked: false,
    hasTitle: true,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 5,
    hasClose: true,
    hasDivider: true,
    disabled: false,
    title: 'Divider + All',
  },
};

export const HighBadgeCount: Story = {
  args: {
    checked: false,
    hasTitle: true,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 99999,
    badgeType: BadgeType.notification,
    hasDivider: false,
    hasClose: false,
    disabled: false,
    title: 'High badge count',
  },
};

export const EmptyTab: Story = {
  args: {
    checked: false,
    hasTitle: false,
    hasLeadingIcon: false,
    hasBadge: false,
    hasClose: false,
    hasDivider: false,
    disabled: false,
    title: '',
  },
};
