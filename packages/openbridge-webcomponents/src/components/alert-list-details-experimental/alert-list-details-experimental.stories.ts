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
} from './alert-list-details-experimental.js';
import type {ObcButton} from '../button/button.js';
import {html} from 'lit';
import {
  alertsInEveryKindOfState,
  applyActionToAlerts,
  drawStoryWithAlertStandard,
  storyAlert,
  type StoryAlert,
} from '../../storybook-util.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {isAlertActionOffered} from '../../alert-system/read-standard-alert.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';

/**
 * Stands in for the application: it applies the clicked action and hands the
 * list the alerts in their new states.
 */
const applyClickedAction = (event: ObcAlertListCellClickEvent) => {
  const {alert, actionId} = event.detail;
  if (actionId === undefined) {
    return;
  }
  const list = event.currentTarget as ObcAlertListDetailsExperimental;
  list.alerts = applyActionToAlerts(
    list.alerts as StoryAlert[],
    new Set([alert.id]),
    actionId
  );
};

const meta: Meta<typeof ObcAlertListDetailsExperimental> = {
  title: 'Application Components/Alerts/Alert List Details Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  beforeEach: drawStoryWithAlertStandard('iec-62923'),
  args: {
    showHeader: true,
    columns: [
      statusColumn(),
      actionColumn({dividerRight: true}),
      timeColumn(),
      tagIdColumn(),
    ],
    alerts: [
      storyAlert(
        {criticality: 'alarm', state: 'active-unacknowledged'},
        '1',
        'Risk of collision with vessel MV NORDIC at CPA 0.2nm',
        '14:32:15',
        {source: 'ECDIS'}
      ),
      storyAlert(
        {criticality: 'warning', state: 'active-acknowledged'},
        '2',
        'Vessel has deviated from planned route by 0.5nm',
        '13:45:22',
        {source: 'ECDIS', acknowledgedBy: 'John Doe'}
      ),
      storyAlert(
        {criticality: 'alarm', state: 'active-acknowledged'},
        '3',
        'Port main engine load exceeds 95% of MCR',
        '12:18:47',
        {source: 'ME 1', acknowledgedBy: 'John Doe'}
      ),
      storyAlert(
        {
          criticality: 'warning',
          state: 'active-unacknowledged-acknowledge-not-allowed',
        },
        '4',
        'Under keel clearance below safety margin: 2.5m',
        '11:52:33',
        {source: 'ECDIS'}
      ),
      storyAlert(
        {criticality: 'warning', state: 'active-unacknowledged'},
        '5',
        'True wind speed 35kts exceeds operational limit',
        '10:27:08',
        {source: 'Weather'}
      ),
      storyAlert(
        {criticality: 'warning', state: 'active-unacknowledged'},
        '6',
        'Position source switched to secondary GPS',
        '09:14:55',
        {source: 'GPS'}
      ),
      storyAlert(
        {criticality: 'caution', state: 'active'},
        '7',
        'HFO temperature approaching lower limit: 115°C',
        '08:39:42',
        {source: 'ME 1'}
      ),
      storyAlert(
        {criticality: 'warning', state: 'active-acknowledged'},
        '8',
        'This alert is acked but has no acknowledgedBy information',
        '13:45:22',
        {source: 'AlertList'}
      ),
    ],
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
    html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .filterId=${args.filterId}
      .columns=${args.columns}
      .showHeader=${args.showHeader}
      .alerts=${args.alerts}
      .selectedRowId=${args.selectedRowId}
      @cell-click=${applyClickedAction}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-details-experimental>`,
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
      storyAlert(
        {criticality: 'alarm', state: 'active-unacknowledged'},
        '1',
        'Port main engine temperature exceeds normal operating range',
        '14:32:15',
        {source: 'ME 1'}
      ),
    ],
  },
};

export const LevelCategories: Story = {
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
  args: {
    alerts: [
      storyAlert(
        {criticality: 'critical', state: 'unacknowledged'},
        'level-1',
        'Emergency shutdown condition detected',
        '14:32:15',
        {source: 'PCS', tagId: 'CRIT-01'}
      ),
      storyAlert(
        {criticality: 'high', state: 'unacknowledged'},
        'level-2',
        'Main engine overspeed',
        '14:30:00',
        {source: 'ME 1', tagId: 'HIGH-02'}
      ),
      storyAlert(
        {criticality: 'medium', state: 'unacknowledged'},
        'level-3',
        'Tank level approaching high limit',
        '14:28:00',
        {source: 'Tank 1', tagId: 'MED-03'}
      ),
      storyAlert(
        {criticality: 'low', state: 'unacknowledged'},
        'level-4',
        'Filter maintenance due',
        '14:25:00',
        {source: 'HVAC', tagId: 'LOW-04'}
      ),
      storyAlert(
        {criticality: 'diagnostic', state: 'active'},
        'level-5',
        'Redundant link diagnostic message',
        '14:20:00',
        {source: 'Network', tagId: 'DIAG-05'}
      ),
    ],
  },
};

const groupedAlerts = (): StoryAlert[] => [
  storyAlert(
    {
      criticality: 'alarm',
      state: 'active-unacknowledged-acknowledge-not-allowed',
    },
    'gyro',
    'Gyroscope group',
    '14:32:15',
    {source: 'Gyroscope', tagId: 'GYRO-01'}
  ),
  storyAlert(
    {criticality: 'alarm', state: 'active-unacknowledged'},
    'heading',
    'Heading deviation',
    '14:32:15',
    {source: 'Gyroscope', tagId: 'GYRO-02', memberOf: ['gyro']}
  ),
  storyAlert(
    {criticality: 'alarm', state: 'active-unacknowledged'},
    'sensor',
    'Sensor group, nested under the gyroscope group',
    '14:33:15',
    {source: 'Sensor', tagId: 'SENS-01', memberOf: ['gyro']}
  ),
  storyAlert(
    {criticality: 'warning', state: 'active-unacknowledged'},
    'drift',
    'Sensor drift out of range',
    '14:34:15',
    {source: 'Sensor', tagId: 'SENS-02', memberOf: ['sensor']}
  ),
  storyAlert(
    {criticality: 'warning', state: 'active-unacknowledged'},
    'radar',
    'Radar group',
    '14:35:15',
    {source: 'Radar', tagId: 'RADAR-01'}
  ),
  storyAlert(
    {criticality: 'caution', state: 'active'},
    'power',
    'Supply voltage low, a member of both groups',
    '14:36:15',
    {source: 'Power', tagId: 'PWR-01', memberOf: ['gyro', 'radar']}
  ),
  storyAlert(
    {criticality: 'warning', state: 'active-unacknowledged'},
    'ecdis',
    'Ungrouped alert',
    '14:37:15',
    {source: 'ECDIS', tagId: 'ECDIS-01'}
  ),
];

export const GroupedAlerts: Story = {
  args: {alerts: groupedAlerts()},
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
    alerts: groupedAlerts(),
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
      @cell-click=${applyClickedAction}
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
      storyAlert(
        {criticality: 'warning', state: 'active-unacknowledged'},
        'standalone',
        'Ungrouped alert, the only natural root',
        '14:32:15',
        {source: 'ECDIS', tagId: 'ECDIS-01'}
      ),
      storyAlert(
        {criticality: 'alarm', state: 'active-unacknowledged'},
        'pump-a',
        'Recovered as a root: a member of Pump B',
        '14:33:15',
        {source: 'Pump A', tagId: 'PUMP-01', memberOf: ['pump-b']}
      ),
      storyAlert(
        {criticality: 'alarm', state: 'active-unacknowledged'},
        'pump-b',
        'Recovered under Pump A, which it also groups',
        '14:34:15',
        {source: 'Pump B', tagId: 'PUMP-02', memberOf: ['pump-a']}
      ),
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
      storyAlert(
        {
          criticality: 'alarm',
          state: 'active-unacknowledged-acknowledge-not-allowed',
        },
        'reachable-group',
        'Reachable group, renders with its whole cycle below it',
        '14:30:15',
        {source: 'Gyroscope', tagId: 'GYRO-01'}
      ),
      storyAlert(
        {criticality: 'alarm', state: 'active-unacknowledged'},
        'reachable-child',
        'Member of the group, and of its own child below',
        '14:31:15',
        {
          source: 'Gyroscope',
          tagId: 'GYRO-02',
          memberOf: ['reachable-group', 'reachable-grandchild'],
        }
      ),
      storyAlert(
        {criticality: 'alarm', state: 'active-unacknowledged'},
        'reachable-grandchild',
        'Closes the cycle back to its own parent',
        '14:32:15',
        {source: 'Gyroscope', tagId: 'GYRO-03', memberOf: ['reachable-child']}
      ),
      storyAlert(
        {criticality: 'warning', state: 'active-unacknowledged'},
        'pump-a',
        'Recovered as a root: a member of Pump B',
        '14:33:15',
        {source: 'Pump A', tagId: 'PUMP-01', memberOf: ['pump-b']}
      ),
      storyAlert(
        {criticality: 'warning', state: 'active-unacknowledged'},
        'pump-b',
        'Recovered under Pump A, which it also groups',
        '14:34:15',
        {source: 'Pump B', tagId: 'PUMP-02', memberOf: ['pump-a']}
      ),
      storyAlert(
        {criticality: 'caution', state: 'active'},
        'pump-sensor',
        'Recovered, and not itself cyclic: a member of Pump A',
        '14:35:15',
        {source: 'Pump sensor', tagId: 'PUMP-03', memberOf: ['pump-a']}
      ),
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
    alerts: groupedAlerts(),
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

const ISA_18_2_FILTER_IDS = [
  undefined,
  'unacked',
  'active',
  'shelved',
  'suppressed-by-design',
  'out-of-service',
];

const isa182AlertsInEveryKindOfState: StandardAlert[] =
  alertsInEveryKindOfState('isa-18.2');

export const FilterModes: Story = {
  name: 'Filters',
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
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
                @cell-click=${applyClickedAction}
              ></obc-alert-list-details-experimental>
            </section>`
        )}
      </div>`,
};

export const CustomStandard: Story = {
  beforeEach: drawStoryWithAlertStandard('iec-60601-1-8'),
  parameters: {
    docs: {
      description: {
        story:
          'IEC 60601-1-8, the alarms of medical equipment, is not part of the library: `storybook-util.ts` defines it with `defineAlertStandard()` and this story sets it with `setAlertStandard()`. Its glyphs, sorting, actions and filters reach the list unchanged.',
      },
    },
  },
  args: {
    columns: [statusColumn(), actionColumn({dividerRight: true}), timeColumn()],
    alerts: [
      storyAlert(
        {criticality: 'high', state: 'present'},
        'high-present',
        'High priority, present',
        '14:37:00',
        {source: 'Patient monitor'}
      ),
      storyAlert(
        {criticality: 'high', state: 'present-audio-silenced'},
        'high-silenced',
        'High priority, audio silenced',
        '14:36:00',
        {source: 'Ventilator'}
      ),
      storyAlert(
        {criticality: 'medium', state: 'present'},
        'medium-present',
        'Medium priority, present',
        '14:35:00',
        {source: 'Infusion pump'}
      ),
      storyAlert(
        {criticality: 'medium', state: 'latched'},
        'medium-latched',
        'Medium priority, latched until reset',
        '14:34:00',
        {source: 'Infusion pump'}
      ),
      storyAlert(
        {criticality: 'low', state: 'present'},
        'low-present',
        'Low priority, present',
        '14:33:00',
        {source: 'Pulse oximeter'}
      ),
    ],
  },
};

export const NoAlertStandard: Story = {
  beforeEach: drawStoryWithAlertStandard(undefined),
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the list shows no alert and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
