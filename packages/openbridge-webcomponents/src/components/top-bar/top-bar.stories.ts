import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcTopBar} from './top-bar';
import './top-bar';
import '../alert-topbar-element/alert-topbar-element';
import '../notification-message/notification-message';
import '../notification-message-item/notification-message-item';
import '../alert-button/alert-button';
import {html} from 'lit';
import {AlertType} from '../../types';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcTopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs'],
  component: 'obc-top-bar',
  parameters: {
    layout: 'fullscreen',
    chromatic: {pauseAnimationAtEnd: false},
  },
  args: {
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
    wideMenuButton: false,
    appTitleBreakpointPx: 0,
    dimmingButtonBreakpointPx: 0,
    appButtonBreakpointPx: 0,
    clockMinimizeBreakpointPx: 0,
    alertBreakpoint: 0,
  },
  argTypes: {
    showdate: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => html`
    <style>
      .alert-display {
        display: none;
      }

      @media (min-width: ${args.alertBreakpoint + 'px'}) {
        .alert-button {
          display: none;
        }

        .alert-display {
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
      ?menuButtonActivated=${args.menuButtonActivated}
      .appButtonBreakpointPx=${args.appButtonBreakpointPx}
      .appTitleBreakpointPx=${args.appTitleBreakpointPx}
      .dimmingButtonBreakpointPx=${args.dimmingButtonBreakpointPx}
      .clockMinimizeBreakpointPx=${args.clockMinimizeBreakpointPx}
      .breadcrumbItems=${args.breadcrumbItems}
    >
      <obc-alert-button
        class="alert-button"
        alerttype=${AlertType.Warning}
        flatwhenidle
        nalerts="0"
        standalone
        slot="alerts"
        style="max-width: 48px;"
      >
      </obc-alert-button>
      <obc-alert-topbar-element
        class="alert-display"
        slot="alerts"
        nalerts="0"
        flatwhenidle
        alerttype=${AlertType.Warning}
        maxwidth="480"
      >
      </obc-alert-topbar-element>
    </obc-top-bar>
  `,
} satisfies Meta<ObcTopBar>;

export default meta;
type Story = StoryObj<ObcTopBar>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Regular: Story = {};

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
    alertBreakpoint: 1_000_000,
  },
};

export const Reponsive: Story = {
  args: {
    clockMinimizeBreakpointPx: 300,
    appTitleBreakpointPx: 400,
    appButtonBreakpointPx: 500,
    dimmingButtonBreakpointPx: 500,
    alertBreakpoint: 700,
  },
};
