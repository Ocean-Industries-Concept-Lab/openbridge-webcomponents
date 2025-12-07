import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcBadge, BadgeType, BadgeSize, BadgeVariant} from './badge.js';
import './badge.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-warning-badge.js';
import '../../icons/icon-alarm-badge.js';

const meta: Meta<typeof ObcBadge> = {
  title: 'UI Components/Message and alerts/Badge',
  tags: ['autodocs'],
  component: 'obc-badge',
  args: {
    number: 9,
    hideNumber: false,
    size: BadgeSize.regular,
    type: BadgeType.regular,
    variant: BadgeVariant.default,
    showIcon: true,
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
    showIcon: {
      control: {type: 'boolean'},
      description: 'Show icon in the badge',
    },
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
    showIcon: true,
  },
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
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
    showIcon: true,
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
    showIcon: true,
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
    showIcon: true,
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
  args: {type: BadgeType.alarm, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const AlarmLarge: Story = {
  args: {type: BadgeType.alarm, size: BadgeSize.large, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const Warning: Story = {
  args: {type: BadgeType.warning, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const Caution: Story = {
  args: {type: BadgeType.caution, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const Running: Story = {
  args: {type: BadgeType.running, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const Notification: Story = {
  args: {type: BadgeType.notification, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const Enhance: Story = {
  args: {type: BadgeType.enhance, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const Automation: Story = {
  args: {type: BadgeType.automation, showIcon: true},
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type=${args.type}
      variant=${args.variant}
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
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
  args: {size: BadgeSize.regular, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatLarge: Story = {
  args: {size: BadgeSize.large, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type=${args.type}
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatHideNumber: Story = {
  args: {variant: BadgeVariant.flat, hideNumber: true, showIcon: true},
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type=${args.type}
      variant="flat"
      hideNumber
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatAlarm: Story = {
  args: {type: BadgeType.alarm, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="alarm"
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const FlatAlarmLarge: Story = {
  args: {
    type: BadgeType.alarm,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatAlarm.render,
};

export const FlatWarning: Story = {
  args: {type: BadgeType.warning, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="warning"
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const FlatWarningLarge: Story = {
  args: {
    type: BadgeType.warning,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatWarning.render,
};

export const FlatCaution: Story = {
  args: {type: BadgeType.caution, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="caution"
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const FlatCautionLarge: Story = {
  args: {
    type: BadgeType.caution,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatCaution.render,
};

export const FlatRunning: Story = {
  args: {type: BadgeType.running, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="running"
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
    </obc-badge>`;
  },
};

export const FlatRunningLarge: Story = {
  args: {
    type: BadgeType.running,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatRunning.render,
};

export const FlatNotification: Story = {
  args: {
    type: BadgeType.notification,
    variant: BadgeVariant.flat,
    showIcon: true,
  },
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="notification"
      variant="flat"
      ?hideNumber=${args.hideNumber}
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatNotificationLarge: Story = {
  args: {
    type: BadgeType.notification,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatNotification.render,
};

export const FlatEnhance: Story = {
  args: {type: BadgeType.enhance, variant: BadgeVariant.flat, showIcon: true},
  render(args) {
    return html`<obc-badge
      number=${args.number}
      size=${args.size}
      type="enhance"
      variant="flat"
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatEnhanceLarge: Story = {
  args: {
    type: BadgeType.enhance,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatEnhance.render,
};

export const FlatAutomation: Story = {
  args: {
    type: BadgeType.automation,
    variant: BadgeVariant.flat,
    hideNumber: true,
    showIcon: true,
  },
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type="automation"
      variant="flat"
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatAutomationLarge: Story = {
  args: {
    type: BadgeType.automation,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatAutomation.render,
};

export const FlatOutline: Story = {
  args: {
    type: BadgeType.outline,
    variant: BadgeVariant.flat,
    hideNumber: true,
    showIcon: true,
  },
  render(args) {
    return html`<obc-badge
      size=${args.size}
      type="outline"
      variant="flat"
      ?showIcon=${args.showIcon}
    >
      <obi-placeholder slot="badge-icon"></obi-placeholder>
    </obc-badge>`;
  },
};

export const FlatOutlineLarge: Story = {
  args: {
    type: BadgeType.outline,
    variant: BadgeVariant.flat,
    size: 'large',
    showIcon: true,
  },
  render: FlatOutline.render,
};
