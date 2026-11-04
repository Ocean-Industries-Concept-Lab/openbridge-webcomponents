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
  isa182AlertStandard,
  type Isa182Alert,
} from '../../alert-system/isa-18-2-alert-standard.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {
  iec62923AlertAfterAction,
  isa182AlertAfterAction,
} from '../../alert-system/stories/state-after-action.js';

type Iec62923PageAlert = Iec62923Alert & AlertAcknowledgedByField;
type Isa182PageAlert = Isa182Alert & AlertAcknowledgedByField;

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

const isa182Alerts: Isa182PageAlert[] = [
  {
    id: 'unacknowledged',
    criticality: 'high',
    state: 'unacknowledged',
    tagName: 'TAG-01',
    alarmDescription: 'Unacknowledged',
    alarmType: 'High',
    timeAlarmBecameActive: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'high',
    state: 'acknowledged',
    tagName: 'TAG-02',
    alarmDescription: 'Acknowledged',
    alarmType: 'High',
    timeAlarmBecameActive: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'returned-to-normal',
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
    tagName: 'TAG-03',
    alarmDescription: 'Returned to normal, unacknowledged',
    alarmType: 'High',
    timeAlarmBecameActive: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'high',
    state: 'normal',
    tagName: 'TAG-04',
    alarmDescription: 'Normal',
    alarmType: 'High',
  },
  {
    id: 'shelved',
    criticality: 'medium',
    state: 'shelved-active',
    tagName: 'TAG-05',
    alarmDescription: 'Shelved, active',
    alarmType: 'Deviation',
    timeAlarmWasShelved: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'suppressed',
    criticality: 'critical',
    state: 'suppressed-by-design-not-active',
    tagName: 'TAG-06',
    alarmDescription: 'Suppressed by design, not active',
    alarmType: 'High-high',
    timeAlarmWasSuppressed: new Date('2024-01-15T14:33:00Z'),
  },
  {
    id: 'out-of-service',
    criticality: 'low',
    state: 'out-of-service-active',
    tagName: 'TAG-07',
    alarmDescription: 'Out of service, active',
    alarmType: 'Low',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T14:32:00Z'),
  },
];

/** Your application moves the alerts to their next state and hands the page the result. */
function applyActionToPageAlerts<
  Alert extends StandardAlert & AlertAcknowledgedByField,
>(
  page: ObcAlertListPageSmallExperimental,
  alertsActedOn: StandardAlert[],
  actionId: string,
  alertAfterAction: (alert: Alert, actionId: string) => Alert
) {
  const idsOfAlertsActedOn = new Set(alertsActedOn.map((alert) => alert.id));
  page.alerts = (page.alerts as Alert[]).map((alert) => {
    if (!idsOfAlertsActedOn.has(alert.id)) {
      return alert;
    }
    const acknowledgedBy =
      actionId === ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
        ? 'John Doe'
        : alert.acknowledgedBy;
    return {...alertAfterAction(alert, actionId), acknowledgedBy};
  });
}

function renderPage<Alert extends StandardAlert & AlertAcknowledgedByField>(
  args: ObcAlertListPageSmallExperimental,
  alerts: Alert[],
  alertAfterAction: (alert: Alert, actionId: string) => Alert
) {
  return html`<obc-alert-list-page-small-experimental
    .filterId=${args.filterId}
    .showTime=${args.showTime}
    .alerts=${alerts}
    @action-click=${(
      event: ObcAlertListPageSmallExperimentalActionClickEvent
    ) =>
      applyActionToPageAlerts(
        event.currentTarget as ObcAlertListPageSmallExperimental,
        [event.detail.alert],
        event.detail.actionId,
        alertAfterAction
      )}
    @ack-all-visible-click=${(
      event: ObcAlertListPageSmallExperimentalAckAllClickEvent
    ) =>
      applyActionToPageAlerts(
        event.currentTarget as ObcAlertListPageSmallExperimental,
        event.detail.alerts,
        ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
        alertAfterAction
      )}
    style="height: 100vh; display: block; max-height: 100%;"
  ></obc-alert-list-page-small-experimental>`;
}

const meta: Meta<ObcAlertListPageSmallExperimental> = {
  title: 'Pages/Alert List Small Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-page-small-experimental',
  beforeEach: () => setAlertStandard(iec62923AlertStandard),
  args: {
    filterId: 'active',
    showTime: true,
  },
  render: (args) => renderPage(args, iec62923Alerts, iec62923AlertAfterAction),
};

export default meta;
type Story = StoryObj<ObcAlertListPageSmallExperimental>;

export const Regular: Story = {};

export const Automation: Story = {
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 lets several alarms be acknowledged at once, so the page offers ACK visible, and its dropdown lists the five filters the standard declares. Under IEC 62923, as in the other stories, there is no ACK visible: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
  render: (args) =>
    renderPage(args, isa182Alerts, (alarm: Isa182PageAlert, actionId) =>
      isa182AlertAfterAction(alarm, actionId)
    ),
};

export const Unacked: Story = {
  args: {filterId: 'unacked'},
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-list-page-small-experimental
      style="height: 100vh; display: block;"
    ></obc-alert-list-page-small-experimental>`,
};
