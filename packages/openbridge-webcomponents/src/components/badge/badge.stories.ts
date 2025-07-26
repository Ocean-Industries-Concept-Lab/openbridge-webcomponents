import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcBadge, BadgeType, BadgeSize, BadgeVariant} from './badge.js';
import './badge.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-warning-badge.js';
import '../../icons/icon-alarm-badge.js';
import {color} from 'storybook/internal/theming';

const meta: Meta<typeof ObcBadge> = {
  title: 'UI Components/Alert/Badge',
  tags: ['autodocs'],
  component: 'obc-badge',
  args: {
    number: 9,
    hideNumber: false,
    size: BadgeSize.regular,
    type: BadgeType.regular,
    variant: BadgeVariant.default,
  },
  argTypes: {
    number: {
      control: {type: 'number', min: 0},
      description: 'The number to display in the badge',
    },
    hideNumber: {
      control: {type: 'boolean'},
      description: 'Hides the number in the badge',
    },
    size: {
      control: {type: 'select'},
      options: Object.values(BadgeSize),
      description: 'Badge size',
    },
    type: {
      control: {type: 'select'},
      options: Object.values(BadgeType),
      description: 'Badge visual style/type',
    },
    variant: {
      control: {type: 'select'},
      options: Object.values(BadgeVariant),
      description: 'Badge variant (default or flat)',
    },
    // for docs clarity: we don't pass children in controls
  },
} satisfies Meta<ObcBadge>;

export default meta;
type Story = StoryObj<ObcBadge>;

export const Regular: Story = {
  args: {
    size: BadgeSize.regular,
    variant: BadgeVariant.default,
    type: BadgeType.regular,
    hideNumber: false,
  },
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const Large: Story = {
  args: {
    size: BadgeSize.large,
    variant: BadgeVariant.default,
    type: BadgeType.regular,
    hideNumber: false,
  },
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const NoNumber: Story = {
  args: {
    size: BadgeSize.regular,
    hideNumber: true,
    variant: BadgeVariant.default,
    type: BadgeType.regular,
  },
  render(args) {
    return html`<obc-badge
      hideNumber
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const NoNumberLarge: Story = {
  args: {
    size: BadgeSize.large,
    hideNumber: true,
    variant: BadgeVariant.default,
    type: BadgeType.regular,
  },
  render(args) {
    return html`<obc-badge
      hideNumber
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

// --- All types, regular and flat ---

export const Alarm: Story = {
  args: {type: BadgeType.alarm},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const Warning: Story = {
  args: {type: BadgeType.warning},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const Caution: Story = {
  args: {type: BadgeType.caution},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const Running: Story = {
  args: {type: BadgeType.running},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const Notification: Story = {
  args: {type: BadgeType.notification},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const Enhance: Story = {
  args: {type: BadgeType.enhance},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const Automation: Story = {
  args: {type: BadgeType.automation},
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const Empty: Story = {
  args: {type: BadgeType.empty},
  render(args) {
    return html`<obc-badge number=${args.number} type="empty"> </obc-badge>`;
  },
};

// ---------- FLAT VARIANT STORIES ----------

export const FlatRegular: Story = {
  args: {size: BadgeSize.regular, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatLarge: Story = {
  args: {size: BadgeSize.large, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatHideNumber: Story = {
  args: {variant: BadgeVariant.flat, hideNumber: true},
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type=${args.type}
      variant="flat"
      hideNumber
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

// Flat + All Types
export const FlatAlarm: Story = {
  args: {type: BadgeType.alarm, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="alarm"
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const FlatWarning: Story = {
  args: {type: BadgeType.warning, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="warning"
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const FlatCaution: Story = {
  args: {type: BadgeType.caution, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="caution"
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const FlatRunning: Story = {
  args: {type: BadgeType.running, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="running"
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
    </obc-badge>`;
  },
};

export const FlatNotification: Story = {
  args: {type: BadgeType.notification, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="notification"
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatEnhance: Story = {
  args: {type: BadgeType.enhance, variant: BadgeVariant.flat},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="enhance"
      variant="flat"
      ?hideNumber=${args.hideNumber}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatAutomation: Story = {
  args: {
    type: BadgeType.automation,
    variant: BadgeVariant.flat,
    hideNumber: true,
  },
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type="automation"
      variant="flat"
      hideNumber
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};