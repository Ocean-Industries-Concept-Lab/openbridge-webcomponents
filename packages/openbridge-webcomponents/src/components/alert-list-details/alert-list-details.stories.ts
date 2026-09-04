import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  AlertListMode,
  ObcAckClickEvent,
  ObcAlertListDetails,
} from './alert-list-details.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-caution-color-iec.js';
import '../../icons/icon-alarm-acknowledged-iec.js';

import {html} from 'lit';
import {Alert, AlertType} from '../../types.js';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: ObcAckClickEvent) => {
  const item = e.detail.alert;
  ack(item);
};

const ack = (item: Alert) => {
  item.acknowledged = {
    acknowledgedBy: 'John Doe',
    acknowledgedAt: new Date(),
  };
  item.shelved = false;
  // remove icon from alert-icon slot
  const alertListPageSmall = document.querySelector('obc-alert-list-details')!;
  const alarms = alertListPageSmall.alerts;
  const newAlarms = [...alarms];
  const index = newAlarms.findIndex((alarm) => alarm.id === item.id);
  newAlarms[index] = item;
  alertListPageSmall.alerts = newAlarms;
};

const meta: Meta<typeof ObcAlertListDetails> = {
  title: 'Application Components/Alerts/Alert List Details',
  tags: ['6.0'],
  component: 'obc-alert-list-details',
  args: {
    selectedMode: AlertListMode.ALL,
    showTime: true,
    alerts: [
      {
        id: '1',
        tagId: '1',
        source: 'ECDIS',
        text: 'Risk of collision with vessel MV NORDIC at CPA 0.2nm',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: '2',
        tagId: '2',
        source: 'ECDIS',
        text: 'Vessel has deviated from planned route by 0.5nm',
        acknowledged: {
          acknowledgedBy: 'John Doe',
          acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
        },
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T13:45:22Z'),
        noAck: true,
      },
      {
        id: '3',
        tagId: '3',
        source: 'ME 1',
        text: 'Port main engine load exceeds 95% of MCR',
        acknowledged: {
          acknowledgedBy: 'John Doe',
          acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
        },
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T12:18:47Z'),
      },
      {
        id: '4',
        tagId: '4',
        source: 'ECDIS',
        text: 'Under keel clearance below safety margin: 2.5m',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T11:52:33Z'),
        noAck: true,
      },
      {
        id: '5',
        tagId: '5',
        source: 'Weather',
        text: 'True wind speed 35kts exceeds operational limit',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T10:27:08Z'),
      },
      {
        id: '6',
        tagId: '6',
        source: 'GPS',
        text: 'Position source switched to secondary GPS',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T09:14:55Z'),
      },
      {
        id: '7',
        tagId: '7',
        source: 'ME 1',
        text: 'HFO temperature approaching lower limit: 115°C',
        acknowledged: false,
        active: true,
        type: AlertType.Caution,
        time: new Date('2024-01-15T08:39:42Z'),
      },
    ] as Alert[],
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
  render: (args) => {
    return html` <obc-alert-list-details
      data-testid="alert-menu"
      .selectedMode=${args.selectedMode}
      .showTime=${args.showTime}
      .small=${args.small}
      @ack-click=${handleAck}
      .alerts=${args.alerts}
      style="height: 100vh; display: block; max-height: 100%;"
    >
    </obc-alert-list-details>`;
  },
} satisfies Meta<ObcAlertListDetails>;

export default meta;
type Story = StoryObj<ObcAlertListDetails>;

export const Regular: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    small: true,
  },
};

export const Empty: Story = {
  args: {},
  render: () =>
    html` <obc-alert-list-details
      style="height: 100vh; display: block;"
    ></obc-alert-list-details>`,
};

export const OneItem: Story = {
  args: {
    alerts: [
      {
        id: '1',
        tagId: '1',
        source: 'ME 1',
        text: 'Port main engine temperature exceeds normal operating range',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:32:15Z'),
      },
    ],
  },
  render: (args) => {
    return html` <obc-alert-list-details
      @ack-click=${handleAck}
      .selectedMode=${args.selectedMode}
      .alerts=${args.alerts}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details>`;
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
        acknowledged: false,
        active: true,
        type: AlertType.LevelCritical,
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: 'level-2',
        tagId: 'HIGH-02',
        source: 'ME 1',
        text: 'Main engine overspeed',
        acknowledged: false,
        active: true,
        type: AlertType.LevelHigh,
        time: new Date('2024-01-15T14:30:00Z'),
      },
      {
        id: 'level-3',
        tagId: 'MED-03',
        source: 'Tank 1',
        text: 'Tank level approaching high limit',
        acknowledged: false,
        active: true,
        type: AlertType.LevelMedium,
        time: new Date('2024-01-15T14:28:00Z'),
      },
      {
        id: 'level-4',
        tagId: 'LOW-04',
        source: 'HVAC',
        text: 'Filter maintenance due',
        acknowledged: false,
        active: true,
        type: AlertType.LevelLow,
        time: new Date('2024-01-15T14:25:00Z'),
      },
      {
        id: 'level-5',
        tagId: 'DIAG-05',
        source: 'Network',
        text: 'Redundant link diagnostic message',
        acknowledged: false,
        active: true,
        type: AlertType.LevelDiagnostic,
        time: new Date('2024-01-15T14:20:00Z'),
      },
    ],
  },
  render: (args) => {
    return html` <obc-alert-list-details
      @ack-click=${handleAck}
      .selectedMode=${args.selectedMode}
      .alerts=${args.alerts}
      .showTime=${args.showTime}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details>`;
  },
};

