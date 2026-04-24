import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './split-button.css?inline';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import {segmentPosition} from '../button/button.js';
import '../../icons/icon-arrow-flyout-google.js';
import '../button/button.js';
import '../icon-button/icon-button.js';
import '../menu-button/menu-button.js';
import {
  ContextMenuType,
  ContextMenuOption,
  ColumnGroup,
} from '../context-menu-input/context-menu-input.js';
import type {ObcContextMenuInput} from '../context-menu-input/context-menu-input.js';

export type ObcSplitButtonClickEvent = CustomEvent<{
  action: 'primary' | 'dropdown';
  value?: string;
  option?: ContextMenuOption;
}>;

export type ObcSplitButtonChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<ContextMenuOption>;
}>;

/**
 * `<obc-split-button>` – A composite button component combining a primary action and a dropdown menu for additional actions or selections. Also known as a split button, segmented button, or action menu button.
 *
 * Provides a main button for a default/primary action and a secondary dropdown button that reveals a context menu with configurable options. This pattern allows users to quickly trigger a common action or select from a list of related actions or filters, improving workflow efficiency and reducing UI clutter.
 *
 * ### Features
 * - **Dual-action layout:** Combines a primary button (for the main action) and a dropdown button (for menu access) in a single horizontal control.
 * - **Configurable dropdown menu:** Supports multiple menu types via `menuType` (regular, checkboxes, flyout, multi-column, etc.) for different selection and grouping needs.
 * - **Multi-select and group selection:** Allows single or multiple selections in the dropdown, with optional grouping and per-group selection logic.
 * - **Customizable menu content:** Accepts an array of options or column groups, supports icons, subtitles, and multi-column layouts for complex menus.
 * - **Optional icon in primary button:** Add a leading icon to the main button using the `hasIcon` property and `icon` slot.
 * - **Title bar and menu title:** Optionally display a title bar with close button and custom title text in the dropdown.
 * - **Full width mode:** Can stretch to fill its container using the `fullWidth` property.
 * - **Disabled state:** Disables both the primary and dropdown buttons when `disabled` is true.
 * - **Dropdown positioning:** Menu can open above or below the button (`openTop`).
 * - **Selection persistence:** Optionally keeps the selected state visually persistent in the menu.
 * - **Keyboard and pointer accessibility:** Follows standard button and menu accessibility patterns.
 *
 * ### Variants (Menu Types)
 * - **Regular:** Standard single-selection dropdown menu.
 * - **Checkboxes:** Menu with checkboxes for multi-selection.
 * - **Flyout:** Hierarchical/flyout menu for nested actions.
 * - **Multi:** Multi-column menu for large sets of options.
 * - **MultiWithSubtitles:** Multi-column menu with grouped options and subtitles.
 * - See `ContextMenuType` enum for all supported menu types.
 *
 * ### Usage Guidelines
 * Use `obc-split-button` when you want to provide a primary action alongside a set of related secondary actions or filters, without overwhelming the main UI. Ideal for toolbars, filter bars, or any context where a default action is common but alternatives should be easily accessible. For example, use it for "Save" (primary) with "Save As..." and "Export" (dropdown), or for filter controls with quick presets.
 *
 * - Prefer this component over a standalone dropdown when a default action is expected to be used frequently.
 * - For menus with many options, use multi-column or grouped variants for better organization.
 * - If only a single action is needed, use a standard `<obc-button>` instead.
 * - For persistent or always-visible lists of actions, consider a toolbar or action list.
 * - **TODO(designer):** Confirm best practices for when to use multi-select vs. single-select, and any recommended limits on number of options or columns.
 *
 * ### Slots
 * | Slot Name   | Renders When...      | Purpose                                             |
 * |-------------|---------------------|-----------------------------------------------------|
 * | `icon`      | `hasIcon` is true   | Leading icon in the primary button (e.g., `<obi-placeholder></obi-placeholder>`) |
 *
 * ### Events
 * - `click` – Fired when either the primary or dropdown button is clicked. The event detail includes `{action: 'primary' | 'dropdown'}` to distinguish which part was activated.
 * - `change` – Fired when the menu selection changes. The event detail includes `{selectedValues, selectedOptions}`.
 *
 * ### Best Practices & Constraints
 * - Only use multi-select when the menu type and use case require it; otherwise, prefer single selection for clarity.
 * - Keep the primary action clear and distinct from dropdown actions.
 * - For accessibility, ensure all menu options have clear labels and, if using icons, provide appropriate alt text or aria-labels.
 * - Avoid overloading the dropdown with too many options; group or paginate if necessary.
 * - The dropdown menu closes automatically when an option is selected (unless it is a group/flyout parent).
 * - The component manages focus and pointer events to ensure proper menu closing when clicking outside.
 * - **TODO(designer):** Specify recommended icon usage, menu title conventions, and any animation/timing guidelines for menu opening/closing.
 *
 * ### Example:
 * ```html
 * <obc-split-button
 *   label="Save"
 *   .options=${[
 *     {value: 'save-as', label: 'Save As...'},
 *     {value: 'export', label: 'Export'},
 *   ]}
 *   hasIcon
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-split-button>
 * ```
 * In this example, the split button shows a "Save" action with a leading icon, and a dropdown menu with "Save As..." and "Export" options.
 *
 * @slot icon - Leading icon for the primary button (shown when `hasIcon` is true)
 * @fires click {ObcSplitButtonClickEvent} Fired when the primary or dropdown button is clicked.
 * @fires change {ObcSplitButtonChangeEvent} Fired when the dropdown menu selection changes.
 */
