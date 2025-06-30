import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAlertList} from './alert-list.js';
import './alert-list.js';
import {html} from 'lit';
import {
  ObcAlertMenuItem,
  ObcAlertMenuItemStatus,
} from '../../components/alert-menu-item/alert-menu-item.js';
import '../../icons/icon-unacknowledged.js';
import '../../icons/icon-caution-color-iec.js';
import {within} from 'storybook/internal/test';
import {expect} from 'storybook/test';

// Handler for ack-click events, this is a demo solution for the storybook
// Normally the ack-click is handled by the backend and the component is updated
const handleAck = (e: Event) => {
  const item = e.target as HTMLElement;
  // remove the item from the list
  const list = item.parentElement as HTMLSlotElement;
  list.removeChild(item);
};

const meta: Meta<typeof ObcAlertList> = {
  title: 'Building blocks/Alert list',
  tags: ['6.0'],
  component: 'obc-alert-list',
  args: {},
  argTypes: {},
  render: () => {
    return html` <obc-alert-list
      data-testid="alert-menu"
      style="height: 300px; display: block;"
    >
      <!-- High Priority Alarms -->
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        hasTime
        @ack-click=${handleAck}
        data-testid="engine-temperature-high-1"
      >
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">CPA/TCPA Alert</span>
        <span slot="description"
          >Risk of collision with vessel MV NORDIC at CPA 0.2nm</span
        >
        <span slot="time">09:12:34</span>
      </obc-alert-menu-item>
      <obc-alert-menu-item status=${ObcAlertMenuItemStatus.NoAckAlarm} hasTime>
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
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
        <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">Main Engine Overload</span>
        <span slot="description">Port main engine load exceeds 95% of MCR</span>
        <span slot="time">09:14:05</span>
      </obc-alert-menu-item>

      <!-- Warnings -->
      <obc-alert-menu-item
        status=${ObcAlertMenuItemStatus.NoAckWarning}
        hasTime
      >
        <obc-alert-icon slot="alert-icon" name="warning-unack"></obc-alert-icon>
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
        <obc-alert-icon slot="alert-icon" name="warning-unack"></obc-alert-icon>
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
        <obc-alert-icon slot="alert-icon" name="warning-unack"></obc-alert-icon>
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
      <obc-alert-menu-item status=${ObcAlertMenuItemStatus.Caution} hasTime>
        <obi-caution-color-iec
          useCssColor
          slot="alert-icon"
        ></obi-caution-color-iec>
        <span slot="title">Ballast Tank Level</span>
        <span slot="description"
          >No. 3 Port ballast tank level below recommended trim: 45%</span
        >
        <span slot="time">09:17:45</span>
      </obc-alert-menu-item>
    </obc-alert-list>`;
  },
} satisfies Meta<ObcAlertList>;

export default meta;
type Story = StoryObj<ObcAlertList>;

export const Primary: Story = {
  args: {},
};

export const Empty: Story = {
  args: {},
  render: () => {
    return html`<obc-alert-list style="height: 300px; display: block;">
      <div slot="empty-icon">
        <obi-unacknowledged></obi-unacknowledged>
      </div>
      <div slot="empty-title">
        <span>No unacknowledged alerts</span>
      </div>
      <div slot="empty-description">
        <span
          >Go to the 'Alert list' for more details or to manage existing
          alerts.</span
        >
      </div>
    </obc-alert-list>`;
  },
};

export const WithControls: Story = {
  tags: ['skip-snapshot'],
  args: {},
  render: (args, context) => {
    return html`
      <div style="display: flex; flex-direction: row; gap: 10px;">
        <obc-button
          @click=${() => {
            const list = context.canvasElement.querySelector(
              '[data-testid="alert-menu"]'
            ) as ObcAlertList;
            const newItem = document.createElement(
              'obc-alert-menu-item'
            ) as ObcAlertMenuItem;
            newItem.status = ObcAlertMenuItemStatus.Unacknowledged;
            newItem.hasTime = true;
            newItem.slot = 'items';
            newItem.innerHTML = `
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">New alert</span>
          <span slot="description">New alert description</span>
          <span slot="time">09:18:00</span>
        `;
            newItem.addEventListener('ack-click', () => {
              list.removeChild(newItem);
            });
            // Add the new item to the list in random position
            const items = list.querySelectorAll('obc-alert-menu-item');
            const randomIndex = Math.floor(Math.random() * items.length);
            list.insertBefore(newItem, items[randomIndex]);
          }}
          >Add alert</obc-button
        >
        <obc-button
          @click=${() => {
            const list = context.canvasElement.querySelector(
              '[data-testid="alert-menu"]'
            ) as ObcAlertList;
            const items = list.getVisibleElements();
            items.forEach((item) => {
              item.element.dispatchEvent(new Event('ack-click'));
            });
          }}
          >Ack all</obc-button
        >
        <obc-button
          @click=${() => {
            const list = context.canvasElement.querySelector(
              '[data-testid="alert-menu"]'
            ) as ObcAlertList;
            const display = list.style.display;
            list.style.display = display === 'none' ? 'block' : 'none';
          }}
          >Toggle visibility</obc-button
        >
      </div>
      ${meta.render!(args, context)}
    `;
  },
};

export const MakeEmpty: Story = {
  args: {},
  render: () => {
    const filter = (item: HTMLElement) => {
      return (
        item.getAttribute('status') === ObcAlertMenuItemStatus.Unacknowledged
      );
    };

    return html` <style>
        obc-alert-list {
          height: 300px;
          display: block;
        }

        obc-alert-menu-item[status='acknowledged'] {
          display: none;
        }
      </style>
      <obc-alert-list .filter=${filter}>
        <obc-alert-menu-item
          status=${ObcAlertMenuItemStatus.Unacknowledged}
          hasTime
          @ack-click=${handleAck}
          data-testid="engine-temperature-high-1"
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">CPA/TCPA Alert</span>
          <span slot="description"
            >Risk of collision with vessel MV NORDIC at CPA 0.2nm</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <div slot="empty-icon">
          <obi-unacknowledged></obi-unacknowledged>
        </div>
        <div slot="empty-title">
          <span>No unacknowledged alerts</span>
        </div>
        <div slot="empty-description">
          <span
            >Go to the 'Alert list' for more details or to manage existing
            alerts.</span
          >
        </div>
      </obc-alert-list>`;
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const item = canvas.getByTestId(
      'engine-temperature-high-1'
    ) as ObcAlertMenuItem;
    console.log('Item', item);
    item.status = ObcAlertMenuItemStatus.Acknowledged;
    console.log('Made item acknowledged');
    const list = canvasElement.querySelector('obc-alert-list') as ObcAlertList;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const emptyTitle = list.shadowRoot?.children[0]?.querySelector(
      'slot[name="empty-title"]'
    );
    await expect(emptyTitle).toBeVisible();
  },
};
