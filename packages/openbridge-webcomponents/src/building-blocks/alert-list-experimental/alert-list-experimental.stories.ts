import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import './alert-list-experimental.js';
import {ObcAlertListExperimental} from './alert-list-experimental.js';
import {AlertFilterMode} from '../../alert-filter.js';
import {
  acknowledgeMenuItem,
  alertMenuItem,
  alertsInEveryState,
} from '../../storybook-util.js';

const meta: Meta<ObcAlertListExperimental> = {
  title: 'Application Components/Alerts/Alert List Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-experimental',
  args: {
    filterMode: AlertFilterMode.All,
  },
  argTypes: {
    filterMode: {
      control: {type: 'select'},
      options: Object.values(AlertFilterMode),
    },
  },
  render: (args) =>
    html`<obc-alert-list-experimental
      .filterMode=${args.filterMode}
      style="height: 480px; display: block;"
    >
      ${repeat(
        alertsInEveryState(),
        (alert) => alert.id,
        (alert) => alertMenuItem(alert, acknowledgeMenuItem)
      )}
    </obc-alert-list-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertListExperimental>;

export const Regular: Story = {};

export const Unacked: Story = {
  args: {filterMode: AlertFilterMode.Unacked},
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With no `empty-*` slots filled, the list shows the empty state of its filter mode.',
      },
    },
  },
  render: () =>
    html`<obc-alert-list-experimental
      filterMode=${AlertFilterMode.Unacked}
      style="height: 480px; display: block;"
    ></obc-alert-list-experimental>`,
};
