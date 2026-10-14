import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import './alert-list-experimental.js';
import {ObcAlertListExperimental} from './alert-list-experimental.js';
import {
  alertMenuItem,
  alertsInEveryKindOfState,
  drawStoryWithAlertStandard,
} from '../../storybook-util.js';

const meta: Meta<ObcAlertListExperimental> = {
  title: 'Application Components/Alerts/Alert List Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-experimental',
  beforeEach: drawStoryWithAlertStandard('iec-62923'),
  argTypes: {
    filterId: {
      control: {type: 'select'},
      options: [undefined, 'unacked', 'active'],
    },
  },
  render: (args) =>
    html`<obc-alert-list-experimental
      .filterId=${args.filterId}
      style="height: 480px; display: block;"
    >
      ${repeat(
        alertsInEveryKindOfState('iec-62923'),
        (alert) => alert.id,
        (alert) => alertMenuItem(alert)
      )}
    </obc-alert-list-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertListExperimental>;

export const Regular: Story = {};

export const Unacked: Story = {
  args: {filterId: 'unacked'},
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With no `empty-*` slots filled, the list shows the empty state its standard gives the filter.',
      },
    },
  },
  render: () =>
    html`<obc-alert-list-experimental
      .filterId=${'unacked'}
      style="height: 480px; display: block;"
    ></obc-alert-list-experimental>`,
};

export const NoAlertStandard: Story = {
  beforeEach: drawStoryWithAlertStandard(undefined),
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the list shows none of its items and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
