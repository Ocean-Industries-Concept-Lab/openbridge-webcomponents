import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBar} from './integration-bar.js';
import './integration-bar.js';
import {html} from 'lit';
import '../dropdown-button/dropdown-button.js';

const meta: Meta<typeof ObcIntegrationBar> = {
  title: 'Integration/Integration bar',
  tags: ['6.0', 'WIP'],
  component: 'obc-integration-bar',
  args: {
    showClock: true,
    date: '2021-01-01T11:11:11.111Z',
    clockMinimizeBreakpointPx: 600,
    showDate: true,
    showDimmingButton: true,
    showUserButton: true,
  },
  render: (args) =>
    html`<obc-integration-bar
      .showClock=${args.showClock}
      .date=${args.date}
      .clockMinimizeBreakpointPx=${args.clockMinimizeBreakpointPx}
      .showDate=${args.showDate}
      .showDimmingButton=${args.showDimmingButton}
      .showUserButton=${args.showUserButton}
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
    </obc-integration-bar>`,
} satisfies Meta<ObcIntegrationBar>;

export default meta;
type Story = StoryObj<ObcIntegrationBar>;

export const Primary: Story = {
  args: {},
};
