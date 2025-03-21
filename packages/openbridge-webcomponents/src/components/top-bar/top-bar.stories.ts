import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcTopBar} from './top-bar.js';
import './top-bar.js';
import '../notification-message/notification-message.js';
import '../notification-message-item/notification-message-item.js';
import '../alert-button/alert-button.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../alert-icon/alert-icon.js';
import {html} from 'lit';
import {ObcNotificationMessageAction} from '../notification-message/notification-message.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcTopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs', '6.0'],
  component: 'obc-top-bar',
  parameters: {
    layout: 'fullscreen',
    chromatic: {pauseAnimationAtEnd: false},
  },
  args: {
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
    showUserButton: true,
    wideMenuButton: false,
    appTitleBreakpointPx: 0,
    dimmingButtonBreakpointPx: 0,
    appButtonBreakpointPx: 0,
    clockMinimizeBreakpointPx: 0,
    alertBreakpoint: 0,
    flatMaxBreakpointPx: 0,
    silenceButtonMinBreakpointPx: 0,
  },
  argTypes: {
    showdate: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => html`
    <style>
      .alert-notifications {
        display: none;
      }

      @media (min-width: ${args.flatMaxBreakpointPx + 'px'}) {
        .alert-button {
          flex-basis: calc(2 * var(--global-size-spacing-touch-target-min));
        }
      }

      @media (min-width: ${args.alertBreakpoint + 'px'}) {
        .alert-notifications {
          display: revert !important;
        }
      }
    </style>
    <obc-top-bar
      ?showappsbutton=${args.showAppsButton}
      ?showdimmingbutton=${args.showDimmingButton}
      ?showclock=${args.showClock}
      ?widemenubutton=${args.wideMenuButton}
      ?inactive=${args.inactive}
      ?settings=${args.settings}
      ?showdate=${args.showDate}
      ?showuserbutton=${args.showUserButton}
      ?menuButtonActivated=${args.menuButtonActivated}
      ?tall=${args.tall}
      .appButtonBreakpointPx=${args.appButtonBreakpointPx}
      .appTitleBreakpointPx=${args.appTitleBreakpointPx}
      .dimmingButtonBreakpointPx=${args.dimmingButtonBreakpointPx}
      .clockMinimizeBreakpointPx=${args.clockMinimizeBreakpointPx}
      .userButtonBreakpointPx=${args.userButtonBreakpointPx}
      .breadcrumbItems=${args.breadcrumbItems}
    >
      <obc-notification-message
        .action=${ObcNotificationMessageAction.TextButton}
        ?large=${args.tall}
        slot="alerts"
        class="alert-notifications"
      >
        <obc-alert-icon slot="primary-icon" name="alarm-unack"></obc-alert-icon>
        <obi-placeholder slot="secondary-icon"></obi-placeholder>
        <div slot="title">Alert title</div>
        <div slot="description">
          Description here. This alert has been triggered due to a detected
        </div>
        <div slot="time">09:12:46</div>
        <div slot="action-text">ACK</div>
      </obc-notification-message>
      <obc-alert-button
        class="alert-button"
        nAlerts="1"
        alertType="alarm"
        counter
        blinking
        showSilenceButton
        silenceButtonDisabled
        ?large=${args.tall}
        .flatMaxBreakpointPx=${args.flatMaxBreakpointPx}
        .silenceButtonMinBreakpointPx=${args.silenceButtonMinBreakpointPx}
        slot="alerts"
      >
      </obc-alert-button>
    </obc-top-bar>
  `,
} satisfies Meta<ObcTopBar>;

export default meta;
type Story = StoryObj<ObcTopBar>;

export const Regular: Story = {};
export const Tall: Story = {
  args: {
    tall: true,
  },
};

export const WideRailRegular: Story = {
  args: {
    wideMenuButton: true,
  },
};

export const Inactive: Story = {
  args: {
    inactive: true,
  },
};

export const Settings: Story = {
  args: {
    settings: true,
    breadcrumbItems: [
      {label: 'Settings 1'},
      {label: 'Page 1'},
      {label: 'Page 1.2'},
    ],
  },
};

export const Small: Story = {
  args: {
    appButtonBreakpointPx: 1_000_000,
    appTitleBreakpointPx: 1_000_000,
    dimmingButtonBreakpointPx: 1_000_000,
    clockMinimizeBreakpointPx: 1_000_000,
    userButtonBreakpointPx: 1_000_000,
    alertBreakpoint: 1_000_000,
  },
};

export const Reponsive: Story = {
  args: {
    clockMinimizeBreakpointPx: 300,
    appTitleBreakpointPx: 400,
    appButtonBreakpointPx: 500,
    dimmingButtonBreakpointPx: 500,
    userButtonBreakpointPx: 500,
    alertBreakpoint: 1120,
    flatMaxBreakpointPx: 340,
    silenceButtonMinBreakpointPx: 340,
  },
};
