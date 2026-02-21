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
 * ## Overview
 *
 * Displays a text row that can optionally include a checkbox (interactive) or a
 * check-mark icon (status indicator), a leading icon, a bottom divider, and an
 * error state. The layout and behaviour are controlled by the `type` property.
 *
 * ## Variants (`type` — {@link FormItemType}, default `FormItemType.View`)
 *
 * | Enum value                         | Description                                           |
 * | ---------------------------------- | ----------------------------------------------------- |
 * | `FormItemType.View`                | Read-only text row with optional leading icon.         |
 * | `FormItemType.EnabledActionFirst`  | Interactive checkbox on the left, text on the right.   |
 * | `FormItemType.FilledStatusFirst`   | Check-mark status icon on the left, text on the right. |
 * | `FormItemType.EnabledActionLast`   | Text on the left, interactive checkbox on the right.   |
 * | `FormItemType.FilledStatusLast`    | Text on the left, check-mark status icon on the right. |
 * | `FormItemType.Inactive`            | Greyed-out, non-interactive text row.                  |
 *
 * ## Usage Guidelines
 *
 * - Use inside an `<obc-form-group>` to build settings or checklist panels.
 * - Set `showDivider` on every item except the last to create a visually
 *   separated list.
 * - Set `hasIcon` to `true` **and** provide an `<obi-*>` element in the `icon`
 *   slot when a leading icon is needed; if `hasIcon` is `false` the slot is not
 *   rendered regardless of its content.
 * - `checked` reflects the checkbox/status state for enabled-action-* and
 *   filled-status-* types; it has no visible effect on `view` or `inactive` types.
 * - `disabled` prevents interaction and applies a dimmed style; only meaningful
 *   for enabled-action-* types.
 * - `hasError` and `errorText` are only rendered for enabled-action-* types.
 *
 * ## Slots
 *
 * | Slot name | Condition          | Description                                                    |
 * | --------- | ------------------ | -------------------------------------------------------------- |
 * | `label`   | always available   | Rich text content; falls back to the `label` property.         |
 * | `icon`    | `hasIcon === true` | Leading icon element (e.g. `<obi-placeholder slot="icon">`).   |
 *
 * ## Properties & Defaults
 *
 * | Property      | Type           | Default             | Description                                     |
 * | ------------- | -------------- | ------------------- | ----------------------------------------------- |
 * | `type`        | `FormItemType` | `FormItemType.View` | Variant layout type.                            |
 * | `label`       | `string`       | `''`                | Text label rendered as slot fallback content.    |
 * | `checked`     | `boolean`      | `false`             | Checkbox checked / status active state.          |
 * | `disabled`    | `boolean`      | `false`             | Disables interaction (enabled-action-* types).   |
 * | `hasIcon`     | `boolean`      | `false`             | Whether to render the leading `icon` slot.       |
 * | `hasError`    | `boolean`      | `false`             | Show error state (enabled-action-* types only).  |
 * | `errorText`   | `string`       | `''`                | Error message displayed below the row.           |
 * | `showDivider` | `boolean`      | `false`             | Render a bottom divider line.                    |
 *
 * ## Events
 *
 * - **`change`** — Fired when the internal checkbox toggles (enabled-action-*
 *   types only). Detail: `{ checked: boolean }` ({@link ObcFormItemChangeEvent}).
 *
 * ## Best Practices
 *
 * **Do:**
 * - Use the `label` slot for rich text (e.g. `CO<sub>2</sub>`); use the
 *   `label` property for plain strings.
 * - Pair `hasError` with a descriptive `errorText` so users know what to fix.
 * - Keep `showDivider` off on the last item in a group.
 *
 * **Don't:**
 * - Set `disabled` on non-action types — it has no visible effect.
 * - Combine `hasError` with `view`, `inactive`, or filled-status-* types — the
 *   error UI is only rendered for enabled-action-* variants.
 *
 * ## Example
 *
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
 * @keywords form item, list item, row, checkbox, toggle, status, label, icon, form control, option, divider, error, checklist, setting, config, switch
 */
@customElement('obc-form-item')
export class ObcFormItem extends LitElement {
  @property({type: String}) type: FormItemType = FormItemType.View;
  @property({type: String}) label = '';
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasError = false;
  @property({type: String, attribute: 'error-text'}) errorText = '';
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

    const checkIconTemplate = this.checked
      ? html`<obi-check-google class="form-item-check-icon"></obi-check-google>`
      : nothing;

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
