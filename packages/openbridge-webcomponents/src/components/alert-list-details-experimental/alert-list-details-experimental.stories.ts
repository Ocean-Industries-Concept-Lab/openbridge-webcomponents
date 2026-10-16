import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAlertListCellClickEvent,
  ObcAlertListDetailsExperimental,
  ObcRowClickEvent,
  actionColumn,
  alertListCellSlotName,
  getAlertRows,
  statusColumn,
  tagIdColumn,
  timeColumn,
  type StandardAlertWithColumnFields,
} from './alert-list-details-experimental.js';
import type {ObcButton} from '../button/button.js';
import {html, type TemplateResult} from 'lit';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {defineAlertStandard} from '../../alert-system/alert-standard.js';
import {FlashingSpeed} from '../../types.js';
import '../../icons/icon-placeholder.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';
import {isAlertActionOffered} from '../../alert-system/read-standard-alert.js';
import type {
  StandardAlert,
  StandardAlertOf,
} from '../../alert-system/standard-alert.js';
import {
  iec62923StateAfterAction,
  isa182StateAfterAction,
} from '../../alert-system/stories/state-after-action.js';

type Iec62923Alert = StandardAlertOf<typeof iec62923AlertStandard> &
  StandardAlertWithColumnFields;
type Isa182Alert = StandardAlertOf<typeof isa182AlertStandard> &
  StandardAlertWithColumnFields;
type Iec6060118Alert = StandardAlertOf<
  typeof iec6060118AlertStandardDefinedByTheApplication
> &
  StandardAlertWithColumnFields;

/** Your application moves the alert to its next state and hands the list the result. */
function moveClickedAlertToStateAfterAction(
  stateAfterAction: (state: string, actionId: string) => string
) {
  return (event: ObcAlertListCellClickEvent) => {
    const {alert: clickedAlert, actionId} = event.detail;
    if (actionId === undefined) {
      return;
    }
    const list = event.currentTarget as ObcAlertListDetailsExperimental;
    list.alerts = (list.alerts as StandardAlertWithColumnFields[]).map(
      (alert) =>
        alert.id === clickedAlert.id
          ? {
              ...alert,
              state: stateAfterAction(alert.state, actionId),
              acknowledgedBy: 'John Doe',
            }
          : alert
    );
  };
}

function renderAlertList(
  args: ObcAlertListDetailsExperimental,
  stateAfterAction: (state: string, actionId: string) => string
) {
  return html`<obc-alert-list-details-experimental
    aria-label="Alerts"
    .filterId=${args.filterId}
    .columns=${args.columns}
    .showHeader=${args.showHeader}
    .alerts=${args.alerts}
    .selectedRowId=${args.selectedRowId}
    @cell-click=${moveClickedAlertToStateAfterAction(stateAfterAction)}
    style="height: 100vh; display: block; max-height: 100%;"
  ></obc-alert-list-details-experimental>`;
}

