import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './tabbed-card.css?inline';
import {customElement} from '../../decorator.js';

export type ObcTabbedCardChangeEvent = CustomEvent<{
  tab: number;
}>;

/**
 * `<obc-tabbed-card>` – A card component that organizes content into multiple tabbed sections, allowing users to switch between views without leaving the current context.
 *
 * Displays a horizontal row of tabs at the top, each associated with a content panel below. Users can navigate between tabs using mouse or keyboard, with the active tab's content shown in the main area. This pattern is ideal for grouping related information or settings within a compact space.
 *
 * ---
 *
 * ### Features
 * - **Configurable Tab Count:** Supports 1–5 tabs, each with a custom title and content area.
 * - **Flexible Content Structure:**
 *   - **Default Slot Mode:** When `hasDefaultSlotOnly` is true, all tab content is provided via the default slot, and the consumer is responsible for toggling content based on the selected tab.
 *   - **Named Slot Mode:** When `hasDefaultSlotOnly` is false (default), each tab uses its own named slots (`tab-title-x`, `tab-content-x`) for title and content.
 * - **Keyboard Navigation:** Supports Left/Right Arrow to move between tabs, Home/End to jump to first/last tab, following WAI-ARIA Tabs Pattern for accessibility.
 * - **Active Tab Highlighting:** Visually distinguishes the selected tab and its content panel.
 * - **Automatic Tab Activation:** Tabs activate on focus, streamlining keyboard navigation.
 * - **Responsive Layout:** Adapts to container width and height.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-tabbed-card` to present related content or controls in a compact, organized manner, such as settings panels, dashboards, or multi-step forms. Ideal when users need to switch between several views without navigating away from the current page. Avoid using tabs for unrelated content or when only a single view is needed.
 *
 * - For up to five tabs, supply each tab's title and content using the corresponding named slots.
 * - If you need to control tab content visibility yourself (e.g., for advanced state management), set `hasDefaultSlotOnly` and provide all content in the default slot.
 * - Keyboard users can navigate tabs using arrow keys, Home, and End.
 * - For best accessibility, keep tab titles concise and ensure content is meaningfully grouped.
 *
 * **TODO(designer):** Clarify if there are recommended limits for tab title length or content complexity, and if there are visual guidelines for tab overflow (more than five tabs).
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name         | Renders When...                | Purpose                                  |
 * |-------------------|-------------------------------|------------------------------------------|
 * | (default)         | `hasDefaultSlotOnly` is true   | All tab content (consumer toggles views) |
 * | tab-title-0       | Always                         | Title for the first tab                  |
 * | tab-content-0     | Always (unless default slot)   | Content for the first tab                |
 * | tab-title-1       | nTabs > 1                      | Title for the second tab                 |
 * | tab-content-1     | nTabs > 1                      | Content for the second tab               |
 * | tab-title-2       | nTabs > 2                      | Title for the third tab                  |
 * | tab-content-2     | nTabs > 2                      | Content for the third tab                |
 * | tab-title-3       | nTabs > 3                      | Title for the fourth tab                 |
 * | tab-content-3     | nTabs > 3                      | Content for the fourth tab               |
 * | tab-title-4       | nTabs > 4                      | Title for the fifth tab                  |
 * | tab-content-4     | nTabs > 4                      | Content for the fifth tab                |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `nTabs` (number): Number of tabs to display (default: 1). Determines how many tab-title/content slot pairs are rendered.
 * - `selectedTab` (number): Index of the currently selected tab (default: 0). Updates automatically on user interaction.
 * - `hasDefaultSlotOnly` (boolean): If true, only the default slot is rendered for tab content, and the consumer is responsible for toggling content based on the selected tab.
 *
 * ---
 *
 * ### Events
 * - `tab-change` – Fired whenever the selected tab changes, with detail `{tab: number}` indicating the new tab index.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Keep tab titles short for optimal display.
 * - Use tabs for closely related content; avoid mixing unrelated features in a single tabbed card.
 * - For accessibility, ensure each tab has a unique, descriptive title.
 * - Do not exceed five tabs for best usability; if more are needed, consider alternative navigation patterns.
 * - When using `hasDefaultSlotOnly`, ensure your content updates in sync with the `selectedTab` property.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-tabbed-card nTabs="3">
 *   <span slot="tab-title-0">Overview</span>
 *   <span slot="tab-title-1">Details</span>
 *   <span slot="tab-title-2">Settings</span>
 *
 *   <div slot="tab-content-0">Overview Content</div>
 *   <div slot="tab-content-1">Details Content</div>
 *   <div slot="tab-content-2">Settings Content</div>
 * </obc-tabbed-card>
 * ```
 *
 * In this example, three tabs are shown, each with its own title and content panel.
 *
 * @slot - Default slot for tab content (used only when `hasDefaultSlotOnly` is true)
 * @slot tab-title-0 - Title for the first tab
 * @slot tab-content-0 - Content for the first tab
 * @slot tab-title-1 - Title for the second tab
 * @slot tab-content-1 - Content for the second tab
 * @slot tab-title-2 - Title for the third tab
 * @slot tab-content-2 - Content for the third tab
 * @slot tab-title-3 - Title for the fourth tab
 * @slot tab-content-3 - Content for the fourth tab
 * @slot tab-title-4 - Title for the fifth tab
 * @slot tab-content-4 - Content for the fifth tab
 * @fires tab-change {CustomEvent<{tab:number}>} Fired when the selected tab changes
 */
