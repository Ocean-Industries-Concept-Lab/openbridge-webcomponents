import {
  LitElement,
  html,
  unsafeCSS,
  PropertyValueMap,
  PropertyValues,
} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

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
 * `<obc-toggle-button-vertical-group>` – A vertical group of toggle buttons for single selection.
 *
 * Provides a set of vertically stacked toggle button options, allowing users to select one option at a time. Commonly used for mutually exclusive choices where a compact, button-like appearance is preferred over radio buttons or dropdowns.
 *
 * Appears as a column of toggleable options, each rendered as an `obc-toggle-button-vertical-option` child. Only one option can be selected at a time; selecting a new option deselects the previous one. The group manages selection, disabled state, and visual style for all contained options.
 *
 * ### Features
 * - **Single selection:** Only one option can be selected at a time. Selection is managed by the group.
 * - **Variants:**
 *   - **Regular:** Default style with background and border for each option.
 *   - **Flat:** Minimal style with no background or border (set via `type="flat"`).
 * - **Disabled state:**
 *   - Entire group can be disabled (`disabled` property), making all options non-interactive.
 *   - Individual options can be disabled independently; if the selected option becomes disabled, selection moves to the first available enabled option.
 * - **Width behavior:**
 *   - By default, the group stretches to fill its container.
 *   - Enable `hugWidth` to shrink the group to fit its content.
 * - **Divider management:**
 *   - Visual dividers are automatically managed between options, except after the last option.
 * - **Option synchronization:**
 *   - The group ensures all child options reflect the current `type` and `disabled` state.
 * - **Custom content:**
 *   - Each option can display an icon (via slot), label, or both, as configured in the child options.
 *
 * ### Usage Guidelines
 * Use `obc-toggle-button-vertical-group` when you need a compact, visually distinct set of mutually exclusive options, such as filter controls, view selectors, or mode switches. It is suitable for scenarios where a vertical layout is preferred and where only one option should be active at a time.
 *
 * Prefer this component over radio groups when a button-like appearance or icon support is desired. For independent toggles, use checkboxes or switches instead.
 *
 * **TODO(designer):** Clarify if there are recommended use cases or accessibility notes compared to radio groups.
 *
 * ### Content Structure
 * This component uses a default slot for its options:
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always          | Place one or more `<obc-toggle-button-vertical-option>` elements as children to define selectable options. Each option can include an icon via its own `icon` slot. |
 *
 * ### Properties and Attributes
 * - `value` (string): The value of the currently selected option. Setting this updates the selection; changing selection via UI updates this property.
 * - `type` (`regular` \| `flat`): Visual style for all options in the group. Defaults to `regular`.
 * - `hugWidth` (boolean): If true, the group shrinks to fit its content width instead of stretching.
 * - `disabled` (boolean): Disables the entire group and all contained options.
 *
 * ### Events
 * - `value` – Fired when the selected option changes. Event detail includes `{ value, previousValue }`.
 *
 * ### Best Practices and Constraints
 * - Always provide unique `value` attributes for each child option to ensure correct selection behavior.
 * - At least one option should be enabled at all times; if all options are disabled, no selection is possible.
 * - When the group is disabled, all options are visually and functionally disabled, regardless of their individual state.
 * - For accessibility, ensure each option has a clear label and consider keyboard navigation in your application context.
 *
 * ### Example:
 * ```html
 * <obc-toggle-button-vertical-group value="opt-a" type="regular">
 *   <obc-toggle-button-vertical-option value="opt-a" label="Option A">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 *   <obc-toggle-button-vertical-option value="opt-b" label="Option B">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 *   <obc-toggle-button-vertical-option value="opt-c" label="Option C">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-toggle-button-vertical-option>
 * </obc-toggle-button-vertical-group>
 * ```
 *
 * @slot - Default slot for placing one or more `<obc-toggle-button-vertical-option>` elements as selectable options.
 * @fires value {CustomEvent<{value: string, previousValue: string}>} Fired when the selected option changes.
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
   * - `regular`: Default style with background and border.
   * - `flat`: Minimal style with no background or border.
   *
   * Defaults to `regular`.
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

  protected override firstUpdated(changed: PropertyValueMap<unknown>) {
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
    return html`
      <div
        class="
          outer-wrapper
          ${this.type === ObcToggleButtonVerticalOptionType.flat
          ? 'flat'
          : 'regular'}
          ${this.hugWidth ? 'hug-width' : ''}
          ${this.disabled ? 'disabled' : ''}
        "
      >
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
