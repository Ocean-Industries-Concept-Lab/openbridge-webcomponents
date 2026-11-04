import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAlertListCellClickEvent,
  ObcAlertListDetailsExperimental,
  ObcRowClickEvent,
  actionColumn,
  alertListCellSlotName,
  getAlertRows,
  statusColumn,
  timeColumn,
  typeColumn,
  type AlertAcknowledgedByField,
  type StandardAlertWithColumnFields,
} from './alert-list-details-experimental.js';
import type {ObcButton} from '../button/button.js';
import {html, type TemplateResult} from 'lit';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {defineAlertStandard} from '../../alert-system/alert-standard.js';
import {FlashingSpeed} from '../../types.js';
import '../../icons/icon-placeholder.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {
  iec62923AlertStandard,
  type Iec62923Alert,
} from '../../alert-system/iec-62923-alert-standard.js';
import {
  isa182AlertStandard,
  type Isa182Alert,
  type Isa182AlertOf,
} from '../../alert-system/isa-18-2-alert-standard.js';
import {isAlertActionOffered} from '../../alert-system/read-standard-alert.js';
import type {
  StandardAlert,
  StandardAlertOf,
} from '../../alert-system/standard-alert.js';
import {
  iec62923AlertAfterAction,
  isa182AlertAfterAction,
  isa182ServiceViewStateAfterAction,
} from '../../alert-system/stories/state-after-action.js';
import type {AlertStateDefinition} from '../../alert-system/alert-standard.js';
import '../alert-frame/diagnostic-badge.js';

type Iec62923ListAlert = Iec62923Alert & AlertAcknowledgedByField;
type Isa182ListAlert = Isa182Alert & AlertAcknowledgedByField;
type Isa182ServiceViewAlert = Isa182AlertOf<
  typeof isa182ServiceViewStandardDefinedByTheApplication
> &
  AlertAcknowledgedByField;
type Iec6060118Alert = StandardAlertOf<
  typeof iec6060118AlertStandardDefinedByTheApplication
> &
  StandardAlertWithColumnFields;

/** Your application moves the alert to its next state and hands the list the result. */
function moveClickedAlertToStateAfterAction<
  Alert extends StandardAlert & AlertAcknowledgedByField,
>(alertAfterAction: (alert: Alert, actionId: string) => Alert) {
  return (event: ObcAlertListCellClickEvent) => {
    const {alert: clickedAlert, actionId} = event.detail;
    if (actionId === undefined) {
      return;
    }
    const list = event.currentTarget as ObcAlertListDetailsExperimental;
    list.alerts = (list.alerts as Alert[]).map((alert) =>
      alert.id === clickedAlert.id
        ? {...alertAfterAction(alert, actionId), acknowledgedBy: 'John Doe'}
        : alert
    );
  };
}

function renderAlertList<
  Alert extends StandardAlert & AlertAcknowledgedByField,
>(
  args: ObcAlertListDetailsExperimental,
  alertAfterAction: (alert: Alert, actionId: string) => Alert
) {
  return html`<obc-alert-list-details-experimental
    aria-label="Alerts"
    .filterId=${args.filterId}
    .columns=${args.columns}
    .showHeader=${args.showHeader}
    .alerts=${args.alerts}
    .selectedRowId=${args.selectedRowId}
    @cell-click=${moveClickedAlertToStateAfterAction(alertAfterAction)}
    style="height: 100vh; display: block; max-height: 100%;"
  ></obc-alert-list-details-experimental>`;
}

