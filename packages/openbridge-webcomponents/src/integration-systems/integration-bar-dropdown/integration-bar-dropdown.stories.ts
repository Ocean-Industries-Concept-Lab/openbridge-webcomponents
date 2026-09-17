import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBarDropdown} from './integration-bar-dropdown.js';
import './integration-bar-dropdown.js';
import {html} from 'lit';
import '../integration-dropdown-button/integration-dropdown-button.js';
import '../../components/clock/clock.js';
import '../../icons/icon-placeholder.js';
import {IntegrationButtonType} from '../integration-button/integration-button.js';
import {expect} from 'storybook/test';

const meta: Meta<typeof ObcIntegrationBarDropdown> = {
  title: 'Integration Systems/Integration Bar Dropdown',
  tags: ['experimental'],
  component: 'obc-integration-bar-dropdown',
  args: {
    showClock: true,
    date: '2021-01-01T11:11:11.111Z',
    clockMinimizeBreakpointPx: 600,
    showDate: true,
    showTimezone: true,
    timeZoneOffsetHours: 1,
    showHomeButton: true,
    homeButtonActivated: false,
    showLinkButton: false,
    linkButtonActivated: false,
    showAlertButton: false,
    alertButtonActivated: false,
    showNotificationButton: false,
    notificationButtonActivated: false,
    showNotificationCount: false,
    notificationCount: 0,
    showScreenButton: false,
    screenButtonActivated: false,
    showSystemButton: false,
    systemButtonActivated: false,
    showDimmingButton: true,
    dimmingButtonActivated: false,
    showUserButton: true,
    userButtonActivated: false,
    nStatusFields: 3,
  },
  argTypes: {
    showDate: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html`<obc-integration-bar-dropdown
      .showHomeButton=${args.showHomeButton}
      .homeButtonActivated=${args.homeButtonActivated}
      .showLinkButton=${args.showLinkButton}
      .linkButtonActivated=${args.linkButtonActivated}
      .showClock=${args.showClock}
      .showAlertButton=${args.showAlertButton}
      .alertButtonActivated=${args.alertButtonActivated}
      .showNotificationButton=${args.showNotificationButton}
      .notificationButtonActivated=${args.notificationButtonActivated}
      .showNotificationCount=${args.showNotificationCount}
      .notificationCount=${args.notificationCount}
      .showScreenButton=${args.showScreenButton}
      .screenButtonActivated=${args.screenButtonActivated}
      .showSystemButton=${args.showSystemButton}
      .systemButtonActivated=${args.systemButtonActivated}
      .showDimmingButton=${args.showDimmingButton}
      .dimmingButtonActivated=${args.dimmingButtonActivated}
      .showUserButton=${args.showUserButton}
      .userButtonActivated=${args.userButtonActivated}
      .nStatusFields=${args.nStatusFields}
    >
      <obc-integration-dropdown-button
        slot="vessel-selector"
        value="Vessel 1"
        .hasFleet=${true}
        .fleetLabel=${'Fleet name'}
        .options=${[
          {
            value: 'Vessel 1',
            label: 'Vessel Name 1',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {
            value: 'Vessel 2',
            label: 'Vessel Name 2',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {
            value: 'Vessel 3',
            label: 'Vessel Name 3',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
        ]}
      >
        <obc-integration-button
          slot="fleet"
          .readouts=${[{label: 'Label', value: 'Value', unit: 'Unit'}]}
          type=${IntegrationButtonType.rich}
        >
          <div slot="label">Fleet name</div>
          <div slot="info-label">Label</div>
          <div slot="info-status">Status</div>
        </obc-integration-button>
      </obc-integration-dropdown-button>
      <obi-placeholder slot="status-icon-1"></obi-placeholder>
      <div slot="status-label-1">Status</div>
      <obi-placeholder slot="status-icon-2"></obi-placeholder>
      <div slot="status-label-2">Status 2</div>
      <obi-placeholder slot="status-icon-3"></obi-placeholder>
      <div slot="status-label-3">Status 3</div>
      <obc-clock
        integrationBarMode
        .date=${args.date}
        .showDate=${args.showDate}
        slot="clock"
        .showTimezone=${args.showTimezone}
        .timeZoneOffsetHours=${args.timeZoneOffsetHours}
        .blinkOnlyBreakpointPx=${args.clockMinimizeBreakpointPx}
      ></obc-clock>
    </obc-integration-bar-dropdown>`,
} satisfies Meta<ObcIntegrationBarDropdown>;

export default meta;
type Story = StoryObj<ObcIntegrationBarDropdown>;

export const Primary: Story = {
  args: {},
};

export const AllButtons: Story = {
  args: {
    showLinkButton: true,
    showAlertButton: true,
    showNotificationButton: true,
    showNotificationCount: true,
    notificationCount: 3,
    showScreenButton: true,
    showSystemButton: true,
  },
  play: async ({canvasElement}) => {
    const bar = canvasElement.querySelector(
      'obc-integration-bar-dropdown'
    ) as ObcIntegrationBarDropdown;
    const iconButtons = bar.shadowRoot!.querySelectorAll('obc-icon-button');

    expect(iconButtons.length).toBe(7);
    for (const iconButton of iconButtons) {
      const control = iconButton.shadowRoot!.querySelector('button')!;
      expect(control.getAttribute('aria-label')).toBeTruthy();
    }
  },
};

export const AllButtonsActivated: Story = {
  args: {
    ...AllButtons.args,
    homeButtonActivated: true,
    linkButtonActivated: true,
    alertButtonActivated: true,
    notificationButtonActivated: true,
    screenButtonActivated: true,
    systemButtonActivated: true,
    dimmingButtonActivated: true,
    userButtonActivated: true,
  },
};
