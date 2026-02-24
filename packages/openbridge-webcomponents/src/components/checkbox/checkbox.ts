import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-check-mixed.js';
import '../../icons/icon-check-google.js';
import componentStyle from './checkbox.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Represents the possible states of the checkbox.
 * - `unchecked`: The checkbox is not selected.
 * - `checked`: The checkbox is selected.
 * - `mixed`: The checkbox is in an indeterminate state (typically used for parent checkboxes when some, but not all, child checkboxes are selected).
 */
export enum CheckboxStatus {
  unchecked = 'unchecked',
  checked = 'checked',
  mixed = 'mixed',
}

/**
 * The payload for `change` and `disabled` events emitted by `<obc-checkbox>`.
 * - `status`: The current checkbox state.
 * - `disabled`: Whether the checkbox is currently disabled.
 */
export type ObcCheckboxChangeEvent = CustomEvent<{
  status: CheckboxStatus;
  disabled: boolean;
}>;

/**
 * `<obc-checkbox>` – A selectable input component for toggling a binary or mixed state.
 *
 * Provides a standard checkbox UI element that supports checked, unchecked, and mixed (indeterminate) states.
 * Designed for use in forms, lists, or settings where users need to select one or more options. The component is
 * accessible, keyboard‑navigable, and visually indicates its current state.
 *
 * ### Features
 * - **Three‑state support:** Allows `checked`, `unchecked`, and `mixed` (indeterminate) status for parent/child
 *   selection scenarios.
 * - **Disabled state:** Can be set to non‑interactive, visually indicating its disabled status.
 * - **Custom label:** Displays a configurable text label next to the checkbox.
 * - **Accessible:** Implements proper ARIA roles and keyboard interaction (Space **or** Enter toggles state).
 * - **Icon display:** Uses `<obi-check-google>` for checked and `<obi-check-mixed>` for mixed states.
 *
 * ### Variants
 * - **Unchecked** (default): Empty checkbox.
 * - **Checked:** Filled checkbox with a check‑mark icon.
 * - **Mixed:** Partially filled checkbox with a mixed icon – always set programmatically to reflect a partial
 *   selection of child items. User interaction toggles only between **checked** and **unchecked**.
 *
 * ### Usage Guidelines
 * - Use `obc-checkbox` for independent binary choices or when representing a group selection with a mixed state.
 * - For mutually exclusive choices, use a radio group instead.
 * - The **mixed** state should be applied by application logic; users should not toggle into or out of it directly.
 * - Use the `disabled` property to prevent interaction and visually indicate the option is unavailable.
 * - Provide a clear, concise `label` for each checkbox. If the visual label is omitted, supply an `aria-label` or
 *   link an external label element with `aria-labelledby`.
 *
 * ### Properties and Attributes
 * - `status` (`checked` | `unchecked` | `mixed`) · *default:* `unchecked` – Controls the checkbox state.
 * - `disabled` (`boolean`) · Disables interaction and applies disabled styling.
 * - `label` (`string`) · Visible label text.
 * - `ariaDescribedBy` (`string`) · ID reference for supplementary description – reflected to the
 *   `aria-describedby` attribute for screen readers.
 *
 * ### Events
 * - `change` – Fired when the checkbox state changes.
 *   **detail:** `{ status, disabled }`
 * - `disabled` – Fired when the `disabled` property changes.
 *   **detail:** `{ status, disabled }`
 *
 * ### Example
 * ```html
 * <obc-checkbox
 *   status="mixed"
 *   label="Select all items"
 * ></obc-checkbox>
 * ```
 *
 * @slot - No named slots. The label is provided via the `label` property.
 * @fires change {ObcCheckboxChangeEvent} – Emitted when the status changes.
 * @fires disabled {ObcCheckboxChangeEvent} – Emitted when the disabled state changes.
 */