const bridgeAlerts: Iec62923ListAlert[] = [
  {
    id: '1',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    alertSource: 'ECDIS',
    alertTitle: 'Collision risk',
    alertDescriptionText: 'MV NORDIC at CPA 0.2 nm, check the radar',
    timeOfLastStateChange: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: '2',
    criticality: 'warning',
    state: 'active-acknowledged',
    alertSource: 'ECDIS',
    alertTitle: 'Off track',
    alertDescriptionText: 'Deviated 0.5 nm from the planned route',
    timeOfLastStateChange: new Date('2024-01-15T13:45:22Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: '3',
    criticality: 'alarm',
    state: 'active-acknowledged',
    alertSource: 'ME 1',
    alertTitle: 'Port main engine load exceeds 95% of MCR',
    timeOfLastStateChange: new Date('2024-01-15T12:18:47Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: '4',
    criticality: 'warning',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    alertSource: 'ECDIS',
    alertTitle: 'Under keel clearance below safety margin: 2.5m',
    timeOfLastStateChange: new Date('2024-01-15T11:52:33Z'),
  },
  {
    id: '5',
    criticality: 'warning',
    state: 'active-unacknowledged',
    alertSource: 'Weather',
    alertTitle: 'True wind speed 35kts exceeds operational limit',
    timeOfLastStateChange: new Date('2024-01-15T10:27:08Z'),
  },
  {
    id: '6',
    criticality: 'warning',
    state: 'active-unacknowledged',
    alertSource: 'GPS',
    alertTitle: 'Position source switched to secondary GPS',
    timeOfLastStateChange: new Date('2024-01-15T09:14:55Z'),
  },
  {
    id: '7',
    criticality: 'caution',
    state: 'active',
    alertSource: 'ME 1',
    alertTitle: 'HFO temperature approaching lower limit: 115°C',
    timeOfLastStateChange: new Date('2024-01-15T08:39:42Z'),
  },
  {
    id: '8',
    criticality: 'warning',
    state: 'active-acknowledged',
    alertSource: 'AlertList',
    alertTitle: 'This alert is acked but has no acknowledgedBy information',
    timeOfLastStateChange: new Date('2024-01-15T13:45:22Z'),
  },
];

const meta: Meta<typeof ObcAlertListDetailsExperimental> = {
  title: 'Application Components/Alerts/Alert List Details Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  beforeEach: () => setAlertStandard(iec62923AlertStandard),
  args: {
    showHeader: true,
    columns: [statusColumn(), actionColumn({dividerRight: true}), timeColumn()],
    alerts: bridgeAlerts,
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    columns: {control: false},
    filterId: {
      control: {type: 'select'},
      options: [undefined, 'unacked', 'active'],
    },
  },
  render: (args) =>
    renderAlertList<Iec62923ListAlert>(args, iec62923AlertAfterAction),
} satisfies Meta<ObcAlertListDetailsExperimental>;

export default meta;
type Story = StoryObj<ObcAlertListDetailsExperimental>;

export const Regular: Story = {};

export const Small: Story = {
  args: {
    showHeader: false,
    columns: [
      statusColumn(),
      timeColumn(),
      actionColumn({
        width:
          'var(--app-components-alert-table-row-ack-container-width-small)',
      }),
    ],
  },
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      style="height: 100vh; display: block;"
    ></obc-alert-list-details-experimental>`,
};

const oneItemAlerts: Iec62923ListAlert[] = [
  {
    id: '1',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    alertSource: 'ME 1',
    alertTitle: 'Port main engine temperature exceeds normal operating range',
    timeOfLastStateChange: new Date('2024-01-15T14:32:15Z'),
  },
];

export const OneItem: Story = {
  args: {
    columns: [statusColumn(), actionColumn({dividerRight: true})],
    alerts: oneItemAlerts,
  },
};

const isa182AlertsOfEveryPriority: Isa182ListAlert[] = [
  {
    id: 'level-1',
    criticality: 'critical',
    state: 'unacknowledged',
    alarmDescription: 'Emergency shutdown condition detected',
    alarmType: 'High-high',
    tagName: 'CRIT-01',
    timeAlarmBecameActive: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'level-2',
    criticality: 'high',
    state: 'unacknowledged',
    alarmDescription: 'Main engine overspeed',
    alarmType: 'High',
    tagName: 'HIGH-02',
    timeAlarmBecameActive: new Date('2024-01-15T14:30:00Z'),
  },
  {
    id: 'level-3',
    criticality: 'medium',
    state: 'unacknowledged',
    alarmDescription: 'Tank level approaching high limit',
    alarmType: 'Deviation',
    tagName: 'MED-03',
    timeAlarmBecameActive: new Date('2024-01-15T14:28:00Z'),
  },
  {
    id: 'level-4',
    criticality: 'low',
    state: 'unacknowledged',
    alarmDescription: 'Filter maintenance due',
    alarmType: 'Low',
    tagName: 'LOW-04',
    timeAlarmBecameActive: new Date('2024-01-15T14:25:00Z'),
  },
];

export const LevelCategories: Story = {
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  args: {
    alerts: isa182AlertsOfEveryPriority,
    columns: [
      statusColumn(),
      actionColumn({dividerRight: true}),
      typeColumn(),
      timeColumn(),
    ],
  },
  render: (args) =>
    renderAlertList<Isa182ListAlert>(args, (alarm, actionId) =>
      isa182AlertAfterAction(alarm, actionId)
    ),
};

const groupedAlerts: Iec62923ListAlert[] = [
  {
    id: 'gyro',
    criticality: 'alarm',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    alertSource: 'Gyroscope',
    alertTitle: 'Gyroscope group',
    timeOfLastStateChange: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'heading',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['gyro'],
    alertSource: 'Gyroscope',
    alertTitle: 'Heading deviation',
    timeOfLastStateChange: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'sensor',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['gyro'],
    alertSource: 'Sensor',
    alertTitle: 'Sensor group, nested under the gyroscope group',
    timeOfLastStateChange: new Date('2024-01-15T14:33:15Z'),
  },
  {
    id: 'drift',
    criticality: 'warning',
    state: 'active-unacknowledged',
    memberOf: ['sensor'],
    alertSource: 'Sensor',
    alertTitle: 'Sensor drift out of range',
    timeOfLastStateChange: new Date('2024-01-15T14:34:15Z'),
  },
  {
    id: 'radar',
    criticality: 'warning',
    state: 'active-unacknowledged',
    alertSource: 'Radar',
    alertTitle: 'Radar group',
    timeOfLastStateChange: new Date('2024-01-15T14:35:15Z'),
  },
  {
    id: 'power',
    criticality: 'caution',
    state: 'active',
    memberOf: ['gyro', 'radar'],
    alertSource: 'Power',
    alertTitle: 'Supply voltage low, a member of both groups',
    timeOfLastStateChange: new Date('2024-01-15T14:36:15Z'),
  },
  {
    id: 'ecdis',
    criticality: 'warning',
    state: 'active-unacknowledged',
    alertSource: 'ECDIS',
    alertTitle: 'Ungrouped alert',
    timeOfLastStateChange: new Date('2024-01-15T14:37:15Z'),
  },
];

export const GroupedAlerts: Story = {
  args: {alerts: groupedAlerts},
  parameters: {
    docs: {
      description: {
        story:
          'Alerts are grouped through `memberOf`, which names the alerts a given alert is a member of. Groups nest, and the supply voltage alert lists two groups so it appears under both. The gyroscope group row is in an acknowledge-not-allowed state, so it shows that glyph instead of an ACK button.',
      },
    },
  },
};

export const SelectedRow: Story = {
  args: {
    alerts: groupedAlerts,
    selectedRowId: 'gyro/sensor',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The consumer owns the selection. Clicking a row sets `selectedRowId` to its row id, and clicking it again sets it back to `undefined`. Collapse the gyroscope group and the group row is highlighted instead of the hidden sensor row. The supply voltage alert has a row under each group, and only the clicked one is highlighted.',
      },
    },
  },
  render: (args) => {
    const toggleSelection = (event: ObcRowClickEvent) => {
      const list = event.currentTarget as ObcAlertListDetailsExperimental;
      list.selectedRowId =
        list.selectedRowId === event.detail.rowId
          ? undefined
          : event.detail.rowId;
    };
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${moveClickedAlertToStateAfterAction<Iec62923ListAlert>(
        iec62923AlertAfterAction
      )}
      @row-click=${toggleSelection}
      .alerts=${args.alerts}
      .columns=${args.columns}
      .selectedRowId=${args.selectedRowId}
      style="height: 100vh; display: block;"
    ></obc-alert-list-details-experimental>`;
  },
};

const alertsInAMembershipCycle: Iec62923ListAlert[] = [
  {
    id: 'standalone',
    criticality: 'warning',
    state: 'active-unacknowledged',
    alertSource: 'ECDIS',
    alertTitle: 'Ungrouped alert, the only natural root',
    timeOfLastStateChange: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'pump-a',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['pump-b'],
    alertSource: 'Pump A',
    alertTitle: 'Recovered as a root: a member of Pump B',
    timeOfLastStateChange: new Date('2024-01-15T14:33:15Z'),
  },
  {
    id: 'pump-b',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['pump-a'],
    alertSource: 'Pump B',
    alertTitle: 'Recovered under Pump A, which it also groups',
    timeOfLastStateChange: new Date('2024-01-15T14:34:15Z'),
  },
];

export const CyclicGrouping: Story = {
  args: {
    alerts: alertsInAMembershipCycle,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regression guard. Three active alerts go in and three are listed. `buildVisibleRows()` seeds its walk from alerts with no in-set `memberOf`, so this membership cycle produces no root of its own; the alerts it cannot reach become roots instead of being dropped, because an alert list must never quietly omit an active alarm. Remove the standalone alert and both alarms still render.',
      },
    },
  },
};

