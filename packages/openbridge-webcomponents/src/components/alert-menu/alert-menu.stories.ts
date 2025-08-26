// eslint-disable lit/no-unknown-slot
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAckAllVisibleClickEvent, ObcAlertMenu} from './alert-menu.js';
import './alert-menu.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-caution-color-iec.js';

import {html} from 'lit';
import {
  ObcAlertMenuItem,
  ObcAlertMenuItemStatus,
} from '../alert-menu-item/alert-menu-item.js';
import {within} from 'storybook/test';
import {userEvent} from 'storybook/test';
import {expect} from 'storybook/test';
import {ObcScrollbar} from '../scrollbar/scrollbar.js';
import {ObcAlertList} from '../../building-blocks/alert-list/alert-list.js';
import '../../icons/icon-alarm-acknowledged-iec.js';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: Event) => {
  const item = e.target as ObcAlertMenuItem;
  ack(item);
};

const ack = (item: ObcAlertMenuItem) => {
  item.status = ObcAlertMenuItemStatus.Acknowledged;
  item.shelved = false;
  // remove icon from alert-icon slot
  const alertIcon = item.querySelector('[slot="alert-icon"]');
  if (alertIcon) {
    alertIcon.remove();
  }
  const icon = document.createElement('obi-alarm-acknowledged-iec');
  icon.setAttribute('usecsscolor', '');
  icon.setAttribute('slot', 'alert-icon');
  item.appendChild(icon);

  // move the item below all unacknowledged items
  const unacknowledgedItems = item.parentElement?.querySelectorAll(
    '[status="unacknowledged"]:not([shelved]),[status="no-ack-alarm"]'
  );

  if (unacknowledgedItems) {
    const lastUnacknowledgedItem =
      unacknowledgedItems[unacknowledgedItems.length - 1];
    const index = Array.from(item.parentElement?.children || []).indexOf(
      lastUnacknowledgedItem
    );
    const currentIndex = Array.from(item.parentElement?.children || []).indexOf(
      item
    );
    const next = item.parentElement?.children[index + 1];
    if (currentIndex === index) {
      return;
    } else if (next) {
      item.parentElement?.insertBefore(item, next);
    } else {
      item.parentElement?.appendChild(item);
    }
  }
};

const handleAckAllVisible = (e: ObcAckAllVisibleClickEvent) => {
  console.log('ack all visible', e.detail);
  for (const item of e.detail.visibleElements) {
    if (
      (item.element as ObcAlertMenuItem).status ===
      ObcAlertMenuItemStatus.Unacknowledged
    ) {
      ack(item.element as ObcAlertMenuItem);
    }
  }
  const alertMenu = e.target as ObcAlertMenu;
  alertMenu.canAckAll = false;
};

const handleSilence = (e: CustomEvent) => {
  console.log('silence', e);
};

