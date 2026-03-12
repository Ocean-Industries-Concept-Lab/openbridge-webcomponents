import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import {
  ObcToggleButtonOption,
  ObcToggleButtonOptionVariant,
  ObcToggleButtonOptionType,
} from '../toggle-button-option/toggle-button-option.js';
import componentStyle from './toggle-button-group.css?inline';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';

export type ObcToggleButtonGroupValueChangeEvent = CustomEvent<{
  value: string;
  previousValue: string;
}>;

export type ObcToggleButtonGroupChangeEvent = CustomEvent<{
  value: string;
}>;

/**
 * `<obc-toggle-button-group>` – A segmented control for selecting a single option from a set (also known as a button group or segmented button).
 *
 * Provides a horizontal group of connected toggle buttons where only one option can be selected at a time.
 * Each option is represented by an `<obc-toggle-button-option>` child element. The group manages selection
 * state automatically, deselecting the previous option when a new one is chosen.
 *
 * Appears as a visually unified set of buttons with clear selection indicators. Commonly used for switching
 * between views, modes, or categories in a compact, space-efficient way. Ideal for toolbar controls,
 * filtering options, or layout toggles (e.g., list vs. grid view).
 *
 * ### Features
 *
 * - **Single selection mode:** Only one option can be active at a time; selecting a new option automatically
 *   deselects the previous one. Similar to radio button behavior but with a button-like appearance.
 * - **Visual variants:**
 *   - `regular` (default): Standard appearance with full background and border styling.
 *   - `flat`: Minimal style with reduced visual weight, no prominent background or border.
 *   - `normal`: **TODO(designer)** – Clarify the visual difference and intended use case for the `normal` variant compared to `regular` and `flat`.
 * - **Content type options:**
 *   - `text` (default): Options display text labels only.
 *   - `icon`: Options display only an icon (compact, suitable for limited space).
 *   - `iconText`: Options display an icon and text side-by-side.
 *   - `iconTextUnder`: Options display an icon above the text label (vertical layout within each button).
 * - **Size control:**
 *   - Standard size (default): Regular button dimensions.
 *   - Large size (`large`): Increased touch target and visual prominence for accessibility or emphasis.
 * - **Layout behavior:**
 *   - By default, the group stretches to fill available container width, distributing space equally among options.
 *   - When `hugText` is true, the group shrinks to fit its content width instead of expanding.
 * - **External control mode:** When `externalControl` is true, the group emits selection events but does not
 *   update its own `value` property, allowing parent components to manage state (useful for form libraries or
 *   custom state management).
 * - **Disabled state:** Setting `disabled` on the group disables all contained options at once. Individual
 *   options can also be disabled independently while the group remains enabled.
 * - **Divider management:** Automatically shows visual dividers between options and hides the divider after
 *   the selected option for a seamless, unified appearance.
 * - **Property propagation:** The group automatically synchronizes `type`, `variant`, `hugText`, and `large`
 *   properties to all child `<obc-toggle-button-option>` elements for consistent styling.
 * - **Automatic fallback selection:** If the current value is set to a disabled or non-existent option, the
 *   group automatically selects the first enabled option to ensure a valid state.
 *
 * ### Usage Guidelines
 *
 * Use `<obc-toggle-button-group>` when you need users to choose exactly one option from a small set of
 * mutually exclusive choices (typically 2-5 options). It provides a more compact and visually integrated
 * alternative to radio buttons.
 *
 * **Ideal use cases:**
 * - View mode toggles (e.g., list vs. grid, map vs. chart)
 * - Filter options (e.g., all/active/completed tasks)
 * - Alignment or layout controls (e.g., left/center/right alignment)
 * - Time range selectors (e.g., day/week/month)
 * - Toolbar mode switches (e.g., edit/preview modes)
 *
 * **When not to use:**
 * - For binary on/off choices, use a switch or checkbox instead.
 * - For multiple selections from a set, use checkboxes or chips.
 * - For many options (6+), consider a dropdown/select or radio button list for better scannability.
 * - For navigation between pages or sections, use tabs or a navigation menu.
 *
 * **Best Practices:**
 * - Each option must have a unique `value` property to prevent selection conflicts.
 * - Provide clear, concise labels for each option. Keep text short (1-2 words ideal).
 * - For icon-only buttons (`type="icon"`), ensure icons are universally recognizable or provide tooltips.
 * - Set an initial `value` to indicate the default selection, or the first enabled option will be selected automatically.
 * - Avoid disabling the currently selected option; if an option becomes unavailable, selection will shift to the first enabled option.
 * - Use `variant="flat"` in dense UIs or when the toggle is secondary to other content.
 * - Use `large` size for touch interfaces or when the control is a primary interaction element.
 *
 * **TODO(designer):** Confirm if vertical orientation is supported or planned for future releases. Also clarify recommended maximum number of options for optimal usability (currently assumes 2-5 options).
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always | Place one or more `<obc-toggle-button-option>` elements here to define the selectable options in the group. |
 *
 * ### Events
 *
 * - `value` – Fired when the selected value changes, either through user interaction or programmatic change.
 *   Event detail: `{ value: string, previousValue: string }`. Listen to this event to react to selection changes.
 *
 * ### Example
 *
 * ```html
 * <obc-toggle-button-group value="list" type="iconText">
 *   <obc-toggle-button-option value="list">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *     List
 *   </obc-toggle-button-option>
 *   <obc-toggle-button-option value="grid">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *     Grid
 *   </obc-toggle-button-option>
 *   <obc-toggle-button-option value="table">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *     Table
 *   </obc-toggle-button-option>
 * </obc-toggle-button-group>
 * ```
 *
 * @slot - Place one or more `<obc-toggle-button-option>` elements here to define the selectable options.
 * @fires value {CustomEvent<{value: string, previousValue: string}>} Fired when the selected value changes.
 * @fires change {CustomEvent<{value: string}>} Fired when the selected value changes by user interaction.
 */
