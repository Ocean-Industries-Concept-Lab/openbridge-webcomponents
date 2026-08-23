import {LitElement, html, nothing, unsafeCSS, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './stepper-box.css?inline';
import '../../icons/icon-down-iec.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-left-google.js';
import {customElement} from '../../decorator.js';
import '../number-input-field/number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldTextAlign,
} from '../number-input-field/number-input-field.js';

/**
 * The visual and behavioral variant of the stepper box.
 *
 * Uses up and down chevron icons for vertical adjustment.
 * Uses left and right chevron icons for horizontal adjustment.
 * Uses plus and minus icons for increment/decrement (default).
 */
export enum ObcStepperBoxType {
  upDown = 'up-down',
  leftRight = 'left-right',
  plusMinus = 'plus-minus',
}

/**
 * `<obc-stepper-box>` – A compact input control for incrementing or decrementing a value using step buttons.
 *
 * This component displays a value with optional unit and helper text, flanked by two icon buttons for adjusting the value up/down, left/right, or plus/minus depending on the selected type. It is typically used for numeric or enumerated value selection where direct text input is not required or desired.
 *
 * ### Features
 * - **Stepper Types:**
 *   - `plus-minus` (default): Shows plus and minus icons for increment/decrement.
 *   - `up-down`: Uses up and down chevron icons for vertical adjustment.
 *   - `left-right`: Uses left and right chevron icons for horizontal adjustment.
 * - **Value Display:**
 *   - Optional unit label via the `unit` property.
 * - **Helper Text:**
 *   - When `helperText` is set, displays additional helper or status text below the control.
 * - **Icon Buttons:**
 *   - Both increment and decrement actions are triggered by icon buttons, with icons adapting to the selected type.
 *
 * ### Usage Guidelines
 * Use `obc-stepper-box` for scenarios where users need to adjust a value in discrete steps, such as quantity pickers, setting numeric parameters, or cycling through options. It is ideal when you want to prevent invalid input and provide a clear, touch-friendly interface for value changes.
 *
 * ### Events
 * - `down` – Fired when the decrement (left or down) button is clicked.
 * - `up` – Fired when the increment (right or up) button is clicked.
 * - `input` – Fired while the user edits the number input field.
 * - `change` – Fired when the edit is committed, or when a step button is used.
 *
 * ### Best Practices
 * - Use the type that best matches the adjustment direction (e.g., `up-down` for vertical, `left-right` for horizontal, `plus-minus` for generic increment/decrement).
 * - Place concise values and units to maintain compact layout.
 * - Avoid using for free-form input; this is for step-based changes only.
 *
 * **Example:**
 * ```
 * <obc-stepper-box type="up-down" value="5" unit="kg" helperText="Set weight"></obc-stepper-box>
 * ```
 *
 * @property disabled - If true, the stepper box is disabled and the buttons are not clickable.
 * @property value - The current numeric value displayed in the field.
 *   Pass `null` to clear the value and show the `placeholder` instead.
 * @property min - Optional lower bound; decrement button disables at this value.
 * @property max - Optional upper bound; increment button disables at this value.
 * @property stepUp - Increment step size (default 1).
 * @property stepDown - Decrement step size (default 1).
 * @property unit - Unit text displayed inside the field.
 * @property helperText - Helper text displayed below the stepper. When set, the helper text is shown.
 * @property placeholder - Placeholder text shown when the input is empty.
 * @property readonly - If true, the input is non-editable; programmatic value changes still apply.
 * @fires {CustomEvent<{value: number}>} down - Fired when the decrement (left or down) button is clicked
 * @fires {CustomEvent<{value: number}>} up - Fired when the increment (right or up) button is clicked
 * @fires {CustomEvent<{value: string}>} input - Fired when the user types in the number input field
 * @fires {CustomEvent<{value: number | null}>} change - Fired when the edit is committed on blur, or when the increment/decrement buttons are used; programmatic assignment to `value` does not dispatch it
 * @stable
 */
