import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './toggle-button-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcToggleButtonOptionType {
  icon = 'icon',
  text = 'text',
  iconTextUnder = 'icon-text-under',
  iconText = 'text-icon',
}

export enum ObcToggleButtonOptionVariant {
  flat = 'flat',
  regular = 'regular',
  normal = 'normal'
}

/**
 * `<obc-toggle-button-option>` – A single selectable option within a toggle button group.
 *
 * Represents an individual button option within an `<obc-toggle-button-group>`. This component should not
 * be used standalone; it is designed to function exclusively as a child element of a toggle button group,
 * which manages selection state and interaction logic.
 *
 * The option renders as a button with flexible content layouts (text, icon, or both) and provides visual
 * feedback for selection, activation, and disabled states. All styling properties (type, variant, size)
 * are typically propagated from the parent group to ensure visual consistency across all options.
 *
 * ### Features
 *
 * - **Selection state:** Displays a distinct visual style when selected, controlled by the parent group.
 *   Only one option in a group can be selected at a time.
 * - **Activation state:** Shows temporary visual feedback when clicked, useful in external control scenarios
 *   where the parent manages state updates asynchronously (e.g., waiting for API confirmation).
 *   **TODO(designer)** – Clarify the exact visual difference between `activated` and `selected` states and when developers should use activation.
 * - **Disabled state:** Can be individually disabled while other options in the group remain interactive.
 *   When disabled, the option is visually dimmed and does not respond to clicks. The parent group will skip
 *   over disabled options when determining fallback selections.
 * - **Flexible content layouts:**
 *   - `text`: Text label only (default).
 *   - `icon`: Icon only (compact, ideal for limited space).
 *   - `iconText`: Icon and text side-by-side.
 *   - `iconTextUnder`: Icon stacked above text label.
 * - **Divider handling:** Supports automatic divider rendering between options. The `noDivider` property is
 *   managed by the parent group to hide dividers after the selected option for a cohesive appearance.
 * - **Size variants:** Standard and large sizes supported via the `large` property for improved touch targets
 *   and accessibility.
 *
 * ### Usage Guidelines
 *
 * **Always use `<obc-toggle-button-option>` as a child of `<obc-toggle-button-group>`.** The parent group
 * handles all selection logic, event coordination, and style propagation. Using this component outside a
 * group will result in non-functional behavior.
 *
 * **Ideal use cases:**
 * - As a building block for view toggles (list/grid/chart)
 * - As filter options within a segmented control
 * - As mode selectors in toolbars or control panels
 *
 * **Best Practices:**
 * - Assign a unique `value` to each option in the group to enable proper selection tracking.
 * - Use the default slot for text labels (short, descriptive text: 1-2 words ideal).
 * - Use the `icon` slot for icon content when the parent group's `type` includes icons.
 * - Avoid manually setting `type`, `variant`, `hugText`, or `large` properties; let the parent group propagate these for consistency.
 * - For icon-only options, ensure icons are universally understandable or provide tooltips for accessibility.
 * - Use the `disabled` property sparingly; if all options are disabled, consider disabling the entire group instead.
 *
 * **When not to use:**
 * - Do not use this component standalone without a parent `<obc-toggle-button-group>`.
 * - Do not use for multi-select scenarios (use checkboxes or chips instead).
 * - Do not use for standalone action buttons (use `<obc-button>` or similar instead).
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | When `type` is `text`, `iconText`, or `iconTextUnder` | Text label content for the option. Keep concise (1-2 words). |
 * | icon      | When `type` is `icon`, `iconText`, or `iconTextUnder` | Icon content for the option. Use OpenBridge icons like `<obi-placeholder>` or `<obi-search>`. |
 *
 * ### Events
 *
 * - `selected` – Fired when the option is clicked and is not already selected. The parent group listens to
 *   this event to update selection state. Event detail: `{ value: string }`.
 *
 * ### Example
 *
 * ```html
 * <!-- Used within a toggle button group -->
 * <obc-toggle-button-group value="list" type="iconText">
 *   <obc-toggle-button-option value="list">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *     List
 *   </obc-toggle-button-option>
 *   <obc-toggle-button-option value="grid">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *     Grid
 *   </obc-toggle-button-option>
 *   <obc-toggle-button-option value="chart" disabled>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *     Chart
 *   </obc-toggle-button-option>
 * </obc-toggle-button-group>
 * ```
 *
 * @slot - Text label content for the option (when type includes text).
 * @slot icon - Icon content for the option (when type includes icons).
 * @fires selected {CustomEvent<{value: string}>} Fired when the option is clicked and not already selected.
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
   * Whether this option is currently activated (toggles visual state).
   */
  @property({type: Boolean, reflect: true}) activated = false;

  /**
   * Layout of icon and label.
   * One of: "icon", "text", "icon-text-under", "text-icon".
   * Controls which slots/content are displayed and their arrangement.
   */
  @property({type: String}) type = ObcToggleButtonOptionType.text;

  /**
   * The visual variant of the toggle button option.
   * One of: "flat", "regular", "normal".
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

  /**
   * If true, the option is disabled and cannot be interacted with.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * If true, the option uses a larger size.
   */
  @property({type: Boolean, reflect: true}) large = false;

  /**
   * Fired when the option is clicked and not already selected.
   * @fires selected {CustomEvent<{value: string}>}
   */
  onClick() {
    if (this.disabled) {
      return;
    }

    // Only fire event if not already selected
    if (!this.selected) {
      this.dispatchEvent(
        new CustomEvent('selected', {detail: {value: this.value}})
      );
    }
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
          'type-normal': this.variant === ObcToggleButtonOptionVariant.normal,
          'icon-text-under': isIconTextUnder,
          'hug-text': this.hugText,
          disabled: this.disabled,
          activated: this.activated,
          large: this.large
        })}
        ?disabled=${this.disabled}
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

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ObcToggleButtonOption;
  }
}
