import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './three-state-toggle-button.css?inline';
import '../../icons/icon-check-google.js';
import '../../icons/icon-close-google.js';

export enum ThreeStateValue {
  approve = 'approve',
  neutral = 'neutral',
  reject = 'reject',
}

export type ObcThreeStateToggleButtonValueChangeEvent = CustomEvent<{
  value: ThreeStateValue;
  previousValue: ThreeStateValue;
}>;

/**
 * `<obc-three-state-toggle-button>` – A tri-state toggle for approve, neutral, or reject selections.
 *
 * A compact, self-contained segmented control with exactly three predefined states. Each state has a
 * distinct visual treatment: reject (red with X icon), neutral (normal style with dot), and approve
 * (green with checkmark). Only one state can be active at a time. The default state is `neutral`.
 *
 * Unlike the general-purpose `<obc-toggle-button-group>`, this component has fixed options with
 * built-in semantic meaning and color coding, making it ideal for quick yes/no/maybe decisions
 * or approval workflows.
 *
 * ### Features
 *
 * - **Three fixed states:**
 *   - `reject` (left): Red background with X icon – indicates denial, rejection, or negative response.
 *   - `neutral` (center): Normal background with dot – indicates no decision, pending, or indeterminate state.
 *   - `approve` (right): Green background with checkmark – indicates acceptance, approval, or positive response.
 * - **Color-coded feedback:** Each state uses distinct background colors for immediate visual recognition.
 * - **Single selection:** Exactly one state is always selected; clicking the already-selected state has no effect.
 * - **Default state:** The component defaults to `neutral` if no `value` is specified.
 *
 * ### Usage Guidelines
 *
 * Use `<obc-three-state-toggle-button>` when you need a simple, compact control for ternary decisions.
 * It's ideal for scenarios where users must choose between positive, negative, or neutral/undecided options.
 *
 * **Ideal use cases:**
 * - Approval workflows (approve / pending / reject)
 * - Quick feedback controls (yes / maybe / no)
 * - Status indicators that can be toggled by the user
 * - Form fields requiring explicit three-way choices
 *
 * **When not to use:**
 * - For binary choices, use a switch or checkbox instead.
 * - For more than three options or custom labels, use `<obc-toggle-button-group>`.
 * - For non-semantic choices (e.g., view modes like list/grid/table), use `<obc-toggle-button-group>`.
 *
 * ### Events
 *
 * - `value` – Fired when the selected state changes. Event detail includes `{ value: ThreeStateValue, previousValue: ThreeStateValue }`.
 *   Listen to this event to react to user selections.
 *
 * ### Example
 *
 * ```html
 * <obc-three-state-toggle-button value="neutral"></obc-three-state-toggle-button>
 *
 * <!-- Listen for changes -->
 * <obc-three-state-toggle-button
 *   @value=${(e) => console.log('Selected:', e.detail.value)}
 * ></obc-three-state-toggle-button>
 * ```
 *
 * @fires value {CustomEvent<{value: ThreeStateValue, previousValue: ThreeStateValue}>} Fired when the selected value changes.
 */
@customElement('obc-three-state-toggle-button')
export class ObcThreeStateToggleButton extends LitElement {
  /**
   * The currently selected state value.
   *
   * One of `approve`, `neutral`, or `reject`. Defaults to `neutral`.
   * Setting this property programmatically updates the visual selection.
   * When the user clicks a different state, this property updates and a `value` event is fired.
   */
  @property({type: String}) value: ThreeStateValue = ThreeStateValue.neutral;

  private handleOptionClick(newValue: ThreeStateValue) {
    if (this.value === newValue) return;

    const previousValue = this.value;
    this.value = newValue;

    this.dispatchEvent(
      new CustomEvent('value', {
        detail: {value: newValue, previousValue},
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="outer-wrapper">
        <div class="wrapper" role="radiogroup">
          <button
            role="radio"
            aria-label="Reject"
            aria-checked=${this.value === ThreeStateValue.reject}
            class=${classMap({
              option: true,
              reject: true,
              selected: this.value === ThreeStateValue.reject,
            })}
            @click=${() => this.handleOptionClick(ThreeStateValue.reject)}
          >
            <div class="visible-wrapper">
              <div class="icon">
                <obi-close-google></obi-close-google>
              </div>
            </div>
          </button>
          <button
            role="radio"
            aria-label="Neutral"
            aria-checked=${this.value === ThreeStateValue.neutral}
            class=${classMap({
              option: true,
              neutral: true,
              selected: this.value === ThreeStateValue.neutral,
            })}
            @click=${() => this.handleOptionClick(ThreeStateValue.neutral)}
          >
            <div class="visible-wrapper">
              <div class="dot"></div>
            </div>
          </button>
          <button
            role="radio"
            aria-label="Approve"
            aria-checked=${this.value === ThreeStateValue.approve}
            class=${classMap({
              option: true,
              approve: true,
              selected: this.value === ThreeStateValue.approve,
            })}
            @click=${() => this.handleOptionClick(ThreeStateValue.approve)}
          >
            <div class="visible-wrapper">
              <div class="icon">
                <obi-check-google></obi-check-google>
              </div>
            </div>
          </button>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-three-state-toggle-button': ObcThreeStateToggleButton;
  }
}
