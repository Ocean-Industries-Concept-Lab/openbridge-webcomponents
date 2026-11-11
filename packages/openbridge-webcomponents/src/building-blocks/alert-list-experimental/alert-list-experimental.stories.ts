import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-list-experimental.js';
import {ObcAlertListExperimental} from './alert-list-experimental.js';
import '../../components/alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {
  ObcAlertMenuItemExperimental,
  ObcAlertMenuItemExperimentalActionClickEvent,
} from '../../components/alert-menu-item-experimental/alert-menu-item-experimental.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {iec62923StateAfterAction} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

function moveItemToStateAfterAction(
  event: ObcAlertMenuItemExperimentalActionClickEvent
) {
  const item = event.currentTarget as ObcAlertMenuItemExperimental;
  item.state = iec62923StateAfterAction(item.state, event.detail.actionId);
}

const meta: Meta<ObcAlertListExperimental> = {
  title: 'Application Components/Alerts/Alert List Experimental/IEC 62923',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-experimental',
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListExperimental'),
          'iec62923AlertStandard'
        ),
      },
    },
  },
  argTypes: {
    filterId: {
      control: {type: 'select'},
      options: [undefined, 'unacked', 'active'],
    },
  },
  render: (args) => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-list-experimental
      .filterId=${args.filterId}
      style="height: 480px; display: block;"
    >
      <obc-alert-menu-item-experimental
        criticality="alarm"
        state="active-unacknowledged"
        title="alarm"
        description="Active, unacknowledged"
        time="14:39:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="alarm"
        state="active-acknowledged"
        title="alarm"
        description="Active, acknowledged"
        time="14:38:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="alarm"
        state="rectified-unacknowledged"
        title="alarm"
        description="Rectified, unacknowledged"
        time="14:37:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="alarm"
        state="normal"
        title="alarm"
        description="Normal"
        time="14:36:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="caution"
        state="active"
        title="caution"
        description="Caution, takes no ACK"
        time="14:35:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="warning"
        state="active-unacknowledged-acknowledge-not-allowed"
        title="warning"
        description="Acknowledged elsewhere"
        time="14:34:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
      <obc-alert-menu-item-experimental
        criticality="warning"
        state="active-responsibility-transferred"
        title="warning"
        description="Responsibility transferred"
        time="14:33:00"
        @action-click=${moveItemToStateAfterAction}
      ></obc-alert-menu-item-experimental>
    </obc-alert-list-experimental>`;
  },
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
          'With no `empty-*` slots filled, the list shows the empty state the standard gives the filter.',
      },
    },
  },
  render: () => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-list-experimental
      filterId="unacked"
      style="height: 480px; display: block;"
    ></obc-alert-list-experimental>`;
  },
};
