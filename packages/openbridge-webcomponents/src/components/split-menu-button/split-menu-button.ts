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
  /**
   * The label displayed on the main button
   */
  @property({type: String}) label = 'Split Button';

  /**
   * Whether the main button should show a leading icon slot
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * Array of menu options for the dropdown
   */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /**
   * Array of currently selected option values in the dropdown
   */
  @property({type: Array}) selectedValues: string[] = [];

  /**
   * The variant type of context menu to display in the dropdown
   */
  @property({type: String}) menuType: ContextMenuType = ContextMenuType.Regular;

  /**
   * Whether multiple selections are allowed in the dropdown
   */
  @property({type: Boolean}) multiSelect?: boolean;

  /**
   * Whether to show a title bar with close button in the dropdown
   */
  @property({type: Boolean}) hasTitleBar = false;

  /**
   * Title text for the dropdown menu
   */
  @property({type: String}) menuTitle = '';

  /**
   * Whether the split button should fill the full width of its container
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * Whether both parts of the button are disabled
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Open context menu dropdown top or bottom of the button
   */
  @property({type: Boolean}) openTop = false;

  @state() private isDropdownOpen = false;

  private handlePrimaryClick = (e: Event) => {
    e.stopPropagation();

    /**
     * Fired when the primary (left) button is clicked
     *
     * @event click
     * @type {CustomEvent<{action: 'primary'}>}
     */
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: {action: 'primary'},
      })
    );
  };

  private handleDropdownClick = (e: Event) => {
    e.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;

    /**
     * Fired when the dropdown (right) button is clicked
     *
     * @event click
     * @type {CustomEvent<{action: 'dropdown'}>}
     */
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: {action: 'dropdown'},
      })
    );

    if (this.isDropdownOpen) {
      // Close dropdown on outside click
      window.addEventListener('pointerdown', this.closeOnOutside);
    }
  };

  private closeOnOutside = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.isDropdownOpen = false;
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
     * Fired when the dropdown menu selection changes
     *
     * @event change
     * @type {CustomEvent<{selectedValues: string[], selectedOptions: ContextMenuOption[]}>}
     */
    this.dispatchEvent(new CustomEvent('change', {detail: e.detail}));
  }

  private handleMenuClose() {
    this.isDropdownOpen = false;
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
          'is-open': this.isDropdownOpen,
          'open-top': this.openTop,
        })}
      >
        <!-- Primary Button (Left Side) -->
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
                .multiSelect=${this.multiSelect}
                .hasTitleBar=${this.hasTitleBar}
                .title=${this.menuTitle}
                @change=${this.handleMenuChange}
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
    'obc-split-menu-button': ObcSplitMenuButton;
  }
}
