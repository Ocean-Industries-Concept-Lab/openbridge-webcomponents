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

@customElement('obc-toggle-button-group')
export class ObcToggleButtonGroup extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) type = ObcToggleButtonOptionType.text;
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;
  @property({type: Boolean}) hugText = false;
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

    // If there are no enabled options, keep current selection
    if (!this.hasAnyEnabledOption()) {
      // Just update visual state without changing value
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
      this.setNoDivider();
      return;
    }

    // If trying to select a disabled option, ignore
    if (!this.canSelectOption(newValue)) {
      // If we have a valid current selection, keep it
      if (this.value && this.getOptionByValue(this.value)) {
        this.options.forEach((option) => {
          option.selected = option.value === this.value;
        });
        this.setNoDivider();
        return;
      }
      // Otherwise find first selectable
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
      // Store original disabled states
      this._originalDisabledStates.set(option, option.hasAttribute('disabled'));

      option.addEventListener('selected', (e) => this.handleOptionClick(e));

      // Listen for disabled state changes on individual options
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.attributeName === 'disabled' &&
            !option.hasAttribute('data-group-disabled')
          ) {
            // Update stored state only if not group-disabled
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

    // If no initial value or invalid value, select first available
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
    // If the currently selected option became disabled and there are other options
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
    this.updateSelection(value);
  }

  override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this.updateSelection(this.value);
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
          // Restore original disabled state
          const originalState =
            this._originalDisabledStates.get(option) || false;
          option.disabled = originalState;
        }
      });
    }
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // Check if currently selected option became disabled
    // If it did and there are other enabled options, move selection
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
