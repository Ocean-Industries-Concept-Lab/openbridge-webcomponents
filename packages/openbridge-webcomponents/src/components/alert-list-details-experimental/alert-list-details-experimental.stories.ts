import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAlertListCellClickEvent,
  ObcAlertListDetailsExperimental,
  ObcRowClickEvent,
  ackColumn,
  alertListCellSlotName,
  getAlertRows,
  statusColumn,
  tagIdColumn,
  timeColumn,
} from './alert-list-details-experimental.js';
import type {ObcButton} from '../button/button.js';
import '../alert-icon-experimental/alert-icon-experimental.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-caution-color-iec.js';
import '../../icons/icon-alarm-acknowledged-iec.js';

import {html} from 'lit';
import {AlertFilterMode, canAcknowledge} from '../../alert-filter.js';
import {acknowledgeAlerts, alertsInEveryState} from '../../storybook-util.js';
import {
  AlertCondition,
  AlertSetAside,
} from '../../alert-system/alert-system.js';
import {presentAlert} from '../../alert-system/present-alert.js';
import type {
  StandardAlert,
  StandardAlertFields,
} from '../../alert-system/standard-alert.js';
import {
  MaritimeAlertCriticality as Maritime,
  MaritimeAlertState as MaritimeState,
} from '../../alert-system/maritime-alert-system.js';
import {
  AutomationAlertCriticality as Automation,
  AutomationAlertState as AutomationState,
} from '../../alert-system/automation-alert-system.js';

// Handler for ACK clicks, this is a demo solution for the storybook
// Normally the click is handled by the backend and the component is updated
const handleAck = (e: ObcAlertListCellClickEvent) => {
  if (e.detail.columnKey === 'ack') {
    ack(e.detail.alert);
  }
};

const ack = (item: StandardAlert) => {
  const list = document.querySelector('obc-alert-list-details-experimental')!;
  list.alerts = acknowledgeAlerts(list.alerts, new Set([item.id]));
};

const meta: Meta<typeof ObcAlertListDetailsExperimental> = {
  title: 'Application Components/Alerts/Alert List Details Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  args: {
    filterMode: AlertFilterMode.All,
    showHeader: true,
    columns: [
      statusColumn(),
      ackColumn({dividerRight: true}),
      timeColumn(),
      tagIdColumn(),
    ],
    alerts: [
      {
        id: '1',
        tagId: '1',
        source: 'ECDIS',
        text: 'Risk of collision with vessel MV NORDIC at CPA 0.2nm',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: '2',
        tagId: '2',
        source: 'ECDIS',
        text: 'Vessel has deviated from planned route by 0.5nm',
        acknowledgedBy: 'John Doe',
        acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveAcknowledged,
        time: new Date('2024-01-15T13:45:22Z'),
        noAck: true,
      },
      {
        id: '3',
        tagId: '3',
        source: 'ME 1',
        text: 'Port main engine load exceeds 95% of MCR',
        acknowledgedBy: 'John Doe',
        acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveAcknowledged,
        time: new Date('2024-01-15T12:18:47Z'),
      },
      {
        id: '4',
        tagId: '4',
        source: 'ECDIS',
        text: 'Under keel clearance below safety margin: 2.5m',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T11:52:33Z'),
        noAck: true,
      },
      {
        id: '5',
        tagId: '5',
        source: 'Weather',
        text: 'True wind speed 35kts exceeds operational limit',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T10:27:08Z'),
      },
      {
        id: '6',
        tagId: '6',
        source: 'GPS',
        text: 'Position source switched to secondary GPS',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T09:14:55Z'),
      },
      {
        id: '7',
        tagId: '7',
        source: 'ME 1',
        text: 'HFO temperature approaching lower limit: 115°C',
        standard: 'iec-62923',
        criticality: Maritime.Caution,
        state: MaritimeState.Active,
        time: new Date('2024-01-15T08:39:42Z'),
      },
      {
        id: '8',
        tagId: '8',
        source: 'AlertList',
        text: 'This alert is acked but has no acknowledgedBy information',
        acknowledgedBy: '',
        acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveAcknowledged,
        time: new Date('2024-01-15T13:45:22Z'),
        noAck: true,
      },
    ] as StandardAlert[],
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    columns: {control: false},
    filterMode: {
      control: {type: 'select'},
      options: Object.values(AlertFilterMode),
    },
  },
  render: (args) => {
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      data-testid="alert-menu"
      .filterMode=${args.filterMode}
      .columns=${args.columns}
      .showHeader=${args.showHeader}
      @cell-click=${handleAck}
      .alerts=${args.alerts}
      style="height: 100vh; display: block; max-height: 100%;"
    >
    </obc-alert-list-details-experimental>`;
  },
} satisfies Meta<ObcAlertListDetailsExperimental>;

export default meta;
type Story = StoryObj<ObcAlertListDetailsExperimental>;

export const Regular: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    showHeader: false,
    columns: [
      statusColumn(),
      timeColumn(),
      ackColumn({
        width:
          'var(--app-components-alert-table-row-ack-container-width-small)',
      }),
    ],
  },
};

export const Empty: Story = {
  args: {},
  render: () =>
    html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      style="height: 100vh; display: block;"
    ></obc-alert-list-details-experimental>`,
};

