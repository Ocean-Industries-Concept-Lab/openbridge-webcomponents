import {LitElement, html, unsafeCSS, PropertyValues} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';

import {
  ObcToggleButtonVerticalOption,
  ObcToggleButtonVerticalOptionType,
} from '../toggle-button-vertical-option/toggle-button-vertical-option.js';

import style from './toggle-button-vertical-group.css?inline';

export type ObcToggleButtonVerticalGroupValueChangeEvent = CustomEvent<{
  value: string;
  previousValue: string;
}>;

/**
 * `<obc-toggle-button-vertical-group>` – A vertically oriented segmented control for selecting a single option from a set.
 *
 * Provides a vertical stack of connected toggle buttons where only one option can be selected at a time.
 * Each option is represented by an `<obc-toggle-button-vertical-option>` child element. The group manages selection
 * state automatically, deselecting the previous option when a new one is chosen.
 *
 * Appears as a visually unified vertical column of buttons with clear selection indicators. Commonly used for sidebar
 * navigation, vertical filter controls, or mode selection in vertical layouts. Ideal for scenarios where vertical
 * space is available and horizontal space is limited, such as side panels or navigation drawers.
 *
 * ### Features
 *
 * - **Single selection mode:** Only one option can be active at a time; selecting a new option automatically
 *   deselects the previous one. Similar to radio button behavior but with a button-like vertical appearance.
 * - **Visual variants:**
 *   - `regular` (default): Standard appearance with full background and border styling.
 *   - `flat`: Minimal style with reduced visual weight, no prominent background or border.
 *   - `normal`: **TODO(designer)** – Clarify the visual difference and intended use case for the `normal` variant compared to `regular` and `flat`.
 * - **Layout behavior:**
 *   - By default, the group stretches to fill available container width, with options stacked vertically.
 *   - When `hugWidth` is true, the group shrinks to fit its content width instead of expanding.
 * - **Disabled state:** Setting `disabled` on the group disables all contained options at once. Individual
 *   options can also be disabled independently while the group remains enabled.
 * - **Divider management:** Automatically shows visual dividers between options and hides the divider after
 *   the last option for a clean, unified appearance.
 * - **Property propagation:** The group automatically synchronizes the `type` property to all child
 *   `<obc-toggle-button-vertical-option>` elements for consistent styling.
 * - **Automatic fallback selection:** If the current value is set to a disabled or non-existent option, the
 *   group automatically selects the first enabled option to ensure a valid state.
 *
 * ### Usage Guidelines
 *
 * Use `<obc-toggle-button-vertical-group>` when you need users to choose exactly one option from a small set of
 * mutually exclusive choices (typically 2-5 options) in a vertical layout. It provides a more compact and visually
 * integrated alternative to radio buttons for vertical navigation or control panels.
 *
 * **Ideal use cases:**
 * - Sidebar navigation toggles (e.g., dashboard/reports/settings views)
 * - Vertical filter controls (e.g., all/active/archived items)
 * - Mode selectors in vertical panels (e.g., edit/preview/code modes)
 * - View toggles in constrained horizontal spaces (e.g., mobile side panels)
 * - Control panels with vertical layout preference
 *
 * **When not to use:**
 * - For binary on/off choices, use a switch or checkbox instead.
 * - For multiple selections from a set, use checkboxes or chips.
 * - For many options (6+), consider a dropdown/select or radio button list for better scannability.
 * - For horizontal layouts with adequate space, use `<obc-toggle-button-group>` instead.
 * - For navigation between pages or sections, use tabs or a navigation menu.
 *
 * **Best Practices:**
 * - Each option must have a unique `value` property to prevent selection conflicts.
 * - Provide clear, concise labels for each option. Keep text short (1-2 words ideal).
 * - For icon-only buttons, ensure icons are universally recognizable or provide tooltips.
 * - Set an initial `value` to indicate the default selection, or the first enabled option will be selected automatically.
 * - Avoid disabling the currently selected option; if an option becomes unavailable, selection will shift to the first enabled option.
 * - Use `type="flat"` in dense UIs or when the toggle is secondary to other content.
 * - Ensure adequate vertical space for the number of options to avoid excessive scrolling or cramped layouts.
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always | Place one or more `<obc-toggle-button-vertical-option>` elements here to define the selectable options in the group. Each option can include an icon via its own `icon` slot. |
 *
 * ### Events
 *
 * - `value` – Fired when the selected value changes, either through user interaction or programmatic change.
 *   Event detail: `{ value: string, previousValue: string }`. Listen to this event to react to selection changes.
 *
 * ### Example
 *
 * ```html
 * <obc-toggle-button-vertical-group value="list" type="regular">
 *   <obc-toggle-button-vertical-option value="list" label="List" hasIcon>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 *   <obc-toggle-button-vertical-option value="grid" label="Grid" hasIcon>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 *   <obc-toggle-button-vertical-option value="table" label="Table" hasIcon>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 * </obc-toggle-button-vertical-group>
 * ```
 *
 * @slot - Place one or more `<obc-toggle-button-vertical-option>` elements here to define the selectable options.
 * @fires value {CustomEvent<{value: string, previousValue: string}>} Fired when the selected value changes.
 */
