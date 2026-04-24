import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBar} from './integration-bar.js';
import './integration-bar.js';
import {html} from 'lit';
import '../../components/dropdown-button/dropdown-button.js';
import '../../components/clock/clock.js';
import '../integration-vessel-menu/integration-vessel-menu.js';

const meta: Meta<typeof ObcIntegrationBar> = {
  title: 'Integration Systems/Integration Bar',
  tags: ['6.0', 'WIP'],
  component: 'obc-integration-bar',
  args: {
    showClock: true,
    date: '2021-01-01T11:11:11.111Z',
    clockMinimizeBreakpointPx: 600,
    showDate: false,
    showTimezone: false,
    timeZoneOffsetHours: 1,
    hideHomeButton: false,
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
    activeVesselValue: '',
    vesselSelectorOptions: [
      {value: 'Vessel 1', label: 'Vessel Name 1'},
      {value: 'Vessel 2', label: 'Vessel Name 2'},
      {value: 'Vessel 3', label: 'Vessel Name 3'},
    ],
  },
  argTypes: {
    showDate: {
      control: {type: 'boolean'},
    },
    showVesselIntegrationMenu: {
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
      integrationBar.activeVesselValue = '';
    };

    const onVesselSelected = (event: Event) => {
      const integrationBar = event.currentTarget as ObcIntegrationBar;
      const vesselEvent = event as CustomEvent<{value: string; label: string}>;
      integrationBar.fleetButtonActivated = false;
      integrationBar.activeVesselValue = vesselEvent.detail.value;
    };

    const onMenuConfirmClick = (event: Event) => {
      const integrationBar = findIntegrationBar(event);
      if (!integrationBar) {
        return;
      }

      if (integrationBar.activeVesselValue !== '') {
        integrationBar.selectedVesselValue = integrationBar.activeVesselValue;
        integrationBar.fleetButtonSelected = false;
      } else if (integrationBar.fleetButtonActivated) {
        integrationBar.fleetButtonSelected = true;
        integrationBar.selectedVesselValue = '';
      }

      integrationBar.activeVesselValue = '';
      integrationBar.fleetButtonActivated = false;
    };

    const onMenuCancelClick = (event: Event) => {
      const integrationBar = findIntegrationBar(event);
      if (!integrationBar) {
        return;
      }

      integrationBar.activeVesselValue = '';
      integrationBar.fleetButtonActivated = false;
    };

    return html`<obc-integration-bar
      @fleet-button-click=${onFleetButtonClick}
      @vessel-selected=${onVesselSelected}
      .hideHomeButton=${args.hideHomeButton}
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
      .vesselSelectorOptions=${args.vesselSelectorOptions}
      .fleetButtonLabel=${args.fleetButtonLabel}
      .activeVesselValue=${args.activeVesselValue}
      .selectedVesselValue=${args.selectedVesselValue}
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
      ${args.showVesselIntegrationMenu
        ? html`<obc-integration-vessel-menu
            slot="vessel-integration-menu"
            numberOfButtons="2"
            @button1-click=${onMenuConfirmClick}
            @button2-click=${onMenuCancelClick}
            ><div slot="button-1-label">Confirm</div>
            <div slot="button-2-label">Cancel</div></obc-integration-vessel-menu
          >`
        : null}
    </obc-integration-bar>`;
  },
} satisfies Meta<ObcIntegrationBar>;

export default meta;
type Story = StoryObj<ObcIntegrationBar>;

export const Primary: Story = {
  args: {},
};

export const FleetButtonSelected: Story = {
  args: {
    fleetButtonSelected: true,
  },
};

export const WithVesselIntegrationMenu: Story = {
  args: {
    showVesselIntegrationMenu: true,
    selectedVesselValue: 'Vessel 3',
  },
};

export const PendingVesselSelection: Story = {
  args: {
    showVesselIntegrationMenu: true,
    selectedVesselValue: 'Vessel 2',
    activeVesselValue: 'Vessel 3',
  },
};
