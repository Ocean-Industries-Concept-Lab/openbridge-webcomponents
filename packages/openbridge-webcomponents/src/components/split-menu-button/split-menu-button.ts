import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './split-menu-button.css?inline';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import {segmentPosition} from '../button/button.js';
import '../../icons/icon-arrow-flyout-google.js';
import '../button/button.js';
import '../icon-button/icon-button.js';
import '../context-menu-button/context-menu-button.js';
import {
  ContextMenuType,
  ContextMenuOption,
  ColumnGroup,
} from '../context-menu-input/context-menu-input.js';

export type ObcSplitMenuButtonClickEvent = CustomEvent<{
  action: 'primary' | 'dropdown';
  value?: string;
  option?: ContextMenuOption;
}>;

export type ObcSplitMenuButtonChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<ContextMenuOption>;
}>;

@customElement('obc-split-menu-button')
export class ObcSplitMenuButton extends LitElement {
  /** The label displayed on the main button */
  @property({type: String}) label = 'Split Button';

  /** Whether the main button should show a leading icon slot */
  @property({type: Boolean}) hasIcon = false;

  /** Array of menu options for the dropdown */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /** Array of currently selected option values in the dropdown */
  @property({type: Array}) selectedValues: string[] = [];

  /** The variant type of context menu to display in the dropdown */
  @property({type: String}) menuType: ContextMenuType = ContextMenuType.Regular;

  /** Whether multiple selections are allowed in the dropdown */
  @property({type: Boolean}) multiSelect?: boolean;

  /** Allows single selection per group/column (matches context-menu-input) */
  @property({type: Boolean}) selectPerGroup?: boolean;

  /** Number of items per column in multi-column layouts */
  @property({type: Number}) itemsPerColumn: number = 5;

  /** Whether to show a title bar with close button in the dropdown */
  @property({type: Boolean}) hasTitleBar = false;

  /** Title text for the dropdown menu */
  @property({type: String}) menuTitle = '';

  /** Whether the split button should fill the full width of its container */
  @property({type: Boolean}) fullWidth = false;

  /** Whether both parts of the button are disabled */
  @property({type: Boolean}) disabled = false;

  /** Open context menu dropdown top or bottom of the button */
  @property({type: Boolean}) openTop = false;

  @property({type: Array}) columnGroups: ColumnGroup[] = [];

  @property({type: Boolean}) persistSelection = true;

  @state() private isDropdownOpen = false;

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
    // Only update selection if persisting, or in multi-select
    if (this.persistSelection || this.isMultiSelect) {
      this.selectedValues = e.detail.selectedValues;
    }

    this.dispatchEvent(new CustomEvent('change', {detail: e.detail}));
    this.handleMenuClose();
  }

  private handleMenuClose = () => {
    this.isDropdownOpen = false;
    window.removeEventListener('pointerdown', this.closeOnOutside);
  };

  override disconnectedCallback() {
    window.removeEventListener('pointerdown', this.closeOnOutside);
    super.disconnectedCallback();
  }

  private get effectiveSelectPerGroup(): boolean {
    return (
      !this.isMultiSelect && !!this.selectPerGroup && !!this.persistSelection
    );
  }

  private get effectivePersistSelection(): boolean {
    return this.isMultiSelect ? true : !!this.persistSelection;
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
              .selectPerGroup=${this.effectiveSelectPerGroup}
              .persistSelection=${this.effectivePersistSelection}
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
    'obc-split-menu-button': ObcSplitMenuButton;
  }
}
