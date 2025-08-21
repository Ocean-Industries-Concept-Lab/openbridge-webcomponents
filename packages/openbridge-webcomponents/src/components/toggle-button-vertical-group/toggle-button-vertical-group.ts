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

@customElement('obc-toggle-button-vertical-group')
export class ObcToggleButtonVerticalGroup extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) type = ObcToggleButtonVerticalOptionType.regular;
  @property({type: Boolean}) hugWidth = false;
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

    // If there are no enabled options, keep current selection
    if (!this.hasAnyEnabledOption()) {
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
      this.updateDividers();
      return;
    }

    // If trying to select a disabled option, ignore
    if (!this.canSelectOption(newValue)) {
      // If we have a valid current selection, keep it
      if (this.value && this.getOptionByValue(this.value)) {
        this.options.forEach((option) => {
          option.selected = option.value === this.value;
        });
        this.updateDividers();
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

    this.updateDividers();

    if (emitEvent && oldValue !== newValue) {
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
      // Store original disabled states
      this._originalDisabledStates.set(opt, opt.disabled);

      opt.addEventListener('selected', (e) => this.onOptionSelected(e));

      // Listen for disabled state changes on individual options
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.attributeName === 'disabled' &&
            !opt.hasAttribute('data-group-disabled')
          ) {
            // Update stored state only if not group-disabled
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
