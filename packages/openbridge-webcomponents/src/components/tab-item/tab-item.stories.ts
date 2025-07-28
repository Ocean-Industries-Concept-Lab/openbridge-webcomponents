import type {Meta, StoryObj} from '@storybook/web-components-vite';
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
type Story = StoryObj<ObcTabItem>;

// -- NOT CENTERED --

export const Default = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: false, title: 'Tab' },
};
export const DefaultHug = {
  args: { hug: true, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: false, title: 'Tab' },
};

export const Badge = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 1, hasClose: false, centerContent: false, title: 'Tab' },
};
export const BadgeHug = {
  args: { hug: true, hasLeadingIcon: true, hasBadge: true, badgeCount: 1, hasClose: false, centerContent: false, title: 'Tab' },
};

export const BadgeClose = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 2, hasClose: true, centerContent: false, title: 'Tab' },
};
export const BadgeCloseHug = {
  args: { hug: true, hasLeadingIcon: true, hasBadge: true, badgeCount: 2, hasClose: true, centerContent: false, title: 'Tab' },
};
export const HasDivider = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 99, badgeHideNumber: true, hasClose: false, centerContent: false, title: 'Tab' , hasDivider: true},
};

// -- CENTERED --

export const Centered = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: true, title: 'Tab' },
};
export const CenteredHug = {
  args: { hug: true, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: true, title: 'Tab' },
};

export const CenteredBadge = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 1, hasClose: false, centerContent: true, title: 'Tab' },
};
export const CenteredBadgeHug = {
  args: { hug: true, hasLeadingIcon: true, hasBadge: true, badgeCount: 1, hasClose: false, centerContent: true, title: 'Tab' },
};

export const CenteredBadgeClose = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 2, hasClose: true, centerContent: true, title: 'Tab' },
};
export const CenteredBadgeCloseHug = {
  args: { hug: true, hasLeadingIcon: true, hasBadge: true, badgeCount: 2, hasClose: true, centerContent: true, title: 'Tab' },
};

// -- ONE WITH NO LEADING ICON --

export const NoLeadingIcon = {
  args: { hug: false, hasLeadingIcon: false, hasBadge: true, badgeCount: 1, hasClose: false, centerContent: false, title: 'Tab' },
};
export const NoLeadingIconHug = {
  args: { hug: true, hasLeadingIcon: false, hasBadge: true, badgeCount: 1, hasClose: false, centerContent: false, title: 'Tab' },
};

// -- EXTRAS FOR DESIGN/DEV REFERENCE --

export const Checked = {
  args: { checked: true, hug: false, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: false, title: 'Tab' },
};
export const Disabled = {
  args: { disabled: true, hug: false, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: false, title: 'Tab' },
};
export const LongTitle = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: false, hasClose: false, centerContent: false, title: 'A very long tab name for truncation' },
};
export const HighBadgeCount = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 999, hasClose: false, centerContent: false, title: 'Tab' },
};
export const BadgeHideNumber = {
  args: { hug: false, hasLeadingIcon: true, hasBadge: true, badgeCount: 99, badgeHideNumber: true, hasClose: false, centerContent: false, title: 'Tab' },
};