export const GroupedAlerts: Story = {
  args: {
    showTime: true,
    alerts: [
      {
        id: 'gyro',
        tagId: 'GYRO-01',
        source: 'Gyroscope',
        text: 'Gyroscope group',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:32:15Z'),
        noAck: true,
      },
      {
        id: 'heading',
        tagId: 'GYRO-02',
        source: 'Gyroscope',
        text: 'Heading deviation',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:32:15Z'),
        memberOf: ['gyro'],
      },
      {
        id: 'sensor',
        tagId: 'SENS-01',
        source: 'Sensor',
        text: 'Sensor group, nested under the gyroscope group',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:33:15Z'),
        memberOf: ['gyro'],
      },
      {
        id: 'drift',
        tagId: 'SENS-02',
        source: 'Sensor',
        text: 'Sensor drift out of range',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T14:34:15Z'),
        memberOf: ['sensor'],
      },
      {
        id: 'radar',
        tagId: 'RADAR-01',
        source: 'Radar',
        text: 'Radar group',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T14:35:15Z'),
      },
      {
        id: 'power',
        tagId: 'PWR-01',
        source: 'Power',
        text: 'Supply voltage low, a member of both groups',
        acknowledged: false,
        active: true,
        type: AlertType.Caution,
        time: new Date('2024-01-15T14:36:15Z'),
        memberOf: ['gyro', 'radar'],
      },
      {
        id: 'ecdis',
        tagId: 'ECDIS-01',
        source: 'ECDIS',
        text: 'Ungrouped alert',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T14:37:15Z'),
      },
    ] as Alert[],
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
    return html` <obc-alert-list-details
      @ack-click=${handleAck}
      .selectedMode=${args.selectedMode}
      .alerts=${args.alerts}
      .showTime=${args.showTime}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details>`;
  },
};

export const CyclicGrouping: Story = {
  args: {
    showTime: true,
    alerts: [
      {
        id: 'standalone',
        tagId: 'ECDIS-01',
        source: 'ECDIS',
        text: 'Ungrouped alert, the only natural root',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T14:32:15Z'),
      },
      {
        id: 'pump-a',
        tagId: 'PUMP-01',
        source: 'Pump A',
        text: 'Recovered as a root: a member of Pump B',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:33:15Z'),
        memberOf: ['pump-b'],
      },
      {
        id: 'pump-b',
        tagId: 'PUMP-02',
        source: 'Pump B',
        text: 'Recovered under Pump A, which it also groups',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:34:15Z'),
        memberOf: ['pump-a'],
      },
    ] as Alert[],
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
    return html` <obc-alert-list-details
      @ack-click=${handleAck}
      .selectedMode=${args.selectedMode}
      .alerts=${args.alerts}
      .showTime=${args.showTime}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details>`;
  },
};

export const CycleWithDescendants: Story = {
  args: {
    showTime: true,
    alerts: [
      {
        id: 'reachable-group',
        tagId: 'GYRO-01',
        source: 'Gyroscope',
        text: 'Reachable group, renders with its whole cycle below it',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:30:15Z'),
        noAck: true,
      },
      {
        id: 'reachable-child',
        tagId: 'GYRO-02',
        source: 'Gyroscope',
        text: 'Member of the group, and of its own child below',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:31:15Z'),
        memberOf: ['reachable-group', 'reachable-grandchild'],
      },
      {
        id: 'reachable-grandchild',
        tagId: 'GYRO-03',
        source: 'Gyroscope',
        text: 'Closes the cycle back to its own parent',
        acknowledged: false,
        active: true,
        type: AlertType.Alarm,
        time: new Date('2024-01-15T14:32:15Z'),
        memberOf: ['reachable-child'],
      },
      {
        id: 'pump-a',
        tagId: 'PUMP-01',
        source: 'Pump A',
        text: 'Recovered as a root: a member of Pump B',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T14:33:15Z'),
        memberOf: ['pump-b'],
      },
      {
        id: 'pump-b',
        tagId: 'PUMP-02',
        source: 'Pump B',
        text: 'Recovered under Pump A, which it also groups',
        acknowledged: false,
        active: true,
        type: AlertType.Warning,
        time: new Date('2024-01-15T14:34:15Z'),
        memberOf: ['pump-a'],
      },
      {
        id: 'pump-sensor',
        tagId: 'PUMP-03',
        source: 'Pump sensor',
        text: 'Recovered, and not itself cyclic: a member of Pump A',
        acknowledged: false,
        active: true,
        type: AlertType.Caution,
        time: new Date('2024-01-15T14:35:15Z'),
        memberOf: ['pump-a'],
      },
    ] as Alert[],
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
    return html` <obc-alert-list-details
      @ack-click=${handleAck}
      .selectedMode=${args.selectedMode}
      .alerts=${args.alerts}
      .showTime=${args.showTime}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details>`;
  },
};
