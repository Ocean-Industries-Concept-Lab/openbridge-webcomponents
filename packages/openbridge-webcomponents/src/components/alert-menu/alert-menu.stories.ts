import type {Meta, StoryObj} from '@storybook/web-components';
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
import {within} from '@storybook/test';
import {userEvent} from '@storybook/test';
import {expect} from '@storybook/test';
import {ObcScrollbar} from '../scrollbar/scrollbar.js';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: Event) => {
  const item = e.target as HTMLElement;
  // remove the item from the list
  const list = item.parentElement as HTMLSlotElement;
  list.removeChild(item);
};

const handleAckAllVisible = (e: ObcAckAllVisibleClickEvent) => {
  for (const item of e.detail.visibleElements) {
    if (
      (item as ObcAlertMenuItem).status ===
      ObcAlertMenuItemStatus.Unacknowledged
    ) {
      const list = item.parentElement as HTMLSlotElement;
      list.removeChild(item);
    }
  }
};

const meta: Meta<typeof ObcAlertMenu> = {
  title: 'Application/Alert menu',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-menu',
  args: {
    maxWidth: 800,
    canAckAll: true,
    canSilence: true,
  },
  argTypes: {},
  render: (args) => {
    return html` <obc-alert-menu
      data-testid="alert-menu"
      ?canAckAll=${args.canAckAll}
      ?canSilence=${args.canSilence}
      @ack-all-visible-click=${handleAckAllVisible}
    >
      <!-- Alarms -->
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        @ack-click=${handleAck}
        data-testid="engine-temperature-high-1"
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">Engine Temperature High</span>
        <span slot="description"
          >Port main engine temperature exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.NoAckAlarm}
        hasTime
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">GPS Position Error</span>
        <span slot="description"
          >GPS position error exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        data-testid="engine-temperature-high-2"
        @ack-click=${handleAck}
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">Engine Temperature High</span>
        <span slot="description"
          >Port main engine temperature exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.NoAckAlarm}
        hasTime
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">GPS Position Error</span>
        <span slot="description"
          >GPS position error exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>

      <!-- Warnings -->
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon slot="alert-icon" name="warning-unack"></obc-alert-icon>
        <span slot="title">GPS Position Error</span>
        <span slot="description"
          >GPS position error exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon slot="alert-icon" name="warning-unack"></obc-alert-icon>
        <span slot="title">GPS Position Error</span>
        <span slot="description"
          >GPS position error exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon slot="alert-icon" name="warning-unack"></obc-alert-icon>
        <span slot="title">GPS Position Error</span>
        <span slot="description"
          >GPS position error exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>

      <!-- Cautions -->
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.Caution}
        hasTime
      >
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
      <obc-alert-menu-item
        slot="shelved"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        shelved
        @ack-click=${handleAck}
        data-testid="engine-temperature-high-3"
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">Engine Temperature High</span>
        <span slot="description"
          >Port main engine temperature exceeds normal operating range</span
        >
        <span slot="time">09:12:34</span>
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
  render: (args) => html` <obc-alert-menu></obc-alert-menu>`,
};

export const OneItem: Story = {
  render: (args) => {
    return html` <obc-alert-menu
      ?canAckAll=${args.canAckAll}
      ?canSilence=${args.canSilence}
    >
      <!-- Cautions -->
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.Caution}
        hasTime
      >
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

export const MakeEmptyTest: Story = {
  render: (args) => {
    return html` <obc-alert-menu
      ?canAckAll=${args.canAckAll}
      ?canSilence=${args.canSilence}
      @ack-all-visible-click=${handleAckAllVisible}
      data-testid="alert-menu"
    >
      <!-- Alerts -->
      <obc-alert-menu-item
        slot="unacked"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        @ack-click=${handleAck}
        data-testid="engine-temperature-high-1"
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
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
    const alertItem = canvas.getByTestId('engine-temperature-high-1');
    const alertMenu = canvas.getByTestId('alert-menu');

    const ackAllButtons = within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).queryAllByTestId('ack-all-visible-button');
    if (ackAllButtons.length !== 3) {
      throw new Error(
        'Not enough ACK all buttons found' + ackAllButtons.length
      );
    }

    // Click the ACK all button
    await userEvent.click(ackAllButtons[0]);

    // Verify the items are hidden
    await expect(alertItem).not.toBeInTheDocument();

    // Check that the empty title is visible
    const emptyTitle = alertMenu.shadowRoot!.querySelector(
      'div[data-testid="empty-title"]'
    );
    await expect(emptyTitle).toBeInTheDocument();
  },
};

export const AcknowledgmentTest: Story = {
  args: {
    canAckAll: true,
    canSilence: true,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Find the alert item by ID
    const alertItem = canvas.getByTestId('engine-temperature-high-1');

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
    await expect(alertItem).not.toBeInTheDocument();
  },
};

export const AckAllTest: Story = {
  args: {
    canAckAll: true,
    canSilence: true,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Find the alert item by ID
    const alertItem1 = canvas.getByTestId('engine-temperature-high-1');
    const alertItem2 = canvas.getByTestId('engine-temperature-high-2');

    const alertMenu = canvas.getByTestId('alert-menu');

    const ackAllButtons = within(
      alertMenu.shadowRoot!.children[0] as HTMLElement
    ).queryAllByTestId('ack-all-visible-button');
    if (ackAllButtons.length !== 3) {
      throw new Error(
        'Not enough ACK all buttons found' + ackAllButtons.length
      );
    }

    // Click the ACK all button
    await userEvent.click(ackAllButtons[0]);

    // Verify the items are hidden
    await expect(alertItem1).not.toBeInTheDocument();
    await expect(alertItem2).not.toBeInTheDocument();
  },
};

export const AckAllAfterScrollTest: Story = {
  args: {
    canAckAll: true,
    canSilence: true,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Find the alert items by ID
    const alertItem1 = canvas.getByTestId('engine-temperature-high-1');
    const alertItem2 = canvas.getByTestId('engine-temperature-high-2');

    const alertMenu = canvas.getByTestId('alert-menu');

    // Get the scrollbar element
    const scrollbar = alertMenu.shadowRoot!.querySelector(
      '.alert-list'
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
    ).queryAllByTestId('ack-all-visible-button');
    if (ackAllButtons.length !== 3) {
      throw new Error(
        'Not enough ACK all buttons found' + ackAllButtons.length
      );
    }

    // Click the ACK all button
    await userEvent.click(ackAllButtons[0]);

    // Verify that item1 (out of view) is still visible while item2 (in view) is hidden
    // assert that alertItem1 is still in the DOM and alertItem2 is not
    await expect(alertItem1).toBeInTheDocument();
    await expect(alertItem2).not.toBeInTheDocument();
  },
};