const alertsInACycleWithDescendants: Iec62923ListAlert[] = [
  {
    id: 'reachable-group',
    criticality: 'alarm',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    alertSource: 'Gyroscope',
    alertTitle: 'Reachable group, renders with its whole cycle below it',
    timeOfLastStateChange: new Date('2024-01-15T14:30:15Z'),
  },
  {
    id: 'reachable-child',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['reachable-group', 'reachable-grandchild'],
    alertSource: 'Gyroscope',
    alertTitle: 'Member of the group, and of its own child below',
    timeOfLastStateChange: new Date('2024-01-15T14:31:15Z'),
  },
  {
    id: 'reachable-grandchild',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['reachable-child'],
    alertSource: 'Gyroscope',
    alertTitle: 'Closes the cycle back to its own parent',
    timeOfLastStateChange: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'pump-a',
    criticality: 'warning',
    state: 'active-unacknowledged',
    memberOf: ['pump-b'],
    alertSource: 'Pump A',
    alertTitle: 'Recovered as a root: a member of Pump B',
    timeOfLastStateChange: new Date('2024-01-15T14:33:15Z'),
  },
  {
    id: 'pump-b',
    criticality: 'warning',
    state: 'active-unacknowledged',
    memberOf: ['pump-a'],
    alertSource: 'Pump B',
    alertTitle: 'Recovered under Pump A, which it also groups',
    timeOfLastStateChange: new Date('2024-01-15T14:34:15Z'),
  },
  {
    id: 'pump-sensor',
    criticality: 'caution',
    state: 'active',
    memberOf: ['pump-a'],
    alertSource: 'Pump sensor',
    alertTitle: 'Recovered, and not itself cyclic: a member of Pump A',
    timeOfLastStateChange: new Date('2024-01-15T14:35:15Z'),
  },
];

