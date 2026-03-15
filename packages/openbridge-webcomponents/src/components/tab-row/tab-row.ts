import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import compentStyle from './tab-row.css?inline';
import '../tab-item/tab-item.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-up-iec.js';
import {BadgeType, BadgeSize} from '../badge/badge.js';

export interface TabData {
  id: string;
  title: string;
  hasLeadingIcon?: boolean;
  hasBadge?: boolean;
  badgeCount?: number;
  badgeType?: BadgeType;
  badgeSize?: BadgeSize;
  badgeShowNumber?: boolean;
  showLeadingBadgeIcon?: boolean;
  disabled?: boolean;
}

/**
 * `<obc-tab-row>` – A horizontal tab navigation bar for switching between multiple content sections.
 *
 * Displays a row of interactive tabs, each representing a distinct view or section. Supports badges, icons, close buttons, and an optional "add new tab" action. Designed for use cases where users need to quickly switch between related content areas, such as dashboards, settings, or document editors.
 *
 * ---
 *
 * ### Features
 * - **Tab Selection:** Only one tab can be selected at a time; selection is managed via the `selectedTabId` property.
 * - **Closeable Tabs:** Optionally display a close button on each tab (`hasClose`), allowing users to remove tabs dynamically.
 * - **Add New Tab:** Optionally show an "add new tab" button at the end of the row (`hasAddNewTab`), emitting an event when clicked.
 * - **Badges:** Tabs can display badges with counts and types (e.g., notification, alarm, enhance), supporting different badge sizes and optional hiding of the number.
 * - **Icons:** Each tab can show a leading icon (customizable via slot), and optionally a badge icon.
 * - **Disabled Tabs:** Individual tabs can be disabled to prevent user interaction.
 * - **Hug Mode:** When `hug` is enabled, tabs use a compact layout with reduced padding.
 * - **Responsive Layout:** Tabs are arranged horizontally and adapt to the available width.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `<obc-tab-row>` to organize content into logical sections that users can switch between without leaving the current page. Ideal for navigation in multi-view interfaces, such as settings panels, dashboards, or editors. Each tab should represent a distinct, high-level section. Avoid using tabs for navigation between unrelated pages or for single-action toggles.
 *
 * - Use badges to highlight new activity or counts (e.g., unread messages).
 * - Use the close button for tabs that represent removable or temporary content (e.g., documents, chat sessions).
 * - The "add new tab" action is suitable for interfaces where users can create new sections dynamically.
 * - For best accessibility, ensure each tab has a unique `id` and descriptive `title`.
 *
 * **TODO(designer):** Confirm if there are recommended limits on the number of tabs, or guidance for handling overflow (e.g., scrolling, collapsing).
 *
 * ---
 *
 * ### Example
 * ```html
 * <obc-tab-row
 *   .tabs=${[
 *     {id: 'tab1', title: 'Inbox', hasBadge: true, badgeCount: 5, badgeType: 'notification'},
 *     {id: 'tab2', title: 'Updates'},
 *     {id: 'tab3', title: 'Settings', hasLeadingIcon: true}
 *   ]}
 *   selectedTabId="tab1"
 *   hasClose
 *   hasAddNewTab
 * >
 *   <obi-placeholder slot="tab-tab1-icon"></obi-placeholder>
 *   <obi-placeholder slot="tab-tab3-icon"></obi-placeholder>
 * </obc-tab-row>
 * ```
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name                | Renders When...                   | Purpose                                              |
 * |--------------------------|------------------------------------|------------------------------------------------------|
 * | `tab-<id>-icon`          | If `hasLeadingIcon` is true        | Leading icon for a specific tab (replaceable)        |
 * | `tab-<id>-badge-icon`    | If `showLeadingBadgeIcon` is true  | Badge icon for a specific tab (replaceable)          |
 *
 * ---
 *
 * ### Events
 * - `tab-selected` – Fired when a tab is selected. Detail: `{tab, id, index}`.
 * - `tab-closed` – Fired when a tab's close button is clicked. Detail: `{tab, id, index}`.
 * - `add-new-tab` – Fired when the "add new tab" button is clicked. No detail.
 *
 * ---
 *
 * ### Best Practices
 * - Only one tab should be selected at a time.
 * - Use badges sparingly to avoid overwhelming the user.
 * - Avoid using the close button for tabs that should always be present.
 * - For accessibility, ensure tab titles are clear and concise.
 * - If using custom icons, provide them via the appropriate named slot for each tab.
 *
 * @slot tab-<id>-icon - Leading icon slot for each tab (shown when `hasLeadingIcon` is true for that tab)
 * @slot tab-<id>-badge-icon - Badge icon slot for each tab (shown when `showLeadingBadgeIcon` is true for that tab)
 * @fires tab-selected {CustomEvent<{tab: TabData, id: string, index: number}>} Fired when a tab is selected.
 * @fires tab-closed {CustomEvent<{tab: TabData, id: string, index: number}>} Fired when a tab's close button is clicked.
 * @fires add-new-tab {CustomEvent<void>} Fired when the "add new tab" button is clicked.
 */
