import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAlertListDetailsExperimental,
  actionColumn,
  statusColumn,
  timeColumn,
} from './alert-list-details-experimental.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';

const alertsTheListCannotDrawWithoutAStandard: StandardAlert[] = [
  {id: '1', criticality: 'alarm', state: 'active-unacknowledged'},
  {id: '2', criticality: 'warning', state: 'active-acknowledged'},
];

const meta: Meta<ObcAlertListDetailsExperimental> = {
  title:
    'Application Components/Alerts/Alert List Details Experimental/No Alert Standard',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  parameters: {
    layout: 'fullscreen',
  },
  render: () =>
    html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .columns=${[statusColumn(), actionColumn(), timeColumn()]}
      .alerts=${alertsTheListCannotDrawWithoutAStandard}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-details-experimental>`,
} satisfies Meta<ObcAlertListDetailsExperimental>;

export default meta;
type Story = StoryObj<ObcAlertListDetailsExperimental>;

export const NoAlertStandard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the list shows no alert and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
