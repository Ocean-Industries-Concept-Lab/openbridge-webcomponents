import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-list-page-small-experimental.js';
import {
  ObcAlertListPageSmallExperimental,
  ObcAlertListPageSmallExperimentalAckAllClickEvent,
  ObcAlertListPageSmallExperimentalActionClickEvent,
} from './alert-list-page-small-experimental.js';
import type {AlertAcknowledgedByField} from '../../components/alert-list-details-experimental/alert-list-details-experimental.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {
  iec62923AlertStandard,
  type Iec62923Alert,
} from '../../alert-system/iec-62923-alert-standard.js';
import {
  applyActionToPageAlerts,
  iec62923AlertAfterAction,
} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

type Iec62923PageAlert = Iec62923Alert & AlertAcknowledgedByField;

const iec62923Alerts: Iec62923PageAlert[] = [
  {
    id: 'unacknowledged',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    alertSource: 'alarm',
    alertTitle: 'Active, unacknowledged',
    timeOfLastStateChange: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'alarm',
    state: 'active-acknowledged',
    alertSource: 'alarm',
    alertTitle: 'Active, acknowledged',
    timeOfLastStateChange: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'rectified',
    criticality: 'alarm',
    state: 'rectified-unacknowledged',
    alertSource: 'alarm',
    alertTitle: 'Rectified, unacknowledged',
    timeOfLastStateChange: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'alarm',
    state: 'normal',
    alertSource: 'alarm',
    alertTitle: 'Normal',
    timeOfLastStateChange: new Date('2024-01-15T14:36:00Z'),
  },
  {
    id: 'caution',
    criticality: 'caution',
    state: 'active',
    alertSource: 'caution',
    alertTitle: 'Caution, takes no ACK',
    timeOfLastStateChange: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'acknowledge-not-allowed',
    criticality: 'warning',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    alertSource: 'warning',
    alertTitle: 'Acknowledged elsewhere',
    timeOfLastStateChange: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'transferred',
    criticality: 'warning',
    state: 'active-responsibility-transferred',
    alertSource: 'warning',
    alertTitle: 'Responsibility transferred',
    timeOfLastStateChange: new Date('2024-01-15T14:33:00Z'),
  },
];

const meta: Meta<ObcAlertListPageSmallExperimental> = {
  title: 'Pages/Alert List Small Experimental/IEC 62923',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-page-small-experimental',
  args: {
    filterId: 'active',
    showTime: true,
    alerts: iec62923Alerts,
  },
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListPageSmallExperimental'),
          'iec62923AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-list-page-small-experimental
      .filterId=${args.filterId}
      .showTime=${args.showTime}
      .alerts=${args.alerts}
      @action-click=${(
        event: ObcAlertListPageSmallExperimentalActionClickEvent
      ) =>
        applyActionToPageAlerts(
          event.currentTarget as ObcAlertListPageSmallExperimental,
          [event.detail.alert],
          event.detail.actionId,
          iec62923AlertAfterAction<Iec62923PageAlert>
        )}
      @ack-all-visible-click=${(
        event: ObcAlertListPageSmallExperimentalAckAllClickEvent
      ) =>
        applyActionToPageAlerts(
          event.currentTarget as ObcAlertListPageSmallExperimental,
          event.detail.alerts,
          ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
          iec62923AlertAfterAction<Iec62923PageAlert>
        )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-page-small-experimental>`;
  },
};

export default meta;
type Story = StoryObj<ObcAlertListPageSmallExperimental>;

export const Regular: Story = {};

export const Unacked: Story = {
  args: {filterId: 'unacked'},
};

export const Empty: Story = {
  render: () => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-list-page-small-experimental
      style="height: 100vh; display: block;"
    ></obc-alert-list-page-small-experimental>`;
  },
};
