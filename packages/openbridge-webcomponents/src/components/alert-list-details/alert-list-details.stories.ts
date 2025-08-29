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
import {Alarm, AlarmStatus} from '../../types.js';
import {AlertType} from '../../types.js';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: ObcAckClickEvent) => {
  const item = e.detail.alarm;
  ack(item);
};

const ack = (item: Alarm) => {
  item.status = AlarmStatus.Acknowledged;
  item.shelved = false;
  // remove icon from alert-icon slot
  const alertListPageSmall = document.querySelector('obc-alert-list-details')!;
  const alarms = alertListPageSmall.alarms;
  const newAlarms = [...alarms];
  const index = newAlarms.findIndex((alarm) => alarm.id === item.id);
  newAlarms[index] = item;
  alertListPageSmall.alarms = newAlarms;
};

const meta: Meta<typeof ObcAlertListDetails> = {
  title: 'Application Components/Alerts/Alert list details',
  tags: ['6.0'],
  component: 'obc-alert-list-details',
  args: {
    selectedMode: AlertListMode.ALL,
    showTime: true,
    alarms: [
      {
        id: '1',
        title: 'CPA/TCPA Alert',
        description: 'Risk of collision with vessel MV NORDIC at CPA 0.2nm',
        status: AlarmStatus.Unacknowledged,
        type: AlertType.Alarm,
        time: '2024-01-15T14:32:15Z',
      },
      {
        id: '2',
        title: 'Off Track Deviation',
        description: 'Vessel has deviated from planned route by 0.5nm',
        status: AlarmStatus.Acknowledged,
        type: AlertType.Warning,
        time: '2024-01-15T13:45:22Z',
        noAck: true,
      },
      {
        id: '3',
        title: 'Main Engine Overload',
        description: 'Port main engine load exceeds 95% of MCR',
        status: AlarmStatus.Acknowledged,
        type: AlertType.Alarm,
        time: '2024-01-15T12:18:47Z',
      },
      {
        id: '4',
        title: 'Depth Below Keel',
        description: 'Under keel clearance below safety margin: 2.5m',
        status: AlarmStatus.Unacknowledged,
        type: AlertType.Warning,
        time: '2024-01-15T11:52:33Z',
        noAck: true,
      },
      {
        id: '5',
        title: 'Wind Speed High',
        description: 'True wind speed 35kts exceeds operational limit',
        status: AlarmStatus.Unacknowledged,
        type: AlertType.Warning,
        time: '2024-01-15T10:27:08Z',
      },
      {
        id: '6',
        title: 'ECDIS Primary GPS Lost',
        description: 'Position source switched to secondary GPS',
        status: AlarmStatus.Unacknowledged,
        type: AlertType.Warning,
        time: '2024-01-15T09:14:55Z',
      },
      {
        id: '7',
        title: 'Fuel Oil Temperature',
        description: 'HFO temperature approaching lower limit: 115°C',
        status: AlarmStatus.Unacknowledged,
        type: AlertType.Caution,
        time: '2024-01-15T08:39:42Z',
      },
    ],
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
      .alarms=${args.alarms}
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
  render: (args) => {
    return html` <obc-alert-list-details
      @ack-click=${handleAck}
      .selectedMode=${args.selectedMode}
      .alarms=${[
        {
          id: '1',
          title: 'Engine Temperature High',
          description:
            'Port main engine temperature exceeds normal operating range',
          status: AlarmStatus.Unacknowledged,
          type: AlertType.Alarm,
          time: '2024-01-15T14:32:15Z',
        },
      ]}
      style="height: 100vh; display: block;"
    >
    </obc-alert-list-details>`;
  },
};