export const CycleWithDescendants: Story = {
  args: {
    alerts: alertsInACycleWithDescendants,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regression guard for both halves of the cycle handling. The Gyroscope cycle sits under a group with no `memberOf`, so the walk reaches it and the `ancestors` guard prunes only the repeat visit; those three must render once each, not be re-listed at top level by the recovery. The Pump cycle has no root, so it is recovered: Pump A becomes a root, and Pump B and Pump sensor render beneath it. Pump sensor is in no cycle and merely names a member of one, so recovering only cycle members would still lose it.',
      },
    },
  },
};

export const SlottedAckButtons: Story = {
  args: {
    alerts: groupedAlerts,
    columns: [
      statusColumn(),
      {key: 'ack', label: 'ACK-status', slot: true, dividerRight: true},
      timeColumn(),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The ACK column is a slot column. The consumer creates each button, gives it its own `id`, and places it in slot `cell-ack:<rowId>`, with the row ids from `getAlertRows()`. The supply voltage alert is a member of two groups, so it has two rows; it is a caution, which offers no acknowledge action, so neither row gets a button. Clicking ACK looks up every button for that alert in the DOM and disables it.',
      },
    },
  },
  render: (args) => {
    const disableAckButtons = (alert: StandardAlert) => {
      document
        .querySelectorAll<ObcButton>(
          `obc-button[data-alert-id="${CSS.escape(alert.id)}"]`
        )
        .forEach((button) => (button.disabled = true));
    };
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .alerts=${args.alerts}
      .columns=${args.columns}
      style="height: 100vh; display: block;"
    >
      ${getAlertRows(args.alerts)
        .filter(({alert}) =>
          isAlertActionOffered(
            alert,
            ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
          )
        )
        .map(
          (row) =>
            html`<obc-button
              slot=${alertListCellSlotName('ack', row.rowId)}
              id=${`ack-${row.rowId}`}
              data-alert-id=${row.alert.id}
              fullWidth
              @click=${() => disableAckButtons(row.alert)}
              >ACK</obc-button
            >`
        )}
    </obc-alert-list-details-experimental>`;
  },
};

const isa182AlertsInEveryKindOfState: Isa182ListAlert[] = [
  {
    id: 'unacknowledged',
    criticality: 'high',
    state: 'unacknowledged',
    alarmDescription: 'Unacknowledged',
    alarmType: 'High',
    tagName: 'high',
    timeAlarmBecameActive: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'high',
    state: 'acknowledged',
    alarmDescription: 'Acknowledged',
    alarmType: 'High',
    tagName: 'high',
    timeAlarmBecameActive: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'returned-to-normal',
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
    alarmDescription: 'Returned to normal, unacknowledged',
    alarmType: 'High',
    tagName: 'high',
    timeAlarmBecameActive: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'high',
    state: 'normal',
    alarmDescription: 'Normal',
    alarmType: 'High',
    tagName: 'high',
  },
  {
    id: 'shelved',
    criticality: 'medium',
    state: 'shelved-active',
    alarmDescription: 'Shelved, active',
    alarmType: 'Deviation',
    tagName: 'medium',
    timeAlarmWasShelved: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'suppressed',
    criticality: 'critical',
    state: 'suppressed-by-design-not-active',
    alarmDescription: 'Suppressed by design, not active',
    alarmType: 'High-high',
    tagName: 'critical',
    timeAlarmWasSuppressed: new Date('2024-01-15T14:33:00Z'),
  },
  {
    id: 'out-of-service',
    criticality: 'low',
    state: 'out-of-service-active',
    alarmDescription: 'Out of service, active',
    alarmType: 'Low',
    tagName: 'low',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T14:32:00Z'),
  },
];

const ISA_18_2_FILTER_IDS = [
  undefined,
  'unacked',
  'active',
  'shelved',
  'suppressed-by-design',
  'out-of-service',
];

export const FilterModes: Story = {
  name: 'Filters',
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'The same ISA-18.2 alarms, one in each kind of state, without a filter and under each filter the standard declares. A filter lists the alarms whose state is included in it.',
      },
    },
  },
  render: () =>
    html`<style>
        .filters {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 16px;
        }
        .filters obc-alert-list-details-experimental {
          display: block;
          height: 440px;
        }
      </style>
      <div class="filters">
        ${ISA_18_2_FILTER_IDS.map(
          (filterId) =>
            html`<section>
              <h4>${filterId ?? 'no filter'}</h4>
              <obc-alert-list-details-experimental
                aria-label=${`${filterId ?? 'all'} alerts`}
                .filterId=${filterId}
                .alerts=${isa182AlertsInEveryKindOfState}
                .columns=${[statusColumn(), actionColumn()]}
                .showHeader=${false}
                @cell-click=${moveClickedAlertToStateAfterAction<Isa182ListAlert>(
                  (alarm, actionId) => isa182AlertAfterAction(alarm, actionId)
                )}
              ></obc-alert-list-details-experimental>
            </section>`
        )}
      </div>`,
};

const RemoveFromService = 'remove-from-service';
const ReturnToService = 'return-to-service';

const offeringOnly = <State extends AlertStateDefinition>(
  state: State,
  actionId: typeof RemoveFromService | typeof ReturnToService
) => ({...state, offeredActions: [actionId]});

const isa182 = isa182AlertStandard.criticalities;

// TODO(designer): the diagnostic badge has no second frame to flash with, so
// a diagnostic alarm stays steady in every state.
const diagnosticGlyph = {
  frame: html`<obi-diagnostic-badge
    style="color: var(--alert-diagnostic-color)"
  ></obi-diagnostic-badge>`,
};

/**
 * ISA-18.2 as a maintenance console sees it, defined by the application on
 * top of the library's standard. Maintenance takes alarms out of service and
 * returns them, and does not acknowledge or shelve; instrument and system
 * faults get a diagnostic priority below low.
 */
const isa182ServiceViewStandardDefinedByTheApplication = defineAlertStandard({
  filters: isa182AlertStandard.filters,
  display: isa182AlertStandard.display,
  actions: {
    ...isa182AlertStandard.actions,
    [RemoveFromService]: {label: () => 'Disable'},
    [ReturnToService]: {label: () => 'Enable'},
  },
  criticalities: {
    critical: {
      states: {
        unacknowledged: offeringOnly(
          isa182.critical.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.critical.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.critical.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.critical.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.critical.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.critical.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.critical.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.critical.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.critical.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.critical.states.normal, RemoveFromService),
      },
    },
    high: {
      states: {
        unacknowledged: offeringOnly(
          isa182.high.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.high.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.high.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.high.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.high.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.high.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.high.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.high.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.high.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.high.states.normal, RemoveFromService),
      },
    },
    medium: {
      states: {
        unacknowledged: offeringOnly(
          isa182.medium.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.medium.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.medium.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.medium.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.medium.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.medium.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.medium.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.medium.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.medium.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.medium.states.normal, RemoveFromService),
      },
    },
    low: {
      states: {
        unacknowledged: offeringOnly(
          isa182.low.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.low.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.low.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.low.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.low.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.low.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.low.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.low.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.low.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.low.states.normal, RemoveFromService),
      },
    },
    diagnostic: {
      states: {
        unacknowledged: {
          glyph: diagnosticGlyph,
          sortingRank: 33,
          includedInFilters: ['unacked', 'active'],
          offeredActions: [RemoveFromService],
        },
        'returned-to-normal-unacknowledged': {
          glyph: diagnosticGlyph,
          sortingRank: 53,
          includedInFilters: ['unacked'],
          offeredActions: [RemoveFromService],
        },
        acknowledged: {
          glyph: diagnosticGlyph,
          sortingRank: 83,
          includedInFilters: ['active'],
          offeredActions: [RemoveFromService],
        },
        'shelved-active': {
          glyph: diagnosticGlyph,
          sortingRank: 208,
          includedInFilters: ['shelved'],
          offeredActions: [RemoveFromService],
        },
        'shelved-not-active': {
          glyph: diagnosticGlyph,
          sortingRank: 209,
          includedInFilters: ['shelved'],
          offeredActions: [RemoveFromService],
        },
        'suppressed-by-design-active': {
          glyph: diagnosticGlyph,
          sortingRank: 218,
          includedInFilters: ['suppressed-by-design'],
          offeredActions: [RemoveFromService],
        },
        'suppressed-by-design-not-active': {
          glyph: diagnosticGlyph,
          sortingRank: 219,
          includedInFilters: ['suppressed-by-design'],
          offeredActions: [RemoveFromService],
        },
        'out-of-service-active': {
          glyph: diagnosticGlyph,
          sortingRank: 228,
          includedInFilters: ['out-of-service'],
          offeredActions: [ReturnToService],
        },
        'out-of-service-not-active': {
          glyph: diagnosticGlyph,
          sortingRank: 229,
          includedInFilters: ['out-of-service'],
          offeredActions: [ReturnToService],
        },
        normal: {
          glyph: diagnosticGlyph,
          sortingRank: 344,
          offeredActions: [RemoveFromService],
        },
      },
    },
  },
});

const isa182ServiceViewAlerts: Isa182ServiceViewAlert[] = [
  {
    id: 'pressure-transmitter',
    criticality: 'high',
    state: 'unacknowledged',
    alarmDescription: 'Separator pressure high',
    alarmType: 'High',
    tagName: 'PT-101',
    timeAlarmBecameActive: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'level-transmitter',
    criticality: 'medium',
    state: 'acknowledged',
    alarmDescription: 'Tank level high',
    alarmType: 'Deviation',
    tagName: 'LT-204',
    timeAlarmBecameActive: new Date('2024-01-15T14:37:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'flow-transmitter-fault',
    criticality: 'diagnostic',
    state: 'unacknowledged',
    alarmDescription: 'Flow transmitter signal out of range',
    alarmType: 'Bad measurement',
    tagName: 'FT-310',
    timeAlarmBecameActive: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'temperature-transmitter',
    criticality: 'low',
    state: 'out-of-service-not-active',
    alarmDescription: 'Cooling water temperature low, sensor under repair',
    alarmType: 'Low',
    tagName: 'TT-115',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T13:10:00Z'),
  },
  {
    id: 'gas-detector',
    criticality: 'critical',
    state: 'out-of-service-active',
    alarmDescription: 'Gas detector high, under calibration',
    alarmType: 'High-high',
    tagName: 'GD-402',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T12:45:00Z'),
  },
];

export const ServiceView: Story = {
  name: 'Service View - Customized Alert Standard',
  beforeEach: () =>
    setAlertStandard(isa182ServiceViewStandardDefinedByTheApplication),
  parameters: {
    docs: {
      description: {
        story:
          "The library's ISA-18.2 standard extended by the application for a maintenance console. ISA-18.2 puts taking an alarm out of service and returning it under the control of maintenance, so the library offers the operator neither. This story spreads `isa182AlertStandard`, its filters and display fields included, into a standard of its own that offers only Disable (remove from service) and Enable (return to service) in an OOSRV column, and adds a diagnostic priority for instrument and system faults.",
      },
    },
  },
  args: {
    columns: [
      statusColumn(),
      actionColumn({label: 'OOSRV', dividerRight: true}),
      timeColumn(),
    ],
    alerts: isa182ServiceViewAlerts,
  },
  render: (args) =>
    renderAlertList<Isa182ServiceViewAlert>(args, (alarm, actionId) =>
      isa182AlertAfterAction(alarm, actionId, isa182ServiceViewStateAfterAction)
    ),
};

const healthAlarmGlyphFrame = (
  colourToken: string,
  filled: boolean
): TemplateResult =>
  html`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      fill=${filled ? `var(${colourToken})` : 'none'}
      stroke="var(${colourToken})"
      stroke-width="2"
    />
    <path
      d="M12 7v10M7 12h10"
      stroke=${filled ? 'var(--container-background-color)' : `var(${colourToken})`}
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </svg>`;

const flashingHealthAlarmGlyph = (colourToken: string) => ({
  frame: healthAlarmGlyphFrame(colourToken, true),
  flashFrame: healthAlarmGlyphFrame(colourToken, false),
});

const steadyHealthAlarmGlyph = (colourToken: string, filled: boolean) => ({
  frame: healthAlarmGlyphFrame(colourToken, filled),
});

/**
 * IEC 60601-1-8, the alarms of medical equipment, defined by the application
 * and not shipped with the library. An alarm keeps flashing after its sound
 * is silenced, and a latched alarm stays until it is reset.
 */
const iec6060118AlertStandardDefinedByTheApplication = defineAlertStandard({
  filters: {
    present: {
      label: () => 'Present',
      titleWhenNoAlertIsIncluded: () => 'No alarm condition present',
      iconWhenNoAlertIsIncluded: html`<obi-placeholder></obi-placeholder>`,
    },
    latched: {
      label: () => 'Latched',
      titleWhenNoAlertIsIncluded: () => 'No latched alarms',
      iconWhenNoAlertIsIncluded: html`<obi-placeholder></obi-placeholder>`,
    },
  },
  actions: {
    'silence-audio': {label: () => 'Silence'},
    reset: {label: () => 'Reset', canBeAppliedToSeveralAlertsAtOnce: true},
  },
  criticalities: {
    high: {
      states: {
        present: {
          glyph: flashingHealthAlarmGlyph('--alert-alarm-color'),
          sortingRank: 15,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: ['present'],
          offeredActions: ['silence-audio'],
        },
        'present-audio-silenced': {
          glyph: flashingHealthAlarmGlyph('--alert-alarm-color'),
          sortingRank: 16,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: ['present'],
        },
        latched: {
          glyph: steadyHealthAlarmGlyph('--alert-alarm-color', false),
          sortingRank: 150,
          includedInFilters: ['latched'],
          offeredActions: ['reset'],
        },
      },
    },
    medium: {
      states: {
        present: {
          glyph: flashingHealthAlarmGlyph('--alert-warning-color'),
          sortingRank: 35,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: ['present'],
          offeredActions: ['silence-audio'],
        },
        'present-audio-silenced': {
          glyph: flashingHealthAlarmGlyph('--alert-warning-color'),
          sortingRank: 36,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: ['present'],
        },
        latched: {
          glyph: steadyHealthAlarmGlyph('--alert-warning-color', false),
          sortingRank: 151,
          includedInFilters: ['latched'],
          offeredActions: ['reset'],
        },
      },
    },
    low: {
      states: {
        present: {
          glyph: steadyHealthAlarmGlyph('--alert-caution-color', true),
          sortingRank: 105,
          includedInFilters: ['present'],
        },
      },
    },
  },
});

const medicalAlerts: Iec6060118Alert[] = [
  {
    id: 'high-present',
    criticality: 'high',
    state: 'present',
    source: 'Patient monitor',
    text: 'High priority, present',
    tagId: 'HIGH-PRESENT',
    time: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'high-silenced',
    criticality: 'high',
    state: 'present-audio-silenced',
    source: 'Ventilator',
    text: 'High priority, audio silenced',
    tagId: 'HIGH-SILENCED',
    time: new Date('2024-01-15T14:36:00Z'),
  },
  {
    id: 'medium-present',
    criticality: 'medium',
    state: 'present',
    source: 'Infusion pump',
    text: 'Medium priority, present',
    tagId: 'MEDIUM-PRESENT',
    time: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'medium-latched',
    criticality: 'medium',
    state: 'latched',
    source: 'Infusion pump',
    text: 'Medium priority, latched until reset',
    tagId: 'MEDIUM-LATCHED',
    time: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'low-present',
    criticality: 'low',
    state: 'present',
    source: 'Pulse oximeter',
    text: 'Low priority, present',
    tagId: 'LOW-PRESENT',
    time: new Date('2024-01-15T14:33:00Z'),
  },
];

export const CustomStandard: Story = {
  beforeEach: () =>
    setAlertStandard(iec6060118AlertStandardDefinedByTheApplication),
  parameters: {
    docs: {
      description: {
        story:
          'A standard the application defines itself, not shipped with the library: IEC 60601-1-8, the alarms of medical equipment, written in this story file with `defineAlertStandard()` and set with `setAlertStandard()`. Its glyphs, sorting, actions and filters reach the list unchanged. It names no `display`, so the list reads the `text`, `source` and `time` of each alert.',
      },
    },
  },
  args: {
    columns: [statusColumn(), actionColumn({dividerRight: true}), timeColumn()],
    alerts: medicalAlerts,
  },
};

export const NoAlertStandard: Story = {
  beforeEach: () => setAlertStandard(undefined),
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the list shows no alert and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