@customElement('obc-tab-row')
export class ObcTabRow extends LitElement {
  /**
   * The list of tabs to display. Each tab is defined by an object with properties such as `id`, `title`, `hasLeadingIcon`, `hasBadge`, `badgeCount`, `badgeType`, `badgeSize`, `badgeShowNumber`, `showLeadingBadgeIcon`, and `disabled`.
   *
   * - `id` (string): Unique identifier for the tab.
   * - `title` (string): Display label for the tab.
   * - `hasLeadingIcon` (boolean): Whether to show a leading icon (default: true).
   * - `hasBadge` (boolean): Whether to show a badge on the tab.
   * - `badgeCount` (number): Number to display in the badge.
   * - `badgeType` (BadgeType): Visual style of the badge (e.g., notification, alarm, enhance).
   * - `badgeSize` (BadgeSize): Size of the badge (e.g., regular, large).
   * - `badgeShowNumber` (boolean): If true, shows the badge number.
   * - `showLeadingBadgeIcon` (boolean): If true, shows a badge icon.
   * - `disabled` (boolean): If true, disables the tab.
   */
  @property({type: Array}) tabs: TabData[] = [];

  /**
   * The `id` of the currently selected tab. Only one tab can be selected at a time.
   *
   * Changing this property updates the selected tab visually and emits the `tab-selected` event when changed by user interaction.
   */
  @property({type: String, attribute: 'selected-tab-id'}) selectedTabId = '';

  /**
   * Whether to display a close button on each tab. When enabled, users can remove tabs individually.
   *
   * Default: `false`.
   */
  @property({type: Boolean, attribute: 'has-close'}) hasClose = false;

  /**
   * Enables "hug" mode for a more compact tab layout with reduced padding.
   *
   * Default: `false`.
   */
  @property({type: Boolean}) hug = false;

  /**
   * Whether to display an "add new tab" button at the end of the tab row. When clicked, emits the `add-new-tab` event.
   *
   * Default: `false`.
   */
  @property({type: Boolean, attribute: 'has-add-new-tab'}) hasAddNewTab = false;

  private handleTabClick(_: Event, tabId: string) {
    const tabIndex = this.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;
    this.selectedTabId = this.tabs[tabIndex].id;
    this.dispatchEvent(
      new CustomEvent('tab-selected', {
        detail: {tab: this.tabs[tabIndex], id: tabId, index: tabIndex},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleTabClose(event: Event, tabId: string) {
    event.stopPropagation();
    const tabIndex = this.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;
    const removedTab = this.tabs[tabIndex];
    this.tabs = [
      ...this.tabs.slice(0, tabIndex),
      ...this.tabs.slice(tabIndex + 1),
    ];
    if (removedTab.id === this.selectedTabId && this.tabs.length) {
      const newIdx = Math.min(tabIndex, this.tabs.length - 1);
      this.selectedTabId = this.tabs[newIdx].id;
    }
    this.dispatchEvent(
      new CustomEvent('tab-closed', {
        detail: {tab: removedTab, id: removedTab.id, index: tabIndex},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAddNewTab() {
    this.dispatchEvent(
      new CustomEvent('add-new-tab', {bubbles: true, composed: true})
    );
  }

  private renderTab(tab: TabData, index: number) {
    const isFirst = index === 0;
    const isChecked = tab.id === this.selectedTabId;
    return html`
      <obc-tab-item
        .title=${tab.title}
        .checked=${isChecked}
        .hasClose=${this.hasClose}
        .hasLeadingIcon=${tab.hasLeadingIcon ?? true}
        .hasTitle=${true}
        .hasDivider=${!isFirst}
        .hug=${this.hug}
        .disabled=${tab.disabled || false}
        .hasBadge=${tab.hasBadge ||
        (tab.badgeCount !== undefined && tab.badgeCount > 0)}
        .badgeCount=${tab.badgeCount || 0}
        .badgeType=${tab.badgeType ?? BadgeType.regular}
        .badgeSize=${tab.badgeSize ?? BadgeSize.regular}
        .badgeShowNumber=${tab.badgeShowNumber ?? true}
        .showLeadingBadgeIcon=${tab.showLeadingBadgeIcon || false}
        @tab-click=${(e: Event) => this.handleTabClick(e, tab.id)}
        @tab-close=${(e: Event) => this.handleTabClose(e, tab.id)}
      >
        ${tab.hasLeadingIcon !== false
          ? html`
              <slot name="tab-${tab.id}-icon" slot="leading-icon">
                <obi-placeholder></obi-placeholder>
              </slot>
            `
          : ''}
        <span slot="title">${tab.title}</span>
        ${tab.showLeadingBadgeIcon
          ? html`
              <slot name="tab-${tab.id}-badge-icon" slot="badge-icon">
                <obi-placeholder></obi-placeholder>
              </slot>
            `
          : ''}
      </obc-tab-item>
    `;
  }

  override render() {
    return html`
      <div class="wrapper" role="tablist">
        ${repeat(
          this.tabs,
          (t) => t.id,
          (t, i) => this.renderTab(t, i)
        )}
        ${this.hasAddNewTab
          ? html`
              <obc-icon-button
                class="add-new-tab"
                variant="flat"
                @click=${this.handleAddNewTab}
                aria-label="Add new tab"
              >
                <obi-up-iec></obi-up-iec>
              </obc-icon-button>
            `
          : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}
