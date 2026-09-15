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

/** Product of the CSS `zoom` of the element and every ancestor, across shadow roots. */
function cssZoomOf(element: Element): number {
  let zoom = 1;
  let node: Element | null = element;
  while (node) {
    const value = Number.parseFloat(getComputedStyle(node).zoom);
    if (Number.isFinite(value) && value > 0) zoom *= value;
    const root = node.getRootNode();
    node =
      node.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
  }
  return zoom;
}
/**
 * `<obc-number-input-field>` – A specialized input field for numerical values with optional unit display.
 *
 * @availableWhen errorText error==true
 * @property rejectUpdatesOnFocus - If true, the input field will not update its value on focus
 * @property rejectUpdates - If true, the value will only be initially set, and not updated on change
 * @property rejectDuplicateUpdates - If true, the input field will not update its value if the value is the same as the previous value
 *   This is useful to avoid React re-rendering to reset the value.
 * @property name - Name attribute for form integration
 * @property maxlength - Maximum number of characters allowed
 * @property minlength - Minimum number of characters required
 * @availableWhen hasLabelIcon label!=''
 * @availableWhen labelPlacement label!=''
 * @availableWhen hasHelperIcon helperText!='' || (error==true && errorText!='')
 * @availableWhen helperPlacement helperText!='' || (error==true && errorText!='')
 * @property squared - Internal property for squared corners, used when input is used in stepper-box
 * @property displayOverride - Optional display text override for controlled consumers (e.g. keyboard-numeric)
 *   that manage formatted strings while the committed value may be NaN.
 * @property validationPattern - Optional regex pattern. When set, any keystroke or paste whose resulting
 *   value does not match this pattern is blocked at the `beforeinput` stage.
 *   When unset, a permissive numeric filter (digits, sign, active separators,
 *   whitespace) is applied instead.
 * @slot leading-icon - Icon displayed before the input value (when `hasLeadingIcon` is true)
 * @slot label-icon - Icon displayed before the label text (when `hasLabelIcon` is true)
 * @slot helper-icon - Icon displayed before helper or error text (when `hasHelperIcon` is true)
 * @fires {CustomEvent<{value: number}>} input - When the numeric value changes during editing
 * @fires {CustomEvent<{value: number}>} change - When the value is committed on blur
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
  @property({type: String}) errorText = '';
  @property({type: Boolean}) rejectUpdatesOnFocus = false;
  @property({type: Boolean}) rejectUpdates = false;

  @property({type: Boolean}) rejectDuplicateUpdates = false;

  @property({type: String}) name = '';

  @property({type: Number}) maxlength?: number;

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

  @property({type: Boolean}) squared = false;

  @property({type: String, attribute: false}) displayOverride = '';

  @property({type: String}) decimalSeparator?: string;
  @property({type: String}) groupSeparator?: string;
  @property({type: Number}) minFractionDigits = 0;
  @property({type: Number}) maxFractionDigits?: number | undefined;

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
    // A read-only field has nothing to edit, so it keeps its formatted display
    // instead of switching to the ungrouped editing representation.
    if (this.readonly) return;
    const source = this.displayOverride || this.displayText;
    this.displayText = removeGroupingFromDisplay(
      source,
      this.getFormatOptions()
    );
    this.displayOverride = '';
  }

  private onBlur() {
    this.hasFocus = false;
    if (this.readonly) return;
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
    if (!this.inputElement) return;
    e.stopPropagation();
  }

  private onClick(e: MouseEvent) {
    if (this.disabled) return;
    if (this.readonly) return;
    const input = this.inputElement;
    if (!input) return;
    // A click on the input is left to the browser: it derives the caret from the
    // real glyph metrics and stays correct under CSS zoom.
    if (e.composedPath().includes(input)) return;

    // Everywhere else in the field (label, unit, icon, padding) holds no text, so
    // anchor the caret to whichever end of the value was clicked towards. Decide
    // before focusing, which reformats the value and reflows the field.
    e.preventDefault();
    const toStart = this.clickedBeforeValue(e, input);
    input.focus();
    // Focusing swaps in the editing representation; setting `value` resets the
    // selection, so place the caret only once that render has landed.
    void this.updateComplete.then(() => {
      const caret = toStart ? 0 : input.value.length;
      input.setSelectionRange(caret, caret);
    });
  }

  /** Whether a click outside the input was aimed at the start of the value. */
  private clickedBeforeValue(e: MouseEvent, input: HTMLInputElement): boolean {
    const inputBox = input.getBoundingClientRect();

    // An element that sits beside the input answers this without pointer maths,
    // because both rects come from the same coordinate space.
    for (const node of e.composedPath()) {
      if (node === this) break;
      if (!(node instanceof Element)) continue;
      const box = node.getBoundingClientRect();
      if (box.width === 0) continue;
      if (box.right <= inputBox.left) return true;
      if (box.left >= inputBox.right) return false;
    }

    // Padding of an element that wraps the input, so only the pointer can say which
    // side it was. getBoundingClientRect() is zoom-adjusted on newer engines and
    // unzoomed on older ones, so calibrate the two spaces instead of assuming.
    const rectScale = input.offsetWidth
      ? inputBox.width / input.offsetWidth
      : 1;
    const rectToClient = rectScale ? cssZoomOf(input) / rectScale : 1;
    // A wrapper reaches above and below the value as well as beside it, so compare
    // against the middle of the value: the nearer end is the one that was aimed at.
    const middle = inputBox.left + inputBox.width / 2;
    return e.clientX < middle * rectToClient;
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
          readonly: this.readonly,
          empty: this.isEmpty,
          helpertext: hasHelperOrError,
          haslabel: Boolean(this.label),
          squared: this.squared,
        })}
        @pointerdown=${this.onPointerDown}
        @click=${this.onClick}
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
