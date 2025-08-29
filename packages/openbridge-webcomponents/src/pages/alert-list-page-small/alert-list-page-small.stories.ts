import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAlertListPageAckAllClickEvent,
  AlertListMode,
  ObcAlertListPageSmall,
  ObcAckClickEvent,
} from './alert-list-page-small.js';
import './alert-list-page-small.js';
import '../../components/alert-icon/alert-icon.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-caution-color-iec.js';
import '../../icons/icon-alarm-acknowledged-iec.js';

import {html} from 'lit';
import {userEvent, within} from 'storybook/test';
import {expect} from 'storybook/test';
import {Alarm, AlarmStatus} from '../../types.js';
import {AlertType} from '../../types.js';
import {ObcTable, ObcTableRow} from '../../components/table/table.js';
import { ObcAlertListDetails } from '../../components/alert-list-details/alert-list-details.js';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: ObcAckClickEvent) => {
  const item = e.detail.alarm;
  ack(item);
};

const ack = (item: Alarm) => {
  console.log('ack', item);
  item.status = AlarmStatus.Acknowledged;
  item.shelved = false;
  // remove icon from alert-icon slot
  const alertListPageSmall = document.querySelector(
    'obc-alert-list-page-small'
  ) as ObcAlertListPageSmall;
  const alarms = alertListPageSmall.alarms;
  const newAlarms = [...alarms];
  const index = newAlarms.findIndex((alarm) => alarm.id === item.id);
  newAlarms[index] = item;
  alertListPageSmall.alarms = newAlarms;
};

const handleAckAllVisible = (e: ObcAlertListPageAckAllClickEvent) => {
  console.log('ack all visible', e.detail.alarms);
  for (const item of e.detail.alarms) {
    if (item.status === AlarmStatus.Unacknowledged) {
      ack(item);
    }
  }
};

const handleSilence = (e: CustomEvent) => {
  console.log('silence', e);
};

const meta: Meta<typeof ObcAlertListPageSmall> = {
  title: 'Pages/Alert list small',
  tags: ['6.0'],
  component: 'obc-alert-list-page-small',
  args: {
    hasShelved: true,
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
    return html` <obc-alert-list-page-small
      data-testid="alert-menu"
      .hasShelved=${args.hasShelved}
      .selectedMode=${args.selectedMode}
      .showTime=${args.showTime}
      @ack-all-visible-click=${handleAckAllVisible}
      @silence-click=${handleSilence}
      @ack-click=${handleAck}
      .alarms=${args.alarms}
      style="height: 100vh; display: block; max-height: 100%;"
    >
    </obc-alert-list-page-small>`;
  },
} satisfies Meta<ObcAlertListPageSmall>;

export default meta;
type Story = StoryObj<ObcAlertListPageSmall>;

export const Regular: Story = {
  args: {},
};

export const Empty: Story = {
  args: {},
  render: () =>
    html` <obc-alert-list-page-small
      hasShelved
      style="height: 100vh; display: block;"
    ></obc-alert-list-page-small>`,
};

export const OneItem: Story = {
  render: (args) => {
    return html` <obc-alert-list-page-small
      @ack-all-visible-click=${handleAckAllVisible}
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
    </obc-alert-list-page-small>`;
  },
};

export const NoShelf: Story = {
  args: {
    hasShelved: false,
  },
};

export const AcknowledgmentTest: Story = {
  tags: ['skip-snapshot'],
  args: {
    hasShelved: true,
    selectedMode: AlertListMode.UNACKED,
  },
  play: async ({canvasElement}) => {
    const alertListPageSmall = canvasElement.querySelector(
      'obc-alert-list-page-small'
    ) as ObcAlertListPageSmall;
    const alertListDetails = alertListPageSmall.shadowRoot?.querySelector(
      'obc-alert-list-details'
    ) as ObcAlertListDetails;
    const table = alertListDetails.shadowRoot?.querySelector(
      'obc-table'
    ) as ObcTable;
    // Find the alert item by ID
    const alertItem = table.shadowRoot!.querySelector(
      '[data-row-id="1"]'
    ) as HTMLDivElement;

    // Find the ACK button within shadow DOM
    const ackButton = alertItem.querySelector('obc-button');
    if (!ackButton) {
      throw new Error('ACK button not found in shadow DOM');
    }

    // Click the ACK button
    await userEvent.click(ackButton);

    // Verify the item is hidden
    await expect(alertItem).not.toBeVisible();
  },
};

export const AckAllTest: Story = {
  tags: ['skip-snapshot'],
  args: {
    selectedMode: AlertListMode.UNACKED,
  },
  play: async ({canvasElement}) => {
    const alertListPageSmall = canvasElement.querySelector(
      'obc-alert-list-page-small'
    ) as ObcAlertListPageSmall;
    const alertListDetails = alertListPageSmall.shadowRoot?.querySelector(
      'obc-alert-list-details'
    ) as ObcAlertListDetails;
    const table = alertListDetails.shadowRoot?.querySelector(
      'obc-table'
    ) as ObcTable;
    // Find the alert item by ID
    const alertItem1 = table.shadowRoot!.querySelector(
      '[data-row-id="1"]'
    ) as HTMLDivElement;
    const alertItem2 = table.shadowRoot!.querySelector(
      '[data-row-id="4"]'
    ) as HTMLDivElement;

    await expect(alertItem1).toBeVisible();
    await expect(alertItem2).toBeVisible();

    const ackAllButtons = within(
      alertListPageSmall!.shadowRoot!.children[0] as HTMLElement
    ).queryByTestId('ack-all-visible-button');

    // Click the ACK all button
    await userEvent.click(ackAllButtons!);

    // Verify the items are hidden
    await expect(alertItem1).not.toBeVisible();
    await expect(alertItem2).not.toBeVisible();
  },
};

export const MakeEmptyTest: Story = {
  tags: ['skip-snapshot'],
  args: {
    selectedMode: AlertListMode.UNACKED,
  },
  ...OneItem,
  play: async ({canvasElement}) => {
    const alertListPageSmall = canvasElement.querySelector(
      'obc-alert-list-page-small'
    ) as ObcAlertListPageSmall;
    const alertListDetails = alertListPageSmall.shadowRoot?.querySelector(
      'obc-alert-list-details'
    ) as ObcAlertListDetails;
    const table = alertListDetails.shadowRoot?.querySelector(
      'obc-table'
    ) as ObcTable;
    // Find the alert item by ID
    const alertItem1 = table.shadowRoot!.querySelector(
      '[data-row-id="1"]'
    ) as HTMLDivElement;

    await expect(alertItem1).toBeVisible();

    const ackAllButtons = within(
      alertListPageSmall!.shadowRoot!.children[0] as HTMLElement
    ).queryByTestId('ack-all-visible-button');

    // Click the ACK all button
    await userEvent.click(ackAllButtons!);

    // Verify the items are hidden
    await expect(alertItem1).not.toBeVisible();

    // Check that the empty title is visible
    const emptyTitle = alertListPageSmall.shadowRoot!.querySelector(
      '.empty-title'
    ) as HTMLSlotElement;
    await expect(emptyTitle).toBeInTheDocument();
  },
};