export const OneItem: Story = {
  args: {
    alerts: [
      {
        id: '1',
        tagId: '1',
        source: 'ME 1',
        text: 'Port main engine temperature exceeds normal operating range',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
      },
    ],
  },
  render: (args) => {
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${handleAck}
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details-experimental>`;
  },
};

export const LevelCategories: Story = {
  args: {
    alerts: [
      {
        id: 'level-1',
        tagId: 'CRIT-01',
        source: 'PCS',
        text: 'Emergency shutdown condition detected',
        standard: 'isa-18.2',
        criticality: Automation.Critical,
        state: AutomationState.Unacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: 'level-2',
        tagId: 'HIGH-02',
        source: 'ME 1',
        text: 'Main engine overspeed',
        standard: 'isa-18.2',
        criticality: Automation.High,
        state: AutomationState.Unacknowledged,
        time: new Date('2024-01-15T14:30:00Z'),
      },
      {
        id: 'level-3',
        tagId: 'MED-03',
        source: 'Tank 1',
        text: 'Tank level approaching high limit',
        standard: 'isa-18.2',
        criticality: Automation.Medium,
        state: AutomationState.Unacknowledged,
        time: new Date('2024-01-15T14:28:00Z'),
      },
      {
        id: 'level-4',
        tagId: 'LOW-04',
        source: 'HVAC',
        text: 'Filter maintenance due',
        standard: 'isa-18.2',
        criticality: Automation.Low,
        state: AutomationState.Unacknowledged,
        time: new Date('2024-01-15T14:25:00Z'),
      },
      {
        id: 'level-5',
        tagId: 'DIAG-05',
        source: 'Network',
        text: 'Redundant link diagnostic message',
        standard: 'isa-18.2',
        criticality: Automation.Diagnostic,
        state: AutomationState.Active,
        time: new Date('2024-01-15T14:20:00Z'),
      },
    ],
  },
  render: (args) => {
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${handleAck}
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      .columns=${args.columns}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details-experimental>`;
  },
};

export const GroupedAlerts: Story = {
  args: {
    alerts: [
      {
        id: 'gyro',
        tagId: 'GYRO-01',
        source: 'Gyroscope',
        text: 'Gyroscope group',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
        noAck: true,
      },
      {
        id: 'heading',
        tagId: 'GYRO-02',
        source: 'Gyroscope',
        text: 'Heading deviation',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
        memberOf: ['gyro'],
      },
      {
        id: 'sensor',
        tagId: 'SENS-01',
        source: 'Sensor',
        text: 'Sensor group, nested under the gyroscope group',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:33:15Z'),
        memberOf: ['gyro'],
      },
      {
        id: 'drift',
        tagId: 'SENS-02',
        source: 'Sensor',
        text: 'Sensor drift out of range',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:34:15Z'),
        memberOf: ['sensor'],
      },
      {
        id: 'radar',
        tagId: 'RADAR-01',
        source: 'Radar',
        text: 'Radar group',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:35:15Z'),
      },
      {
        id: 'power',
        tagId: 'PWR-01',
        source: 'Power',
        text: 'Supply voltage low, a member of both groups',
        standard: 'iec-62923',
        criticality: Maritime.Caution,
        state: MaritimeState.Active,
        time: new Date('2024-01-15T14:36:15Z'),
        memberOf: ['gyro', 'radar'],
      },
      {
        id: 'ecdis',
        tagId: 'ECDIS-01',
        source: 'ECDIS',
        text: 'Ungrouped alert',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:37:15Z'),
      },
    ] as StandardAlert[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alerts are grouped through `memberOf`, which names the alerts a given alert is a member of. Groups nest, and `PWR-01` lists two groups so it appears under both. The `GYRO-01` group row sets `noAck`, so it shows no ACK button of its own.',
      },
    },
  },
  render: (args) => {
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${handleAck}
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      .columns=${args.columns}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details-experimental>`;
  },
};

export const SelectedRow: Story = {
  args: {
    alerts: GroupedAlerts.args?.alerts as StandardAlert[],
    selectedRowId: 'gyro/sensor',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The consumer owns the selection. Clicking a row sets `selectedRowId` to its row id, and clicking it again sets it back to `undefined`. Collapse the gyroscope group and the group row is highlighted instead of the hidden sensor row. `PWR-01` has a row under each group, and only the clicked one is highlighted.',
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
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${handleAck}
      @row-click=${toggleSelection}
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      .columns=${args.columns}
      .selectedRowId=${args.selectedRowId}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details-experimental>`;
  },
};

