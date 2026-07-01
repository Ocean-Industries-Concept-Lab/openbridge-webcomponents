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
import {
  formatNumberForDisplay,
  isAllowedIntermediateInput,
  NumberInputFormatOptions,
  parseNumberInput,
  removeGroupingFromDisplay,
  valuesEqual,
} from './number-input-format.js';
import {getCssVariableValue} from '../../charthelpers/colors.js';

export type ObcNumberInputFieldInputEvent = CustomEvent<{value: number}>;
export type ObcNumberInputFieldChangeEvent = CustomEvent<{value: number}>;

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

const characterWidth = 9.15199279785156;
const symbolWidth = 4.287994384765653;
const baseFontSize = 16;
/**
 * `<obc-number-input-field>` – A specialized input field for numerical values with optional unit display.
 *
 * @slot leading-icon - Icon displayed before the input value (when `hasLeadingIcon` is true)
 * @slot label-icon - Icon displayed before the label text (when `hasLabelIcon` is true)
 * @slot helper-icon - Icon displayed before helper or error text (when `hasHelperIcon` is true)
 * @fires input {CustomEvent<{value: number}>} When the numeric value changes during editing
 * @fires change {CustomEvent<{value: number}>} When the value is committed on blur
 * @stable
 */
@customElement('obc-number-input-field')
export class ObcNumberInputField extends LitElement {
  @property({type: Number}) value = NaN;
  @property({type: String}) unit = '';
  @property({type: String}) placeholder = '';
  @property({type: String}) textAlign: ObcNumberInputFieldTextAlign =
    ObcNumberInputFieldTextAlign.Right;

  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean, reflect: true}) readonly = false;
  @property({type: Boolean, reflect: true}) error = false;
  /** @availableWhen error==true */
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
  /** @availableWhen label!='' */
  @property({type: Boolean}) hasLabelIcon = false;
  /** @availableWhen label!='' */
  @property({type: String}) labelPlacement: ObcNumberInputFieldPlacement =
    ObcNumberInputFieldPlacement.Left;

  /** @availableWhen helperText!='' || (error==true && errorText!='') */
  @property({type: Boolean}) hasHelperIcon = false;
  /** @availableWhen helperText!='' || (error==true && errorText!='') */
  @property({type: String}) helperPlacement: ObcNumberInputFieldPlacement =
    ObcNumberInputFieldPlacement.Left;

  /** Internal property for squared corners, used when input is used in stepper-box */
  @property({type: Boolean}) squared = false;

  /**
   * Optional display text override for controlled consumers (e.g. keyboard-numeric)
   * that manage formatted strings while the committed value may be NaN.
   */
  @property({type: String, attribute: false}) displayOverride = '';

  @property({type: String}) decimalSeparator?: string;
  @property({type: String}) groupSeparator?: string;
  @property({type: Number}) minFractionDigits = 0;
  @property({type: Number}) maxFractionDigits?: number | undefined;

  /**
   * Optional regex pattern. When set, any keystroke or paste whose resulting
   * value does not match this pattern is blocked at the `beforeinput` stage.
   * When unset, a permissive numeric filter (digits, sign, active separators,
   * whitespace) is applied instead.
   */
  @property({type: String}) validationPattern = '';

  @state() private hasFocus = false;
  @state() private displayText = '';
  @state() private previousValue = NaN;
  @state() private previousDisplayText = '';
  @state() private lastCommittedValue = NaN;

  @query('.value-input') private inputElement?: HTMLInputElement;

  get displayValue(): string {
    return this.displayText;
  }

  private getFormatOptions(): NumberInputFormatOptions {
    return {
      decimalSeparator: this.decimalSeparator,
      groupSeparator: this.groupSeparator,
      minFractionDigits: this.minFractionDigits,
      maxFractionDigits: this.maxFractionDigits,
    };
  }

  private formatValueForDisplay(value: number): string {
    return formatNumberForDisplay(value, this.getFormatOptions());
  }

  private onInput(e: Event) {
    e.stopPropagation();
    const raw = (e.target as HTMLInputElement).value;
    this.displayText = raw;
    this.displayOverride = '';
    const parsed = parseNumberInput(raw);
    this.value = parsed;
    this.previousDisplayText = raw;
    this.updateCenterAlignedInputWidth(raw);
    this.dispatchInput();
  }

  private isProjectedValueAllowed(projected: string): boolean {
    if (this.validationPattern) {
      let regex: RegExp;
      try {
        // Anchor the consumer pattern so it must match the whole projected
        // value rather than any substring (e.g. `[0-9]` must not pass `a1`).
        regex = new RegExp(`^(?:${this.validationPattern})$`);
      } catch {
        // Invalid pattern: fall back to the numeric filter instead of
        // allowing arbitrary input.
        return isAllowedIntermediateInput(projected, this.getFormatOptions());
      }
      return regex.test(projected);
    }
    return isAllowedIntermediateInput(projected, this.getFormatOptions());
  }

  private onBeforeInput(e: InputEvent) {
    if (this.disabled || this.readonly) return;
    const input = e.target as HTMLInputElement;

    const incoming = e.data ?? e.dataTransfer?.getData('text/plain') ?? null;
    // Deletions, history, and formatting (`insertLineBreak`, `historyUndo`,
    // `deleteContentBackward`, etc.) have `data === null` and no transferable
    // text — always allow them.
    if (incoming === null) return;

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const projected =
      input.value.slice(0, start) + incoming + input.value.slice(end);

    if (!this.isProjectedValueAllowed(projected)) {
      e.preventDefault();
    }
  }

  private onFocus() {
    this.hasFocus = true;
    const source = this.displayOverride || this.displayText;
    this.displayText = removeGroupingFromDisplay(
      source,
      this.getFormatOptions()
    );
    this.displayOverride = '';
  }

  private onBlur() {
    this.hasFocus = false;
    this.commitDisplay();
    if (!valuesEqual(this.value, this.lastCommittedValue)) {
      this.lastCommittedValue = this.value;
      this.dispatchChange();
    }
  }

  private commitDisplay() {
    const trimmed = this.displayText.trim();
    if (trimmed === '') {
      this.value = NaN;
      this.displayText = '';
      this.displayOverride = '';
      return;
    }

    const forCommit = trimmed.replace(/[.,]$/, '');
    const parsed = parseNumberInput(forCommit);

    if (Number.isFinite(parsed)) {
      this.value = parsed;
      this.displayText = this.formatValueForDisplay(parsed);
    } else {
      this.value = NaN;
    }
    this.displayOverride = '';
  }

  private dispatchInput() {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {value: this.value},
      })
    );
  }

  private dispatchChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.value},
      })
    );
  }

  private get shouldUpdateValue(): boolean {
    if (this.rejectUpdates) return false;
    if (this.rejectUpdatesOnFocus && this.hasFocus) return false;
    if (
      this.rejectDuplicateUpdates &&
      valuesEqual(this.value, this.previousValue)
    ) {
      return false;
    }
    return true;
  }

  private getEffectiveDisplay(): string {
    if (this.displayOverride) {
      return this.displayOverride;
    }
    if (!this.shouldUpdateValue && this.inputElement) {
      return this.inputElement.value;
    }
    return this.displayText;
  }

  private updateCenterAlignedInputWidth(value: string) {
    if (this.textAlign !== ObcNumberInputFieldTextAlign.Center) {
      this.style.removeProperty('--obc-number-input-center-width');
      return;
    }

    const fontSize = Number.parseFloat(
      getCssVariableValue(
        this,
        '--global-typography-instrument-value-regular-font-size'
      )
    );

    const characters = value.replaceAll(/[.,]/g, '');
    const symbols = value.length - characters.length;
    // These values are based on the font size of 16px

    const calculatedWidth =
      characters.length * characterWidth + symbols * symbolWidth;

    const measuredWidth = Math.ceil(
      (calculatedWidth * fontSize) / baseFontSize
    );
    this.style.setProperty(
      '--obc-number-input-center-width',
      `${measuredWidth}px`
    );
  }

  override firstUpdated() {
    if (!this.displayText && !this.displayOverride) {
      this.displayText = this.formatValueForDisplay(this.value);
    }
    this.lastCommittedValue = this.value;
    this.updateCenterAlignedInputWidth(this.getEffectiveDisplay());
  }

  private get isEmpty(): boolean {
    if (this.inputElement) {
      return this.inputElement.value.trim().length === 0;
    }
    return isNaN(this.value);
  }

  override willUpdate(changedProperties: PropertyValues) {
    const formatPropsChanged =
      changedProperties.has('decimalSeparator') ||
      changedProperties.has('groupSeparator') ||
      changedProperties.has('minFractionDigits') ||
      changedProperties.has('maxFractionDigits');

    if (changedProperties.has('value') && this.shouldUpdateValue) {
      if (!this.hasFocus) {
        this.displayText = this.formatValueForDisplay(this.value);
        this.displayOverride = '';
        this.lastCommittedValue = this.value;
      }
    } else if (formatPropsChanged && !this.hasFocus && this.shouldUpdateValue) {
      this.displayText = this.formatValueForDisplay(this.value);
      this.displayOverride = '';
    }

    if (
      changedProperties.has('value') &&
      !this.shouldUpdateValue &&
      this.inputElement
    ) {
      this.value = parseNumberInput(this.inputElement.value);
    }
  }

  override updated() {
    if (
      this.rejectDuplicateUpdates &&
      !valuesEqual(this.value, this.previousValue) &&
      (this.previousDisplayText !== this.displayText || !this.hasFocus)
    ) {
      this.previousValue = this.value;
    }

    this.updateCenterAlignedInputWidth(this.getEffectiveDisplay());
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

  private onPointerDown(e: PointerEvent) {
    if (this.disabled) return;
    if (this.readonly) return;
    if (this.inputElement) {
      e.stopPropagation();
      e.preventDefault();
      this.inputElement.focus();
      const inputBox = this.inputElement.getBoundingClientRect();
      let selectionStart: number | undefined;
      if (e.clientX < inputBox.left) {
        // set marker at the left edge of the input
        selectionStart = 0;
      } else if (e.clientX > inputBox.right) {
        // set marker at the right edge of the input
        selectionStart = this.inputElement.value.length;
      } else {
        // set marker at the mouse position
        // Start from the right side of the input and move left until the mouse position is found
        // This is done to set the marker also at label touch.
        // Starts from the right since the label is right aligned.
        const mouseX = e.clientX;
        let inputX = inputBox.right;
        const text = this.inputElement.value;
        for (let i = text.length - 1; i >= 0; i--) {
          const char = text[i];
          const isSymbol = char.match(/[.,]/);
          const width = isSymbol ? symbolWidth : characterWidth;
          if (mouseX > inputX - width / 2) {
            selectionStart = i + 1;
            break;
          }
          inputX -= width;
        }
        if (selectionStart === undefined) {
          selectionStart = 0;
        }
      }
      this.inputElement.setSelectionRange(selectionStart, selectionStart);
    }
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

    const display = this.getEffectiveDisplay();

    return html`
      <label
        class=${classMap({
          wrapper: true,
          [`align-${this.textAlign}`]: true,
          [`size-${this.size}`]: true,
          error: this.error,
          disabled: this.disabled,
          empty: this.isEmpty,
          helpertext: hasHelperOrError,
          haslabel: Boolean(this.label),
          squared: this.squared,
        })}
        @pointerdown=${this.onPointerDown}
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
          <div class="input-field-container" part="input-field-container">
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
                .value=${display}
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
                @beforeinput=${this.onBeforeInput}
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
