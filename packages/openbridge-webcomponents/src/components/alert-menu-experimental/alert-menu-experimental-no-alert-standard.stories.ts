import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-menu-experimental.js';
import {ObcAlertMenuExperimental} from './alert-menu-experimental.js';
import '../alert-menu-item-experimental/alert-menu-item-experimental.js';

const meta: Meta<ObcAlertMenuExperimental> = {
  title:
    'Application Components/Alerts/Alert Menu Experimental/No Alert Standard',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-experimental',
  args: {
    canAckAll: true,
    showSilenceButton: true,
    showAlertListButton: true,
  },
  render: (args) =>
    html`<obc-alert-menu-experimental
      .canAckAll=${args.canAckAll}
      .showSilenceButton=${args.showSilenceButton}
      .showAlertListButton=${args.showAlertListButton}
    >
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
    </obc-alert-menu-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertMenuExperimental>;

export const NoAlertStandard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the menu has one tab, shows none of its items and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
