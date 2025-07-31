import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './input-chip.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-close-google.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-input-chip>` – A removable chip component for displaying labeled tokens, tags, or filter selections.
 *
 * Presents a compact, interactive element with a label and optional leading icon, commonly used to represent user input, selections, or applied filters. The chip can be removed via a close icon, supporting workflows where users manage lists of discrete items (such as tags, categories, or filter criteria).
 *
 * ---
 *
 * ### Features
 * - **Label:** Displays a text label representing the chip's content.
 * - **Removable:** Includes a trailing close icon button for removal; emits a custom event when removed.
 * - **Leading Icon (optional):** Supports an optional leading icon or avatar via slot, controlled by the `showIcon` property.
 * - **Disabled State:** Can be disabled to prevent interaction and removal.
 * - **Accessible:** Button element with appropriate ARIA labeling for assistive technologies.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-input-chip` to visually represent user selections, tags, or filters that can be individually removed. Ideal for input fields with autocomplete/tagging, filter bars, or anywhere a compact, removable token is needed. Avoid using for persistent, non-removable status indicators—use a static label or badge instead.
 *
 * **Synonyms:** tag, token, pill, filter chip, removable label.
 *
 * ---
 *
 * ### Slots
 * | Slot Name | Renders When...      | Purpose                                      |
 * |-----------|---------------------|----------------------------------------------|
 * | (default) | `showIcon` is true  | Leading icon/avatar for the chip (optional). |
 *
 * Place an icon or avatar in the default slot to display it at the start of the chip. The slot is only rendered if `showIcon` is true.
 *
 * ---
 *
 * ### Properties
 * - `label` (string): The text label displayed inside the chip.
 * - `disabled` (boolean): Disables the chip, preventing removal and interaction.
 * - `showIcon` (boolean): Controls whether the leading icon slot is shown. Defaults to true.
 *
 * ---
 *
 * ### Events
 * - `remove-chip` – Fired when the chip is removed (via close icon click). Event detail contains the chip's label.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Keep chip labels concise for best visual fit.
 * - Use the leading icon slot for context (e.g., user avatar, filter icon) only when it adds value.
 * - Disabled chips cannot be removed and appear visually inactive.
 * - Removal is triggered by clicking the close icon; listen for the `remove-chip` event to update your data model.
 * - For accessibility, ensure the `label` property accurately describes the chip's content.
 * - Do not use chips for critical alerts or persistent status—use banners or badges instead.
 *
 * ---
 *
 * ### Example:
 * ```html
 * <obc-input-chip label="Tag" showIcon>
 *   <obi-placeholder></obi-placeholder>
 * </obc-input-chip>
 * ```
 * In this example, the chip displays the label "Tag" with a leading icon and can be removed by clicking the close icon.
 *
 * ---
 *
 * **TODO(designer):** Confirm if there are recommended maximum label lengths or visual constraints for chip content.
 *
 * @slot - Default leading-icon slot (shown when `showIcon` is true)
 * @fires remove-chip {CustomEvent<{label: string}>} Fired when the chip is removed (via close icon click). Event detail contains the chip's label.
 */
@customElement('obc-input-chip')
export class ObcInputChip extends LitElement {
  /**
   * The text label displayed inside the chip.
   * Represents the chip's content (e.g., tag, filter, or token label).
   */
  @property({type: String}) label = 'Label';

  /**
   * Disables the chip, preventing removal and interaction.
   * When true, the chip appears visually inactive and cannot be removed.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Controls whether the leading icon slot is shown.
   * When true, displays the default slot for an icon/avatar at the start of the chip.
   * Defaults to true.
   */
  @property({type: Boolean, reflect: true}) showIcon = true;

  private handleRemove() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('remove-chip', {
        detail: {
          label: this.label,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderLeadingIcon() {
    console.log('renderLeadingIcon called, showIcon:', this.showIcon);
    if (this.showIcon) {
      return html`
        <div class="chip-icon-wrapper">
          <slot></slot>
        </div>
      `;
    }
    return html``;
  }

  override render() {
    console.log('render called, showIcon:', this.showIcon);
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'status-enabled': !this.disabled,
        })}
        @click=${this.handleRemove}
        ?disabled=${this.disabled}
        aria-label="Remove ${this.label}"
      >
        <div class="chip-container">
          ${this.renderLeadingIcon()}

          <div class="chip-label-container">
            <span class="chip-label">${this.label}</span>
          </div>

          <div class="chip-icon-wrapper">
            <obi-close-google class="chip-icon"></obi-close-google>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-input-chip': ObcInputChip;
  }
}
