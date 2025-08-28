import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './number-input-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcNumberInputAlignment {
  Center = 'center',
  Right = 'right',
  RightUnitOutside = 'right-unit-outside',
}

export enum ObcNumberInputState {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Error = 'error',
  Focused = 'focused',
  Typing = 'typing',
  Filled = 'filled',
}

@customElement('obc-number-input-field')
export class ObcNumberInputField extends LitElement {
  /**
   * The current value of the number input field.
   * Set this property to control the input's value programmatically.
   */
  @property({type: String}) value: string = '';

  /**
   * The unit text displayed with the number (e.g., "kg", "cm", "Unit").
   * Defaults to "Unit".
   */
  @property({type: String}) unit: string = 'Unit';

  /**
   * If true, displays the unit text alongside the value.
   * Defaults to true.
   */
  @property({type: Boolean}) hasUnit: boolean = true;

  /**
   * Controls the alignment of the input content.
   * - "center": Centers the value and unit
   * - "right": Right-aligns with unit inside
   * - "right-unit-outside": Right-aligns value with unit outside the input
   */
  @property({type: String}) alignment: ObcNumberInputAlignment = 
    ObcNumberInputAlignment.Right;

  /**
   * Controls the current state of the input field.
   * Affects styling and behavior.
   */
  @property({type: String}) state: ObcNumberInputState = 
    ObcNumberInputState.Enabled;

  /**
   * If true, displays helper text below the input.
   * Use the "helper-text" slot to provide the text content.
   */
  @property({type: Boolean}) hasHelperText: boolean = false;

  /**
   * If true, displays a leading icon before the input content.
   * Use the "leading-icon" slot to provide the icon.
   */
  @property({type: Boolean}) hasLeadingIcon: boolean = false;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @property({type: String}) placeholder: string = '';

  /**
   * If true, marks the input as required for form validation.
   */
  @property({type: Boolean}) required: boolean = false;

  /**
   * Internal state to track if the input is currently focused.
   */
  @property({type: Boolean, state: true}) private _isFocused: boolean = false;

  /**
   * Internal state to track if the user is currently typing.
   */
  @property({type: Boolean, state: true}) private _isTyping: boolean = false;

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this._isTyping = true;
    // Reset typing state after a short delay
    setTimeout(() => {
      this._isTyping = false;
    }, 1000);
  }

  onFocus(e: Event) {
    this._isFocused = true;
  }

  onBlur(e: Event) {
    this._isFocused = false;
    this._isTyping = false;
  }

  private get computedState(): ObcNumberInputState {
    if (this.state === ObcNumberInputState.Disabled) return ObcNumberInputState.Disabled;
    if (this.state === ObcNumberInputState.Error) return ObcNumberInputState.Error;
    if (this._isTyping) return ObcNumberInputState.Typing;
    if (this._isFocused) return ObcNumberInputState.Focused;
    if (this.value) return ObcNumberInputState.Filled;
    return ObcNumberInputState.Enabled;
  }

  override render() {
    const currentState = this.computedState;
    const isDisabled = currentState === ObcNumberInputState.Disabled;
    
    return html`
      <div 
        class=${classMap({
          wrapper: true,
          'has-helper-text': this.hasHelperText,
          [`alignment-${this.alignment}`]: true,
          [`state-${currentState}`]: true,
        })}
      >
        <div class="content">
          <div class="input-field-container" part="input-container">
            <div class="label-container">
              ${this.hasLeadingIcon && this.alignment !== ObcNumberInputAlignment.RightUnitOutside
                ? html`<div class="leading-icon" part="leading-icon">
                    <slot name="leading-icon"></slot>
                  </div>`
                : nothing}
              
              <div class="value-container">
                <input
                  type="number"
                  class="value-input"
                  .value=${this.value}
                  .placeholder=${this.placeholder}
                  ?disabled=${isDisabled}
                  ?required=${this.required}
                  @input=${this.onInput}
                  @focus=${this.onFocus}
                  @blur=${this.onBlur}
                  part="input"
                />
                ${currentState === ObcNumberInputState.Typing 
                  ? html`<div class="cursor-indicator"></div>` 
                  : nothing}
              </div>

              ${this.hasUnit && this.alignment !== ObcNumberInputAlignment.RightUnitOutside
                ? html`<div class="unit-container" part="unit-container">
                    <div class="unit-text">${this.unit}</div>
                  </div>`
                : nothing}
            </div>

            ${currentState === ObcNumberInputState.Focused
              ? html`<div class="focus-border" part="focus-border">
                  <div class="spacer-outer"></div>
                  <div class="focus-ring"></div>
                  <div class="spacer"></div>
                </div>`
              : nothing}
          </div>
        </div>

        ${this.hasUnit && this.alignment === ObcNumberInputAlignment.RightUnitOutside
          ? html`<div class="external-unit-container" part="external-unit">
              <div class="external-unit-text">${this.unit}</div>
            </div>`
          : nothing}

        ${this.hasHelperText
          ? html`<div class="helper-text" part="helper-text">
              <slot name="helper-text"></slot>
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-number-input-field': ObcNumberInputField;
  }
}