@customElement('obc-toggle-button-group')
export class ObcToggleButtonGroup extends LitElement {
  /**
   * The currently selected option's value.
   *
   * Set this property to programmatically select an option. When the user selects a different option, this property updates and a `value` event is fired.
   *
   * If set to a value that does not match any enabled option, the first enabled option is selected by default.
   */
  @property({type: String}) value = '';

  /**
   * The value of the option that is activated.
   *
   * When the group is controlled by an external source, this property is used to set the value of the option that is activated.
   * This is a visual indication that the option is clicked but not yet stored.
   */
  @property({type: String}) activated: string | undefined;

  /**
   * The visual type of the toggle button options.
   *
   * - `text` (default): Options display text only.
   * - `icon`: Options display only an icon.
   * - `iconText`: Options display an icon and text side-by-side.
   * - `iconTextUnder`: Options display an icon above the text.
   *
   * This setting is propagated to all child `<obc-toggle-button-option>` elements.
   */
  @property({type: String}) type = ObcToggleButtonOptionType.text;

  /**
   * The visual variant of the toggle button group.
   *
   * - `regular` (default): Standard appearance with background and border.
   * - `flat`: Minimal style with no background or border.
   * - `normal`: Alternative style variant.
   *
   * This setting is propagated to all child `<obc-toggle-button-option>` elements.
   */
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;

  /**
   * If true, the group shrinks to fit its content ("hug" the text) instead of stretching to fill the container.
   *
   * This setting is propagated to all child `<obc-toggle-button-option>` elements.
   */
  @property({type: Boolean}) hugText = false;

  /**
   * If true, the group is controlled by an external source.
   *
   * When true, the group will not update its selection when the `value` property changes.
   *
   * Defaults to false.
   */
  @property({type: Boolean}) externalControl = false;

  /**
   * Disables the entire toggle button group and all contained options when true.
   *
   * When disabled, no option can be selected or interacted with.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * If true, the group and all contained options use a larger size.
   *
   * This setting is propagated to all child `<obc-toggle-button-option>` elements.
   */
  @property({type: Boolean, reflect: true}) large = false;

  @queryAssignedElements({selector: 'obc-toggle-button-option'})
  options!: NodeListOf<ObcToggleButtonOption>;

  private hasAnyEnabledOption(): boolean {
    if (this.disabled) return false;
    return Array.from(this.options).some((opt) => !opt.disabled);
  }

  private canSelectOption(value: string): boolean {
    if (this.disabled) return false;
    const option = this.getOptionByValue(value);
    return option !== null && !option.disabled;
  }

  private getOptionByValue(value: string): ObcToggleButtonOption | null {
    return Array.from(this.options).find((opt) => opt.value === value) || null;
  }

  private getFirstSelectableOption(): ObcToggleButtonOption | null {
    if (this.disabled) return null;
    return Array.from(this.options).find((opt) => !opt.disabled) || null;
  }