const bridgeAlerts: Iec62923Alert[] = [
  {
    id: '1',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    source: 'ECDIS',
    text: 'Risk of collision with vessel MV NORDIC at CPA 0.2nm',
    tagId: '1',
    time: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: '2',
    criticality: 'warning',
    state: 'active-acknowledged',
    source: 'ECDIS',
    text: 'Vessel has deviated from planned route by 0.5nm',
    tagId: '2',
    time: new Date('2024-01-15T13:45:22Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: '3',
    criticality: 'alarm',
    state: 'active-acknowledged',
    source: 'ME 1',
    text: 'Port main engine load exceeds 95% of MCR',
    tagId: '3',
    time: new Date('2024-01-15T12:18:47Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: '4',
    criticality: 'warning',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    source: 'ECDIS',
    text: 'Under keel clearance below safety margin: 2.5m',
    tagId: '4',
    time: new Date('2024-01-15T11:52:33Z'),
  },
  {
    id: '5',
    criticality: 'warning',
    state: 'active-unacknowledged',
    source: 'Weather',
    text: 'True wind speed 35kts exceeds operational limit',
    tagId: '5',
    time: new Date('2024-01-15T10:27:08Z'),
  },
  {
    id: '6',
    criticality: 'warning',
    state: 'active-unacknowledged',
    source: 'GPS',
    text: 'Position source switched to secondary GPS',
    tagId: '6',
    time: new Date('2024-01-15T09:14:55Z'),
  },
  {
    id: '7',
    criticality: 'caution',
    state: 'active',
    source: 'ME 1',
    text: 'HFO temperature approaching lower limit: 115°C',
    tagId: '7',
    time: new Date('2024-01-15T08:39:42Z'),
  },
  {
    id: '8',
    criticality: 'warning',
    state: 'active-acknowledged',
    source: 'AlertList',
    text: 'This alert is acked but has no acknowledgedBy information',
    tagId: '8',
    time: new Date('2024-01-15T13:45:22Z'),
  },
];

const meta: Meta<typeof ObcAlertListDetailsExperimental> = {
  title: 'Application Components/Alerts/Alert List Details Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  beforeEach: () => setAlertStandard(iec62923AlertStandard),
  args: {
    showHeader: true,
    columns: [
      statusColumn(),
      actionColumn({dividerRight: true}),
      timeColumn(),
      tagIdColumn(),
    ],
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
  render: (args) => renderAlertList(args, iec62923StateAfterAction),
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

export const OneItem: Story = {
  args: {
    columns: [
      statusColumn(),
      actionColumn({dividerRight: true}),
      tagIdColumn(),
    ],
    alerts: [
      {
        id: '1',
        criticality: 'alarm',
        state: 'active-unacknowledged',
        source: 'ME 1',
        text: 'Port main engine temperature exceeds normal operating range',
        tagId: '1',
        time: new Date('2024-01-15T14:32:15Z'),
      },
    ],
  },
};

const isa182AlertsOfEveryPriority: Isa182Alert[] = [
  {
    id: 'level-1',
    criticality: 'critical',
    state: 'unacknowledged',
    source: 'PCS',
    text: 'Emergency shutdown condition detected',
    tagId: 'CRIT-01',
    time: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'level-2',
    criticality: 'high',
    state: 'unacknowledged',
    source: 'ME 1',
    text: 'Main engine overspeed',
    tagId: 'HIGH-02',
    time: new Date('2024-01-15T14:30:00Z'),
  },
  {
    id: 'level-3',
    criticality: 'medium',
    state: 'unacknowledged',
    source: 'Tank 1',
    text: 'Tank level approaching high limit',
    tagId: 'MED-03',
    time: new Date('2024-01-15T14:28:00Z'),
  },
  {
    id: 'level-4',
    criticality: 'low',
    state: 'unacknowledged',
    source: 'HVAC',
    text: 'Filter maintenance due',
    tagId: 'LOW-04',
    time: new Date('2024-01-15T14:25:00Z'),
  },
  {
    id: 'level-5',
    criticality: 'diagnostic',
    state: 'active',
    source: 'Network',
    text: 'Redundant link diagnostic message',
    tagId: 'DIAG-05',
    time: new Date('2024-01-15T14:20:00Z'),
  },
];

export const LevelCategories: Story = {
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  args: {alerts: isa182AlertsOfEveryPriority},
  render: (args) => renderAlertList(args, isa182StateAfterAction),
};

const groupedAlerts: Iec62923Alert[] = [
  {
    id: 'gyro',
    criticality: 'alarm',
    state: 'active-unacknowledged-acknowledge-not-allowed',
    source: 'Gyroscope',
    text: 'Gyroscope group',
    tagId: 'GYRO-01',
    time: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'heading',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['gyro'],
    source: 'Gyroscope',
    text: 'Heading deviation',
    tagId: 'GYRO-02',
    time: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'sensor',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    memberOf: ['gyro'],
    source: 'Sensor',
    text: 'Sensor group, nested under the gyroscope group',
    tagId: 'SENS-01',
    time: new Date('2024-01-15T14:33:15Z'),
  },
  {
    id: 'drift',
    criticality: 'warning',
    state: 'active-unacknowledged',
    memberOf: ['sensor'],
    source: 'Sensor',
    text: 'Sensor drift out of range',
    tagId: 'SENS-02',
    time: new Date('2024-01-15T14:34:15Z'),
  },
  {
    id: 'radar',
    criticality: 'warning',
    state: 'active-unacknowledged',
    source: 'Radar',
    text: 'Radar group',
    tagId: 'RADAR-01',
    time: new Date('2024-01-15T14:35:15Z'),
  },
  {
    id: 'power',
    criticality: 'caution',
    state: 'active',
    memberOf: ['gyro', 'radar'],
    source: 'Power',
    text: 'Supply voltage low, a member of both groups',
    tagId: 'PWR-01',
    time: new Date('2024-01-15T14:36:15Z'),
  },
  {
    id: 'ecdis',
    criticality: 'warning',
    state: 'active-unacknowledged',
    source: 'ECDIS',
    text: 'Ungrouped alert',
    tagId: 'ECDIS-01',
    time: new Date('2024-01-15T14:37:15Z'),
  },
];

export const GroupedAlerts: Story = {
  args: {alerts: groupedAlerts},
  parameters: {
    docs: {
      description: {
        story:
          'Alerts are grouped through `memberOf`, which names the alerts a given alert is a member of. Groups nest, and `PWR-01` lists two groups so it appears under both. The `GYRO-01` group row is in an acknowledge-not-allowed state, so it shows that glyph instead of an ACK button.',
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
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      @cell-click=${moveClickedAlertToStateAfterAction(
        iec62923StateAfterAction
      )}
      @row-click=${toggleSelection}
      .alerts=${args.alerts}
      .columns=${args.columns}
      .selectedRowId=${args.selectedRowId}
      style="height: 100vh; display: block;"
    ></obc-alert-list-details-experimental>`;
  },
};

export const CyclicGrouping: Story = {
  args: {
    alerts: [
      {
        id: 'standalone',
        criticality: 'warning',
        state: 'active-unacknowledged',
        source: 'ECDIS',
        text: 'Ungrouped alert, the only natural root',
        tagId: 'ECDIS-01',
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: 'pump-a',
        criticality: 'alarm',
        state: 'active-unacknowledged',
        memberOf: ['pump-b'],
        source: 'Pump A',
        text: 'Recovered as a root: a member of Pump B',
        tagId: 'PUMP-01',
        time: new Date('2024-01-15T14:33:15Z'),
      },
      {
        id: 'pump-b',
        criticality: 'alarm',
        state: 'active-unacknowledged',
        memberOf: ['pump-a'],
        source: 'Pump B',
        text: 'Recovered under Pump A, which it also groups',
        tagId: 'PUMP-02',
        time: new Date('2024-01-15T14:34:15Z'),
      },
    ],
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

export const CycleWithDescendants: Story = {
  args: {
    alerts: [
      {
        id: 'reachable-group',
        criticality: 'alarm',
        state: 'active-unacknowledged-acknowledge-not-allowed',
        source: 'Gyroscope',
        text: 'Reachable group, renders with its whole cycle below it',
        tagId: 'GYRO-01',
        time: new Date('2024-01-15T14:30:15Z'),
      },
      {
        id: 'reachable-child',
        criticality: 'alarm',
        state: 'active-unacknowledged',
        memberOf: ['reachable-group', 'reachable-grandchild'],
        source: 'Gyroscope',
        text: 'Member of the group, and of its own child below',
        tagId: 'GYRO-02',
        time: new Date('2024-01-15T14:31:15Z'),
      },
      {
        id: 'reachable-grandchild',
        criticality: 'alarm',
        state: 'active-unacknowledged',
        memberOf: ['reachable-child'],
        source: 'Gyroscope',
        text: 'Closes the cycle back to its own parent',
        tagId: 'GYRO-03',
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: 'pump-a',
        criticality: 'warning',
        state: 'active-unacknowledged',
        memberOf: ['pump-b'],
        source: 'Pump A',
        text: 'Recovered as a root: a member of Pump B',
        tagId: 'PUMP-01',
        time: new Date('2024-01-15T14:33:15Z'),
      },
      {
        id: 'pump-b',
        criticality: 'warning',
        state: 'active-unacknowledged',
        memberOf: ['pump-a'],
        source: 'Pump B',
        text: 'Recovered under Pump A, which it also groups',
        tagId: 'PUMP-02',
        time: new Date('2024-01-15T14:34:15Z'),
      },
      {
        id: 'pump-sensor',
        criticality: 'caution',
        state: 'active',
        memberOf: ['pump-a'],
        source: 'Pump sensor',
        text: 'Recovered, and not itself cyclic: a member of Pump A',
        tagId: 'PUMP-03',
        time: new Date('2024-01-15T14:35:15Z'),
      },
    ],
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
      tagIdColumn(),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The ACK column is a slot column. The consumer creates each button, gives it its own `id`, and places it in slot `cell-ack:<rowId>`, with the row ids from `getAlertRows()`. `PWR-01` is a member of two groups, so it has two rows; it is a caution, which offers no acknowledge action, so neither row gets a button. Clicking ACK looks up every button for that alert in the DOM and disables it.',
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

const isa182AlertsInEveryKindOfState: Isa182Alert[] = [
  {
    id: 'unacknowledged',
    criticality: 'high',
    state: 'unacknowledged',
    source: 'high',
    text: 'Unacknowledged',
    tagId: 'UNACKNOWLEDGED',
    time: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'high',
    state: 'acknowledged',
    source: 'high',
    text: 'Acknowledged',
    tagId: 'ACKNOWLEDGED',
    time: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'returned-to-normal',
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
    source: 'high',
    text: 'Returned to normal, unacknowledged',
    tagId: 'RETURNED-TO-NORMAL',
    time: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'high',
    state: 'normal',
    source: 'high',
    text: 'Normal',
    tagId: 'NORMAL',
    time: new Date('2024-01-15T14:36:00Z'),
  },
  {
    id: 'diagnostic',
    criticality: 'diagnostic',
    state: 'active',
    source: 'diagnostic',
    text: 'Diagnostic, takes no ACK',
    tagId: 'DIAGNOSTIC',
    time: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'shelved',
    criticality: 'medium',
    state: 'shelved',
    source: 'medium',
    text: 'Shelved',
    tagId: 'SHELVED',
    time: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'suppressed',
    criticality: 'critical',
    state: 'suppressed-by-design',
    source: 'critical',
    text: 'Suppressed by design',
    tagId: 'SUPPRESSED',
    time: new Date('2024-01-15T14:33:00Z'),
  },
  {
    id: 'out-of-service',
    criticality: 'low',
    state: 'out-of-service',
    source: 'low',
    text: 'Out of service',
    tagId: 'OUT-OF-SERVICE',
    time: new Date('2024-01-15T14:32:00Z'),
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
                @cell-click=${moveClickedAlertToStateAfterAction(
                  isa182StateAfterAction
                )}
              ></obc-alert-list-details-experimental>
            </section>`
        )}
      </div>`,
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
          'A standard the application defines itself, not shipped with the library: IEC 60601-1-8, the alarms of medical equipment, written in this story file with `defineAlertStandard()` and set with `setAlertStandard()`. Its glyphs, sorting, actions and filters reach the list unchanged.',
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
