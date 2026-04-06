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
import {Alert, AlertType} from '../../types.js';
import {ObcTable} from '../../components/table/table.js';
import {ObcAlertListDetails} from '../../components/alert-list-details/alert-list-details.js';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: ObcAckClickEvent) => {
  const item = e.detail.alert;
  ack(item);
};

const ack = (item: Alert) => {
  console.log('ack', item);
  item = {...item};
  item.acknowledged = {
    acknowledgedBy: 'John Doe',
    acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
  };
  item.shelved = false;
  // remove icon from alert-icon slot
  const alertListPageSmall = document.querySelector(
    'obc-alert-list-page-small'
  ) as ObcAlertListPageSmall;
  const alerts = alertListPageSmall.alerts;
  const newAlerts = [...alerts];
  const index = newAlerts.findIndex((alert) => alert.id === item.id);
  newAlerts[index] = item;
  alertListPageSmall.alerts = newAlerts;
};

const handleAckAllVisible = (e: ObcAlertListPageAckAllClickEvent) => {
  console.log('ack all visible', e.detail.alerts);
  for (const item of e.detail.alerts) {
    if (item.acknowledged === false) {
      ack(item);
    }
  }
};

const handleSilence = (e: CustomEvent) => {
  console.log('silence', e);
};

const meta: Meta<typeof ObcAlertListPageSmall> = {
  title: 'Pages/Alert List Small',
  tags: ['6.0'],
  component: 'obc-alert-list-page-small',
  args: {
    hasShelved: true,
    selectedMode: AlertListMode.ALL,
    showTime: true,
    timeFormatter: (time) =>
      time.toLocaleTimeString(undefined, {hour12: false}),
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
        acknowledged: {
          acknowledgedBy: 'John Doe',
          acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
        },
        active: true,
        type: AlertType.Caution,
        time: new Date('2024-01-15T08:39:42Z'),
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
      .timeFormatter=${args.timeFormatter}
      @ack-all-visible-click=${handleAckAllVisible}
      @silence-click=${handleSilence}
      @ack-click=${handleAck}
      .alerts=${args.alerts}
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

const toUtcTimeString = (time: Date) => {
  return time.toLocaleTimeString(undefined, {hour12: false, timeZone: 'UTC'});
};

export const CustomTimeFormatter: Story = {
  args: {
    timeFormatter: toUtcTimeString,
  },
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
      .showTime=${args.showTime}
      .alerts=${[
        {
          id: '1',
          tagId: '1',
          source: 'ME 1',
          text: 'Port main engine temperature exceeds normal operating range',
          acknowledged: false,
          active: true,
          type: AlertType.Alarm,
          time: new Date('2024-01-15T14:32:15Z'),
        } as Alert,
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
  tags: ['skip-test'],
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
  tags: ['skip-test'],
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
  tags: ['skip-test'],
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
    const emptyTitle = alertListDetails.shadowRoot!.querySelector(
      '.empty-title'
    ) as HTMLSlotElement;
    await expect(emptyTitle).toBeInTheDocument();
  },
};
