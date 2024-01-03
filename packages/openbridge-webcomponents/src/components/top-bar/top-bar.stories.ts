import type {Meta, StoryObj} from '@storybook/web-components';
import {TopBar} from './top-bar';
import './top-bar';
import '../alert-topbar-element/alert-topbar-element';
import '../notification-message/notification-message';
import '../notification-message-item/notification-message-item';
import '../../icons/icon-14-alarm-unack';
import '../alert-button/alert-button';
import {html} from 'lit';
import {AlertType} from '../../types';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof TopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs'],
  component: 'obc-top-bar',
  args: {
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
    wideMenuButton: false,
  },
  argTypes: {
    'show-date': {
      control: {type: 'boolean'},
    },
  },
  render: (args) => html`
    <obc-top-bar
      ?show-apps-button=${args.showAppsButton}
      ?show-dimming-button=${args.showDimmingButton}
      ?show-clock=${args.showClock}
      ?wide-menu-button=${args.wideMenuButton}
      ?inactive=${args.inactive}
      ?size-small=${args.sizeSmall}
      ?settings=${args.settings}
      ?show-date=${args.showDate}
      .breadcrumbItems=${args.breadcrumbItems}
    >
      ${args.sizeSmall
        ? html` <obc-alert-button
            alert-type=${AlertType.Flat}
            n-alerts="0"
            standalone
            slot="alerts"
          >
          </obc-alert-button>`
        : html`
            <obc-alert-topbar-element
              slot="alerts"
              n-alerts="0"
              alert-type=${AlertType.None}
              max-width="480"
            >
            </obc-alert-topbar-element>
          `}
    </obc-top-bar>
  `,
} satisfies Meta<TopBar>;

export default meta;
type Story = StoryObj<TopBar>;

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
    sizeSmall: true,
  },
};
