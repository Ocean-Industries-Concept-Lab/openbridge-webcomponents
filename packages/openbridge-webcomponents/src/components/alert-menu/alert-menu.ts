import {
  CSSResultGroup,
  LitElement,
  TemplateResult,
  html,
  nothing,
  unsafeCSS,
} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './alert-menu.css?inline';
import '../button/button.js';
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
import type {ObcAlertListBase} from '../../building-blocks/alert-list/alert-list-base.js';
import {ObcTabbedCardChangeEvent} from '../tabbed-card/tabbed-card.js';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';
import {PopoverController} from '../../internal/popover-controller.js';

export type ObcAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
  tabName: 'shelved' | 'unacked' | 'all';
}>;

/** One tab of an alert menu: its name, its label and its empty state. */
export interface AlertMenuTab {
  /** Names the tab in `ack-all-visible-click` and in the `empty-<tab>-*` slots. */
  name: string;
  title: string;
  emptyTitle: string;
  emptyIcon: TemplateResult;
}

const WAITING_FOR_ACK: string[] = [
  ObcAlertMenuItemStatus.Unacknowledged,
  ObcAlertMenuItemStatus.RectifiedUnacknowledged,
];

/**
 * `<obc-alert-menu>` – A tabbed alert summary panel for displaying, acknowledging, and managing active alerts.
 *
 * Provides a compact, interactive menu for reviewing current alerts, grouped by status (e.g., unacknowledged, active, shelved). Users can acknowledge visible alerts, silence notifications, or navigate to a full alert list. Designed for quick triage and management of alert items in a sidebar or overlay context.
 *
 * ### Features
 * - **Tabbed organization:** Switch between "Unacked", "Active", and (optionally) "Shelved" tabs for focused alert review.
 * - **Alert filtering:** Each tab displays only relevant alerts: "Unacked" shows the non-shelved items still waiting for acknowledgment (`unacknowledged` or `rectified-unacknowledged`), "Active" every non-shelved item except the `rectified-unacknowledged` ones. A subclass changes the tabs and the list through the `tabs` and `renderList` hooks.
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
 * | empty-<tab>-title                | Selected tab is empty            | Custom title for the empty state (`<tab>` is one of `unacked`, `all`, `shelved`). |
 * | empty-<tab>-description          | Selected tab is empty            | Custom description for the empty state (`<tab>` is one of `unacked`, `all`, `shelved`). |
 * | empty-<tab>-icon                 | Selected tab is empty            | Custom icon for the empty state (`<tab>` is one of `unacked`, `all`, `shelved`). |
 *
 * ### Properties
 * - `hasShelved` (boolean): If true, displays the "Shelved" tab and enables shelving support. Default: false.
 * - `canAckAll` (boolean): If true, enables the "ACK visible" button for bulk acknowledgment. Default: false.
 * - `showSilenceButton` (boolean): If true, shows the "Silence" button. Default: true.
 * - `showAlertListButton` (boolean): If true, shows the "Alerts" navigation button. Default: true.
 *
 * ### Events
 * - **ack-all-visible-click** – Fired when the "ACK visible" button is clicked. The event detail includes the list of visible alert elements and the current tab name.
 * - **silence-click** – Fired when the "Silence" button is clicked.
 * - **go-to-alert-list-click** – Fired when the "Alerts" navigation button is clicked.
 *
 * ### Best Practices and Constraints
 * - Only enable "ACK visible" when there are actionable, unacknowledged alerts in the current view.
 * - Use the "Shelved" tab only if your application supports shelving alerts; otherwise, omit it for simplicity.
 * - For accessibility, keep all alert items and action buttons keyboard navigable.
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
 * @property hasShelved - If true, displays the "Shelved" tab and enables shelving support for alerts.
 *   Set to false to hide the "Shelved" tab and related filtering.
 * @property canAckAll - If true, enables the "ACK visible" button, allowing users to acknowledge all currently visible alerts in the active tab.
 *   Should be set to true only when there are unacknowledged alerts in view.
 * @property showSilenceButton - If true, shows the "Silence" button in the action bar.
 *   When hidden, the "ACK visible" button expands to fill the freed space.
 * @property showAlertListButton - If true, shows the "Alerts" navigation button in the action bar.
 *   When hidden, the "ACK visible" button expands to fill the freed space.
 * @property softDismiss - Let the browser close this menu on its own: on a click outside it, on `Escape`, or when another menu opens. Leave it off to keep showing and hiding the menu yourself.
 * @property open - Whether the menu is showing.
 * @availableWhen open softDismiss==true
 * @slot - The alerts items as ObcAlertMenuItem
 * @slot empty-<tab>-title - Custom empty-state title for the selected tab (`<tab>` is one of `unacked`, `all`, `shelved`)
 * @slot empty-<tab>-description - Custom empty-state description for the selected tab (`<tab>` is one of `unacked`, `all`, `shelved`)
 * @slot empty-<tab>-icon - Custom empty-state icon for the selected tab (`<tab>` is one of `unacked`, `all`, `shelved`)
 * @fires {ObcAckAllVisibleClickEvent} ack-all-visible-click - Fired when the ack all visible button is clicked
 * @fires {CustomEvent} silence-click - Fired when the silence button is clicked
 * @fires {CustomEvent} go-to-alert-list-click - Fired when the go to alert list button is clicked
 * @fires {CustomEvent<void>} close - Fired when the menu closed on its own, from a click outside, `Escape`, or another menu opening. `open` is already `false` by the time it arrives.
 */