export const CyclicGrouping: Story = {
  args: {
    alerts: [
      {
        id: 'standalone',
        tagId: 'ECDIS-01',
        source: 'ECDIS',
        text: 'Ungrouped alert, the only natural root',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: 'pump-a',
        tagId: 'PUMP-01',
        source: 'Pump A',
        text: 'Recovered as a root: a member of Pump B',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:33:15Z'),
        memberOf: ['pump-b'],
      },
      {
        id: 'pump-b',
        tagId: 'PUMP-02',
        source: 'Pump B',
        text: 'Recovered under Pump A, which it also groups',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:34:15Z'),
        memberOf: ['pump-a'],
      },
    ] as StandardAlert[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regression guard. Three active alerts go in and three are listed. `buildVisibleRows()` seeds its walk from alerts with no in-set `memberOf`, so this membership cycle produces no root of its own; the alerts it cannot reach become roots instead of being dropped, because an alert list must never quietly omit an active alarm. Remove the standalone alert and both alarms still render.',
      },
    },
  },
  render: (args) => {
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${handleAck}
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      .columns=${args.columns}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details-experimental>`;
  },
};

export const CycleWithDescendants: Story = {
  args: {
    alerts: [
      {
        id: 'reachable-group',
        tagId: 'GYRO-01',
        source: 'Gyroscope',
        text: 'Reachable group, renders with its whole cycle below it',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:30:15Z'),
        noAck: true,
      },
      {
        id: 'reachable-child',
        tagId: 'GYRO-02',
        source: 'Gyroscope',
        text: 'Member of the group, and of its own child below',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:31:15Z'),
        memberOf: ['reachable-group', 'reachable-grandchild'],
      },
      {
        id: 'reachable-grandchild',
        tagId: 'GYRO-03',
        source: 'Gyroscope',
        text: 'Closes the cycle back to its own parent',
        standard: 'iec-62923',
        criticality: Maritime.Alarm,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:32:15Z'),
        memberOf: ['reachable-child'],
      },
      {
        id: 'pump-a',
        tagId: 'PUMP-01',
        source: 'Pump A',
        text: 'Recovered as a root: a member of Pump B',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:33:15Z'),
        memberOf: ['pump-b'],
      },
      {
        id: 'pump-b',
        tagId: 'PUMP-02',
        source: 'Pump B',
        text: 'Recovered under Pump A, which it also groups',
        standard: 'iec-62923',
        criticality: Maritime.Warning,
        state: MaritimeState.ActiveUnacknowledged,
        time: new Date('2024-01-15T14:34:15Z'),
        memberOf: ['pump-a'],
      },
      {
        id: 'pump-sensor',
        tagId: 'PUMP-03',
        source: 'Pump sensor',
        text: 'Recovered, and not itself cyclic: a member of Pump A',
        standard: 'iec-62923',
        criticality: Maritime.Caution,
        state: MaritimeState.Active,
        time: new Date('2024-01-15T14:35:15Z'),
        memberOf: ['pump-a'],
      },
    ] as StandardAlert[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regression guard for both halves of the cycle handling. The Gyroscope cycle sits under a group with no `memberOf`, so the walk reaches it and the `ancestors` guard prunes only the repeat visit; those three must render once each, not be re-listed at top level by the recovery. The Pump cycle has no root, so it is recovered: Pump A becomes a root, and Pump B and Pump sensor render beneath it. Pump sensor is in no cycle and merely names a member of one, so recovering only cycle members would still lose it.',
      },
    },
  },
  render: (args) => {
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${handleAck}
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      .columns=${args.columns}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details-experimental>`;
  },
};

