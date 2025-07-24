import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './context-menu-button.css?inline';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-arrow-flyout-google.js';
import '../button/button.js';
import '../context-menu-input/context-menu-input.js';
import {
  ContextMenuType,
  ContextMenuOption,
  ColumnGroup,
} from '../context-menu-input/context-menu-input.js';

export type ObcSplitMenuButtonChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<ContextMenuOption>;
}>;

export type ObcContextMenuButtonItemClickEvent = CustomEvent<{
  value: string;
  option: ContextMenuOption;
}>;

/**
 * `<obc-context-menu-button>` – A dropdown menu button for selecting one or more options from a contextual menu.
 *
 * Provides a button that opens a configurable context menu, supporting single or multi-select, nested/flyout submenus, and multi-column layouts. The button can display a label, an optional icon, and adapts to various menu types (regular, checkboxes, flyout, multi-column, etc.).
 *
 * Appears as a compact button that, when clicked, reveals a menu for actions, filtering, or grouped selections. Useful for toolbars, filter bars, or anywhere contextual actions or selections are needed without taking up persistent space.
 *
 * ## Features
 * - **Menu Types:** Supports multiple menu variants via `menuType`:
 *   - `Regular`: Standard single-select menu (action menu).
 *   - `Checkboxes`: Multi-select with checkboxes.
 *   - `NestedCheckboxes`: Hierarchical multi-select with nested checkboxes.
 *   - `Flyout`: Multi-level flyout menu (supports nested groups).
 *   - `Multi`: Multi-column menu (for large option sets).
 *   - `MultiWithSubtitles`: Multi-column menu with group subtitles.
 * - **Selection Modes:**
 *   - Single-select or multi-select (controlled by `multiSelect` and `menuType`).
 *   - Per-group selection (only one item per group/column, via `selectPerGroup`).
 *   - Optionally persist selection state (`persistSelection`).
 * - **Layout Options:**
 *   - Full width (`fullWidth`) or fit-content.
 *   - Menu can open above or below the button (`openTop`).
 *   - Multi-column and grouped layouts (`columnGroups`, `itemsPerColumn`).
 *   - Optional title bar with close button (`hasTitleBar`, `menuTitle`).
 * - **Content Customization:**
 *   - Optional icon slot in button (`hasIcon`).
 *   - Option icons and hierarchical/nested option structures.
 * - **Accessibility & Keyboard:**
 *   - Keyboard navigation and ARIA roles.
 *   - Disabled state disables both button and menu.
 * - **Events:**
 *   - Emits `change` when selection changes.
 *   - Emits `item-click` when an item is clicked.
 *   - Emits `close` when the menu closes.
 *
 * ## Usage Guidelines
 * Use `obc-context-menu-button` to present a compact button that reveals a contextual menu for actions, filtering, or grouped selections. Ideal for toolbars, filter bars, or overflow menus where space is limited but multiple or hierarchical options are needed. Choose the menu type and selection mode based on your use case:
 * - Use `menuType="Regular"` for simple single-action menus.
 * - Use `multiSelect` or `menuType="Checkboxes"` for multi-select scenarios (e.g., filtering).
 * - Use `menuType="Flyout"` for hierarchical or grouped actions.
 * - Use `menuType="Multi"` or `menuType="MultiWithSubtitles"` for large sets of options, grouped or split across columns.
 * - Use the icon slot for visual context (e.g., filter, settings, actions).
 * - Avoid using for persistent navigation—this is for contextual, transient actions or selections.
 *
 * **TODO(designer):** Confirm recommended use cases for each menu type and when to use per-group selection.
 *
 * ## Slots
 * | Slot Name | Renders When...      | Purpose                                 |
 * |-----------|---------------------|-----------------------------------------|
 * | `icon`    | `hasIcon` is true   | Icon displayed at the start of the button. |
 *
 * ## Properties & Attributes
 * - `label`: Text label shown on the button.
 * - `options`: Array of menu options (each with value, label, optional icon, children, etc.).
 * - `selectedValues`: Array of currently selected option values.
 * - `fullWidth`: If true, button stretches to fill its container.
 * - `hasIcon`: If true, shows the `icon` slot.
 * - `menuType`: Controls menu variant (see Features above). Defaults to `Regular`.
 * - `multiSelect`: If true, enables multi-select (overrides default for menuType).
 * - `selectPerGroup`: If true, only one selection per group/column (flyout/multi-column).
 * - `persistSelection`: If true, shows selection state for single-select items.
 * - `hasTitleBar`: If true, shows a title bar with close button in the menu.
 * - `menuTitle`: Title text for the menu (if `hasTitleBar` is true).
 * - `columnGroups`: Used for `multi-with-subtitles` layout; defines grouped columns.
 * - `itemsPerColumn`: Number of items per column in multi-column layouts.
 * - `openTop`: If true, menu opens above the button.
 * - `disabled`: Disables both the button and the menu.
 *
 * ## Events
 * - `change` – Fired when the menu selection changes (returns selected values and options).
 * - `item-click` – Fired when a menu item is clicked (returns value and option).
 * - `close` – Fired when the menu is closed.
 *
 * ## Best Practices & Constraints
 * - Only use multi-select for scenarios where users may need to select multiple items (e.g., filters, bulk actions).
 * - For action menus (single-select, no persistence), set `persistSelection` to false.
 * - Use per-group selection (`selectPerGroup`) for grouped flyout or multi-column menus where only one selection per group is allowed.
 * - Avoid nesting too deeply in flyout menus for usability.
 * - If using icons in options, supply them via the `icon` property of each option (e.g., `<obi-placeholder></obi-placeholder>`).
 * - The button is fully keyboard accessible and supports ARIA roles for menu and menuitem.
 * - Menu closes automatically on selection (unless in multi-select mode).
 *
 * ## Example
 * ```html
 * <obc-context-menu-button
 *   label="Actions"
 *   .options=${[
 *     { value: 'edit', label: 'Edit', icon: html`<obi-placeholder></obi-placeholder>` },
 *     { value: 'delete', label: 'Delete' }
 *   ]}
 *   .selectedValues=${['edit']}
 *   hasIcon
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-context-menu-button>
 * ```
 * In this example, the button displays an icon and label, and opens a menu with two options (one with an icon).
 *
 * @slot icon - Icon displayed at the start of the button when `hasIcon` is true.
 * @fires change {CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>} Fired when the menu selection changes.
 * @fires item-click {CustomEvent<{value: string, option: ContextMenuOption}>} Fired when a menu item is clicked.
 * @fires close {CustomEvent<void>} Fired when the menu is closed.
 */