  private updateSelection(
    newValue: string,
    emitValueEvent: boolean = true,
    emitChangeEvent: boolean = false
  ) {
    const oldValue = this.value;

    if (!this.hasAnyEnabledOption()) {
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
      this.setNoDivider();
      return;
    }

    if (!this.canSelectOption(newValue)) {
      if (this.value && this.getOptionByValue(this.value)) {
        this.options.forEach((option) => {
          option.selected = option.value === this.value;
        });
        this.setNoDivider();
        return;
      }
      const fallback = this.getFirstSelectableOption();
      newValue = fallback?.value || '';
    }

    this.value = newValue;

    this.options.forEach((option) => {
      option.selected = option.value === newValue;
    });

    this.setNoDivider();

    if (emitValueEvent && oldValue !== newValue) {
      this.dispatchEvent(
        new CustomEvent('value', {
          detail: {value: newValue, previousValue: oldValue},
        })
      );
    }

    if (emitChangeEvent && oldValue !== newValue) {
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {value: newValue},
        })
      );
    }
  }

  private updateActivated(newValue: string | undefined) {
    if (newValue) {
      this.options.forEach((option) => {
        option.activated = option.value === newValue;
      });
    } else {
      this.options.forEach((option) => {
        option.activated = false;
      });
    }
  }

  private setNoDivider() {
    const selectedOptionIndex = Array.from(this.options).findIndex(
      (option) => option.selected
    );
    this.options.forEach((option) => {
      option.showDivider = true;
    });
    if (selectedOptionIndex === -1) {
      return;
    }
    const nextOption = this.options[selectedOptionIndex + 1];
    if (nextOption) {
      nextOption.showDivider = false;
    }
  }

  private _originalDisabledStates = new Map<ObcToggleButtonOption, boolean>();

  protected override firstUpdated(
    _changedProperties: PropertyValues<unknown> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    const values = Array.from(this.options).map((opt) => opt.value);
    const uniqueValues = new Set(values);
    if (values.length !== uniqueValues.size) {
      console.warn(
        'Toggle button group has duplicate values. This may cause unexpected behavior.'
      );
    }

    this.options.forEach((option) => {
      this._originalDisabledStates.set(option, option.hasAttribute('disabled'));

      option.addEventListener('selected', (e) => this.handleOptionClick(e));

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.attributeName === 'disabled' &&
            !option.hasAttribute('data-group-disabled')
          ) {
            this._originalDisabledStates.set(
              option,
              option.hasAttribute('disabled')
            );
            this.handleOptionDisabledChange();
          }
        });
      });
      observer.observe(option, {
        attributes: true,
        attributeFilter: ['disabled'],
      });

      option.type = this.type;
      option.variant = this.variant;
      option.hugText = this.hugText;
      option.large = this.large;

      if (this.disabled) {
        option.setAttribute('data-group-disabled', 'true');
        option.disabled = true;
      }
    });

    if (!this.value || !this.getOptionByValue(this.value)) {
      const firstSelectable = this.getFirstSelectableOption();
      if (firstSelectable) {
        this.updateSelection(firstSelectable.value, false);
      }
    } else {
      this.updateSelection(this.value, false);
    }

    if (this.activated) {
      this.updateActivated(this.activated);
    }
  }

  private handleOptionDisabledChange() {
    const currentOption = this.getOptionByValue(this.value);
    if (currentOption?.disabled && this.hasAnyEnabledOption()) {
      const firstSelectable = this.getFirstSelectableOption();
      if (firstSelectable) {
        this.updateSelection(firstSelectable.value);
      }
    }
  }

  handleOptionClick(event: Event) {
    const {value} = (event as CustomEvent).detail;
    if (this.externalControl) {
      this.dispatchEvent(
        new CustomEvent('value', {
          detail: {value, previousValue: this.value},
        })
      );

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {value},
        })
      );
    } else {
      this.updateSelection(value, true, true);
    }
  }

  override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this.updateSelection(this.value);
    }

    if (changedProperties.has('activated')) {
      this.updateActivated(this.activated);
    }

    if (
      changedProperties.has('type') ||
      changedProperties.has('variant') ||
      changedProperties.has('hugText') ||
      changedProperties.has('large')
    ) {
      this.options.forEach((option) => {
        option.type = this.type;
        option.variant = this.variant;
        option.hugText = this.hugText;
        option.large = this.large;
      });
    }

    if (changedProperties.has('disabled')) {
      this.options.forEach((option) => {
        if (this.disabled) {
          option.setAttribute('data-group-disabled', 'true');
          option.disabled = true;
        } else {
          option.removeAttribute('data-group-disabled');
          const originalState =
            this._originalDisabledStates.get(option) || false;
          option.disabled = originalState;
        }
      });
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    const currentOption = this.getOptionByValue(this.value);
    if (currentOption?.disabled && this.hasAnyEnabledOption()) {
      const firstSelectable = this.getFirstSelectableOption();
      if (firstSelectable) {
        this.updateSelection(firstSelectable.value);
      }
    }
  }

  override render() {
    const classes = {
      'outer-wrapper': true,
      flat: this.variant === ObcToggleButtonOptionVariant.flat,
      regular: this.variant === ObcToggleButtonOptionVariant.regular,
      'hug-text': this.hugText,
      'icon-text-under': this.type === ObcToggleButtonOptionType.iconTextUnder,
      disabled: this.disabled,
      large: this.large,
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="wrapper">
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
