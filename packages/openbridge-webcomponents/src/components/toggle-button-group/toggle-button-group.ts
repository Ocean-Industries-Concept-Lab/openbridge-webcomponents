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
import {classMap} from 'lit/directives/class-map.js';

export type ObcToggleButtonGroupValueChangeEvent = CustomEvent<{
  value: string;
  previousValue: string;
}>;

/**
 * `<obc-toggle-button-group>` – A segmented toggle button group for selecting a single option from a set.
 *
 * Provides a horizontal or vertical group of toggle buttons, allowing users to select one option at a time. Each option is represented by an `<obc-toggle-button-option>` child, which can display text, icons, or both, depending on configuration.
 *
 * Appears as a visually connected set of buttons, with only one option active at a time. Commonly used for switching between views, modes, or categories in a compact, accessible way.
 *
 * ### Features
 * - **Single selection:** Only one option can be selected at a time; selecting a new option deselects the previous one.
 * - **Variants:**
 *   - `regular` (default): Standard toggle button appearance with background and border.
 *   - `flat`: Minimal style with no background or border.
 * - **Types:**
 *   - `text` (default): Options display text only.
 *   - `icon`: Options display only an icon.
 *   - `iconText`: Options display an icon and text side-by-side.
 *   - `iconTextUnder`: Options display an icon above the text.
 * - **Hug Text:** When `hugText` is true, the group shrinks to fit its content instead of stretching to fill the container.
 * - **Disabled State:** Setting `disabled` disables the entire group and all contained options.
 * - **Divider Management:** Automatically manages visual dividers between options, hiding the divider after the selected option for a seamless look.
 * - **Option Sync:** Propagates type, variant, and hugText settings to all child options for consistent appearance.
 * - **Accessibility:** Ensures only enabled options can be selected; skips disabled options when updating selection.
 *
 * ### Usage Guidelines
 * Use `<obc-toggle-button-group>` when you need users to choose one option from a small set of mutually exclusive choices, such as switching between tabs, views, or filter states. Ideal for toolbar controls, view selectors, or mode toggles.
 *
 * - Place one or more `<obc-toggle-button-option>` elements as children, each with a unique `value` property.
 * - Use the `value` property on the group to set or get the currently selected option.
 * - Use the `type` and `variant` properties to match the visual style to your UI.
 * - For icon-only or icon+text options, supply the appropriate content to each option.
 *
 * **Best Practices:**
 * - Ensure each option has a unique `value` to avoid selection conflicts.
 * - Use the `disabled` property to prevent interaction when needed.
 * - For accessibility, provide clear labels for each option (even if using icons).
 * - Avoid using toggle button groups for binary (on/off) choices; use a switch or checkbox instead.
 *
 * **TODO(designer):** Clarify if vertical orientation is supported or planned, and if there are recommended maximum numbers of options for usability.
 *
 * ### Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always | Place `<obc-toggle-button-option>` elements here to define selectable options. |
 *
 * ### Events
 * - `value` – Fired when the selected value changes. Event detail: `{ value: string, previousValue: string }`
 *
 * ### Example:
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
 * </obc-toggle-button-group>
 * ```
 *
 * @slot - Place `<obc-toggle-button-option>` elements here to define selectable options.
 * @fires value {CustomEvent<{value: string, previousValue: string}>} Fired when the selected value changes.
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

  private updateSelection(newValue: string, emitEvent: boolean = true) {
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

    if (emitEvent && oldValue !== newValue) {
      this.dispatchEvent(
        new CustomEvent('value', {
          detail: {value: newValue, previousValue: oldValue},
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

  private _originalDisabledStates = new Map<ObcToggleButtonOption, boolean>();

  protected override firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
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
    } else {
      this.updateSelection(value);
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
      changedProperties.has('hugText')
    ) {
      this.options.forEach((option) => {
        option.type = this.type;
        option.variant = this.variant;
        option.hugText = this.hugText;
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