const meta: Meta<typeof ObcAlertMenu> = {
  title: 'Application Components/Alerts/Alert menu',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-menu',
  args: {
    hasShelved: true,
    canAckAll: true,
  },
  argTypes: {},
  render: (args) => {
    return html` <obc-alert-menu
      data-testid="alert-menu"
      .hasShelved=${args.hasShelved}
      .canAckAll=${args.canAckAll}
      @ack-all-visible-click=${handleAckAllVisible}
      @silence-click=${handleSilence}
    >
      <!-- High Priority Alarms -->
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        @ack-click=${handleAck}
        data-testid="engine-temperature-high-1"
      >
        <obc-alert-icon
          slot="alert-icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">CPA/TCPA Alert</span>
        <span slot="description"
          >Risk of collision with vessel MV NORDIC at CPA 0.2nm</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item status=${ObcAlertMenuItemStatus.NoAckAlarm} hasTime>
        <obc-alert-icon
          slot="alert-icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Off Track Deviation</span>
        <span slot="description"
          >Vessel has deviated from planned route by 0.5nm</span
        >
        <span slot="time">09:13:22</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        data-testid="engine-temperature-high-2"
        @ack-click=${handleAck}
      >
        <obc-alert-icon
          slot="alert-icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Main Engine Overload</span>
        <span slot="description">Port main engine load exceeds 95% of MCR</span>
        <span slot="time">09:14:05</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Acknowledged}
        hasTime
        data-testid="engine-temperature-high-acknowledged"
        @ack-click=${handleAck}
      >
        <obi-alarm-acknowledged-iec
          useCssColor
          slot="alert-icon"
        ></obi-alarm-acknowledged-iec>
        <span slot="title">Main Engine Overload</span>
        <span slot="description"
          >Starboard main engine load exceeds 95% of MCR</span
        >
        <span slot="time">09:15:05</span>
      </obc-alert-menu-item>

      <!-- Warnings -->
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon
          slot="alert-icon"
          type="warning"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Depth Below Keel</span>
        <span slot="description"
          >Under keel clearance below safety margin: 2.5m</span
        >
        <span slot="time">09:15:10</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon
          slot="alert-icon"
          type="warning"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Wind Speed High</span>
        <span slot="description"
          >True wind speed 35kts exceeds operational limit</span
        >
        <span slot="time">09:16:00</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon
          slot="alert-icon"
          type="warning"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">ECDIS Primary GPS Lost</span>
        <span slot="description"
          >Position source switched to secondary GPS</span
        >
        <span slot="time">09:16:45</span>
      </obc-alert-menu-item>

      <!-- Cautions -->
      <obc-alert-menu-item status=${ObcAlertMenuItemStatus.Caution} hasTime>
        <obi-caution-color-iec
          useCssColor
          slot="alert-icon"
        ></obi-caution-color-iec>
        <span slot="title">Fuel Oil Temperature</span>
        <span slot="description"
          >HFO temperature approaching lower limit: 115°C</span
        >
        <span slot="time">09:17:20</span>
      </obc-alert-menu-item>

      <!-- Shelved Alerts -->
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        shelved
        @ack-click=${handleAck}
        data-testid="ais-target-lost-1"
      >
        <obc-alert-icon
          slot="alert-icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">AIS Target Lost</span>
        <span slot="description">Lost tracking of vessel MMSI: 257123000</span>
        <span slot="time">09:18:00</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        shelved
        @ack-click=${handleAck}
        data-testid="ais-target-lost-2"
      >
        <obc-alert-icon
          slot="alert-icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">AIS Target Lost</span>
        <span slot="description">Lost tracking of vessel MMSI: 257123001</span>
        <span slot="time">09:18:01</span>
      </obc-alert-menu-item>
    </obc-alert-menu>`;
  },
} satisfies Meta<ObcAlertMenu>;

export default meta;
type Story = StoryObj<ObcAlertMenu>;

export const Regular: Story = {
  args: {},
};

export const Empty: Story = {
  args: {},
  render: () => html` <obc-alert-menu hasShelved></obc-alert-menu>`,
};

export const OneItem: Story = {
  render: () => {
    return html` <obc-alert-menu @ack-all-visible-click=${handleAckAllVisible}>
      <!-- Cautions -->
      <obc-alert-menu-item status=${ObcAlertMenuItemStatus.Caution} hasTime>
        <obi-caution-color-iec
          useCssColor
          slot="alert-icon"
        ></obi-caution-color-iec>
        <span slot="title">Engine Temperature High</span>
        <span slot="description"
          >Port main engine temperature exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
    </obc-alert-menu>`;
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
    canAckAll: true,
    hasShelved: true,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const alertMenu = canvas.getByTestId('alert-menu');
    const unackedButton = await within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).findByText('Unacked');
    await userEvent.click(unackedButton);

    // Find the alert item by ID
    const alertItem = canvas.getByTestId('engine-temperature-high-2');

    // Find the message menu item and its shadow root
    const menuItem = alertItem.shadowRoot?.querySelector(
      'obc-message-menu-item'
    );
    if (!menuItem?.shadowRoot) {
      throw new Error('Message menu item or its shadow root not found');
    }

    // Find the ACK button within shadow DOM
    const ackButton = menuItem.shadowRoot.querySelector('obc-button');
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
  args: {},
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Find the alert item by ID
    const alertItem1 = canvas.getByTestId(
      'engine-temperature-high-1'
    ) as ObcAlertMenuItem;
    const alertItem2 = canvas.getByTestId(
      'engine-temperature-high-2'
    ) as ObcAlertMenuItem;

    const alertMenu = canvas.getByTestId('alert-menu');

    const ackAllButtons = within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).queryByTestId('ack-all-visible-button');
    if (!ackAllButtons) {
      throw new Error('ACK all button not found');
    }

    // Click the ACK all button
    await userEvent.click(ackAllButtons);

    // Verify the items are acknowledged
    await expect(alertItem1.status).toBe(ObcAlertMenuItemStatus.Acknowledged);
    await expect(alertItem2.status).toBe(ObcAlertMenuItemStatus.Acknowledged);
  },
};

