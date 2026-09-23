import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import compentStyle from './tab-row.css?inline';
import '../tab-item/tab-item.js';
import type {ObcTabItem, TabItemBadge} from '../tab-item/tab-item.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-up-iec.js';
import {BadgeType, BadgeSize} from '../badge/badge.js';

export interface TabData {
  id: string;
  title: string;
  subtitle?: string;
  showSubtitle?: boolean;
  hasLeadingIcon?: boolean;
  /**
   * One or more badges to display on the tab. When non-empty this takes
   * precedence over the deprecated single-badge fields below.
   */
  badges?: TabItemBadge[];
  /** @deprecated Use `badges` instead. */
  hasBadge?: boolean;
  /** @deprecated Use `badges` instead. */
  badgeCount?: number;
  /** @deprecated Use `badges` instead. */
  badgeType?: BadgeType;
  /** @deprecated Use `badges` instead. */
  badgeSize?: BadgeSize;
  /** @deprecated Use `badges` instead. */
  badgeShowNumber?: boolean;
  /** @deprecated Use `badges` instead. */
  showLeadingBadgeIcon?: boolean;
  disabled?: boolean;
}

/**
 * `<obc-tab-row>` – A horizontal tab navigation bar for switching between multiple content sections.
 *
 * Displays a row of interactive tabs, each representing a distinct view or section. Supports subtitles, badges, icons, close buttons, and an optional "add new tab" action. Designed for use cases where users need to quickly switch between related content areas, such as dashboards, settings, or document editors.
 *
 * ---
 *
 * ### Features
 * - **Tab Selection:** Only one tab can be selected at a time; selection is managed via the `selectedTabId` property.
 * - **Closeable Tabs:** Optionally display a close button on each tab (`hasClose`), allowing users to remove tabs dynamically.
 * - **Add New Tab:** Optionally show an "add new tab" button at the end of the row (`hasAddNewTab`), emitting an event when clicked.
 * - **Subtitles:** Optionally show secondary contextual text below each tab title (`showSubtitle` and `subtitle`).
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
 * ### Keyboard and ARIA
 *
 * Follows the [WAI-ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) with manual
 * activation: the row is one tab stop, Left/Right move focus between tabs, Home/End jump to the
 * first/last, and Enter or Space selects the focused tab. Disabled tabs are skipped. Set
 * `automaticActivation` for the pattern's other mode, where an arrow key also selects.
 *
 * `Delete` closes the focused tab when `hasClose` is set, and focus moves to the tab that follows
 * it. The close button is not in the tab sequence, so the row keeps its single tab stop, and the
 * "add new tab" button sits outside the `tablist`, where Tab reaches it and arrow keys do not.
 *
 * One part of the pattern is out of scope: `aria-controls`/`aria-labelledby` between a tab and its
 * panel, because an IDREF cannot cross a shadow root — the tabs live in this component's shadow DOM
 * and the panel in the consumer's. Give the panel an `aria-label` instead.
 *
 * ---
 *
 * ### Example
 * ```html
 * <obc-tab-row
 *   .tabs=${[
 *     {id: 'tab1', title: 'Inbox', subtitle: 'Monitoring', hasBadge: true, badgeCount: 5, badgeType: 'notification'},
 *     {id: 'tab2', title: 'Updates'},
 *     {id: 'tab3', title: 'Settings', hasLeadingIcon: true}
 *   ]}
 *   selectedTabId="tab1"
 *   show-subtitle
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
 * | `tab-<id>-icon`              | If `hasLeadingIcon` is true                          | Leading icon for a specific tab (replaceable)        |
 * | `tab-<id>-<iconSlotName>`    | For each badge that declares an `iconSlotName`       | Custom icon for a specific tab's badge (replaceable). The deprecated single-badge path uses `tab-<id>-badge-icon`. |
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
 * @property selectedTabId - The `id` of the currently selected tab. Only one tab can be selected at a time.
 *   Changing this property updates the selected tab visually and emits the `tab-selected` event when changed by user interaction.
 * @property automaticActivation - Selects a tab as soon as an arrow key focuses it, instead of
 *   waiting for Enter or Space. Only for rows whose panels are already rendered.
 * @property label - Accessible name of the tab list, announced before the tabs themselves.
 * @property hasClose - Whether to display a close button on each tab. When enabled, users can remove tabs individually.
 * @property hug - Enables "hug" mode for a more compact tab layout with reduced padding.
 * @property showSubtitle - Whether to display subtitle text for each tab. Individual tabs can override this with `tab.showSubtitle`.
 * @property hasAddNewTab - Whether to display an "add new tab" button at the end of the tab row. When clicked, emits the `add-new-tab` event.
 * @property tabs - Tabs to display. Each carries a unique `id`, a `title`, an optional
 *   `subtitle` with a per-tab `showSubtitle` override, `hasLeadingIcon`,
 *   `disabled`, and a `badges` array that takes precedence over the deprecated
 *   single-badge fields (`hasBadge`, `badgeCount`, `badgeType`, `badgeSize`,
 *   `badgeShowNumber`, `showLeadingBadgeIcon`).
 * @slot tab-<id>-icon - Leading icon slot for each tab (shown when `hasLeadingIcon` is true for that tab)
 * @slot tab-<id>-<iconSlotName> - Custom badge icon slot for each tab, one per badge that declares an `iconSlotName`. The deprecated single-badge path uses `tab-<id>-badge-icon`.
 * @fires {CustomEvent<{tab: TabData, id: string, index: number}>} tab-selected - Fired when a tab is selected.
 * @fires {CustomEvent<{tab: TabData, id: string, index: number}>} tab-closed - Fired when a tab's close button is clicked.
 * @fires {CustomEvent<void>} add-new-tab - Fired when the "add new tab" button is clicked.
 * @stable
 */
