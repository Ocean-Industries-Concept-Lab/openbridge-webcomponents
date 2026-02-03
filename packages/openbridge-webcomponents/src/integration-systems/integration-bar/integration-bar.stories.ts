import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBar} from './integration-bar.js';
import './integration-bar.js';
import {html} from 'lit';
import '../../components/dropdown-button/dropdown-button.js';
import '../../components/clock/clock.js';

const meta: Meta<typeof ObcIntegrationBar> = {
  title: 'Integration Systems/Integration bar',
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
    fleetButtonSelected: false,
  },
  argTypes: {
    showDate: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html`<obc-integration-bar
      .showClock=${args.showClock}
      .showDimmingButton=${args.showDimmingButton}
      .showUserButton=${args.showUserButton}
      .fleetButtonSelected=${args.fleetButtonSelected}
    >
      <obc-dropdown-button
        slot="vessel-selector"
        integration
        value="Vessel 1"
        .options=${[
          {value: 'Vessel 1', label: 'Vessel Name 1'},
          {value: 'Vessel 2', label: 'Vessel Name 2'},
          {value: 'Vessel 3', label: 'Vessel Name 3'},
        ]}
      >
      </obc-dropdown-button>
      <obc-clock
        integrationBarMode
        .date=${args.date}
        .showDate=${args.showDate}
        slot="clock"
        .showTimezone=${args.showTimezone}
        .timeZoneOffsetHours=${args.timeZoneOffsetHours}
        .blinkOnlyBreakpointPx=${args.clockMinimizeBreakpointPx}
      ></obc-clock>
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
