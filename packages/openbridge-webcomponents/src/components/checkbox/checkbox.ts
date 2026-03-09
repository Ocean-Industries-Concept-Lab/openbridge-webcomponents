import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-check-mixed.js';
import '../../icons/icon-check-google.js';
import componentStyle from './checkbox.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
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
 * ### Overview
 * `<obc-checkbox>` is a selectable input for binary and mixed states.
 * It supports `checked`, `unchecked`, and `mixed` (indeterminate) status
 * and is intended for forms, lists, and settings.
 *
 * Keywords: checkbox, check box, tickbox, tri-state, indeterminate, select all.
 *
 * ### Features/Variants
 * - Three visual states: unchecked (default), checked, and mixed.
 * - Mixed state is for partial group selection and should be set programmatically.
 * - Disabled mode blocks interaction and applies disabled styling.
 * - Uses `<obi-check-google>` for checked and `<obi-check-mixed>` for mixed.
 *
 * ### Usage Guidelines
 * - Use for independent binary choices or group selection with an indeterminate parent.
 * - For mutually exclusive choices, use radio controls instead.
 * - If no visible label is used, provide accessible labeling (`aria-label`/`aria-labelledby`).
 *
 * ### Slots/Content
 * - No named slots; visible text comes from `label`.
 * - `status` (`checked` | `unchecked` | `mixed`) default `unchecked`.
 * - `disabled` (`boolean`) default `false`.
 * - `label` (`string`) default `"Checkbox item"`.
 * - `ariaDescribedBy` (`string`) reflected to `aria-describedby`.
 *
 * ### Events
 * - `change` with detail `{ status, disabled }`.
 * - `disabled` with detail `{ status, disabled }`.
 *
 * ### Best Practices
 * - Keep labels short and action-specific.
 * - Reserve mixed state for parent/group aggregation.
 *
 * ### Example
 * ```html
 * <obc-checkbox status="mixed" label="Select all items"></obc-checkbox>
 * ```
 *
 * @slot - No named slots. The label is provided via the `label` property.
 * @fires change {ObcCheckboxChangeEvent} - Emitted when the status changes.
 * @fires disabled {ObcCheckboxChangeEvent} - Emitted when the disabled state changes.
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

  private get _hasVisibleLabel() {
    return this.label.trim().length > 0;
  }

  override render() {
    const ariaLabel = this.getAttribute('aria-label') ?? undefined;
    const hostAriaLabelledBy =
      this.getAttribute('aria-labelledby') ?? undefined;
    const ariaLabelledBy = ariaLabel
      ? undefined
      : (hostAriaLabelledBy ??
        (this._hasVisibleLabel ? 'checkbox-label' : undefined));

    return html`
      <div
        class=${classMap({
          'visually-hidden': true,
          'label-hidden': !this._hasVisibleLabel,
        })}
      >
        <div
          class=${classMap({
            'checkbox-container': true,
            [`status-${this.status}`]: true,
            disabled: this.disabled,
            'label-hidden': !this._hasVisibleLabel,
          })}
          role="checkbox"
          aria-checked=${this._computedAriaChecked}
          aria-labelledby=${ifDefined(ariaLabelledBy)}
          aria-label=${ifDefined(ariaLabel)}
          aria-describedby=${ifDefined(this.ariaDescribedBy || undefined)}
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
          ${this._hasVisibleLabel
            ? html`<div class="checkbox-label-container">
                <span id="checkbox-label" class="checkbox-label">
                  ${this.label}
                </span>
              </div>`
            : nothing}
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