@customElement('obc-context-menu-button')
export class ObcContextMenuButton extends LitElement {
  /**
   * The label displayed on the button.
   * If empty, the button can be rendered as icon-only.
   */
  @property({type: String}) label = '';

  /**
   * Array of menu options with value, label, and optional level, icon, and children.
   * Each option can include:
   * - `value`: Unique string identifier.
   * - `label`: Display text.
   * - `icon`: Optional icon (e.g., `<obi-placeholder></obi-placeholder>`).
   * - `children`: Optional array of child options (for nested/flyout menus).
   * - `level`: Optional nesting level (for hierarchical menus).
   */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /**
   * Array of currently selected option values.
   * Used to control which options are checked/selected in the menu.
   */
  @property({type: Array}) selectedValues: string[] = [];

  /**
   * Whether the button should fill the full width of its container.
   * If true, the button stretches to 100% width.
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * Whether the button should show an icon slot.
   * If true, the `icon` slot is rendered at the start of the button.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * The variant type of context menu to display.
   * Determines menu layout and selection behavior.
   * - `Regular`: Standard single-select.
   * - `Checkboxes`: Multi-select with checkboxes.
   * - `NestedCheckboxes`: Hierarchical multi-select.
   * - `Flyout`: Multi-level flyout menu.
   * - `Multi`: Multi-column menu.
   * - `MultiWithSubtitles`: Multi-column with group subtitles.
   * @default ContextMenuType.Regular
   */
  @property({type: String})
  menuType: ContextMenuType = ContextMenuType.Regular;

