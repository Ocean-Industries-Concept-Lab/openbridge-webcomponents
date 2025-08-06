import {
  LitElement,
  PropertyValueMap,
  PropertyValues,
  html,
  unsafeCSS,
} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import {
  ObcToggleButtonOption,
  ObcToggleButtonOptionVariant,
  ObcToggleButtonOptionType,
} from '../toggle-button-option/toggle-button-option.js';
import componentStyle from './toggle-button-group.css?inline';
import {customElement} from '../../decorator.js';

export type ObcToggleButtonGroupValueChangeEvent = CustomEvent<{value: string}>;

/**
 * `<obc-toggle-button-group>` – A horizontal group container for <toggle-button-options>, allowing users to select a single value from a set.
 *
 * Provides a visually grouped set of toggle buttons (such as text, icon, or icon+label options) where only one option can be selected at a time. The group manages selection state and emits a value change event when the user selects a different option.
 *
 * Appears as a segmented control or toggle group, commonly used for switching between views, modes, or filters within a UI.
 *
 * ## Features
 * - **Single Selection:** Only one option can be selected at a time; selecting a new option automatically deselects the previous one.
 * - **Flexible Option Types:** Supports different visual types for contained options via the `type` property:
 *   - `text`: Options display as text labels.
 *   - `icon`: Options display as icons only.
 *   - `iconTextSide`: Options display icons with text beside.
 *   - `iconTextUnder`: Options display icons with text underneath (increases group height).
 * - **Variants:** Choose between:
 *   - `regular` (default): Group has background and dividers between options.
 *   - `flat`: Minimal style, no background or dividers.
 * - **Adaptive Width:** By default, the group stretches to fill its container. Enable `hugText` to shrink-wrap to the combined width of its options.
 * - **Divider Management:** Automatically hides the divider after the selected option for a seamless appearance.
 * - **Keyboard and Pointer Interaction:** Selection can be changed via pointer or keyboard (inherited from option components).
 *
 * ## Usage Guidelines
 * - Use for mutually exclusive choices where only one option should be active at a time (e.g., view toggles, filter bars, mode switches).
 * - Place `<obc-toggle-button-option>` elements as children inside the group. Each option must have a unique `value`.
 * - For icon-based toggles, supply an icon in each option (e.g., `<obi-placeholder slot="icon"></obi-placeholder>`).
 * - Prefer `regular` variant for most cases; use `flat` for inline or minimal UIs.
 * - Use `iconTextUnder` type when labels need to be shown below icons (e.g., for navigation or large touch targets).
 * - **TODO(designer):** Clarify recommended use cases for each `type` and `variant`, and any accessibility guidance.
 *
 * ## Slots and Content Structure
 * | Slot Name | Renders When... | Purpose |
 * |-----------|----------------|---------|
 * | (default) | Always         | Place one or more `<obc-toggle-button-option>` elements here. Each represents a selectable option. |
 *
 * ## Properties and Attributes
 * - `value` (string): The value of the currently selected option. Setting this updates the selected state in the group.
 * - `type` (string): Controls the visual style of the options. Accepts values from `ObcToggleButtonOptionType` enum (`text`, `icon`, `iconTextSide`, `iconTextUnder`). Default is `text`.
 * - `variant` (string): Sets the group style. Accepts values from `ObcToggleButtonOptionVariant` enum (`regular`, `flat`). Default is `regular`.
 * - `hugText` (boolean): If true, the group width shrinks to fit its content instead of stretching to fill the container.
 *
 * ## Events
 * - `value` – Fired when the selected value changes. Listen for this event to react to user selection.
 *
 * ## Best Practices and Constraints
 * - Ensure each `<obc-toggle-button-option>` child has a unique `value` property.
 * - Only one option should be selected at a time; the group enforces this automatically.
 * - For accessibility, ensure each option has a clear label (either text or an accessible name for icons).
 * - Avoid placing interactive elements inside options other than the toggle itself.
 * - Do not use for independent toggles (use checkboxes or switches for multi-selection).
 *
 * ## Example:
 * ```html
 * <obc-toggle-button-group value="list" type="iconTextSide">
 *   <obc-toggle-button-option value="list" label="List">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-option>
 *   <obc-toggle-button-option value="grid" label="Grid">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-option>
 * </obc-toggle-button-group>
 * ```
 *
 * @slot - Default slot for placing one or more `<obc-toggle-button-option>` elements as selectable options.
 * @fires value {CustomEvent<{value: string}>} - Emitted when the selected value changes.
 */
@customElement('obc-toggle-button-group')
export class ObcToggleButtonGroup extends LitElement {
  /**
   * The value of the currently selected option. Setting this property updates the selection in the group.
   *
   * @example
   * // To set the initial selection:
   * <obc-toggle-button-group value="option1">...</obc-toggle-button-group>
   */
  @property({type: String}) value = '';

  /**
   * Controls the visual style of the toggle button options within the group.
   * Accepts values from `ObcToggleButtonOptionType`:
   * - `text`: Text-only options.
   * - `icon`: Icon-only options.
   * - `iconTextSide`: Icon with text beside.
   * - `iconTextUnder`: Icon with text underneath.
   *
   * Default is `text`.
   *
   * **TODO(designer):** Confirm recommended use cases for each type.
   */
  @property({type: String}) type = ObcToggleButtonOptionType.text;

  /**
   * Sets the group style variant.
   * - `regular`: Group has background and dividers (default).
   * - `flat`: Minimal, no background or dividers.
   *
   * Default is `regular`.
   *
   * **TODO(designer):** Confirm when to use each variant.
   */
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;

  /**
   * If true, the group width shrinks to fit the combined width of its options (hug content).
   * If false (default), the group stretches to fill its container.
   */
  @property({type: Boolean}) hugText = false;

  @queryAssignedElements({selector: 'obc-toggle-button-option'})
  options!: NodeListOf<ObcToggleButtonOption>;

  protected override firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.options.forEach((slot) => {
      slot.addEventListener('selected', (e) => this.handleOptionClick(e));
      slot.selected = slot.value === this.value;
    });
    this.setNoDivider();
  }

  private setNoDivider() {
    const selectedOptionIndex = Array.from(this.options).findIndex(
      (option) => option.selected
    );
    this.options.forEach((option) => {
      option.noDivider = false;
    });
    if (selectedOptionIndex === -1) {
      return;
    }
    const nextOption = this.options[selectedOptionIndex + 1];
    if (nextOption) {
      nextOption.noDivider = true;
    }
  }

  handleOptionClick(event: Event) {
    const value = (event as CustomEvent).detail.value;

    this.value = value;

    // Set the selected property for all options and noDivider for the next option
    this.options.forEach((option) => {
      option.selected = option.value === value;
    });
    this.setNoDivider();

    // Emit the value change event
    this.dispatchEvent(new CustomEvent('value', {detail: {value}}));
  }

  override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
      this.setNoDivider();
    }
  }

  override render() {
    return html`
      <div
        class="outer-wrapper ${this.type ===
        ObcToggleButtonOptionType.iconTextUnder
          ? 'has-labels'
          : ''}
        ${this.variant === ObcToggleButtonOptionVariant.flat
          ? 'flat'
          : 'regular'}
        ${this.hugText ? 'hug-text' : ''}
        "
      >
        <div class="wrapper ">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-group': ObcToggleButtonGroup;
  }
}
