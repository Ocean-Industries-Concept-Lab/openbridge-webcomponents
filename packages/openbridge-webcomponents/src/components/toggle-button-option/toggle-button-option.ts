import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './toggle-button-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcToggleButtonOptionType {
  icon = 'icon',
  text = 'text',
  iconTextUnder = 'icon-text-under',
  iconText = 'text-icon',
}

export enum ObcToggleButtonOptionVariant {
  flat = 'flat',
  regular = 'regular',
  normal = 'normal'
}

@customElement('obc-toggle-button-option')
export class ObcToggleButtonOption extends LitElement {
  /**
   * Value associated with this option. Used in selection events.
   */
  @property({type: String}) value = 'value';

  /**
   * Whether this option is currently selected (toggles visual state).
   */
  @property({type: Boolean, reflect: true}) selected = false;

  /**
   * Whether this option is currently activated (toggles visual state).
   */
  @property({type: Boolean, reflect: true}) activated = false;

  /**
   * Layout of icon and label.
   * One of: "icon", "text", "icon-text-under", "text-icon".
   * Controls which slots/content are displayed and their arrangement.
   */
  @property({type: String}) type = ObcToggleButtonOptionType.text;

  /**
   * The visual variant of the toggle button option.
   * One of: "flat", "regular", "normal".
   */
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;

  /**
   * If true, button width shrinks to fit label content.
   */
  @property({type: Boolean}) hugText = false;

  /**
   * If true, hides the divider between options.
   */
  @property({type: Boolean, reflect: true}) noDivider = false;

  /**
   * If true, the option is disabled and cannot be interacted with.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * If true, the option uses a larger size.
   */
  @property({type: Boolean, reflect: true}) large = false;

  /**
   * Fired when the option is clicked.
   * @fires selected {CustomEvent<{value: string}>}
   */
  onClick() {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('selected', {detail: {value: this.value}})
    );
  }

  override render() {
    const isInlineLabel =
      this.type === ObcToggleButtonOptionType.text ||
      this.type === ObcToggleButtonOptionType.iconText;
    const hasIcon = this.type !== ObcToggleButtonOptionType.text;
    const hasLabel = this.type !== ObcToggleButtonOptionType.icon;
    const isIconTextUnder =
      this.type === ObcToggleButtonOptionType.iconTextUnder;

    return html`
      <button
        class=${classMap({
          wrapper: true,
          selected: this.selected,
          'inline-label': isInlineLabel,
          'type-flat': this.variant === ObcToggleButtonOptionVariant.flat,
          'type-regular': this.variant === ObcToggleButtonOptionVariant.regular,
          'type-normal': this.variant === ObcToggleButtonOptionVariant.normal,
          'icon-text-under': isIconTextUnder,
          'hug-text': this.hugText,
          disabled: this.disabled,
          activated: this.activated,
          large: this.large
        })}
        ?disabled=${this.disabled}
        @click=${this.onClick}
      >
        <div class="visible-wrapper">
          ${hasIcon
            ? html`<div class="icon">
                <slot name="icon"></slot>
              </div>`
            : ''}
          ${hasLabel && !isIconTextUnder
            ? html`<div class="label"><slot></slot></div>`
            : ''}
        </div>
        ${hasLabel && isIconTextUnder
          ? html`<div class="label-container">
              <div class="label"><slot></slot></div>
            </div>`
          : ''}
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ObcToggleButtonOption;
  }
}
