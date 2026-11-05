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
  isa182AlertStandard,
  type Isa182Alert,
} from '../../alert-system/isa-18-2-alert-standard.js';
import {
  applyActionToPageAlerts,
  isa182AlertAfterAction,
} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

type Isa182PageAlert = Isa182Alert & AlertAcknowledgedByField;

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

const moveIsa182PageAlertToStateAfterAction = (
  alarm: Isa182PageAlert,
  actionId: string
) => isa182AlertAfterAction(alarm, actionId);

const meta: Meta<ObcAlertListPageSmallExperimental> = {
  title: 'Pages/Alert List Small Experimental/ISA-18.2',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-page-small-experimental',
  args: {
    filterId: 'active',
    showTime: true,
  },
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListPageSmallExperimental'),
          'isa182AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(isa182AlertStandard);
    return html`<obc-alert-list-page-small-experimental
      .filterId=${args.filterId}
      .showTime=${args.showTime}
      .alerts=${isa182Alerts}
      @action-click=${(
        event: ObcAlertListPageSmallExperimentalActionClickEvent
      ) =>
        applyActionToPageAlerts(
          event.currentTarget as ObcAlertListPageSmallExperimental,
          [event.detail.alert],
          event.detail.actionId,
          moveIsa182PageAlertToStateAfterAction
        )}
      @ack-all-visible-click=${(
        event: ObcAlertListPageSmallExperimentalAckAllClickEvent
      ) =>
        applyActionToPageAlerts(
          event.currentTarget as ObcAlertListPageSmallExperimental,
          event.detail.alerts,
          ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
          moveIsa182PageAlertToStateAfterAction
        )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-page-small-experimental>`;
  },
};

export default meta;
type Story = StoryObj<ObcAlertListPageSmallExperimental>;

export const Automation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 lets several alarms be acknowledged at once, so the page offers ACK visible, and its dropdown lists the five filters the standard declares. Under IEC 62923 there is no ACK visible: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
};
