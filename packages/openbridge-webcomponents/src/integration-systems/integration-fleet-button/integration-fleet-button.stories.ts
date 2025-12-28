import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationFleetButton} from './integration-fleet-button.js';
import './integration-fleet-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcIntegrationFleetButton> = {
  title: 'Integration Systems/Fleet Button',
  tags: ['6.0'],
  component: 'obc-integration-fleet-button',
  args: {
    fleetName: 'Fleet Name',
    status: 'Monitoring',
    readouts: [
      {label: 'Fuel cons.', value: '11.6', unit: 't/24h'},
      {label: 'ETA deviation', value: '+5', unit: 'h'},
    ],
    alertTopic: 'Navigation alert',
    alerts: {alarm: 1, warning: 5, caution: 2},
  },
  parameters: {
    backgrounds: {
      value: 'integration-container-global-color',
    },
  },
  render: (args) => html`
    <obc-integration-fleet-button
      style="width: 320px; display: block;"
      .fleetName=${args.fleetName}
      .status=${args.status}
      .readouts=${args.readouts}
      .alertTopic=${args.alertTopic}
      .alerts=${args.alerts}
      .selected=${args.selected}
    >
      <obi-placeholder slot="alert-topic-icon"></obi-placeholder>
    </obc-integration-fleet-button>
  `,
} satisfies Meta<ObcIntegrationFleetButton>;

export default meta;
type Story = StoryObj<ObcIntegrationFleetButton>;

export const Unselected: Story = {
  args: {
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const UnselectedNoAlerts: Story = {
  args: {
    selected: false,
    alerts: {alarm: 0, warning: 0, caution: 0},
  },
};

export const SelectedNoAlerts: Story = {
  args: {
    selected: true,
    alerts: {alarm: 0, warning: 0, caution: 0},
  },
};
