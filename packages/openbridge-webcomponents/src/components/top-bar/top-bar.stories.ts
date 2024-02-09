import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcTopBar} from './top-bar';
import './top-bar';
import '../alert-topbar-element/alert-topbar-element';
import '../notification-message/notification-message';
import '../notification-message-item/notification-message-item';
import '../../icons/icon-14-alarm-unack';
import '../alert-button/alert-button';
import {html} from 'lit';
import {AlertType} from '../../types';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcTopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs'],
  component: 'obc-top-bar',
  args: {
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
    wideMenuButton: false,
    smallBreakpoint: 0,
    alertBreakpoint: 0,
  },
  argTypes: {
    'show-date': {
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
          display: revert;
        }
      }
    </style>
    <obc-top-bar
      ?show-apps-button=${args.showAppsButton}
      ?show-dimming-button=${args.showDimmingButton}
      ?show-clock=${args.showClock}
      ?wide-menu-button=${args.wideMenuButton}
      ?inactive=${args.inactive}
      .smallBreakpoint=${args.smallBreakpoint}
      ?settings=${args.settings}
      ?show-date=${args.showDate}
      .breadcrumbItems=${args.breadcrumbItems}
    >
      <obc-alert-button
        class="alert-button"
        alert-type=${AlertType.Flat}
        n-alerts="0"
        standalone
        slot="alerts"
        style="max-width: 48px;"
      >
      </obc-alert-button>
      <obc-alert-topbar-element
        class="alert-display"
        slot="alerts"
        n-alerts="0"
        alert-type=${AlertType.None}
        max-width="480"
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
    smallBreakpoint: 1_000_000,
    alertBreakpoint: 1_000_000,
  },
};

export const Reponsive: Story = {
  args: {
    smallBreakpoint: 500,
    alertBreakpoint: 700,
  },
};
