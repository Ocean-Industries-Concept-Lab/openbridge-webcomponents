import {LitElement, html, nothing, unsafeCSS, TemplateResult} from 'lit';
import {property, state, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import componentStyle from './text-input-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-visibility-on-google.js';
import '../../icons/icon-visibility-off-google.js';

export type ObcTextInputFieldBlurEvent = CustomEvent<{value: string}>;

/**
 * Common HTML input types for practical use with `<obc-text-input-field>`.
 * Focuses on the most commonly used input types in real applications.
 */
export enum HTMLInputTypeAttribute {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Tel = 'tel',
  Url = 'url',
  Search = 'search',
  Date = 'date',
  Time = 'time',
}

export enum ObcTextInputFieldTextAlign {
  Left = 'left',
  Center = 'center',
}

export enum ObcTextInputFieldSize {
  Regular = 'regular',
  Large = 'large',
}

export enum ObcTextInputFieldPlacement {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

/**
 * `<obc-text-input-field>` – A text input field component with optional icons, label, and helper text.
 *
 *
 *
 * @slot leading-icon - Icon displayed before the input value (when `hasLeadingIcon` is true)
 * @slot label-icon - Icon displayed before the label text (when `hasLabelIcon` is true)
 * @slot helper-icon - Icon displayed before helper or error text (when `hasHelperIcon` is true)
 * @fires input - Standard input event on value change
 * @fires change - Standard change event on value change
 * @fires clear - Fired when the clear button is clicked
 * @fires blur - Fired when the input field is blurred
 */
@customElement('obc-text-input-field')
export class ObcTextInputField extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) placeholder = '';
  @property({type: String}) type: HTMLInputTypeAttribute =
    HTMLInputTypeAttribute.Text;
  @property({type: String}) textAlign: ObcTextInputFieldTextAlign =
    ObcTextInputFieldTextAlign.Left;

  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean, reflect: true}) readonly = false;
  @property({type: Boolean, reflect: true}) error = false;
  @property({type: String}) errorText = '';
  /** If true, the input field will not update its value on focus */
  @property({type: Boolean}) rejectUpdatesOnFocus = false;
  /** If true, the value will only be initially set, and not updated on change */
  @property({type: Boolean}) rejectUpdates = false;

  /** Name attribute for form integration */
  @property({type: String}) name = '';

  /** Maximum number of characters allowed */
  @property({type: Number}) maxlength?: number;

  /** Minimum number of characters required */
  @property({type: Number}) minlength?: number;

  @property({type: String}) size: ObcTextInputFieldSize =
    ObcTextInputFieldSize.Regular;

  @property({type: Boolean}) hasLeadingIcon = false;

  /** Shows a clear button when the input has a value */
  @property({type: Boolean}) hasClearButton = false;

  @property({type: String}) helperText = '';

  @property({type: String}) label = '';
  @property({type: Boolean}) required = false;
  @property({type: Boolean}) hasLabelIcon = false;
  @property({type: String}) labelPlacement: ObcTextInputFieldPlacement =
    ObcTextInputFieldPlacement.Left;

  @property({type: Boolean}) hasHelperIcon = false;
  @property({type: String}) helperPlacement: ObcTextInputFieldPlacement =
    ObcTextInputFieldPlacement.Left;

  /** Internal state for password visibility toggle */
  @state() private passwordVisible = false;
  @state() private initialValue = '';
  @state() private hasFocus = false;

  @query('.value-input') private inputElement!: HTMLInputElement;

  override connectedCallback() {
    super.connectedCallback();
    this.initialValue = this.value;
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private onFocus() {
    this.hasFocus = true;
  }

  private onBlur() {
    this.hasFocus = false;
  }

  private handleClear(e: Event) {
    // Prevent label click from triggering unwanted focus behavior
    e.stopPropagation();

    this.value = '';
    this.dispatchEvent(
      new CustomEvent('clear', {bubbles: true, composed: true})
    );
    // Dispatch input and change events for consistency with native behavior
    this.dispatchEvent(
      new InputEvent('input', {bubbles: true, composed: true})
    );
    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));

    // Return focus to the input field
    this.inputElement?.focus();
  }

  private togglePasswordVisibility(e: Event) {
    // Prevent label click from triggering unwanted focus behavior
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
  }

  private getInputMode(): string {
    switch (this.type) {
      case HTMLInputTypeAttribute.Tel:
        return 'tel';
      case HTMLInputTypeAttribute.Email:
        return 'email';
      case HTMLInputTypeAttribute.Url:
        return 'url';
      case HTMLInputTypeAttribute.Search:
        return 'search';
      default:
        return 'text';
    }
  }

  private renderFooterText(
    text: string,
    isError: boolean
  ): TemplateResult | typeof nothing {
    if (!text) return nothing;
    return html`<div
      id="helper-text"
      class=${classMap({
        [isError ? 'error-text' : 'helper-text']: true,
        [`helper-placement-${this.helperPlacement}`]: true,
      })}
    >
      ${this.hasHelperIcon
        ? html`<div class="helper-icon"><slot name="helper-icon"></slot></div>`
        : nothing}
      ${text}
    </div>`;
  }

  private fireChangeEvent() {
    this.dispatchEvent(new CustomEvent('change'));
  }

  private get shouldUpdateValue(): boolean {
    return !(this.rejectUpdatesOnFocus && this.hasFocus);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') && !this.shouldUpdateValue) {
      this.value = this.inputElement.value;
    }
  }

  override render() {
    const hasHelperOrError =
      Boolean(this.helperText) || Boolean(this.error && this.errorText);
    const showClearButton =
      this.hasClearButton && this.value.length > 0 && !this.disabled;
    const isPasswordField = this.type === HTMLInputTypeAttribute.Password;
    const showPasswordToggle = isPasswordField && !this.disabled;
    const effectiveType =
      isPasswordField && this.passwordVisible
        ? HTMLInputTypeAttribute.Text
        : this.type;

    // Determine trailing button state for padding adjustment
    const hasTrailingButton = showPasswordToggle || showClearButton;
    const hasTwoTrailingButtons = showPasswordToggle && showClearButton;

    const shouldUpdateValue = !(this.rejectUpdatesOnFocus && this.hasFocus);
    let value = this.rejectUpdates ? this.initialValue : this.value;

    if (!shouldUpdateValue) {
      value = this.inputElement.value;
    }

    return html`
      <label
        class=${classMap({
          wrapper: true,
          [`align-${this.textAlign}`]: true,
          [`size-${this.size}`]: true,
          error: this.error,
          disabled: this.disabled,
          helpertext: hasHelperOrError,
          haslabel: Boolean(this.label),
          'has-trailing-button': hasTrailingButton,
          'has-two-trailing-buttons': hasTwoTrailingButtons,
        })}
      >
        ${this.label
          ? html`<div
              class=${classMap({
                'label-text-container': true,
                [`label-placement-${this.labelPlacement}`]: true,
              })}
            >
              ${this.hasLabelIcon
                ? html`<div class="label-icon">
                    <slot name="label-icon"></slot>
                  </div>`
                : nothing}
              <span class="label-text">${this.label}</span>
              ${this.required
                ? html`<div class="required-indicator"></div>`
                : nothing}
            </div>`
          : nothing}

        <div class="horizontal-container">
          <div class="input-field-container">
            ${this.hasLeadingIcon
              ? html`<div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>`
              : nothing}
            <div class="label-container">
              <input
                type=${effectiveType}
                inputmode=${this.getInputMode()}
                class="value-input"
                .value=${value}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                .placeholder=${this.placeholder}
                name=${ifDefined(this.name || undefined)}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                ?required=${this.required}
                maxlength=${ifDefined(this.maxlength)}
                minlength=${ifDefined(this.minlength)}
                aria-invalid=${this.error ? 'true' : 'false'}
                aria-describedby=${ifDefined(
                  hasHelperOrError ? 'helper-text' : undefined
                )}
                autocomplete="off"
                @input=${this.onInput}
                @change=${this.fireChangeEvent}
              />
            </div>
            ${showPasswordToggle
              ? html`<obc-icon-button
                  variant="flat"
                  class="trailing-icon-button"
                  @click=${this.togglePasswordVisibility}
                  aria-label=${this.passwordVisible
                    ? 'Hide password'
                    : 'Show password'}
                >
                  ${this.passwordVisible
                    ? html`<obi-visibility-off-google></obi-visibility-off-google>`
                    : html`<obi-visibility-on-google></obi-visibility-on-google>`}
                </obc-icon-button>`
              : nothing}
            ${showClearButton
              ? html`<obc-icon-button
                  variant="flat"
                  class="trailing-icon-button"
                  @click=${this.handleClear}
                  aria-label="Clear input"
                >
                  <obi-close-google></obi-close-google>
                </obc-icon-button>`
              : nothing}
          </div>
        </div>

        ${this.error && this.errorText
          ? this.renderFooterText(this.errorText, true)
          : this.renderFooterText(this.helperText, false)}
      </label>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-text-input-field': ObcTextInputField;
  }
}
