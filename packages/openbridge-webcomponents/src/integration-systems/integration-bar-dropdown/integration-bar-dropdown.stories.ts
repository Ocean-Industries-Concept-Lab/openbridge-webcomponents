import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBarDropdown} from './integration-bar-dropdown.js';
import './integration-bar-dropdown.js';
import {html} from 'lit';
import '../integration-dropdown-button/integration-dropdown-button.js';
import '../../components/clock/clock.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcIntegrationBarDropdown> = {
  title: 'Integration Systems/Integration Bar',
  tags: ['6.0', 'WIP'],
  component: 'obc-integration-bar',
  args: {
    showClock: true,
    date: '2021-01-01T11:11:11.111Z',
    clockMinimizeBreakpointPx: 600,
    showDate: true,
    showTimezone: true,
    timeZoneOffsetHours: 1,
    showDimmingButton: true,
    showUserButton: true,
    showHomeButton: true,
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
      .showClock=${args.showClock}
      .showDimmingButton=${args.showDimmingButton}
      .showUserButton=${args.showUserButton}
      .showNotificationButton=${args.showNotificationButton}
      .showSystemButton=${args.showSystemButton}
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
