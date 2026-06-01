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
