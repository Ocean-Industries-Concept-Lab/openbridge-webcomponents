import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import styles from './toggle-button-vertical-option.css?inline';

export enum ObcToggleButtonVerticalOptionType {
  flat = 'flat',
  regular = 'regular',
  normal = 'normal',
}

export enum ObcToggleButtonLabelPlacement {
  inline = 'inline',
  under = 'under',
}

/**
 * `<obc-toggle-button-vertical-option>` – A single selectable option within a vertical toggle button group.
 *
 * Represents an individual button option within an `<obc-toggle-button-vertical-group>`. This component should not
 * be used standalone; it is designed to function exclusively as a child element of a vertical toggle button group,
 * which manages selection state and interaction logic.
 *
 * The option renders as a vertically oriented button with flexible content layouts (icon, text label, or both) and
 * provides visual feedback for selection and disabled states. All styling properties (type, variant) are typically
 * propagated from the parent group to ensure visual consistency across all options.
 *
 * ### Features
 *
 * - **Selection state:** Displays a distinct visual style when selected, controlled by the parent group.
 *   Only one option in a group can be selected at a time.
 * - **Disabled state:** Can be individually disabled while other options in the group remain interactive.
 *   When disabled, the option is visually dimmed and does not respond to clicks. The parent group will skip
 *   over disabled options when determining fallback selections.
 * - **Flexible content layouts:**
 *   - Icon and text can be displayed side-by-side (`inline`) or with text positioned below the icon (`under`).
 *   - Controlled via the `labelPlacement` property.
 * - **Visual variants:**
 *   - `regular` (default): Standard appearance with full background and border styling.
 *   - `flat`: Minimal style with reduced visual weight.
 *   - `normal`: **TODO(designer)** – Clarify the visual difference and intended use case for the `normal` variant compared to `regular` and `flat`.
 * - **Divider handling:** Supports automatic divider rendering between options. The `noDivider` property is
 *   managed by the parent group to hide dividers after the last option for a cohesive appearance.
 *
 * ### Usage Guidelines
 *
 * **Always use `<obc-toggle-button-vertical-option>` as a child of `<obc-toggle-button-vertical-group>`.** The parent group
 * handles all selection logic, event coordination, and style propagation. Using this component outside a
 * group will result in non-functional behavior.
 *
 * **Ideal use cases:**
 * - As a building block for vertical navigation or view toggles
 * - As filter options within a vertical segmented control
 * - As mode selectors in sidebars or vertical control panels
 *
 * **Best Practices:**
 * - Assign a unique `value` to each option in the group to enable proper selection tracking.
 * - Use the `label` property for text labels (short, descriptive text: 1-2 words ideal).
 * - Use the `icon` slot for icon content when icons are needed.
 * - Set `hasIcon` to true when providing icon content for proper layout.
 * - Avoid manually setting `type` property; let the parent group propagate this for consistency.
 * - For icon-only options, ensure icons are universally understandable or provide tooltips for accessibility.
 * - Use the `disabled` property sparingly; if all options are disabled, consider disabling the entire group instead.
 *
 * **When not to use:**
 * - Do not use this component standalone without a parent `<obc-toggle-button-vertical-group>`.
 * - Do not use for multi-select scenarios (use checkboxes or chips instead).
 * - Do not use for standalone action buttons (use `<obc-button>` or similar instead).
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | icon      | When `hasIcon` is true | Icon content for the option. Use OpenBridge icons like `<obi-placeholder>` or `<obi-search>`. |
 *
 * ### Events
 *
 * - `selected` – Fired when the option is clicked. The parent group listens to this event to update selection state.
 *   Event detail: `{ value: string }`.
 *
 * ### Example
 *
 * ```html
 * <!-- Used within a vertical toggle button group -->
 * <obc-toggle-button-vertical-group value="list">
 *   <obc-toggle-button-vertical-option value="list" label="List" hasIcon>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 *   <obc-toggle-button-vertical-option value="grid" label="Grid" hasIcon>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 *   <obc-toggle-button-vertical-option value="chart" label="Chart" disabled hasIcon>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 * </obc-toggle-button-vertical-group>
 * ```
 *
 * @slot icon - Icon content for the option (when hasIcon is true).
 * @fires selected {CustomEvent<{value: string}>} Fired when the option is clicked.
 */
@customElement('obc-toggle-button-vertical-option')
export class ObcToggleButtonVerticalOption extends LitElement {
  /**
   * Value associated with this option. Used in selection events.
   */
  @property({type: String}) value = '';

  /**
   * Whether this option is currently selected (toggles visual state).
   */
  @property({type: Boolean, reflect: true}) selected = false;

  /**
   * The visual variant of the toggle button option.
   * One of: "flat", "regular", "normal".
   */
  @property({type: String}) type = ObcToggleButtonVerticalOptionType.regular;

  /**
   * If true, hides the divider after this option.
   * Managed by the parent group.
   */
  @property({type: Boolean, reflect: true}) noDivider = false;

  /**
   * If true, the option expects icon content in the icon slot.
   * Controls layout and spacing for icon display.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * Text label for the option.
   * Displayed next to or below the icon based on labelPlacement.
   */
  @property({type: String}) label = '';

  /**
   * If true, the option is disabled and cannot be interacted with.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * Controls the layout of icon and label.
   * - `inline`: Icon and label displayed side-by-side.
   * - `under`: Label displayed below the icon.
   */
  @property({type: String})
  labelPlacement: ObcToggleButtonLabelPlacement =
    ObcToggleButtonLabelPlacement.inline;

  private _isGroupManaged = false;

  override connectedCallback() {
    super.connectedCallback();
    this._isGroupManaged =
      this.closest('obc-toggle-button-vertical-group') !== null;
  }

  private onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    if (!this._isGroupManaged) {
      this.selected = !this.selected;
    }

    // Only fire event if not already selected
    if (!this.selected) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    const labelUnder =
      this.labelPlacement === ObcToggleButtonLabelPlacement.under;
    const hasLabel = this.label.trim().length > 0;
    const labelText = hasLabel ? this.label : '\u00A0';

    const classes = classMap({
      wrapper: true,
      selected: this.selected,
      'type-flat': this.type === ObcToggleButtonVerticalOptionType.flat,
      'type-regular': this.type === ObcToggleButtonVerticalOptionType.regular,
      'type-normal': this.type === ObcToggleButtonVerticalOptionType.normal,
      'label-under': labelUnder,
      'label-inline': !labelUnder,
      'has-icon': this.hasIcon,
      disabled: this.disabled,
    });

    return html`
      <button
        class=${classes}
        @click=${this.onClick}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
        aria-disabled=${this.disabled}
      >
        <div class="visible-wrapper">
          <div class="icon-label-container">
            <div class="icon">
              ${labelUnder && !this.hasIcon
                ? nothing
                : this.hasIcon
                  ? html`<slot name="icon"></slot>`
                  : nothing}
            </div>

            ${labelUnder
              ? html`<div class="label">${labelText}</div>`
              : hasLabel
                ? html`<div class="label">${this.label}</div>`
                : nothing}
          </div>

          ${!this.selected ? html`<div class="bottom-divider"></div>` : nothing}
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-vertical-option': ObcToggleButtonVerticalOption;
  }
}