export const AckAllAfterScrollTest: Story = {
  args: {
    canAckAll: true,
    hasShelved: true,
  },
  tags: ['skip-snapshot'],
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    // Find the alert items by ID
    const alertItem1 = canvas.getByTestId(
      'engine-temperature-high-1'
    ) as ObcAlertMenuItem;
    const alertItem2 = canvas.getByTestId(
      'engine-temperature-high-2'
    ) as ObcAlertMenuItem;

    const alertMenu = canvas.getByTestId('alert-menu');

    // Get the scrollbar element
    const alertList = alertMenu.shadowRoot!.querySelector(
      'obc-alert-list'
    ) as ObcAlertList;
    const scrollbar = alertList.shadowRoot!.querySelector(
      'obc-scrollbar'
    ) as ObcScrollbar;
    if (!scrollbar) {
      throw new Error('Scrollbar not found');
    }

    // Scroll to the bottom
    scrollbar.scrollToBottom();

    // Wait a bit for the scroll to complete
    await new Promise((resolve) => setTimeout(resolve, 1));

    const ackAllButtons = within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).queryByTestId('ack-all-visible-button');
    if (!ackAllButtons) {
      throw new Error('ACK all button not found');
    }

    // Click the ACK all button
    await userEvent.click(ackAllButtons);

    // Verify that item1 (out of view) is still visible while item2 (in view) is hidden
    // assert that alertItem1 is still in the DOM and alertItem2 is not
    await expect(alertItem1.status).toBe(ObcAlertMenuItemStatus.Unacknowledged);
    await expect(alertItem2.status).toBe(ObcAlertMenuItemStatus.Acknowledged);
  },
};

export const AddAlertTest: Story = {
  tags: ['skip-snapshot'],
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const alertMenu = canvas.getByTestId('alert-menu');

    const newAlertElement = document.createElement(
      'obc-alert-menu-item'
    ) as ObcAlertMenuItem;
    newAlertElement.status = ObcAlertMenuItemStatus.Caution;
    newAlertElement.hasTime = true;
    newAlertElement.innerHTML = '<span slot="title">New Caution</span>';
    // wait 1000 ms
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Add the new alert to the alert menu
    alertMenu.insertBefore(newAlertElement, alertMenu.children[3]);

    await expect(newAlertElement).toBeVisible();
    // wait 1000 ms
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(newAlertElement.animateIntro).toBe(true);
  },
};

export const MakeEmptyTest: Story = {
  tags: ['skip-snapshot'],
  render: () => {
    return html` <obc-alert-menu
      @ack-all-visible-click=${handleAckAllVisible}
      data-testid="alert-menu"
    >
      <!-- Alerts -->
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        @ack-click=${handleAck}
        data-testid="engine-temperature-high-single"
      >
        <obc-alert-icon
          slot="alert-icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Engine Temperature High</span>
        <span slot="description"
          >Port main engine temperature exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
    </obc-alert-menu>`;
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Find the alert item by ID
    const alertItem = canvas.getByTestId('engine-temperature-high-single');
    const alertMenu = canvas.getByTestId('alert-menu');

    const unackedButton = await within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).findByText('Unacked');
    await userEvent.click(unackedButton);

    const ackAllButtons = within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).queryByTestId('ack-all-visible-button');
    if (!ackAllButtons) {
      throw new Error('ACK all button not found');
    }

    // Click the ACK all button
    await userEvent.click(ackAllButtons);

    // Verify the items are hidden
    await expect(alertItem).not.toBeVisible();

    const alertLists = alertMenu.shadowRoot!.querySelector(
      'obc-alert-list'
    ) as ObcAlertList;
    // Check that the empty title is visible
    const emptyTitle = alertLists.shadowRoot!.querySelector(
      '.empty-title'
    ) as HTMLSlotElement;
    await expect(emptyTitle).toBeInTheDocument();
  },
};
