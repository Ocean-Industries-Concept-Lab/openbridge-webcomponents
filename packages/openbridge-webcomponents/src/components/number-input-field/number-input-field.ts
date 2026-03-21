import {
  LitElement,
  html,
  nothing,
  unsafeCSS,
  TemplateResult,
  PropertyValues,
} from 'lit';
import {property, state, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import componentStyle from './number-input-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcNumberInputFieldTextAlign {
  Center = 'center',
  Right = 'right',
  RightUnitOutside = 'right-unit-outside',
}

export enum ObcNumberInputFieldSize {
  Regular = 'regular',
  Large = 'large',
}

export enum ObcNumberInputFieldPlacement {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

/**
 * `<obc-number-input-field>` – A specialized input field for numerical values with optional unit display.
 *
 * @slot leading-icon - Icon displayed before the input value (when `hasLeadingIcon` is true)
 * @slot label-icon - Icon displayed before the label text (when `hasLabelIcon` is true)
 * @slot helper-icon - Icon displayed before helper or error text (when `hasHelperIcon` is true)
 * @fires input - Standard input event on value change
 */
@customElement('obc-number-input-field')
export class ObcNumberInputField extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) unit = '';
  @property({type: String}) placeholder = '';
  @property({type: String}) textAlign: ObcNumberInputFieldTextAlign =
    ObcNumberInputFieldTextAlign.Right;

  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean, reflect: true}) readonly = false;
  @property({type: Boolean, reflect: true}) error = false;
  @property({type: String}) errorText = '';
  /** If true, the input field will not update its value on focus */
  @property({type: Boolean}) rejectUpdatesOnFocus = false;
  /** If true, the value will only be initially set, and not updated on change */
  @property({type: Boolean}) rejectUpdates = false;

  /** If true, the input field will not update its value if the value is the same as the previous value
   * This is useful to avoid React re-rendering to reset the value.
   */
  @property({type: Boolean}) rejectDuplicateUpdates = false;

  /** Name attribute for form integration */
  @property({type: String}) name = '';

  /** Maximum number of characters allowed */
  @property({type: Number}) maxlength?: number;

  /** Minimum number of characters required */
  @property({type: Number}) minlength?: number;

  @property({type: String}) size: ObcNumberInputFieldSize =
    ObcNumberInputFieldSize.Regular;

  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: String}) helperText = '';

  @property({type: String}) label = '';
  @property({type: Boolean}) required = false;
  @property({type: Boolean}) hasLabelIcon = false;
  @property({type: String}) labelPlacement: ObcNumberInputFieldPlacement =
    ObcNumberInputFieldPlacement.Left;

  @property({type: Boolean}) hasHelperIcon = false;
  @property({type: String}) helperPlacement: ObcNumberInputFieldPlacement =
    ObcNumberInputFieldPlacement.Left;

  /** Internal property for squared corners, used when input is used in stepper-box */
  @property({type: Boolean}) squared = false;

  @state() private hasFocus = false;
  @state() private previousValue = '';
  @state() private previousInputElementValue = '';

  @query('.value-input') private inputElement?: HTMLInputElement;

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.previousInputElementValue = this.value;
  }

  private onFocus() {
    this.hasFocus = true;
  }

  private onBlur() {
    this.hasFocus = false;
  }

  private get shouldUpdateValue(): boolean {
    if (this.rejectUpdates) return false;
    if (this.rejectUpdatesOnFocus && this.hasFocus) return false;
    if (this.rejectDuplicateUpdates && this.value === this.previousValue) {
      return false;
    }
    return true;
  }

  override willUpdate(changedProperties: PropertyValues) {
    if (
      changedProperties.has('value') &&
      !this.shouldUpdateValue &&
      this.inputElement
    ) {
      this.value = this.inputElement.value;
    }
  }

  override updated() {
    if (
      this.rejectDuplicateUpdates &&
      this.value !== this.previousValue &&
      (this.previousInputElementValue !== this.value || !this.hasFocus)
    ) {
      this.previousValue = this.value;
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

  override render() {
    const hasHelperOrError =
      Boolean(this.helperText) || Boolean(this.error && this.errorText);
    const unitInside =
      this.unit &&
      this.textAlign !== ObcNumberInputFieldTextAlign.RightUnitOutside;
    const unitOutside =
      this.unit &&
      this.textAlign === ObcNumberInputFieldTextAlign.RightUnitOutside;

    let value = this.value;

    if (!this.shouldUpdateValue && this.inputElement) {
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
          squared: this.squared,
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
                type="text"
                inputmode="decimal"
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
              />
              ${unitInside
                ? html`<span class="unit-text">${this.unit}</span>`
                : nothing}
            </div>
          </div>
          ${unitOutside
            ? html`<span class="unit-text external">${this.unit}</span>`
            : nothing}
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
    'obc-number-input-field': ObcNumberInputField;
  }
}