@customElement('obc-stepper-box')
export class ObcStepperBox extends LitElement {
  /**
   * The visual and behavioral variant of the stepper box.
   * - `plus-minus` (default): Uses plus and minus icons.
   * - `up-down`: Uses up and down chevrons.
   * - `left-right`: Uses left and right chevrons.
   *
   * Changing this property updates the icons and directionality of the stepper buttons.
   */
  @property({type: String}) type: ObcStepperBoxType =
    ObcStepperBoxType.plusMinus;

  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: Number}) value: number | null = 1;

  @property({type: Number}) min?: number;

  @property({type: Number}) max?: number;

  @property({type: Number}) stepUp = 1;

  @property({type: Number}) stepDown = 1;

  @property({type: String}) unit = '';

  @property({type: String}) helperText = '';

  @property({type: String}) placeholder = '';

  @property({type: Boolean}) readonly = false;

  /** If true, the input field will not update its value on focus */
  @property({type: Boolean}) rejectUpdatesOnFocus = false;

  /** If true, the value will only be initially set, and not updated on change */
  @property({type: Boolean}) rejectUpdates = false;

  /** If true, the input field will not update its value if the value is the same as the previous value
   * This is useful to avoid React re-rendering to reset the value.
   */
  @property({type: Boolean}) rejectDuplicateUpdates = false;

  private get downDisabled(): boolean {
    return (
      this.disabled ||
      this.readonly ||
      this.value == null ||
      this.value <= (this.min ?? -Infinity)
    );
  }

  private get upDisabled(): boolean {
    return (
      this.disabled ||
      this.readonly ||
      this.value == null ||
      this.value >= (this.max ?? Infinity)
    );
  }

  override connectedCallback() {
    super.connectedCallback();
    this.syncDisabledAccessibility();
  }

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('disabled')) {
      this.syncDisabledAccessibility();
    }
  }

  private syncDisabledAccessibility() {
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  private clamp(value: number): number {
    return Math.min(
      Math.max(value, this.min ?? -Infinity),
      this.max ?? Infinity
    );
  }

  private normalizedStep(step: number): number {
    if (!Number.isFinite(step) || step <= 0) {
      return 1;
    }
    return step;
  }

  private get leftIcon() {
    if (this.type === ObcStepperBoxType.upDown) {
      return html`<obi-chevron-down-google></obi-chevron-down-google>`;
    } else if (this.type === ObcStepperBoxType.leftRight) {
      return html`<obi-chevron-left-google></obi-chevron-left-google>`;
    } else {
      return html`<obi-down-iec></obi-down-iec>`;
    }
  }

  private get rightIcon() {
    if (this.type === ObcStepperBoxType.upDown) {
      return html`<obi-chevron-up-google></obi-chevron-up-google>`;
    } else if (this.type === ObcStepperBoxType.leftRight) {
      return html`<obi-chevron-right-google></obi-chevron-right-google>`;
    } else {
      return html`<obi-up-iec></obi-up-iec>`;
    }
  }

  override render() {
    const showHelper = Boolean(this.helperText);

    return html`
      <div class="wrapper">
        <div class="display">
          <obc-icon-button
            cornerleft
            .showDivider=${false}
            ?disabled=${this.downDisabled}
            @click=${() => this.down()}
          >
            ${this.leftIcon}
          </obc-icon-button>
          <div class="field-wrapper">
            <obc-number-input-field
              squared
              .value=${this.value == null ? NaN : Number(this.value)}
              .unit=${this.unit}
              .placeholder=${this.placeholder}
              .textAlign=${ObcNumberInputFieldTextAlign.Center}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              .rejectUpdatesOnFocus=${this.rejectUpdatesOnFocus}
              .rejectUpdates=${this.rejectUpdates}
              .rejectDuplicateUpdates=${this.rejectDuplicateUpdates}
              @input=${this.onNumberFieldInput}
              @change=${this.onNumberFieldChange}
            ></obc-number-input-field>
          </div>
          <obc-icon-button
            cornerright
            .showDivider=${false}
            ?disabled=${this.upDisabled}
            @click=${() => this.up()}
          >
            ${this.rightIcon}
          </obc-icon-button>
        </div>
        ${showHelper
          ? html`<div class="helper-text">${this.helperText}</div>`
          : nothing}
      </div>
    `;
  }

  private onNumberFieldInput(e: Event) {
    const field = e.target as ObcNumberInputField;

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {value: field.displayValue},
        bubbles: true,
        composed: true,
      })
    );

    if (Number.isFinite(field.value)) {
      this.value = field.value;
    }
  }

  private onNumberFieldChange(e: Event) {
    const value = (e as CustomEvent<{value: number}>).detail.value;
    const committed = Number.isFinite(value) ? value : null;

    this.value = committed;
    this.dispatchChange(committed);
  }

  private dispatchChange(value: number | null) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value},
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Dispatches the `down` event when the decrement button is clicked.
   * @fires down
   */
  down() {
    if (this.downDisabled) {
      return;
    }
    const current = this.value as number;
    const newValue = this.clamp(current - this.normalizedStep(this.stepDown));
    this.value = newValue;
    this.dispatchEvent(
      new CustomEvent('down', {
        detail: {value: newValue},
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchChange(newValue);
  }

  /**
   * Dispatches the `up` event when the increment button is clicked.
   * @fires up
   */
  up() {
    if (this.upDisabled) {
      return;
    }
    const current = this.value as number;
    const newValue = this.clamp(current + this.normalizedStep(this.stepUp));
    this.value = newValue;
    this.dispatchEvent(
      new CustomEvent('up', {
        detail: {value: newValue},
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchChange(newValue);
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-stepper-box': ObcStepperBox;
  }
}
