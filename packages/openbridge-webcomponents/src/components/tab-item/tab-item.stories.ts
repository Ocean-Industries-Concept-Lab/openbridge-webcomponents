import type {Meta} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTabItem} from './tab-item.js';
import './tab-item.js';
import '../../icons/icon-placeholder.js';
import {BadgeType, BadgeSize} from '../badge/badge.js';

const meta: Meta<typeof ObcTabItem> = {
  title: 'UI Components/Navigation/Tab Item',
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
      .centerContent=${args.centerContent}
    >
      ${args.hasLeadingIcon
        ? html`<obi-placeholder slot="leading-icon"></obi-placeholder>`
        : null}
      ${args.hasBadge
        ? html`<obi-placeholder slot="badge-icon"></obi-placeholder>`
        : null}
    </obc-tab-item>
  `,
  args: {
    hug: false,
    hasClose: false,
    hasLeadingIcon: true,
    checked: false,
    hasTitle: true,
    hasDivider: false,
    hasBadge: false,
    icon: 'placeholder',
    title: 'Tab',
    badgeCount: 0,
    disabled: false,
    badgeType: BadgeType.regular,
    badgeSize: BadgeSize.regular,
    badgeHideNumber: false,
    showLeadingBadgeIcon: false,
    centerContent: false,
  },
};

export default meta;

export const Default = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: false,
    title: 'Tab',
  },
};
export const DefaultHug = {
  args: {
    hug: true,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: false,
    title: 'Tab',
  },
};

export const Badge = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 1,
    badgeType: BadgeType.alarm,
    badgeSize: BadgeSize.regular,
    hasClose: false,
    centerContent: false,
    title: 'Alarm Badge',
  },
};
export const BadgeHug = {
  args: {
    hug: true,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 1,
    badgeType: BadgeType.warning,
    badgeSize: BadgeSize.large,
    hasClose: false,
    centerContent: false,
    title: 'Warning Badge Large',
  },
};

export const BadgeClose = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 2,
    badgeType: BadgeType.caution,
    badgeSize: BadgeSize.regular,
    hasClose: true,
    centerContent: false,
    title: 'Caution Badge',
  },
};
export const BadgeCloseHug = {
  args: {
    hug: true,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 2,
    badgeType: BadgeType.running,
    badgeSize: BadgeSize.large,
    hasClose: true,
    centerContent: false,
    title: 'Running Badge Large',
  },
};
export const HasDivider = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 99,
    badgeType: BadgeType.notification,
    badgeSize: BadgeSize.regular,
    badgeHideNumber: true,
    hasClose: false,
    centerContent: false,
    title: 'Notification Badge',
    hasDivider: true,
  },
};

export const Centered = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: true,
    title: 'Tab',
  },
};
export const CenteredHug = {
  args: {
    hug: true,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: true,
    title: 'Tab',
  },
};

export const CenteredBadge = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 1,
    badgeType: BadgeType.enhance,
    badgeSize: BadgeSize.large,
    hasClose: false,
    centerContent: true,
    title: 'Enhance Badge Large',
  },
};
export const CenteredBadgeHug = {
  args: {
    hug: true,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 1,
    badgeType: BadgeType.outline,
    badgeSize: BadgeSize.regular,
    hasClose: false,
    centerContent: true,
    title: 'Outline Badge',
  },
};

export const CenteredBadgeClose = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 2,
    badgeType: BadgeType.automation,
    badgeSize: BadgeSize.large,
    hasClose: true,
    centerContent: true,
    title: 'Automation Badge Large',
  },
};
export const CenteredBadgeCloseHug = {
  args: {
    hug: true,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 2,
    badgeType: BadgeType.empty,
    badgeSize: BadgeSize.regular,
    hasClose: true,
    centerContent: true,
    title: 'Empty Badge',
  },
};

export const NoLeadingIcon = {
  args: {
    hug: false,
    hasLeadingIcon: false,
    hasBadge: true,
    badgeCount: 1,
    badgeType: BadgeType.regular,
    badgeSize: BadgeSize.large,
    hasClose: false,
    centerContent: false,
    title: 'Regular Large',
  },
};
export const NoLeadingIconHug = {
  args: {
    hug: true,
    hasLeadingIcon: false,
    hasBadge: true,
    badgeCount: 1,
    badgeType: BadgeType.enhance,
    badgeSize: BadgeSize.large,
    hasClose: false,
    centerContent: false,
    title: 'Enhance Large',
  },
};

export const Checked = {
  args: {
    checked: true,
    hug: false,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: false,
    title: 'Tab',
  },
};
export const Disabled = {
  args: {
    disabled: true,
    hug: false,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: false,
    title: 'Tab',
  },
};
export const LongTitle = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: false,
    hasClose: false,
    centerContent: false,
    title: 'A very long tab name for truncation',
  },
};
export const HighBadgeCount = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 999,
    badgeType: BadgeType.alarm,
    badgeSize: BadgeSize.regular,
    hasClose: false,
    centerContent: false,
    title: 'High Alarm Count',
  },
};
export const BadgeHideNumber = {
  args: {
    hug: false,
    hasLeadingIcon: true,
    hasBadge: true,
    badgeCount: 99,
    badgeType: BadgeType.caution,
    badgeSize: BadgeSize.large,
    badgeHideNumber: true,
    hasClose: false,
    centerContent: false,
    title: 'Caution Hide Number',
  },
};
