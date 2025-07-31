import {LitElement, html, unsafeCSS} from 'lit';
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
 *   - Main value is provided via the default slot.
 *   - Optional unit label via the `unit` slot.
 * - **Helper Text:**
 *   - When `hasHelperText` is true, displays additional helper or status text below the control.
 * - **Icon Buttons:**
 *   - Both increment and decrement actions are triggered by icon buttons, with icons adapting to the selected type.
 * - **Customizable Layout:**
 *   - Supports flexible content via slots for value, unit, and helper text.
 *
 * ### Usage Guidelines
 * Use `obc-stepper-box` for scenarios where users need to adjust a value in discrete steps, such as quantity pickers, setting numeric parameters, or cycling through options. It is ideal when you want to prevent invalid input and provide a clear, touch-friendly interface for value changes.
 *
 * **TODO(designer):** Clarify if there are recommended min/max value handling, step size, or accessibility requirements for keyboard interaction.
 *
 * ### Slots
 * | Slot Name      | Renders When...           | Purpose                                 |
 * |--------------- |--------------------------|-----------------------------------------|
 * | (default)      | Always                    | Main value display (e.g., number/text). |
 * | unit           | If provided               | Unit label (e.g., "km", "%").           |
 * | helper-text    | If `hasHelperText` is set | Helper or status text below the control.|
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
 * <obc-stepper-box type="up-down" hasHelperText>
 *   <div>5</div>
 *   <div slot="unit">kg</div>
 *   <div slot="helper-text">Set weight</div>
 * </obc-stepper-box>
 * ```
 *
 * @slot - Main value display (default slot)
 * @slot unit - Unit label (e.g., "km", "%")
 * @slot helper-text - Helper or status text below the control (shown when `hasHelperText` is true)
 * @fires down {CustomEvent<void>} Fired when the decrement (left or down) button is clicked
 * @fires up {CustomEvent<void>} Fired when the increment (right or up) button is clicked
 */
export enum ObcStepperBoxType {
  upDown = 'up-down',
  leftRight = 'left-right',
  plusMinus = 'plus-minus',
}

/**
 * @property {ObcStepperBoxType} type
 * The visual and behavioral variant of the stepper box.
 * - `plus-minus` (default): Uses plus and minus icons.
 * - `up-down`: Uses up and down chevrons.
 * - `left-right`: Uses left and right chevrons.
 *
 * Changing this property updates the icons and directionality of the stepper buttons.
 */

/**
 * @property {boolean} hasHelperText
 * If true, displays the `helper-text` slot content below the control for additional guidance or status.
 */

@customElement('obc-stepper-box')
export class ObcStepperBox extends LitElement {
  @property({type: String}) type = ObcStepperBoxType.plusMinus;
  @property({type: Boolean}) hasHelperText = false;

  get leftIcon() {
    if (this.type === ObcStepperBoxType.upDown) {
      return html`<obi-chevron-down-google></obi-chevron-down-google>`;
    } else if (this.type === ObcStepperBoxType.leftRight) {
      return html`<obi-chevron-left-google></obi-chevron-left-google>`;
    } else {
      return html`<obi-down-iec></obi-down-iec>`;
    }
  }

  get rightIcon() {
    if (this.type === ObcStepperBoxType.upDown) {
      return html`<obi-chevron-up-google></obi-chevron-up-google>`;
    } else if (this.type === ObcStepperBoxType.leftRight) {
      return html`<obi-chevron-right-google></obi-chevron-right-google>`;
    } else {
      return html`<obi-up-iec></obi-up-iec>`;
    }
  }

  override render() {
    return html`
      <div class="wrapper">
        <obc-icon-button cornerleft @click=${() => this.down()}>
          ${this.leftIcon}
        </obc-icon-button>
        <div class="display">
          <div class="value">
            <slot></slot>
          </div>
          <div class="unit">
            <slot name="unit"></slot>
          </div>
        </div>
        <obc-icon-button cornerright @click=${() => this.up()}>
          ${this.rightIcon}
        </obc-icon-button>
      </div>
      ${this.hasHelperText
        ? html`<div class="helper-text"><slot name="helper-text"></slot></div>`
        : ''}
    `;
  }

  /**
   * Dispatches the `down` event when the decrement button is clicked.
   * @fires down
   */
  down() {
    this.dispatchEvent(new CustomEvent('down'));
  }

  /**
   * Dispatches the `up` event when the increment button is clicked.
   * @fires up
   */
  up() {
    this.dispatchEvent(new CustomEvent('up'));
  }
  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-stepper-box': ObcStepperBox;
  }
}