  /**
   * Whether multiple selections are allowed.
   * Overrides the default selection mode for the chosen variant.
   * If not explicitly set, defaults based on `menuType`.
   */
  @property({type: Boolean}) multiSelect?: boolean;

  /**
   * Allows single selection per group (flyout/multi-column only).
   * When true, only one item per group/column can be selected.
   */
  @property({type: Boolean}) selectPerGroup?: boolean;

  /**
   * Whether to show selected state for single-select items.
   * When true, single-select items will show as checked.
   * When false, they will just fire click events without showing selection.
   */
  @property({type: Boolean}) persistSelection = true;

  /**
   * Whether to show a title bar with close button at the top of the menu.
   * If true, the menu displays a title bar (use `menuTitle` for text).
   */
  @property({type: Boolean}) hasTitleBar = false;

  /**
   * Title text displayed in the title bar (if `hasTitleBar` is true).
   */
  @property({type: String}) menuTitle = '';

  /**
   * Array of column groups for the `multi-with-subtitles` layout.
   * Used to define grouped columns with subtitles in multi-column menus.
   */
  @property({type: Array}) columnGroups: ColumnGroup[] = [];

  /**
   * Number of items per column in multi-column layouts.
   * Used for `Multi` and `MultiWithSubtitles` menu types.
   */
  @property({type: Number}) itemsPerColumn = 5;

  /**
   * Render the dropdown context menu above or below the button.
   * If true, the menu opens above the button; otherwise, it opens below.
   */
  @property({type: Boolean}) openTop = false;

  /**
   * Whether both parts of the button are disabled.
   * Disables both the button and the menu.
   */
  @property({type: Boolean}) disabled = false;

  @state() private isOpen = false;

  private get effectiveMultiSelect(): boolean {
    if (this.multiSelect !== undefined) return this.multiSelect;

    // Auto-determine based on menuType only for types that are inherently multi-select
    return [
      ContextMenuType.Checkboxes,
      ContextMenuType.NestedCheckboxes,
      ContextMenuType.Multi,
      ContextMenuType.MultiWithSubtitles,
    ].includes(this.menuType);
  }

  private get effectiveMenuType(): ContextMenuType {
    // Only rewrite regular->checkboxes for multi, never flyout
    if (
      this.effectiveMultiSelect &&
      this.menuType === ContextMenuType.Regular
    ) {
      return ContextMenuType.Checkboxes;
    }
    // DO NOT map Flyout to NestedCheckboxes!
    return this.menuType;
  }