@customElement('obc-tab-row')
export class ObcTabRow extends LitElement {
  @property({type: Array}) tabs: TabData[] = [];

  @property({type: String, attribute: 'selected-tab-id'}) selectedTabId = '';

  @property({type: Boolean, attribute: 'has-close'}) hasClose = false;

  @property({type: Boolean}) centerContent = false;

  @property({type: Boolean, reflect: true}) hug = false;

  @property({type: Boolean, attribute: 'show-subtitle'}) showSubtitle = false;

  @property({type: Boolean, attribute: 'has-add-new-tab'}) hasAddNewTab = false;

  @property({type: Boolean}) automaticActivation = false;

  @property({type: String}) label = 'Tabs';

  @state() private rovingTabId = '';

  private get navigableTabs(): TabData[] {
    return this.tabs.filter((tab) => !tab.disabled);
  }

  private get focusedTab(): ObcTabItem | null {
    const active = this.shadowRoot?.activeElement;
    return this.tabItems().find((item) => item === active) ?? null;
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    // A selection made elsewhere takes the tab stop with it, but not while the
    // user is arrowing through the tabs.
    if (changed.has('selectedTabId') && !this.focusedTab) {
      this.rovingTabId = this.selectedTabId;
    }
    if (changed.has('tabs') || changed.has('selectedTabId')) {
      this.refreshRovingTab();
    }
  }

  private refreshRovingTab() {
    const navigable = this.navigableTabs;
    if (navigable.some((tab) => tab.id === this.rovingTabId)) return;
    const selected = navigable.find((tab) => tab.id === this.selectedTabId);
    this.rovingTabId = selected?.id ?? navigable[0]?.id ?? '';
  }

  private async moveFocusTo(tabId: string) {
    this.rovingTabId = tabId;
    if (this.automaticActivation) {
      this.selectTab(tabId);
    }
    await this.updateComplete;
    this.tabItem(tabId)?.focus();
  }

  private tabItems(): ObcTabItem[] {
    return [
      ...(this.shadowRoot?.querySelectorAll<ObcTabItem>('obc-tab-item') ?? []),
    ];
  }

  private tabItem(tabId: string): ObcTabItem | null {
    return this.tabItems().find((item) => item.dataset.tabId === tabId) ?? null;
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Shadow-DOM retargeting reports every key from inside a tab as coming from
    // the tab itself, close button included, so read the original target.
    const origin = event.composedPath()[0];
    if (!(origin instanceof Element && origin.matches('[role="tab"]'))) {
      return;
    }

    const navigable = this.navigableTabs;
    const current = navigable.findIndex((tab) => tab.id === this.rovingTabId);
    if (current === -1 || navigable.length === 0) return;

    let target: TabData | undefined;
    switch (event.key) {
      case 'ArrowRight':
        target = navigable[(current + 1) % navigable.length];
        break;
      case 'ArrowLeft':
        target = navigable[(current - 1 + navigable.length) % navigable.length];
        break;
      case 'Home':
        target = navigable[0];
        break;
      case 'End':
        target = navigable[navigable.length - 1];
        break;
      default:
        return;
    }

    event.preventDefault();
    void this.moveFocusTo(target.id);
  }

