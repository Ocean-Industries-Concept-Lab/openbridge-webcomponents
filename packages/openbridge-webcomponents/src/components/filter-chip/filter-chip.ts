import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './filter-chip.css?inline';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-check-google.js';
import {customElement} from '../../decorator.js';

/**
 * The possible states for a filter chip: checked (selected) or unchecked (not selected).
 */
export enum ChipState {
  Unchecked = 'unchecked',
  Checked = 'checked',
}

/**
 * The event detail payload for the `chip-toggle` event, containing the chip's label and checked state.
 */
export type ObcFilterChipChangeEvent = CustomEvent<{
  label: string;
  checked: boolean;
}>;

/**
 * `<obc-filter-chip>` – A selectable filter chip (tag, pill, token) component for toggling filter states in lists, tables, or dashboards.
 *
 * Filter chips allow users to select or deselect filter criteria in a compact, interactive form. Commonly used for filtering datasets, search results, or categorizing content. Each chip acts as a toggle button, visually indicating its checked (active) or unchecked (inactive) state.
 *
 * ### Features
 * - **Checked/Unchecked States:** Visually distinct styles for selected (checked) and unselected (unchecked) chips.
 * - **Icon Support:** Always shows a check-mark icon when *checked*. The `showIcon` flag controls only the *leading* icon slot, regardless of checked state.
 * - **Label:** Displays a customizable label for the filter criterion.
 * - **Disabled State:** Can be disabled to prevent interaction.
 * - **Accessible:** Uses `role="checkbox"` and ARIA attributes for accessibility.
 * - **Custom Event:** Emits a `chip-toggle` event whenever the chip is toggled.
 *
 * ### Usage Guidelines
 * Use `obc-filter-chip` for interactive filtering controls, such as:
 * - Filtering tables, lists, or map overlays by category, status, or tag.
 * - Letting users quickly toggle multiple filter criteria on or off.
 * - Displaying active filters in a compact, easily scannable format.
 *
 * Chips are ideal for cases where multiple selections are allowed and the filter set is not too large. For single-choice selection, consider using radio buttons or a dropdown. For persistent, non-interactive tags, use a static label or badge instead.
 *
 * **Synonyms:** filter tag, pill, token, selection chip.
 *
 * ### Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always (if `showIcon` is true) | Leading icon representing the filter type/category. Place an icon element (e.g., `<obi-placeholder>`) here. When checked, a checkmark icon is also shown. |
 *
 * ### Properties
 * - `label` (string): The text label for the chip. Required for accessibility and clarity.
 * - `checked` (boolean): Whether the chip is currently selected (active). Toggles on click.
 * - `disabled` (boolean): If true, disables interaction and applies a muted style.
 * - `showIcon` (boolean): If true (default), always displays the leading icon in the slot.
 *
 * ### Events
 * - `chip-toggle` {ObcFilterChipChangeEvent} – Fired when the chip is toggled (checked or unchecked). Event detail includes `{label, checked}`.
 *
 * ### Best Practices
 * - Keep chip labels concise (ideally one or two words).
 * - Use icons to reinforce meaning, but avoid visual clutter.
 * - For accessibility, ensure each chip has a unique, descriptive label.
 * - Do not use chips for critical actions or destructive toggles.
 * - For large filter sets, consider grouping chips or using a dropdown.
 *
 * ### Example:
 * ```html
 * <obc-filter-chip label="Active" .checked=${true}>
 *   <obi-placeholder></obi-placeholder>
 * </obc-filter-chip>
 * ```
 * In this example, the chip is checked and displays a checkmark and a placeholder icon.
 *
 * @slot - Default leading-icon slot (shown when `showIcon` is true)
 * @fires chip-toggle {ObcFilterChipChangeEvent} - Fired when the chip is toggled.
 */
@customElement('obc-filter-chip')
export class ObcFilterChip extends LitElement {
  /**
   * Whether the chip is disabled (non-interactive). When true, the chip cannot be toggled and appears muted.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * The text label displayed on the chip. Should clearly describe the filter criterion.
   */
  @property({type: String}) label = 'Label';

  /**
   * Whether the chip is currently checked (selected/active). Toggles when the chip is clicked.
   */
  @property({type: Boolean}) checked = false;

  /**
   * Whether to show a leading icon. If true, displays the icon placed in the default slot.
   */
  @property({type: Boolean}) showIcon = false;

  private handleClick() {
    if (this.disabled) return;

    // Toggle state
    this.checked = !this.checked;

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('chip-toggle', {
        detail: {
          label: this.label,
          checked: this.checked,
        },
      })
    );
  }

  private renderLeadingIcon() {
    const icons = [];

    if (this.checked) {
      icons.push(html`
        <div class="chip-icon-wrapper">
          <obi-check-google class="chip-icon"></obi-check-google>
        </div>
      `);
    }

    if (this.showIcon) {
      icons.push(html`
        <div class="chip-icon-wrapper">
          <slot></slot>
        </div>
      `);
    }

    return icons;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'state-checked': this.checked,
          'state-unchecked': !this.checked,
          'status-enabled': !this.disabled,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-pressed=${this.checked}
        aria-label=${this.label}
        role="checkbox"
      >
        <div class="chip-container">
          ${this.renderLeadingIcon()}
          <div class="chip-label-container">
            <span class="chip-label">${this.label}</span>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-filter-chip': ObcFilterChip;
  }
}