  private handleOpen = (e: Event) => {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      // Close on outside click
      window.addEventListener('pointerdown', this.closeOnOutside);
    }
  };

  private closeOnOutside = (e: Event) => {
    // Only close if click is not inside this component or its menu
    if (!this.contains(e.target as Node)) {
      this.isOpen = false;
      window.removeEventListener('pointerdown', this.closeOnOutside);
    }
  };

  private handleMenuChange(
    e: CustomEvent<{
      selectedValues: string[];
      selectedOptions: ContextMenuOption[];
    }>
  ) {
    // Update selected values if we're persisting selection
    if (this.persistSelection || this.effectiveMultiSelect) {
      this.selectedValues = e.detail.selectedValues;
    }

    /**
     * Fired when the menu selection changes.
     * @event change
     * @type {CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>}
     */
    this.dispatchEvent(new CustomEvent('change', {detail: e.detail}));

    const isFlyoutMenu = this.menuType === ContextMenuType.Flyout;

    // === NEW LOGIC: ===
    // If we're in flyout+multi mode, close on leaf selection
    if (isFlyoutMenu && this.effectiveMultiSelect) {
      // (Optional) Only close if a leaf was just toggled.
      // Find the last selected/removed value (not strictly needed for close-all)
      setTimeout(() => {
        this.handleMenuClose();
      }, 0);
      return;
    }

    // For flyout, don't close automatically (handled in @item-click for single-select)
    if (!isFlyoutMenu) {
      setTimeout(() => {
        this.handleMenuClose();
      }, 0);
    }
  }

  private handleItemClick(
    e: CustomEvent<{value: string; option: ContextMenuOption}>
  ) {
    /**
     * Fired when a menu item is clicked.
     * @event item-click
     * @type {CustomEvent<{value: string, option: ContextMenuOption}>}
     */
    const option = e.detail.option;
    if (option.children && option.children.length > 0) {
      console.log('Not closing menu for group:', option.label);
      return;
    }
    console.log('Closing for leaf:', option.label);

    const isFlyoutMenu =
      this.menuType === ContextMenuType.Flyout ||
      this.menuType === ContextMenuType.NestedCheckboxes;

    // Close for leaf items (in flyout menus)
    if (isFlyoutMenu) {
      setTimeout(() => {
        this.handleMenuClose();
      }, 0);
      return;
    }

    // For non-flyout menus, close after selection
    setTimeout(() => {
      this.handleMenuClose();
    }, 0);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleOpen(e);
    }
  };

  private handleMenuClose() {
    this.isOpen = false;
    window.removeEventListener('pointerdown', this.closeOnOutside);
    /**
     * Fired when the menu is closed.
     * @event close
     * @type {CustomEvent<void>}
     */
    this.dispatchEvent(new CustomEvent('close'));
  }

  override disconnectedCallback() {
    window.removeEventListener('pointerdown', this.closeOnOutside);
    super.disconnectedCallback();
  }

  private get isMultiSelect(): boolean {
    if (this.multiSelect !== undefined) return this.multiSelect;
    return [
      ContextMenuType.Checkboxes,
      ContextMenuType.NestedCheckboxes,
      ContextMenuType.Multi,
      ContextMenuType.MultiWithSubtitles,
    ].includes(this.menuType);
  }

  // Only meaningful if not multi-select AND persistSelection is true
  private get effectiveSelectPerGroup(): boolean {
    return (
      !this.isMultiSelect && !!this.selectPerGroup && !!this.persistSelection
    );
  }

  // For multi, always true; otherwise, use prop
  private get effectivePersistSelection(): boolean {
    return this.isMultiSelect ? true : !!this.persistSelection;
  }

  override render() {
    // Pass selected values only if we're persisting selection
    const selectedValues =
      this.persistSelection || this.effectiveMultiSelect
        ? this.selectedValues
        : [];

    return html`
      <div
        class=${classMap({
          wrapper: true,
          'full-width': this.fullWidth,
          'is-open': this.isOpen,
          'open-top': this.openTop,
          disabled: this.disabled,
        })}
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        aria-expanded=${this.isOpen}
        aria-haspopup="menu"
        @keydown=${this.handleKeydown}
      >
        <div class="visible-wrapper" @click=${this.handleOpen}>
          <div class="content-container">
            ${this.hasIcon
              ? html`
                  <div class="icon-container"><slot name="icon"></slot></div>
                `
              : nothing}
            ${this.label
              ? html` <div class="label-container">${this.label}</div> `
              : nothing}
          </div>
          <div class="arrow-flyout-container">
            <obi-arrow-flyout-google></obi-arrow-flyout-google>
          </div>
        </div>

        ${this.isOpen
          ? html`
              <obc-context-menu-input
                class="positioned-menu"
                .type=${this.effectiveMenuType}
                .options=${this.options}
                .selectedValues=${selectedValues}
                .multiSelect=${this.isMultiSelect}
                .selectPerGroup=${this.effectiveSelectPerGroup}
                .persistSelection=${this.effectivePersistSelection}
                .hasTitleBar=${this.hasTitleBar}
                .title=${this.menuTitle}
                .columnGroups=${this.columnGroups}
                .itemsPerColumn=${this.itemsPerColumn}
                @change=${this.handleMenuChange}
                @item-click=${this.handleItemClick}
                @close=${this.handleMenuClose}
              /></obc-context-menu-input>
            `
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu-button': ObcContextMenuButton;
  }
}