  private handleFocusOut(event: FocusEvent) {
    const next = event.relatedTarget;
    const movedToAnotherTab =
      next instanceof Element && this.tabItems().includes(next as ObcTabItem);
    if (movedToAnotherTab) return;
    this.rovingTabId = this.selectedTabId;
    this.refreshRovingTab();
  }

  private selectTab(tabId: string) {
    const tabIndex = this.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;
    if (this.tabs[tabIndex].disabled) return;
    this.selectedTabId = this.tabs[tabIndex].id;
    this.rovingTabId = this.selectedTabId;
    this.dispatchEvent(
      new CustomEvent('tab-selected', {
        detail: {tab: this.tabs[tabIndex], id: tabId, index: tabIndex},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleTabClick(_: Event, tabId: string) {
    this.selectTab(tabId);
  }

  private handleTabClose(event: Event, tabId: string) {
    event.stopPropagation();
    const tabIndex = this.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;
    const removedTab = this.tabs[tabIndex];
    const closingFocusedTab =
      this.shadowRoot?.activeElement === this.tabItem(tabId);
    this.tabs = [
      ...this.tabs.slice(0, tabIndex),
      ...this.tabs.slice(tabIndex + 1),
    ];
    const follower = this.tabs[Math.min(tabIndex, this.tabs.length - 1)];
    if (removedTab.id === this.selectedTabId && follower) {
      this.selectedTabId = follower.id;
    }
    this.dispatchEvent(
      new CustomEvent('tab-closed', {
        detail: {tab: removedTab, id: removedTab.id, index: tabIndex},
        bubbles: true,
        composed: true,
      })
    );
    // Closing the focused tab removes the focused element, which would drop
    // focus to the document instead of leaving it in the row.
    if (closingFocusedTab && follower) {
      this.rovingTabId = follower.id;
      void this.updateComplete.then(() => this.tabItem(follower.id)?.focus());
    }
  }

  private handleAddNewTab() {
    this.dispatchEvent(
      new CustomEvent('add-new-tab', {bubbles: true, composed: true})
    );
  }

  private renderTab(tab: TabData, index: number) {
    const isFirst = index === 0;
    const previousTabSelected = this.selectedTabId === this.tabs[index - 1]?.id;
    const isChecked = tab.id === this.selectedTabId;
    const showSubtitle = tab.showSubtitle ?? this.showSubtitle;
    // Forward a light-DOM slot for every distinct `iconSlotName` declared by the
    // tab's badges (new `badges` array), plus the deprecated single badge-icon
    // slot. obc-tab-item renders `<slot name=${iconSlotName} slot="badge-icon">`
    // inside each badge, so obc-tab-row must project matching content into that
    // slot. Slots are namespaced by tab id to stay unique across the row.
    const badgeIconSlots = [
      ...new Set(
        (tab.badges ?? [])
          .map((badge) => badge.iconSlotName)
          .filter((slotName): slotName is string => slotName !== undefined)
      ),
    ];
    if (
      (tab.showLeadingBadgeIcon ?? false) &&
      !badgeIconSlots.includes('badge-icon')
    ) {
      badgeIconSlots.push('badge-icon');
    }
    return html`
      <obc-tab-item
        data-tab-id=${tab.id}
        .focusable=${tab.id === this.rovingTabId}
        .title=${tab.title}
        .subtitle=${tab.subtitle ?? ''}
        .showSubtitle=${showSubtitle}
        .checked=${isChecked}
        .hasClose=${this.hasClose}
        .hasLeadingIcon=${tab.hasLeadingIcon ?? true}
        .hasTitle=${true}
        .hasDivider=${!isFirst && !previousTabSelected}
        .hug=${this.hug}
        .centerContent=${this.centerContent}
        .disabled=${tab.disabled || false}
        .badges=${tab.badges ?? []}
        .hasBadge=${tab.hasBadge || false}
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
        ${badgeIconSlots.map(
          (slotName) => html`
            <slot name="tab-${tab.id}-${slotName}" slot=${slotName}>
              <obi-placeholder></obi-placeholder>
            </slot>
          `
        )}
      </obc-tab-item>
    `;
  }

  override render() {
    return html`
      <div class="wrapper">
        <div
          class="tablist"
          role="tablist"
          aria-label=${this.label}
          @keydown=${this.handleKeyDown}
          @focusout=${this.handleFocusOut}
        >
          ${repeat(
            this.tabs,
            (t) => t.id,
            (t, i) => this.renderTab(t, i)
          )}
        </div>
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

declare global {
  interface HTMLElementTagNameMap {
    'obc-tab-row': ObcTabRow;
  }
}