@customElement('obc-checkbox')
export class ObcCheckbox extends LitElement {
  /**
   * Controls the checkbox state: `checked`, `unchecked`, or `mixed` (indeterminate).
   *
   * Defaults to `unchecked`.
   */
  @property({type: String}) status: CheckboxStatus = CheckboxStatus.unchecked;

  /**
   * Disables the checkbox and prevents user interaction.
   *
   * When `true`, the checkbox is visually styled as disabled and does not respond to user input.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Text label displayed next to the checkbox.
   *
   * This label is visible to users and should clearly describe the checkbox's purpose.
   * If omitted, provide an `aria-label` or use `aria-labelledby` for accessibility.
   */
  @property({type: String}) label = 'Checkbox item';

  /**
   * If true, interactive visual states (hover/pressed/focus) are rendered only
   * on the 24px checkbox box, while keeping the 48px touch target clickable.
   *
   * @default false
   */
  @property({type: Boolean, attribute: 'box-only-states'})
  boxOnlyStates = false;

  /**
   * ID reference(s) for additional descriptive text – reflected to `aria-describedby`.
   * Accepts a single ID or a space‑separated list.
   *
   * This helps screen readers provide extra context about the checkbox.
   */
  @property({type: String, attribute: 'aria-describedby', reflect: true})
  ariaDescribedBy = '';

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('disabled')) {
      /**
       * Fired when the `disabled` property changes.
       *
       * @event disabled
       * @type {ObcCheckboxChangeEvent}
       * @property {CheckboxStatus} status - The current checkbox state.
       * @property {boolean} disabled - Whether the checkbox is disabled.
       */
      this.dispatchEvent(
        new CustomEvent('disabled', {
          detail: {status: this.status, disabled: this.disabled},
        })
      );
    }
  }

  private toggleStatus() {
    if (this.disabled) return;

    if (this.status === CheckboxStatus.checked) {
      this.status = CheckboxStatus.unchecked;
    } else {
      this.status = CheckboxStatus.checked;
    }

    /**
     * Fired when the checkbox state changes.
     *
     * @event change
     * @type {ObcCheckboxChangeEvent}
     * @property {CheckboxStatus} status - The new checkbox state.
     * @property {boolean} disabled - Whether the checkbox is disabled.
     */
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          status: this.status,
          disabled: this.disabled,
        },
      })
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      this.toggleStatus();
    }
  }

  private get _computedAriaChecked() {
    switch (this.status) {
      case 'checked':
        return 'true';
      case 'mixed':
        return 'mixed';
      case 'unchecked':
      default:
        return 'false';
    }
  }
  override render() {
    const isLabelEmpty = this.label.trim().length === 0;

    return html`
      <div
        class=${classMap({
          'visually-hidden': true,
          'no-label': isLabelEmpty,
        })}
      >
        <div
          class=${classMap({
            'checkbox-container': true,
            [`status-${this.status}`]: true,
            disabled: this.disabled,
            'no-label': isLabelEmpty,
            'box-only-states': this.boxOnlyStates,
          })}
          role="checkbox"
          aria-checked=${this._computedAriaChecked}
          aria-labelledby="checkbox"
          aria-describedby=${this.ariaDescribedBy}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.toggleStatus}
          @keydown=${this.handleKeydown}
        >
          <div class="checkbox-box">
            ${this.status === 'checked'
              ? html`<obi-check-google
                  class="checkbox-icon"
                ></obi-check-google>`
              : this.status === 'mixed'
                ? html`<obi-check-mixed
                    class="checkbox-icon"
                  ></obi-check-mixed>`
                : html`<span class="checkbox-icon"></span>`}
          </div>
          ${isLabelEmpty
            ? ''
            : html`<div class="checkbox-label-container">
                <span id="checkbox-label" class="checkbox-label">
                  ${this.label}
                </span>
              </div>`}
        </div>
      </div>
    `;
  }

  static override styles = [unsafeCSS(componentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-checkbox': ObcCheckbox;
  }
}
