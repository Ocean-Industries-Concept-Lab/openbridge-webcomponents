import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-list-experimental.js';
import {ObcAlertListExperimental} from './alert-list-experimental.js';
import '../../components/alert-menu-item-experimental/alert-menu-item-experimental.js';

const meta: Meta<ObcAlertListExperimental> = {
  title:
    'Application Components/Alerts/Alert List Experimental/No Alert Standard',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-experimental',
  render: () =>
    html`<obc-alert-list-experimental style="height: 480px; display: block;">
      <obc-alert-menu-item-experimental
        criticality="alarm"
        state="active-unacknowledged"
        title="alarm"
        description="Active, unacknowledged"
        time="14:39:00"
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="warning"
        state="active-acknowledged"
        title="warning"
        description="Active, acknowledged"
        time="14:38:00"
      ></obc-alert-menu-item-experimental>
    </obc-alert-list-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertListExperimental>;

export const NoAlertStandard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the list shows none of its items and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