@customElement('obc-tabbed-card')
export class ObcTabbedCard extends LitElement {
  /**
   * Number of tabs to display (1–5). Determines how many tab-title/content slot pairs are rendered.
   * @default 1
   */
  @property({type: Number}) nTabs: number = 1;

  /**
   * Index of the currently selected tab (zero-based). Updates automatically on user interaction.
   * @default 0
   */
  @property({type: Number}) selectedTab: number = 0;

  /**
   * If true, only the default slot is rendered for tab content, and the consumer is responsible for toggling content based on the selected tab.
   * When false (default), each tab uses its own named slots for title and content.
   * @default false
   */
  @property({type: Boolean}) hasDefaultSlotOnly: boolean = false;

  private _handleKeyDown(e: KeyboardEvent) {
    const targetButton = e.target as HTMLElement;
    if (!targetButton.classList.contains('tab-button')) return;

    const currentIndex = this.selectedTab;

    switch (e.key) {
      case 'ArrowRight':
        this.setSelectedTab((currentIndex + 1) % this.nTabs);
        break;
      case 'ArrowLeft':
        this.setSelectedTab((currentIndex - 1 + this.nTabs) % this.nTabs);
        break;
      case 'Home':
        this.setSelectedTab(0);
        break;
      case 'End':
        this.setSelectedTab(this.nTabs - 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    this._focusTab(this.selectedTab);
  }

  private setSelectedTab(index: number) {
    this.selectedTab = index;
    /**
     * Fired when the selected tab changes.
     * @fires tab-change {CustomEvent<{tab:number}>}
     */
    this.dispatchEvent(new CustomEvent('tab-change', {detail: {tab: index}}));
  }

  private _focusTab(index: number) {
    const button = this.shadowRoot?.querySelector(
      `button[data-index="${index}"]`
    ) as HTMLButtonElement;
    button?.focus();
  }

  private _generateTabHeaders() {
    return [...Array(this.nTabs)].map((_, index) => {
      const hasDivider =
        index !== this.nTabs - 1 &&
        this.selectedTab !== index &&
        index + 1 !== this.selectedTab;
      return html`
        <button
          class="tab-button ${hasDivider ? 'has-divider' : ''}"
          role="tab"
          aria-selected="${this.selectedTab === index}"
          aria-controls="panel-${index}"
          id="tab-${index}"
          data-index="${index}"
          tabindex="${this.selectedTab === index ? 0 : -1}"
          @click="${() => this.setSelectedTab(index)}"
          @focus="${() => this.setSelectedTab(index)}"
        >
          <span><slot name="tab-title-${index}">Tab ${index + 1}</slot></span>
        </button>
      `;
    });
  }

  private _generateTabPanels() {
    if (this.hasDefaultSlotOnly) {
      return html`<div
        role="tabpanel"
        class="tab-content"
        id="panel-${this.selectedTab}"
        aria-labelledby="tab-${this.selectedTab}"
        tabindex="0"
      >
        <slot></slot>
      </div>`;
    }
    return [...Array(this.nTabs)].map(
      (_, index) => html`
        <div
          role="tabpanel"
          id="panel-${index}"
          aria-labelledby="tab-${index}"
          tabindex="0"
          ?hidden="${this.selectedTab !== index}"
        >
          <slot name="tab-content-${index}"></slot>
        </div>
      `
    );
  }

  override render() {
    return html`
      <div class="tab-container" @keydown="${this._handleKeyDown}">
        <div class="tab-header" role="tablist" aria-label="Tab List">
          ${this._generateTabHeaders()}
        </div>
        <div class="tab-panels">${this._generateTabPanels()}</div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tabbed-card': ObcTabbedCard;
  }
}
