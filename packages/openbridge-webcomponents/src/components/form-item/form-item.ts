import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-check-google.js';
import componentStyle from './form-item.css?inline';

/**
 * Variant types for `<obc-form-item>`.
 *
 * - `view` — Read-only text row with optional leading icon.
 * - `enabled-action-first` — Interactive checkbox on the left, text on the right.
 * - `filled-status-first` — Check-mark status icon on the left, text on the right.
 * - `enabled-action-last` — Text on the left, interactive checkbox on the right.
 * - `filled-status-last` — Text on the left, check-mark status icon on the right.
 * - `inactive` — Greyed-out, non-interactive text row.
 */
export enum FormItemType {
  View = 'view',
  EnabledActionFirst = 'enabled-action-first',
  FilledStatusFirst = 'filled-status-first',
  EnabledActionLast = 'enabled-action-last',
  FilledStatusLast = 'filled-status-last',
  Inactive = 'inactive',
}

/**
 * Event detail for the `change` event emitted by `<obc-form-item>`.
 */
export type ObcFormItemChangeEvent = CustomEvent<{
  checked: boolean;
}>;

/**
 * `<obc-form-item>` — A single form list-item row with multiple variant states.
 *
 * Displays a text row that can optionally include a checkbox (interactive) or a
 * check-mark icon (status indicator), a leading icon, a bottom divider, and an
 * error state. The layout and behaviour are controlled by the `type` property.
 *
 * ### Slots and Properties — dual API
 * - **`label` slot / `label` property:** Text content. Use the slot for rich text
 *   (e.g. `<span slot="label">CO<sub>2</sub> level</span>`); the `label` string
 *   property serves as fallback when no slot content is provided.
 * - **`icon` slot:** Leading icon, shown when `hasIcon` is `true`.
 *
 * ### Events
 * - `change` — Fired when the internal checkbox toggles (enabled-action-* types only).
 *   Detail: `{ checked: boolean }`.
 *
 * ### Example
 * ```html
 * <obc-form-item type="enabled-action-first" label="Enable autopilot"></obc-form-item>
 *
 * <obc-form-item type="view" hasIcon>
 *   <obi-placeholder slot="icon"></obi-placeholder>
 *   <span slot="label">CO<sub>2</sub> level</span>
 * </obc-form-item>
 * ```
 *
 * @slot label - Rich text content (falls back to `label` property).
 * @slot icon - Leading icon element.
 * @fires change {ObcFormItemChangeEvent} — Emitted when checkbox state changes.
 */
@customElement('obc-form-item')
export class ObcFormItem extends LitElement {
  /** Variant layout type. */
  @property({type: String}) type: FormItemType = FormItemType.View;

  /** Text label rendered as slot fallback content. */
  @property({type: String}) label = '';

  /** Whether the checkbox is checked or the status is active. */
  @property({type: Boolean}) checked = false;

  /** Disables interaction for enabled-action-* types. */
  @property({type: Boolean}) disabled = false;

  /** Whether to show the leading `icon` slot. */
  @property({type: Boolean}) hasIcon = false;

  /** Whether to show the error state (enabled-action-* types only). */
  @property({type: Boolean}) hasError = false;

  /** Error message text displayed below the row. */
  @property({type: String, attribute: 'error-text'}) errorText = '';

  /** Whether to render a bottom divider line. */
  @property({type: Boolean}) showDivider = false;

  private _toggleChecked() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {checked: this.checked},
      }) satisfies ObcFormItemChangeEvent
    );
  }

  private _handleCheckboxKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggleChecked();
    }
  }

  override render() {
    const isEnabledFirst = this.type === FormItemType.EnabledActionFirst;
    const isEnabledLast = this.type === FormItemType.EnabledActionLast;
    const isFilledFirst = this.type === FormItemType.FilledStatusFirst;
    const isFilledLast = this.type === FormItemType.FilledStatusLast;
    const isEnabled = isEnabledFirst || isEnabledLast;
    const showError = this.hasError && isEnabled;

    const checkboxTemplate = html`
      <div
        class=${classMap({
          'checkbox-box': true,
          checked: this.checked,
          disabled: this.disabled,
        })}
        role="checkbox"
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this._toggleChecked}
        @keydown=${this._handleCheckboxKeydown}
      >
        ${this.checked
          ? html`<obi-check-google class="checkbox-icon"></obi-check-google>`
          : nothing}
      </div>
    `;

    const checkIconTemplate = html`
      <obi-check-google class="form-item-check-icon"></obi-check-google>
    `;

    const iconSlot = this.hasIcon
      ? html`<div class="icon-container"><slot name="icon"></slot></div>`
      : nothing;

    const textSlot = html`<div class="text-container">
      <slot name="label">${this.label}</slot>
    </div>`;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
          error: showError,
          disabled: this.disabled,
        })}
      >
        ${this.showDivider ? html`<div class="divider"></div>` : nothing}
        <div class="content-row">
          ${isEnabledFirst ? checkboxTemplate : nothing}
          ${isFilledFirst ? checkIconTemplate : nothing} ${iconSlot} ${textSlot}
          ${isEnabledLast ? checkboxTemplate : nothing}
          ${isFilledLast ? checkIconTemplate : nothing}
        </div>
        ${showError && this.errorText
          ? html`<div class="error-container">
              <span class="error-text">${this.errorText}</span>
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-form-item': ObcFormItem;
  }
}
