import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAlertListDetailsExperimental,
  ObcRowClickEvent,
  actionColumn,
  alertListCellSlotName,
  getAlertRows,
  statusColumn,
  timeColumn,
  type AlertAcknowledgedByField,
} from './alert-list-details-experimental.js';
import type {ObcButton} from '../button/button.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {
  iec62923AlertStandard,
  type Iec62923Alert,
} from '../../alert-system/iec-62923-alert-standard.js';
import {isAlertActionOffered} from '../../alert-system/read-standard-alert.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {
  iec62923AlertAfterAction,
  moveClickedAlertToStateAfterAction,
} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

type Iec62923ListAlert = Iec62923Alert & AlertAcknowledgedByField;

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

const meta: Meta<ObcAlertListDetailsExperimental> = {
  title:
    'Application Components/Alerts/Alert List Details Experimental/IEC 62923',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  args: {
    showHeader: true,
    columns: [
      statusColumn(),
      actionColumn({label: 'ACK-status', dividerRight: true}),
      timeColumn(),
    ],
    alerts: bridgeAlerts,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListDetailsExperimental'),
          'iec62923AlertStandard'
        ),
      },
    },
  },
  argTypes: {
    columns: {control: false},
    filterId: {
      control: {type: 'select'},
      options: [undefined, 'unacked', 'active'],
    },
  },
  render: (args) => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .filterId=${args.filterId}
      .columns=${args.columns}
      .showHeader=${args.showHeader}
      .alerts=${args.alerts}
      .selectedRowId=${args.selectedRowId}
      @cell-click=${moveClickedAlertToStateAfterAction<Iec62923ListAlert>(
        iec62923AlertAfterAction
      )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-details-experimental>`;
  },
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
  render: () => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      style="height: 100vh; display: block;"
    ></obc-alert-list-details-experimental>`;
  },
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
    columns: [
      statusColumn(),
      actionColumn({label: 'ACK-status', dividerRight: true}),
    ],
    alerts: oneItemAlerts,
  },
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
    setAlertStandard(iec62923AlertStandard);
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
    setAlertStandard(iec62923AlertStandard);
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
