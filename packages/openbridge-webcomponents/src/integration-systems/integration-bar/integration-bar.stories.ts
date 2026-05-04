import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBar} from './integration-bar.js';
import './integration-bar.js';
import {html} from 'lit';
import '../../components/dropdown-button/dropdown-button.js';
import '../../components/clock/clock.js';
import '../integration-vessel-menu/integration-vessel-menu.js';
import {IntegrationButtonVariant} from '../integration-button/integration-button.js';

const meta: Meta<typeof ObcIntegrationBar> = {
  title: 'Integration Systems/Integration Bar',
  tags: ['6.0', 'WIP'],
  component: 'obc-integration-bar',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    showClock: true,
    date: '2021-01-01T11:11:11.111Z',
    clockMinimizeBreakpointPx: 600,
    showDate: false,
    showTimezone: false,
    timeZoneOffsetHours: 1,
    hideHomeButton: false,
    hug: false,
    showLinkButton: false,
    linkButtonActivated: false,
    showUserButton: true,
    userButtonActivated: false,
    showDimmingButton: true,
    dimmingButtonActivated: false,
    showSystemButton: true,
    systemButtonActivated: false,
    showScreenButton: true,
    screenButtonActivated: false,
    showNotificationButton: true,
    notificationButtonActivated: false,
    showAlertButton: true,
    alertButtonActivated: false,
    showVesselIntegrationMenu: false,

    fleetButtonSelected: false,
    fleetButtonActivated: false,
    fleetButtonLabel: 'Fleet',
  },
  argTypes: {
    showDate: {
      control: {type: 'boolean'},
    },
    showVesselIntegrationMenu: {
      control: {type: 'boolean'},
    },
    hug: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => {
    const findIntegrationBar = (event: Event) => {
      const eventTarget = event.currentTarget as HTMLElement | null;
      return eventTarget?.closest(
        'obc-integration-bar'
      ) as ObcIntegrationBar | null;
    };

    const onFleetButtonClick = (event: Event) => {
      const integrationBar = event.currentTarget as ObcIntegrationBar;
      integrationBar.fleetButtonActivated = true;
    };

    const onVesselSelected = (event: Event) => {
      const integrationBar = event.currentTarget as ObcIntegrationBar;
      const vesselEvent = event as CustomEvent<{value: string; label: string}>;
      integrationBar.fleetButtonActivated = false;
    };

    return html`<obc-integration-bar
      style="width: 100%;"
      @fleet-button-click=${onFleetButtonClick}
      .hideHomeButton=${args.hideHomeButton}
      .hug=${args.hug}
      .showLinkButton=${args.showLinkButton}
      .linkButtonActivated=${args.linkButtonActivated}
      .showClock=${args.showClock}
      .showUserButton=${args.showUserButton}
      .userButtonActivated=${args.userButtonActivated}
      .showDimmingButton=${args.showDimmingButton}
      .dimmingButtonActivated=${args.dimmingButtonActivated}
      .showSystemButton=${args.showSystemButton}
      .systemButtonActivated=${args.systemButtonActivated}
      .showAlertButton=${args.showAlertButton}
      .alertButtonActivated=${args.alertButtonActivated}
      .showScreenButton=${args.showScreenButton}
      .screenButtonActivated=${args.screenButtonActivated}
      .showNotificationButton=${args.showNotificationButton}
      .notificationButtonActivated=${args.notificationButtonActivated}
      .fleetButtonSelected=${args.fleetButtonSelected}
      .fleetButtonActivated=${args.fleetButtonActivated}
      .fleetButtonLabel=${args.fleetButtonLabel}
    >
      <obc-clock
        integrationBarMode
        .date=${args.date}
        .showDate=${args.showDate}
        slot="clock"
        .showTimezone=${args.showTimezone}
        .timeZoneOffsetHours=${args.timeZoneOffsetHours}
        .blinkOnlyBreakpointPx=${args.clockMinimizeBreakpointPx}
      ></obc-clock>
      <!-- ${args.showVesselIntegrationMenu
        ? html`<obc-integration-vessel-menu
            slot="vessel-integration-menu"
            numberOfButtons="2"
            @button1-click=${onMenuConfirmClick}
            @button2-click=${onMenuCancelClick}
            ><div slot="button-1-label">Confirm</div>
            <div slot="button-2-label">Cancel</div></obc-integration-vessel-menu
          >`
        : null} -->

      <obc-integration-button
        hasLeadingIcon
        .variant=${IntegrationButtonVariant.flat}
        ?selected=${false}
        ?activated=${false}
        @click=${() => this.onVesselButtonClick()}
        dividerRight
        slot="integration-buttons"
      >
        <obi-ship slot="leading-icon"></obi-ship>
        <span slot="label">Boat</span>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        .variant=${IntegrationButtonVariant.flat}
        ?selected=${true}
        ?activated=${false}
        style=""
        @click=${() => this.onVesselButtonClick()}
        dividerRight
        slot="integration-buttons"
      >
        <obi-ship slot="leading-icon"></obi-ship>
        <span slot="label">Space Ship</span>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        .variant=${IntegrationButtonVariant.flat}
        ?selected=${false}
        ?activated=${true}
        style=""
        @click=${() => this.onVesselButtonClick()}
        dividerRight
        slot="integration-buttons"
      >
        <obi-ship slot="leading-icon"></obi-ship>
        <span slot="label">Vessel</span>
      </obc-integration-button>
    </obc-integration-bar>`;
  },
} satisfies Meta<ObcIntegrationBar>;

export default meta;
type Story = StoryObj<ObcIntegrationBar>;

export const Primary: Story = {
  args: {},
};