export const SlottedAckButtons: Story = {
  args: {
    alerts: GroupedAlerts.args?.alerts as StandardAlert[],
    columns: [
      statusColumn(),
      {key: 'ack', label: 'ACK-status', slot: true, dividerRight: true},
      timeColumn(),
      tagIdColumn(),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The ACK column is a slot column. The consumer creates each button, gives it its own `id`, and places it in slot `cell-ack:<rowId>`, with the row ids from `getAlertRows()`. `PWR-01` is a member of two groups, so it has two rows and two buttons. Clicking ACK looks up every button for that alert in the DOM and disables it.',
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
    return html` <obc-alert-list-details-experimental
      aria-label="Alerts"
      .filterMode=${args.filterMode}
      .alerts=${args.alerts}
      .columns=${args.columns}
      style="height: 100vh; display: block;"
    >
      ${getAlertRows(args.alerts, args.filterMode)
        .filter(({alert}) => canAcknowledge(alert))
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

export const FilterModes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The same alerts, one in each state, in every filter mode. `active` and `unacked` leave shelved and blocked alerts out; `unacked` keeps an alert whose condition has cleared until it is acked. The `custom` list here shows the alerts whose condition has cleared.',
      },
    },
  },
  render: () =>
    html`<style>
        .filter-modes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 16px;
        }
        .filter-modes obc-alert-list-details-experimental {
          display: block;
          height: 440px;
        }
      </style>
      <div class="filter-modes">
        ${Object.values(AlertFilterMode).map(
          (mode) =>
            html`<section>
              <h4>${mode}</h4>
              <obc-alert-list-details-experimental
                aria-label=${`${mode} alerts`}
                .filterMode=${mode}
                .customFilter=${(alert: StandardAlert) =>
                  presentAlert(alert).condition !== AlertCondition.Active}
                .alerts=${alertsInEveryState()}
                .columns=${[statusColumn(), ackColumn()]}
                .showHeader=${false}
                @cell-click=${handleAck}
              ></obc-alert-list-details-experimental>
            </section>`
        )}
      </div>`,
};

const standardAlert = (
  alert: Pick<StandardAlert, 'standard' | 'criticality' | 'state'>,
  id: string,
  source: string,
  text: string,
  minute: number,
  fields: Partial<StandardAlertFields> = {}
): StandardAlert =>
  ({
    ...alert,
    id,
    tagId: id.toUpperCase(),
    source,
    text,
    time: new Date(`2024-01-15T14:${String(minute).padStart(2, '0')}:00Z`),
    ...fields,
  }) as StandardAlert;

export const AlertSystems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Alerts of two standards in one list, each by its own `standard`, `criticality` and `state`, sorted by the rank each standard gives them.',
      },
    },
  },
  args: {
    alerts: [
      standardAlert(
        {
          standard: 'iec-62923',
          criticality: Maritime.EmergencyAlarm,
          state: MaritimeState.Active,
        },
        'm-1',
        'ECDIS',
        'Emergency alarm',
        30
      ),
      standardAlert(
        {
          standard: 'iec-62923',
          criticality: Maritime.Alarm,
          state: MaritimeState.ActiveSilenced,
        },
        'm-2',
        'Radar',
        'Alarm, silenced',
        31
      ),
      standardAlert(
        {
          standard: 'iec-62923',
          criticality: Maritime.Warning,
          state: MaritimeState.ActiveResponsibilityTransferred,
        },
        'm-3',
        'Gyro',
        'Warning, handed over',
        32
      ),
      standardAlert(
        {
          standard: 'iec-62923',
          criticality: Maritime.Alarm,
          state: MaritimeState.ActiveAcknowledged,
        },
        'm-4',
        'Steering',
        'Alarm, acknowledged',
        29,
        {acknowledgedBy: 'John Doe'}
      ),
      standardAlert(
        {
          standard: 'isa-18.2',
          criticality: Automation.Critical,
          state: AutomationState.Unacknowledged,
        },
        'a-1',
        'Pump A',
        'Critical, unacknowledged',
        33
      ),
      standardAlert(
        {
          standard: 'isa-18.2',
          criticality: Automation.High,
          state: AutomationState.LatchedUnacknowledged,
        },
        'a-2',
        'Tank 3',
        'High, latched until reset',
        34
      ),
      standardAlert(
        {
          standard: 'isa-18.2',
          criticality: Automation.Medium,
          state: AutomationState.Unacknowledged,
        },
        'a-3',
        'Valve 7',
        'Medium, suppressed by design',
        35,
        {setAside: AlertSetAside.Suppressed}
      ),
      standardAlert(
        {
          standard: 'isa-18.2',
          criticality: Automation.Low,
          state: AutomationState.Unacknowledged,
        },
        'a-4',
        'Filter',
        'Low, unacknowledged',
        36
      ),
    ],
  },
};
