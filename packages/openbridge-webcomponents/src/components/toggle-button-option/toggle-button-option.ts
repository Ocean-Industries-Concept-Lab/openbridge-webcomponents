import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import comonentvariant from './toggle-button-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Types of toggle button option layouts.
 * - `icon`: Only an icon is shown.
 * - `text`: Only a text label is shown.
 * - `icon-text-under`: Icon above, label below.
 * - `text-icon`: Icon and label side by side.
 */
export enum ObcToggleButtonOptionType {
  icon = 'icon',
  text = 'text',
  iconTextUnder = 'icon-text-under',
  iconText = 'text-icon',
}

/**
 * Visual style variants for the toggle button option.
 * - `flat`: Minimal, borderless style.
 * - `regular`: Standard appearance (default).
 */
export enum ObcToggleButtonOptionVariant {
  flat = 'flat',
  regular = 'regular',
}

/**
 * `<obc-toggle-button-option>` – A toggleable button option for use within toggle button groups, supporting icon, text, or combined layouts.
 *
 * This component represents a single selectable option in a toggle button set. It can display an icon, a text label, or both, and supports several layout and style variants to adapt to different UI needs. Designed for use in segmented controls, toolbars, or any scenario where users select one or more options from a set.
 *
 * Appears as a button that can be toggled on or off, visually indicating its selected state. The component is highly configurable to support different content arrangements and visual styles.
 *
 * ## Features
 * - **Content Types:**
 *   - `icon`: Shows only an icon (slot="icon").
 *   - `text`: Shows only a text label (default slot).
 *   - `icon-text-under`: Icon above, label below (vertical stack).
 *   - `text-icon`: Icon and label side by side (horizontal).
 * - **Variants:**
 *   - `regular` (default): Standard appearance with background and selection highlight.
 *   - `flat`: Minimal, borderless style for less emphasis.
 * - **Selection State:**
 *   - `selected`: Indicates if the option is currently active/selected.
 * - **Divider Control:**
 *   - `noDivider`: Removes the divider between options when true.
 * - **Text Layout:**
 *   - `hugText`: Shrinks the button width to fit the label content.
 * - **Flexible Content:**
 *   - Supports custom icons via the `icon` slot and arbitrary label content via the default slot.
 *
 * ## Usage Guidelines
 * Use `obc-toggle-button-option` inside a toggle button group to present a set of mutually exclusive or multi-select options. Ideal for toolbars, segmented controls, or filter bars where users need to switch between views, modes, or filters.
 *
 * - Use the `type` property to control the arrangement of icon and label.
 * - Use `variant="flat"` for less prominent options, such as secondary toolbars.
 * - Set `selected` to true to indicate the active option.
 * - Use the `icon` slot for visual cues (e.g., `<obi-placeholder></obi-placeholder>`).
 * - Combine with a parent toggle group component (TODO(designer): Specify recommended group component and selection logic).
 *
 * **TODO(designer):** Clarify if this component is intended for single-select, multi-select, or both. Specify recommended parent container for managing selection state.
 *
 * ## Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | `icon`    | type ≠ "text"   | Icon representing the option (e.g., `<obi-placeholder></obi-placeholder>`). |
 * | (default) | type ≠ "icon"   | Text label for the option. |
 *
 * ## Properties
 * - `value`: The value associated with this option (used in selection events).
 * - `selected`: Whether the option is currently selected (toggles visual state).
 * - `type`: Layout of icon and label. One of `"icon"`, `"text"`, `"icon-text-under"`, or `"text-icon"`.
 * - `variant`: Visual style. `"regular"` (default) or `"flat"`.
 * - `hugText`: If true, button width shrinks to fit label.
 * - `noDivider`: If true, divider between options is hidden.
 *
 * ## Events
 * - `selected` – Fired when the option is clicked. Event detail: `{ value: string }`.
 *
 * ## Best Practices
 * - Use concise labels and recognizable icons for clarity.
 * - For accessibility, ensure each option has a clear label (either visible or via `aria-label`).
 * - Avoid using both `icon` and `text` types in the same group for consistency.
 * - Use `hugText` for options with short labels to avoid excessive spacing.
 *
 * **Example:**
 * ```html
 * <obc-toggle-button-option
 *   value="grid"
 *   type="icon-text-under"
 *   selected
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 *   Grid View
 * </obc-toggle-button-option>
 * ```
 *
 * @slot icon - Icon slot (shown when `type` is not "text")
 * @fires selected {CustomEvent<{value: string}>} Fired when the option is clicked
 */
@customElement('obc-toggle-button-option')
export class ObcToggleButtonOption extends LitElement {
  /**
   * Value associated with this option. Used in selection events.
   */
  @property({type: String}) value = 'value';

  /**
   * Whether this option is currently selected (toggles visual state).
   */
  @property({type: Boolean, reflect: true}) selected = false;

  /**
   * Layout of icon and label.
   * One of: "icon", "text", "icon-text-under", "text-icon".
   * Controls which slots/content are displayed and their arrangement.
   */
  @property({type: String}) type = ObcToggleButtonOptionType.text;

  /**
   * Visual style variant. "regular" (default) or "flat".
   */
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;

  /**
   * If true, button width shrinks to fit label content.
   */
  @property({type: Boolean}) hugText = false;

  /**
   * If true, hides the divider between options.
   */
  @property({type: Boolean, reflect: true}) noDivider = false;

  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * Fired when the option is clicked.
   * @fires selected {CustomEvent<{value: string}>}
   */
  onClick() {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('selected', {detail: {value: this.value}})
    );
  }

  override render() {
    const isInlineLabel =
      this.type === ObcToggleButtonOptionType.text ||
      this.type === ObcToggleButtonOptionType.iconText;
    const hasIcon = this.type !== ObcToggleButtonOptionType.text;
    const hasLabel = this.type !== ObcToggleButtonOptionType.icon;
    const isIconTextUnder =
      this.type === ObcToggleButtonOptionType.iconTextUnder;

    return html`
      <button
        class=${classMap({
          wrapper: true,
          selected: this.selected,
          'inline-label': isInlineLabel,
          'type-flat': this.variant === ObcToggleButtonOptionVariant.flat,
          'type-regular': this.variant === ObcToggleButtonOptionVariant.regular,
          'icon-text-under': isIconTextUnder,
          'hug-text': this.hugText,
          disabled: this.disabled,
        })}
        @click=${this.onClick}
      >
        <div class="visible-wrapper">
          ${hasIcon
            ? html`<div class="icon">
                <slot name="icon"></slot>
              </div>`
            : ''}
          ${hasLabel && !isIconTextUnder
            ? html`<div class="label"><slot></slot></div>`
            : ''}
        </div>
        ${hasLabel && isIconTextUnder
          ? html`<div class="label-container">
              <div class="label"><slot></slot></div>
            </div>`
          : ''}
      </button>
    `;
  }

  static override styles = unsafeCSS(comonentvariant);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ObcToggleButtonOption;
  }
}