@customElement('obc-toggle-button-vertical-group')
export class ObcToggleButtonVerticalGroup extends LitElement {
  /**
   * The value of the currently selected option.
   *
   * Setting this property programmatically updates the selection. If the value does not match any enabled option, the group selects the first available enabled option.
   */
  @property({type: String}) value = '';

  /**
   * Visual style for all options in the group.
   *
   * One of: "flat", "regular", "normal".
   */
  @property({type: String}) type = ObcToggleButtonVerticalOptionType.regular;

  /**
   * If true, the group shrinks to fit its content width instead of stretching to fill its container.
   *
   * Defaults to false.
   */
  @property({type: Boolean}) hugWidth = false;

  /**
   * Disables the entire group and all contained options.
   *
   * When set to true, all options become non-interactive, regardless of their individual disabled state.
   *
   * Defaults to false.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  @queryAssignedElements({selector: 'obc-toggle-button-vertical-option'})
  private options!: NodeListOf<ObcToggleButtonVerticalOption>;

  private _originalDisabledStates = new Map<
    ObcToggleButtonVerticalOption,
    boolean
  >();

  private hasAnyEnabledOption(): boolean {
    if (this.disabled) return false;
    return Array.from(this.options).some((opt) => !opt.disabled);
  }

  private canSelectOption(value: string): boolean {
    if (this.disabled) return false;
    const option = this.getOptionByValue(value);
    return option !== null && !option.disabled;
  }

  private getOptionByValue(
    value: string
  ): ObcToggleButtonVerticalOption | null {
    return Array.from(this.options).find((opt) => opt.value === value) || null;
  }

  private getFirstSelectableOption(): ObcToggleButtonVerticalOption | null {
    if (this.disabled) return null;
    return Array.from(this.options).find((opt) => !opt.disabled) || null;
  }

  private updateSelection(newValue: string, emitEvent: boolean = true) {
    const oldValue = this.value;

    if (!this.hasAnyEnabledOption()) {
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
      this.updateDividers();
      return;
    }

    if (!this.canSelectOption(newValue)) {
      if (this.value && this.getOptionByValue(this.value)) {
        this.options.forEach((option) => {
          option.selected = option.value === this.value;
        });
        this.updateDividers();
        return;
      }
      const fallback = this.getFirstSelectableOption();
      newValue = fallback?.value || '';
    }

    this.value = newValue;

    this.options.forEach((option) => {
      option.selected = option.value === newValue;
    });

    this.updateDividers();

    if (emitEvent && oldValue !== newValue) {
      /**
       * Fired when the selected option changes.
       *
       * The event detail contains the new value and the previous value:
       * `{ value: string, previousValue: string }`
       *
       * @event value
       */
      this.dispatchEvent(
        new CustomEvent('value', {
          detail: {value: newValue, previousValue: oldValue},
        })
      );
    }
  }

  protected override firstUpdated(changed: PropertyValues) {
    super.firstUpdated(changed);

    const values = Array.from(this.options).map((opt) => opt.value);
    const uniqueValues = new Set(values);
    if (values.length !== uniqueValues.size) {
      console.warn(
        'Toggle button vertical group has duplicate values. This may cause unexpected behavior.'
      );
    }

    this.options.forEach((opt) => {
      this._originalDisabledStates.set(opt, opt.disabled);

      opt.addEventListener('selected', (e) => this.onOptionSelected(e));

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.attributeName === 'disabled' &&
            !opt.hasAttribute('data-group-disabled')
          ) {
            this._originalDisabledStates.set(opt, opt.disabled);
            this.handleOptionDisabledChange();
          }
        });
      });
      observer.observe(opt, {attributes: true, attributeFilter: ['disabled']});

      opt.type = this.type;

      if (this.disabled) {
        opt.setAttribute('data-group-disabled', 'true');
        opt.disabled = true;
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

  override willUpdate(changed: PropertyValues): void {
    if (changed.has('value')) {
      this.updateSelection(this.value);
    }

    if (changed.has('type')) {
      this.options.forEach((opt) => {
        opt.type = this.type;
      });
    }

    if (changed.has('disabled')) {
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

  private updateDividers(): void {
    const last = this.options.length - 1;
    this.options.forEach((opt, idx) => {
      opt.noDivider = idx === last;
    });
  }

  private onOptionSelected(e: Event): void {
    const {value} = (e as CustomEvent).detail;
    this.updateSelection(value);
  }

  override render() {
    const classes = {
      'outer-wrapper': true,
      flat: this.type === ObcToggleButtonVerticalOptionType.flat,
      regular: this.type === ObcToggleButtonVerticalOptionType.regular,
      normal: this.type === ObcToggleButtonVerticalOptionType.normal,
      'hug-width': this.hugWidth,
      disabled: this.disabled,
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="wrapper"><slot></slot></div>
      </div>
    `;
  }

  static override styles = unsafeCSS(style);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-vertical-group': ObcToggleButtonVerticalGroup;
  }
}
