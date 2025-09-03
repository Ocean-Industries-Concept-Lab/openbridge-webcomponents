import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './alert-menu.css?inline';
import '../button/button.js';
import '../card-list-button/card-list-button.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alert-list.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-unacknowledged.js';
import '../tabbed-card/tabbed-card.js';
import {localized, msg} from '@lit/localize';
import {customElement} from '../../decorator.js';
import '../../building-blocks/alert-list/alert-list.js';
import {ObcAlertList} from '../../building-blocks/alert-list/alert-list.js';
import {ObcTabbedCardChangeEvent} from '../tabbed-card/tabbed-card.js';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';

export type ObcAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
  tabName: 'shelved' | 'unacked' | 'all';
}>;

/**
 * `<obc-alert-menu>` – A tabbed alert summary panel for displaying, acknowledging, and managing active alerts.
 *
 * Provides a compact, interactive menu for reviewing current alerts, grouped by status (e.g., unacknowledged, active, shelved). Users can acknowledge visible alerts, silence notifications, or navigate to a full alert list. Designed for quick triage and management of alert items in a sidebar or overlay context.
 *
 * ### Features
 * - **Tabbed organization:** Switch between "Unacked", "Active alerts", and (optionally) "Shelved" tabs for focused alert review.
 * - **Alert filtering:** Each tab displays only relevant alerts (e.g., "Unacked" shows only unacknowledged, non-shelved items).
 * - **Bulk actions:** "ACK visible" button allows acknowledging all currently visible (filtered) alerts at once.
 * - **Silence and navigation:** Dedicated buttons to silence alerts or jump to the full alert list.
 * - **Dynamic content:** Supports any number of `<obc-alert-menu-item>` children, with automatic empty-state messaging and icons per tab.
 * - **Responsive layout:** Adapts to available space, with scrollable alert lists and sticky action bar.
 * - **Customizable:** Optionally show/hide the "Shelved" tab via `hasShelved` property; enable/disable bulk ACK via `canAckAll`.
 *
 * ### Usage Guidelines
 * Use `<obc-alert-menu>` to provide users with a focused, actionable summary of current alerts, typically in a sidebar, overlay, or dashboard context. Ideal for scenarios where users need to quickly review, acknowledge, or silence multiple alerts without leaving their current workflow. Avoid using for persistent, always-visible alert banners; for that, use a dedicated alert banner or notification system.
 *
 * - Place one or more `<obc-alert-menu-item>` elements as children to populate the alert list.
 * - Use the `hasShelved` property to enable the "Shelved" tab if your application supports alert shelving.
 * - Use the `canAckAll` property to control whether the "ACK visible" button is enabled (e.g., only when there are unacknowledged alerts in view).
 * - Listen for custom events (`ack-all-visible-click`, `silence-click`, `go-to-alert-list-click`) to handle user actions.
 *
 * **TODO(designer):** Confirm if there are recommended maximum numbers of alerts to display, or if there are best practices for when to use the "Shelved" tab.
 *
 * ### Slots
 *
 * | Slot Name                        | Renders When...                  | Purpose                                                        |
 * |----------------------------------|----------------------------------|----------------------------------------------------------------|
 * | (default)                        | Always                           | Place one or more `<obc-alert-menu-item>` elements as alert rows. |
 * | empty-unacked-title              | Unacked tab, when empty          | Custom title for empty unacknowledged alerts.                  |
 * | empty-unacked-description        | Unacked tab, when empty          | Custom description for empty unacknowledged alerts.            |
 * | empty-unacked-icon               | Unacked tab, when empty          | Custom icon for empty unacknowledged alerts.                   |
 * | empty-all-title                  | Active alerts tab, when empty    | Custom title for empty active alerts.                          |
 * | empty-all-description            | Active alerts tab, when empty    | Custom description for empty active alerts.                    |
 * | empty-all-icon                   | Active alerts tab, when empty    | Custom icon for empty active alerts.                           |
 * | empty-shelved-title              | Shelved tab, when empty          | Custom title for empty shelved alerts.                         |
 * | empty-shelved-description        | Shelved tab, when empty          | Custom description for empty shelved alerts.                   |
 * | empty-shelved-icon               | Shelved tab, when empty          | Custom icon for empty shelved alerts.                          |
 *
 * ### Properties
 * - `hasShelved` (boolean): If true, displays the "Shelved" tab and enables shelving support. Default: false.
 * - `canAckAll` (boolean): If true, enables the "ACK visible" button for bulk acknowledgment. Default: false.
 *
 * ### Events
 * - **ack-all-visible-click** – Fired when the "ACK visible" button is clicked. The event detail includes the list of visible alert elements and the current tab name.
 * - **alert-list-click** – Fired when the "Alerts" navigation button is clicked.
 * - **silence-click** – Fired when the "Silence" button is clicked.
 * - **go-to-alert-list-click** – Fired when the "Alerts" navigation button is clicked.
 *
 * ### Best Practices and Constraints
 * - Only enable "ACK visible" when there are actionable, unacknowledged alerts in the current view.
 * - Use the "Shelved" tab only if your application supports shelving alerts; otherwise, omit it for simplicity.
 * - For accessibility, ensure that all alert items and action buttons are keyboard navigable.
 * - Do not use this component for persistent, always-on-screen alerts; use banners or dialogs for critical, persistent notifications.
 *
 * ### Example
 * ```
 * <obc-alert-menu hasShelved canAckAll>
 *   <obc-alert-menu-item active hasTime>
 *     <obi-placeholder slot="alert-icon"></obi-placeholder>
 *     <span slot="title">Engine Overheat</span>
 *     <span slot="description">Main engine temperature exceeds threshold</span>
 *     <span slot="time">09:12:34</span>
 *   </obc-alert-menu-item>
 *   <!-- More alert items... -->
 * </obc-alert-menu>
 * ```
 *
 * @slot - The alerts items as ObcAlertMenuItem
 * @slot empty-unacked-title - Custom title for empty unacknowledged alerts (Unacked tab)
 * @slot empty-unacked-description - Custom description for empty unacknowledged alerts (Unacked tab)
 * @slot empty-unacked-icon - Custom icon for empty unacknowledged alerts (Unacked tab)
 * @slot empty-all-title - Custom title for empty active alerts (Active alerts tab)
 * @slot empty-all-description - Custom description for empty active alerts (Active alerts tab)
 * @slot empty-all-icon - Custom icon for empty active alerts (Active alerts tab)
 * @slot empty-shelved-title - Custom title for empty shelved alerts (Shelved tab)
 * @slot empty-shelved-description - Custom description for empty shelved alerts (Shelved tab)
 * @slot empty-shelved-icon - Custom icon for empty shelved alerts (Shelved tab)
 * @fires ack-all-visible-click {ObcAckAllVisibleClickEvent} - Fired when the ack all visible button is clicked
 * @fires alert-list-click {CustomEvent} - Fired when the alert list button is clicked
 * @fires silence-click {CustomEvent} - Fired when the silence button is clicked
 * @fires go-to-alert-list-click {CustomEvent} - Fired when the go to alert list button is clicked
 */
