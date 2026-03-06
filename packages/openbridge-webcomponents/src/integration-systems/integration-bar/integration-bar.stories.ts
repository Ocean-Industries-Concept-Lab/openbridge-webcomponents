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
    showUserButton: true,
    showDimmingButton: true,
    showSystemButton: true,
    showScreenButton: true,
    showNotificationButton: true,
    showAlertButton: true,
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
  render: (args) =>
    html`<obc-integration-bar
      .hideHomeButton=${args.hideHomeButton}
      .showClock=${args.showClock}
      .showUserButton=${args.showUserButton}
      .showDimmingButton=${args.showDimmingButton}
      .showSystemButton=${args.showSystemButton}
      .showAlertButton=${args.showAlertButton}
      .showScreenButton=${args.showScreenButton}
      .showNotificationButton=${args.showNotificationButton}
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
            ><div slot="button-1-label">Confirm</div>
            <div slot="button-2-label">Cancel</div></obc-integration-vessel-menu
          >`
        : null}
    </obc-integration-bar>`,
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
