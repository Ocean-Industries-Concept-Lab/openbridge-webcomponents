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
   * Name attribute for radio button groups (used in `radio` variant).
   */
  @property({type: String}) radioGroupName?: string;

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
    // No auto-conversion - use exactly what the user specified
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
    this.selectedValues = e.detail.selectedValues;

    /**
     * Fired when the menu selection changes.
     *
     * @event change
     * @type {CustomEvent<{selectedValues: string[], selectedOptions: ContextMenuOption[]}>}
     */
    this.dispatchEvent(new CustomEvent('change', {detail: e.detail}));
  }

  private handleItemClick(
    e: CustomEvent<{value: string; option: ContextMenuOption}>
  ) {
    /**
     * Fired when a menu item is clicked (before selection changes).
     *
     * @event item-click
     * @type {CustomEvent<{value: string, option: ContextMenuOption}>}
     */
    this.dispatchEvent(new CustomEvent('item-click', {detail: e.detail}));
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

  override render() {
  return html`
    <div
      class=${classMap({
        wrapper: true,
        'full-width': this.fullWidth,
        'is-open': this.isOpen,
        'open-top': this.openTop,
        disabled: this.disabled,
      })}
      @click=${this.handleOpen}
      role="button"
      tabindex=${this.disabled ? -1 : 0}
      aria-expanded=${this.isOpen}
      aria-haspopup="menu"
      @keydown=${this.handleKeydown}
    >
      <div class="visible-wrapper">
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
              .selectedValues=${this.selectedValues}
              .multiSelect=${this.effectiveMultiSelect}
              .selectPerGroup=${this.selectPerGroup}
              .hasTitleBar=${this.hasTitleBar}
              .title=${this.menuTitle}
              .columnGroups=${this.columnGroups}
              .itemsPerColumn=${this.itemsPerColumn}
              .radioGroupName=${this.radioGroupName}
              @change=${this.handleMenuChange}
              @item-click=${this.handleItemClick}
              @close=${this.handleMenuClose}
            ></obc-context-menu-input>
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