@localized()
@customElement('obc-alert-menu')
export class ObcAlertMenu extends LitElement {
  /**
   * If true, displays the "Shelved" tab and enables shelving support for alerts.
   * Set to false to hide the "Shelved" tab and related filtering.
   *
   * Default: false.
   */
  @property({type: Boolean}) hasShelved: boolean = false;

  /**
   * If true, enables the "ACK visible" button, allowing users to acknowledge all currently visible alerts in the active tab.
   * Should be set to true only when there are unacknowledged alerts in view.
   *
   * Default: false.
   */
  @property({type: Boolean}) canAckAll: boolean = false;

  @state() private _selectedTabIndex = 1;

  @query('obc-alert-list')
  private alertList!: ObcAlertList;

  private handleAckAllVisibleClick() {
    const panel = this.alertList;
    const visibleElements = panel.getVisibleElements();
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          visibleElements: visibleElements,
          tabName: this.getSelectedTab().name,
        },
      })
    );
  }

  private onTabChange(e: ObcTabbedCardChangeEvent) {
    this._selectedTabIndex = e.detail.tab;
  }

  private getSelectedTab() {
    if (this._selectedTabIndex === 0) {
      return {
        name: 'unacked',
        emptyTitle: msg('No unacknowledged alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
        class: 'unacked',
        filter: (item: HTMLElement) => {
          return (
            item.getAttribute('status') ===
              ObcAlertMenuItemStatus.Unacknowledged &&
            !item.hasAttribute('shelved')
          );
        },
      };
    } else if (this._selectedTabIndex === 2) {
      return {
        name: 'shelved',
        emptyTitle: msg('No shelved alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
        class: 'shelved',
        filter: (item: HTMLElement) => {
          return item.hasAttribute('shelved');
        },
      };
    } else {
      return {
        name: 'all',
        emptyTitle: msg('No active alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
        class: 'all',
        filter: (item: HTMLElement) => {
          return !item.hasAttribute('shelved');
        },
      };
    }
  }

  override render() {
    const t = this.getSelectedTab();

    return html`
      <obc-tabbed-card
        .nTabs=${this.hasShelved ? 3 : 2}
        class="wrapper"
        part="wrapper"
        .selectedTab=${this._selectedTabIndex}
        hasDefaultSlotOnly
        @tab-change=${this.onTabChange}
      >
        <span slot="tab-title-0">${msg('Unacked')}</span>
        <span slot="tab-title-1">${msg('Active alerts')}</span>
        ${this.hasShelved
          ? html`<span slot="tab-title-2">${msg('Shelved')}</span>`
          : nothing}
        <div class="container">
          <obc-alert-list class="alert-list ${t.class}" .filter=${t.filter}>
            <slot></slot>
            <slot name="empty-${t.name}-title" slot="empty-title"
              >${t.emptyTitle}</slot
            >
            <slot name="empty-${t.name}-description" slot="empty-description"
              >${t.emptyDescription}</slot
            >
            <slot name="empty-${t.name}-icon" slot="empty-icon"
              >${t.emptyIcon}</slot
            >
          </obc-alert-list>
          <div class="action">
            <obc-button
              variant="raised"
              .disabled=${!this.canAckAll}
              fullWidth
              class="btn"
              data-testid="ack-all-visible-button"
              @click=${this.handleAckAllVisibleClick}
            >
              ${msg('ACK visible')}
            </obc-button>
            <obc-button
              variant="normal"
              fullWidth
              class="btn"
              showLeadingIcon
              @click=${() =>
                this.dispatchEvent(new CustomEvent('silence-click'))}
            >
              <obi-silence-iec slot="leading-icon"></obi-silence-iec>
              ${msg('Silence')}
            </obc-button>
            <obc-button
              variant="normal"
              class="btn"
              fullWidth
              showLeadingIcon
              showTrailingIcon
              @click=${() =>
                this.dispatchEvent(new CustomEvent('go-to-alert-list-click'))}
            >
              <obi-alert-list slot="leading-icon"></obi-alert-list>
              <obi-chevron-right-google
                slot="trailing-icon"
              ></obi-chevron-right-google>
              ${msg('Alerts')}
            </obc-button>
          </div>
        </div>
      </obc-tabbed-card>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': ObcAlertMenu;
  }
}
