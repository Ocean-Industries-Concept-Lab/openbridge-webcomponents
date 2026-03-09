import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
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
 * - `mixed`: The checkbox is in an indeterminate state (typically used for
 *   parent checkboxes when some, but not all, child checkboxes are selected).
 */
export enum CheckboxStatus {
  unchecked = 'unchecked',
  checked = 'checked',
  mixed = 'mixed',
}

/**
 * Represents the visual interaction state of the checkbox.
 * - `enabled`: Default interactive state.
 * - `loading`: Shows loading spinner and locks interaction.
 */
export enum CheckboxState {
  enabled = 'enabled',
  loading = 'loading',
}

/**
 * The payload for `change` and `disabled` events emitted by `<obc-checkbox>`.
 * - `status`: The current checkbox status.
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
 * ### Features
 * - **Three‑state support:** Allows `checked`, `unchecked`, and `mixed` (indeterminate) status for parent/child
 *   selection scenarios.
 * - **Visual state support:** `state` allows `enabled` and `loading` visual behavior.
 * - **Disabled state:** Can be set to non‑interactive, visually indicating its disabled status.
 * - **Accessible:** Implements proper ARIA role and keyboard interaction (Space **or** Enter toggles state).
 * - **Touch target:** Uses a minimum 48x48 interactive area.
 * - **Icon display:** Uses `<obi-check-google>` for checked and `<obi-check-mixed>` for mixed states.
 * - **Loading display:** Uses an indeterminate spinner when `state="loading"`.
 *
 * ### Variants
 * - **Unchecked** (default): Empty checkbox.
 * - **Checked:** Filled checkbox with a check‑mark icon.
 * - **Mixed:** Partially filled checkbox with a mixed icon.
 * - **Loading:** Spinner is shown and interaction is locked.
 *
 * ### Usage Guidelines
 * - Use `obc-checkbox` for independent binary choices or when representing a group selection with a mixed state.
 * - For mutually exclusive choices, use a radio group instead.
 * - The **mixed** state should be applied by application logic; users should not toggle into or out of it directly.
 * - Use the `disabled` property to prevent interaction and visually indicate the option is unavailable.
 * - Use `state="loading"` for transient async state while preserving layout.
 * - If there is no visible external label, provide an `aria-label` or `aria-labelledby`.
 *
 * ### Properties and Attributes
 * - `status` (`checked` | `unchecked` | `mixed`) · *default:* `unchecked` – Controls the checkbox status.
 * - `state` (`enabled` | `loading`) · *default:* `enabled` – Controls the checkbox visual state.
 * - `disabled` (`boolean`) · Disables interaction and applies disabled styling.
 * - `aria-label` (`string`) · Accessible name for screen readers.
 * - `aria-labelledby` (`string`) · ID reference to an external visible label.
 * - `aria-describedby` (`string`) · ID reference(s) for supplementary description.
 *
 * ### Events
 * - `change` – Fired when the checkbox status changes.
 *   **detail:** `{ status, disabled }`
 * - `disabled` – Fired when the `disabled` property changes.
 *   **detail:** `{ status, disabled }`
 *
 * ### Example
 * ```html
 * <obc-checkbox
 *   status="mixed"
 *   state="enabled"
 *   aria-label="Select all items"
 * ></obc-checkbox>
 * ```
 *
 * @slot - No named slots.
 * @fires change {ObcCheckboxChangeEvent} – Emitted when the status changes.
 * @fires disabled {ObcCheckboxChangeEvent} – Emitted when the disabled state changes.
 */
@customElement('obc-checkbox')
export class ObcCheckbox extends LitElement {
  /**
   * Controls the checkbox status: `checked`, `unchecked`, or `mixed` (indeterminate).
   *
   * Defaults to `unchecked`.
   */
  @property({type: String}) status: CheckboxStatus = CheckboxStatus.unchecked;

  /**
   * Controls the visual state: `enabled` or `loading`.
   *
   * Defaults to `enabled`.
   */
  @property({type: String}) state: CheckboxState = CheckboxState.enabled;

  /**
   * Disables the checkbox and prevents user interaction.
   *
   * When `true`, the checkbox is visually styled as disabled and does not respond to user input.
   * Interaction is also locked when `state === loading`.
   */
  @property({type: Boolean}) disabled = false;

  /** Internal: disables hover effects on the checkbox. Used by wrapper components such as `obc-checkbox-item`. */
  @property({type: Boolean}) noHoverEffects = false;

  @query('.visually-hidden') private checkboxControl?: HTMLDivElement;

  private get _isInteractionLocked() {
    return this.disabled || this.state === CheckboxState.loading;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('disabled')) {
      this.dispatchEvent(
        new CustomEvent('disabled', {
          detail: {
            status: this.status,
            disabled: this.disabled,
          },
        })
      );
    }
  }

  private toggleStatus() {
    if (this._isInteractionLocked) return;

    if (this.status === CheckboxStatus.checked) {
      this.status = CheckboxStatus.unchecked;
    } else {
      this.status = CheckboxStatus.checked;
    }

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
    if (e.key === ' ' || e.key === 'Space' || e.key === 'Enter') {
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

  public override focus(options?: FocusOptions): void {
    this.checkboxControl?.focus(options);
  }

  private syncFocusVisibleAttribute() {
    const isFocusVisible = this.checkboxControl?.matches(':focus-visible');
    this.toggleAttribute('data-focus-visible', Boolean(isFocusVisible));
  }

  private handleControlFocus() {
    queueMicrotask(() => this.syncFocusVisibleAttribute());
  }

  private handleControlBlur() {
    this.removeAttribute('data-focus-visible');
  }

  override render() {
    const hostAriaLabel = this.getAttribute('aria-label') ?? undefined;
    const hostAriaLabelledBy =
      this.getAttribute('aria-labelledby') ?? undefined;
    const hostAriaDescribedBy =
      this.getAttribute('aria-describedby') ?? undefined;
    const forwardedAriaLabel = hostAriaLabelledBy
      ? undefined
      : (hostAriaLabel ?? 'Checkbox item');

    return html`
      <div
        class=${classMap({
          'visually-hidden': true,
          [`status-${this.status}`]: true,
          [`state-${this.state}`]: true,
          disabled: this.disabled,
          'no-hover-effects': this.noHoverEffects,
        })}
        role="checkbox"
        aria-checked=${this._computedAriaChecked}
        aria-label=${ifDefined(forwardedAriaLabel)}
        aria-labelledby=${ifDefined(hostAriaLabelledBy)}
        aria-describedby=${ifDefined(hostAriaDescribedBy)}
        aria-disabled=${this._isInteractionLocked ? 'true' : 'false'}
        aria-busy=${this.state === CheckboxState.loading ? 'true' : 'false'}
        tabindex=${this._isInteractionLocked ? '-1' : '0'}
        @click=${this.toggleStatus}
        @keydown=${this.handleKeydown}
        @focus=${this.handleControlFocus}
        @blur=${this.handleControlBlur}
      >
        <div class="checkbox-container">
          <div class="checkbox-box">
            ${this.state === CheckboxState.loading
              ? html`
                  <svg
                    class="checkbox-loading-spinner type-indeterminate size-small style-regular"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="6"></circle>
                  </svg>
                `
              : this.status === 'checked'
                ? html`<obi-check-google
                    class="checkbox-icon"
                  ></obi-check-google>`
                : this.status === 'mixed'
                  ? html`<obi-check-mixed
                      class="checkbox-icon"
                    ></obi-check-mixed>`
                  : html`<span class="checkbox-icon"></span>`}
          </div>
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
