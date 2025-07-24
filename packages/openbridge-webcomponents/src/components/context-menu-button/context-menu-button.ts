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

@customElement('obc-context-menu-button')
export class ObcContextMenuButton extends LitElement {
  /**
   * The label displayed on the button
   */
  @property({type: String}) label = '';

  /**
   * Array of menu options with value, label, and optional level, icon, and children.
   */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /**
   * Array of currently selected option values.
   */
  @property({type: Array}) selectedValues: string[] = [];

  /**
   * Whether the button should fill the full width of its container.
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * Whether the button should show an icon slot.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * The variant type of context menu to display.
   * @default ContextMenuType.Regular
   */
  @property({type: String})
  menuType: ContextMenuType = ContextMenuType.Regular;

  /**
   * Whether multiple selections are allowed.
   * Overrides the default selection mode for the chosen variant.
   * If not explicitly set, defaults based on menuType.
   */
  @property({type: Boolean}) multiSelect?: boolean;

  /**
   * Allows single selection per group (flyout only).
   * When true, only one item per group can be selected.
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
   */
  @property({type: Boolean}) hasTitleBar = false;

  /**
   * Title text displayed in the title bar (if `hasTitleBar` is true).
   */
  @property({type: String}) menuTitle = '';

  /**
   * Array of column groups for the `multi-with-subtitles` layout.
   */
  @property({type: Array}) columnGroups: ColumnGroup[] = [];

  /**
   * Number of items per column in multi-column layouts.
   */
  @property({type: Number}) itemsPerColumn = 5;

  /**
   * Render the dropout context menu top or bottom of the button.
   * If true, the menu opens above the button; otherwise, it opens below.
   */
  @property({type: Boolean}) openTop = false;

  /**
   * Whether both parts of the button are disabled.
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
    !this.isMultiSelect &&
    !!this.selectPerGroup &&
    !!this.persistSelection
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