@customElement('obc-split-button')
export class ObcSplitButton extends LitElement {
  /**
   * The label displayed on the main (primary) button.
   */
  @property({type: String}) label = 'Split Button';

  /**
   * Whether the main button should show a leading icon slot.
   * When true, content in the `icon` slot is rendered before the label.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * Array of menu options for the dropdown.
   * Each option should be a `ContextMenuOption` object.
   * For grouped or multi-column menus, use `columnGroups` instead.
   */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /**
   * Array of currently selected option values in the dropdown.
   * Used to control the checked/selected state of menu items.
   */
  @property({type: Array}) selectedValues: string[] = [];

  /**
   * The variant type of context menu to display in the dropdown.
   * Accepts values from the `ContextMenuType` enum (e.g., 'regular', 'checkboxes', 'flyout', 'multi', 'multiWithSubtitles').
   */
  @property({type: String}) menuType: ContextMenuType = ContextMenuType.Regular;

  /**
   * Whether multiple selections are allowed in the dropdown.
   * If true, users can select more than one option (e.g., for checkboxes or multi-column).
   */
  @property({type: Boolean}) multiSelect?: boolean;

  /**
   * Allows single selection per group/column (matches context-menu-input).
   * When true, only one option can be selected per group/column.
   */
  @property({type: Boolean}) selectPerGroup?: boolean;

  /**
   * Number of items per column in multi-column layouts.
   * Used when `menuType` is 'multi' or 'multiWithSubtitles'.
   */
  @property({type: Number}) itemsPerColumn: number = 5;

  /**
   * Whether to show a title bar with close button in the dropdown.
   * When true, a title bar appears at the top of the menu.
   */
  @property({type: Boolean}) hasTitleBar = false;

  /**
   * Title text for the dropdown menu.
   * Displayed in the title bar when `hasTitleBar` is true.
   */
  @property({type: String}) menuTitle = '';

  /**
   * Whether the split button should fill the full width of its container.
   * When true, the component stretches horizontally.
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * Whether both parts of the button are disabled.
   * When true, disables both the primary and dropdown buttons.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Open context menu dropdown above (`true`) or below (`false`) the button.
   * Useful for placement near the bottom of the viewport.
   */
  @property({type: Boolean}) openTop = false;

  /**
   * Array of column group definitions for multi-column/grouped menus.
   * Use instead of `options` for grouped or subtitle layouts.
   */
  @property({type: Array}) columnGroups: ColumnGroup[] = [];

  @state() private isDropdownOpen = false;

  private restoreFocusOnClose = false;

  private menuFocusStrategy: 'first' | 'selected' | 'last' = 'selected';

  @query('obc-context-menu-input') private menu?: ObcContextMenuInput;

  @query('.dropdown-button') private dropdownButton?: HTMLElement;

