import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-list-page-small-experimental.js';
import {
  ObcAlertListPageSmallExperimental,
  ObcAlertListPageSmallExperimentalAckAllClickEvent,
  ObcAlertListPageSmallExperimentalActionClickEvent,
} from './alert-list-page-small-experimental.js';
import type {
  AlertAcknowledgedByField,
  AlertDescriptionFields,
  AlertTimeField,
} from '../../components/alert-list-details-experimental/alert-list-details-experimental.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';
import type {
  StandardAlert,
  StandardAlertOf,
} from '../../alert-system/standard-alert.js';
import {
  iec62923StateAfterAction,
  isa182StateAfterAction,
} from '../../alert-system/stories/state-after-action.js';

type PageAlertFields = AlertDescriptionFields &
  AlertTimeField &
  AlertAcknowledgedByField;
type Iec62923PageAlert = StandardAlertOf<typeof iec62923AlertStandard> &
  PageAlertFields;
type Isa182PageAlert = StandardAlertOf<typeof isa182AlertStandard> &
  PageAlertFields;

const iec62923Alerts: Iec62923PageAlert[] = [
  {
    id: 'unacknowledged',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    source: 'alarm',
    text: 'Active, unacknowledged',
    time: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'alarm',
    state: 'active-acknowledged',
    source: 'alarm',
    text: 'Active, acknowledged',
    time: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'rectified',
    criticality: 'alarm',
    state: 'rectified-unacknowledged',
    source: 'alarm',
    text: 'Rectified, unacknowledged',
    time: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'alarm',
    state: 'normal',
    source: 'alarm',
    text: 'Normal',
    time: new Date('2024-01-15T14:36:00Z'),
  },
  {
    id: 'caution',
    criticality: 'caution',
    state: 'active',
    source: 'caution',
    text: 'Caution, takes no ACK',
    time: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'acknowledge-not-allowed',
    criticality: 'warning',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    source: 'warning',
    text: 'Acknowledged elsewhere',
    time: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'transferred',
    criticality: 'warning',
    state: 'active-responsibility-transferred',
    source: 'warning',
    text: 'Responsibility transferred',
    time: new Date('2024-01-15T14:33:00Z'),
  },
];

const isa182Alerts: Isa182PageAlert[] = [
  {
    id: 'unacknowledged',
    criticality: 'high',
    state: 'unacknowledged',
    source: 'high',
    text: 'Unacknowledged',
    time: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'high',
    state: 'acknowledged',
    source: 'high',
    text: 'Acknowledged',
    time: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'returned-to-normal',
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
    source: 'high',
    text: 'Returned to normal, unacknowledged',
    time: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'high',
    state: 'normal',
    source: 'high',
    text: 'Normal',
    time: new Date('2024-01-15T14:36:00Z'),
  },
  {
    id: 'diagnostic',
    criticality: 'diagnostic',
    state: 'active',
    source: 'diagnostic',
    text: 'Diagnostic, takes no ACK',
    time: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'shelved',
    criticality: 'medium',
    state: 'shelved',
    source: 'medium',
    text: 'Shelved',
    time: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'suppressed',
    criticality: 'critical',
    state: 'suppressed-by-design',
    source: 'critical',
    text: 'Suppressed by design',
    time: new Date('2024-01-15T14:33:00Z'),
  },
  {
    id: 'out-of-service',
    criticality: 'low',
    state: 'out-of-service',
    source: 'low',
    text: 'Out of service',
    time: new Date('2024-01-15T14:32:00Z'),
  },
];

/** Your application moves the alerts to their next state and hands the page the result. */
function applyActionToPageAlerts(
  page: ObcAlertListPageSmallExperimental,
  alertsActedOn: StandardAlert[],
  actionId: string,
  stateAfterAction: (state: string, actionId: string) => string
) {
  const idsOfAlertsActedOn = new Set(alertsActedOn.map((alert) => alert.id));
  page.alerts = (page.alerts as Array<StandardAlert & PageAlertFields>).map(
    (alert) => {
      if (!idsOfAlertsActedOn.has(alert.id)) {
        return alert;
      }
      const acknowledgedBy =
        actionId === ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
          ? 'John Doe'
          : alert.acknowledgedBy;
      return {
        ...alert,
        state: stateAfterAction(alert.state, actionId),
        acknowledgedBy,
      };
    }
  );
}

function renderPage(
  args: ObcAlertListPageSmallExperimental,
  alerts: StandardAlert[],
  stateAfterAction: (state: string, actionId: string) => string
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
        stateAfterAction
      )}
    @ack-all-visible-click=${(
      event: ObcAlertListPageSmallExperimentalAckAllClickEvent
    ) =>
      applyActionToPageAlerts(
        event.currentTarget as ObcAlertListPageSmallExperimental,
        event.detail.alerts,
        ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
        stateAfterAction
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
  render: (args) => renderPage(args, iec62923Alerts, iec62923StateAfterAction),
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
  render: (args) => renderPage(args, isa182Alerts, isa182StateAfterAction),
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
