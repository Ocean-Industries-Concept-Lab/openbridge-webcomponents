import {LitElement, html, nothing, unsafeCSS, PropertyValues} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import compentStyle from './stepper-box.css?inline';
import '../../icons/icon-down-iec.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-left-google.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import '../number-input-field/number-input-field.js';
import {ObcNumberInputFieldTextAlign} from '../number-input-field/number-input-field.js';

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
 *   - Optional unit label via the `unit` slot.
 * - **Helper Text:**
 *   - When `helperText` is set, displays additional helper or status text below the control.
 * - **Icon Buttons:**
 *   - Both increment and decrement actions are triggered by icon buttons, with icons adapting to the selected type.
 * - **Customizable Layout:**
 *   - Supports flexible content via the `unit` slot.
 *
 * ### Usage Guidelines
 * Use `obc-stepper-box` for scenarios where users need to adjust a value in discrete steps, such as quantity pickers, setting numeric parameters, or cycling through options. It is ideal when you want to prevent invalid input and provide a clear, touch-friendly interface for value changes.
 *
 * ### Slots
 * | Slot Name      | Renders When...           | Purpose                                 |
 * |--------------- |--------------------------|-----------------------------------------|
 * | unit           | If provided               | Unit label (e.g., "km", "%").           |
 *
 * ### Events
 * - `down` – Fired when the decrement (left or down) button is clicked.
 * - `up` – Fired when the increment (right or up) button is clicked.
 *
 * ### Best Practices
 * - Use the type that best matches the adjustment direction (e.g., `up-down` for vertical, `left-right` for horizontal, `plus-minus` for generic increment/decrement).
 * - Place concise values and units to maintain compact layout.
 * - Avoid using for free-form input; this is for step-based changes only.
 *
 * **Example:**
 * ```
 * <obc-stepper-box type="up-down" .value=${5} helperText="Set weight">
 *   <div slot="unit">kg</div>
 * </obc-stepper-box>
 * ```
 *
 * @slot unit - Unit label (e.g., "km", "%")
 * @fires down {CustomEvent<{value: number}>} Fired when the decrement (left or down) button is clicked
 * @fires up {CustomEvent<{value: number}>} Fired when the increment (right or up) button is clicked
 * @fires input {CustomEvent<{value: string}>} Fired when the user types in the number input field
 * @fires change {CustomEvent<{value: number}>} Fired when the numeric value changes from any source
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

  /**
   * If true, the stepper box is disabled and the buttons are not clickable.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * The current numeric value displayed in the field.
   */
  @property({type: Number}) value = 1;

  /**
   * Optional lower bound; decrement button disables at this value.
   */
  @property({type: Number}) min?: number;

  /**
   * Optional upper bound; increment button disables at this value.
   */
  @property({type: Number}) max?: number;

  /**
   * Increment step size (default 1).
   */
  @property({type: Number}) stepUp = 1;

  /**
   * Decrement step size (default 1).
   */
  @property({type: Number}) stepDown = 1;

  /**
   * Unit text displayed inside the field. Overridden by the `unit` slot if assigned.
   */
  @property({type: String}) unit = '';

  /**
   * Helper text displayed below the stepper. When set, the helper text is shown.
   */
  @property({type: String}) helperText = '';

  /**
   * Placeholder text shown when the input is empty.
   */
  @property({type: String}) placeholder = '';

  /**
   * If true, the input is non-editable; programmatic value changes still apply.
   */
  @property({type: Boolean}) readonly = false;

  @queryAssignedElements({slot: 'unit'})
  private unitSlotElements!: Element[];

  private lastRawInput = '';

  private get hasUnitSlotContent(): boolean {
    return this.unitSlotElements.length > 0;
  }

  private get downDisabled(): boolean {
    return this.disabled || this.value <= (this.min ?? -Infinity);
  }

  private get upDisabled(): boolean {
    return this.disabled || this.value >= (this.max ?? Infinity);
  }

  private get fieldTextAlign(): ObcNumberInputFieldTextAlign {
    return this.hasUnitSlotContent
      ? ObcNumberInputFieldTextAlign.RightUnitOutside
      : ObcNumberInputFieldTextAlign.Right;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.lastRawInput = String(this.value);
  }

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this.lastRawInput = String(this.value);
    }
  }

  private clamp(value: number): number {
    return Math.min(
      Math.max(value, this.min ?? -Infinity),
      this.max ?? Infinity
    );
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
    const wrapperClasses = {
      wrapper: true,
      disabled: this.disabled,
    };

    const fieldWrapperClasses = {
      'field-wrapper': true,
      'has-unit-slot': this.hasUnitSlotContent,
    };

    const showHelper = Boolean(this.helperText);

    return html`
      <div class=${classMap(wrapperClasses)} aria-disabled=${this.disabled}>
        <div class="display">
          <obc-icon-button
            cornerleft
            ?disabled=${this.downDisabled}
            @click=${() => this.down()}
          >
            ${this.leftIcon}
          </obc-icon-button>
          <div class=${classMap(fieldWrapperClasses)}>
            <obc-number-input-field
              squared
              .value=${String(this.value)}
              .unit=${this.hasUnitSlotContent ? '' : this.unit}
              .placeholder=${this.placeholder}
              .textAlign=${this.fieldTextAlign}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              @input=${this.onNumberFieldInput}
              @focusout=${this.onNumberFieldBlur}
            ></obc-number-input-field>
            ${this.hasUnitSlotContent
              ? html`<div class="unit-slot"><slot name="unit"></slot></div>`
              : html`<slot name="unit" hidden></slot>`}
          </div>
          <obc-icon-button
            cornerright
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
    const input = e.target as HTMLInputElement;
    const raw = input.value;
    this.lastRawInput = raw;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {value: raw},
        bubbles: true,
        composed: true,
      })
    );

    if (raw.trim() === '') {
      return;
    }

    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return;
    }

    const previous = this.value;
    this.value = parsed;
    if (previous !== this.value) {
      this.dispatchChange(this.value);
    }
  }

  private onNumberFieldBlur(e: FocusEvent) {
    const next = e.relatedTarget;
    if (next instanceof Node && this.contains(next)) {
      return;
    }

    const parsed = Number(this.lastRawInput);
    const clamped = this.clamp(Number.isFinite(parsed) ? parsed : this.value);
    if (clamped !== this.value) {
      this.value = clamped;
      this.lastRawInput = String(this.value);
      this.dispatchChange(this.value);
    }
  }

  private dispatchChange(value: number) {
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
    const newValue = Math.max(
      this.value - this.stepDown,
      this.min ?? -Infinity
    );
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
    const newValue = Math.min(this.value + this.stepUp, this.max ?? Infinity);
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