  private handlePrimaryClick = (e: Event) => {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: {action: 'primary'},
      })
    );
  };

  private handleDropdownClick = (e: Event) => {
    e.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: {action: 'dropdown'},
      })
    );
    if (this.isDropdownOpen) {
      window.addEventListener('pointerdown', this.closeOnOutside);
      void this.focusMenuAfterOpen();
    } else {
      window.removeEventListener('pointerdown', this.closeOnOutside);
    }
  };

  private async focusMenuAfterOpen() {
    await this.updateComplete;
    if (!this.isDropdownOpen) return;

    if (this.menuFocusStrategy === 'last') {
      this.menu?.focusLastItem();
    } else if (this.menuFocusStrategy === 'first') {
      this.menu?.focusFirstItem();
    } else {
      this.menu?.focusSelectedItem();
    }

    this.menuFocusStrategy = 'selected';
  }

  private handleDropdownKeydown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.menuFocusStrategy = 'first';
        if (!this.isDropdownOpen) {
          this.isDropdownOpen = true;
          window.addEventListener('pointerdown', this.closeOnOutside);
          void this.focusMenuAfterOpen();
        } else {
          this.menu?.focusFirstItem();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.menuFocusStrategy = 'last';
        if (!this.isDropdownOpen) {
          this.isDropdownOpen = true;
          window.addEventListener('pointerdown', this.closeOnOutside);
          void this.focusMenuAfterOpen();
        } else {
          this.menu?.focusLastItem();
        }
        break;
      case 'Home':
        event.preventDefault();
        this.menuFocusStrategy = 'first';
        if (!this.isDropdownOpen) {
          this.isDropdownOpen = true;
          window.addEventListener('pointerdown', this.closeOnOutside);
          void this.focusMenuAfterOpen();
        } else {
          this.menu?.focusFirstItem();
        }
        break;
      case 'End':
        event.preventDefault();
        this.menuFocusStrategy = 'last';
        if (!this.isDropdownOpen) {
          this.isDropdownOpen = true;
          window.addEventListener('pointerdown', this.closeOnOutside);
          void this.focusMenuAfterOpen();
        } else {
          this.menu?.focusLastItem();
        }
        break;
      default:
        break;
    }
  };

  private closeOnOutside = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.isDropdownOpen = false;
      window.removeEventListener('pointerdown', this.closeOnOutside);
    }
  };

  private handleMenuItemClick = (e: CustomEvent) => {
    const {option} = e.detail;
    // For flyout, only close if it's a leaf (not a group)
    if (
      this.menuType === ContextMenuType.Flyout &&
      option.children &&
      option.children.length
    ) {
      return; // do not close if it's a group
    }
    // Close for all other options (including flyout leaves)
    this.handleMenuClose();
  };

  private get isMultiSelect(): boolean {
    if (this.multiSelect !== undefined) return this.multiSelect;
    return [
      ContextMenuType.Checkboxes,
      ContextMenuType.NestedCheckboxes,
      ContextMenuType.Multi,
      ContextMenuType.MultiWithSubtitles,
    ].includes(this.menuType);
  }

  private handleMenuChange(
    e: CustomEvent<{
      selectedValues: string[];
      selectedOptions: ContextMenuOption[];
    }>
  ) {
    this.selectedValues = e.detail.selectedValues;

    this.dispatchEvent(new CustomEvent('change', {detail: e.detail}));
    this.handleMenuClose();
  }

  private handleMenuClose = () => {
    this.restoreFocusOnClose = true;
    this.isDropdownOpen = false;
    window.removeEventListener('pointerdown', this.closeOnOutside);
    queueMicrotask(() => {
      if (this.restoreFocusOnClose) {
        this.restoreFocusOnClose = false;
        this.dropdownButton?.focus();
      }
    });
  };

  override disconnectedCallback() {
    window.removeEventListener('pointerdown', this.closeOnOutside);
    super.disconnectedCallback();
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'full-width': this.fullWidth,
          'is-open': this.isDropdownOpen,
          'open-top': this.openTop,
        })}
      >
        <obc-button
          class="primary-button"
          .variant=${'normal'}
          .segmentPosition=${segmentPosition.start}
          .showLeadingIcon=${this.hasIcon}
          .disabled=${this.disabled}
          @click=${this.handlePrimaryClick}
          .fullWidth=${this.fullWidth}
        >
          ${this.hasIcon
            ? html`<slot name="icon" slot="leading-icon"></slot>`
            : nothing}
          ${this.label}
        </obc-button>

        <obc-icon-button
          class="dropdown-button"
          .variant=${'normal'}
          .cornerRight=${true}
          .disabled=${this.disabled}
          .activated=${this.isDropdownOpen}
          @click=${this.handleDropdownClick}
          @keydown=${this.handleDropdownKeydown}
          aria-expanded=${this.isDropdownOpen}
          aria-haspopup="menu"
        >
          <obi-arrow-flyout-google></obi-arrow-flyout-google>
        </obc-icon-button>

        <!-- Context Menu -->
        ${this.isDropdownOpen && this.options.length > 0
          ? html`
            <obc-context-menu-input
              class="positioned-menu"
              .options=${this.options}
              .selectedValues=${this.selectedValues}
              .type=${this.menuType}
              .multiSelect=${this.isMultiSelect}
              .selectPerGroup=${true}
              .hasTitleBar=${this.hasTitleBar}
              .title=${this.menuTitle}
              .columnGroups=${this.columnGroups}
              .itemsPerColumn=${this.itemsPerColumn}
              @change=${this.handleMenuChange}
              @close=${this.handleMenuClose}
              @item-click=${this.handleMenuItemClick}
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
    'obc-split-button': ObcSplitButton;
  }
}