@localized()
/**
 * @stable
 */
@customElement('obc-alert-menu')
export class ObcAlertMenu extends LitElement {
  @property({type: Boolean}) softDismiss = false;

  @property({type: Boolean}) open = false;

  protected readonly softDismissController = new PopoverController(this);

  @property({type: Boolean}) hasShelved: boolean = false;

  @property({type: Boolean}) canAckAll: boolean = false;

  @property({type: Boolean, attribute: false}) showSilenceButton: boolean =
    true;

  @property({type: Boolean, attribute: false}) showAlertListButton: boolean =
    true;

  @state() private _selectedTabIndex = 1;

  @query('.alert-list')
  private alertList!: ObcAlertListBase;

  private handleAckAllVisibleClick() {
    const panel = this.alertList;
    const visibleElements = panel.getVisibleElements();
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          visibleElements: visibleElements,
          tabName: this.selectedTab.name,
        },
      })
    );
  }

  private onTabChange(e: ObcTabbedCardChangeEvent) {
    this._selectedTabIndex = e.detail.tab;
  }

  /** Whether the menu offers "ACK visible" at all; `canAckAll` enables it. */
  protected get offersAckAll(): boolean {
    return true;
  }

  /** The tabs in display order; the menu opens on the second one. */
  protected get tabs(): AlertMenuTab[] {
    const tabs = [
      {
        name: 'unacked',
        title: msg('Unacked'),
        emptyTitle: msg('No unacknowledged alerts'),
        emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      },
      {
        name: 'all',
        title: msg('Active'),
        emptyTitle: msg('No active alerts'),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
      },
    ];
    if (this.hasShelved) {
      tabs.push({
        name: 'shelved',
        title: msg('Shelved'),
        emptyTitle: msg('No shelved alerts'),
        emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      });
    }
    return tabs;
  }

  private get selectedTab(): AlertMenuTab {
    const tabs = this.tabs;
    return tabs[this._selectedTabIndex] ?? tabs[1];
  }

  /**
   * The list that shows the selected tab's items. The CSS hides the items the
   * tab leaves out; the filter tells the list which ones those are.
   */
  protected renderList(
    tab: AlertMenuTab,
    content: TemplateResult
  ): TemplateResult {
    return html`<obc-alert-list
      class="alert-list ${tab.name}"
      .filter=${(item: HTMLElement) => this.tabFilter(tab.name, item)}
      >${content}</obc-alert-list
    >`;
  }

  private tabFilter(name: string, item: HTMLElement): boolean {
    const status = item.getAttribute('status') ?? '';
    if (name === 'unacked') {
      return WAITING_FOR_ACK.includes(status) && !item.hasAttribute('shelved');
    }
    if (name === 'shelved') {
      return item.hasAttribute('shelved');
    }
    return (
      !item.hasAttribute('shelved') &&
      status !== ObcAlertMenuItemStatus.RectifiedUnacknowledged
    );
  }

  override render() {
    const tabs = this.tabs;
    const t = this.selectedTab;

    return html`
      <obc-tabbed-card
        .nTabs=${tabs.length}
        class="wrapper"
        part="wrapper"
        .selectedTab=${this._selectedTabIndex}
        hasDefaultSlotOnly
        @tab-change=${this.onTabChange}
      >
        ${tabs.map(
          (tab, index) =>
            html`<span slot="tab-title-${index}">${tab.title}</span>`
        )}
        <div class="container">
          ${this.renderList(
            t,
            html`<slot></slot>
              <slot name="empty-${t.name}-title" slot="empty-title"
                >${t.emptyTitle}</slot
              >
              <slot name="empty-${t.name}-description" slot="empty-description"
                >${msg(
                  "Go to the 'Alert list' for more details or to manage existing alerts."
                )}</slot
              >
              <slot name="empty-${t.name}-icon" slot="empty-icon"
                >${t.emptyIcon}</slot
              >`
          )}
          <div class="action">
            ${
              this.offersAckAll
                ? html`<obc-button
                    variant="raised"
                    .disabled=${!this.canAckAll}
                    fullWidth
                    class="btn"
                    data-testid="ack-all-visible-button"
                    @click=${this.handleAckAllVisibleClick}
                  >
                    ${msg('ACK visible')}
                  </obc-button>`
                : nothing
            }
            ${
              this.showSilenceButton
                ? html`<obc-button
                    variant="normal"
                    fullWidth
                    class="btn"
                    showLeadingIcon
                    @click=${() =>
                      this.dispatchEvent(new CustomEvent('silence-click'))}
                  >
                    <obi-silence-iec slot="leading-icon"></obi-silence-iec>
                    ${msg('Silence')}
                  </obc-button>`
                : nothing
            }
            ${
              this.showAlertListButton
                ? html`<obc-button
                    variant="normal"
                    class="btn"
                    fullWidth
                    showLeadingIcon
                    showTrailingIcon
                    @click=${() =>
                      this.dispatchEvent(
                        new CustomEvent('go-to-alert-list-click')
                      )}
                  >
                    <obi-alert-list slot="leading-icon"></obi-alert-list>
                    <obi-chevron-right-google
                      slot="trailing-icon"
                    ></obi-chevron-right-google>
                    ${msg('Alerts')}
                  </obc-button>`
                : nothing
            }
          </div>
        </div>
      </obc-tabbed-card>
    `;
  }

  static override styles: CSSResultGroup = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': ObcAlertMenu;
  }
}
