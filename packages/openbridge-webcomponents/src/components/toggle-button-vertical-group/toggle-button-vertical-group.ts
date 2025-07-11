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

export type ObcToggleButtonVerticalGroupValueChangeEvent =
  CustomEvent<{value: string}>;

@customElement('obc-toggle-button-vertical-group')
export class ObcToggleButtonVerticalGroup extends LitElement {
  /** current selection */
  @property({type: String}) value = '';

  /** regular | flat */
  @property({type: String}) type = ObcToggleButtonVerticalOptionType.regular;

  /** shrink to intrinsic width instead of 100 % */
  @property({type: Boolean}) hugWidth = false;

  @queryAssignedElements({selector: 'obc-toggle-button-vertical-option'})
  private options!: NodeListOf<ObcToggleButtonVerticalOption>;

  /* ───────────────────────────── lifecycle ─────────────────────────── */

  protected override firstUpdated(changed: PropertyValueMap<unknown>) {
  super.firstUpdated(changed);

  // --- choose a default if nothing is selected yet ---
  if (!this.value && this.options.length) {
    this.value = this.options[0].value;
  }

  // wire up listeners & initial sync
  this.options.forEach((opt) => {
    opt.addEventListener('selected', (e) => this.onOptionSelected(e));
    opt.type  = this.type;
    opt.selected = opt.value === this.value;
  });
  this.updateDividers();
}

  override willUpdate(changed: PropertyValues): void {
    if (changed.has('value') || changed.has('type')) {
      this.options.forEach((opt) => {
        opt.type  = this.type;
        opt.selected = opt.value === this.value;
      });
      this.updateDividers();
    }
  }

  private updateDividers(): void {
    const last = this.options.length - 1;
    this.options.forEach((opt, idx) => {
      opt.noDivider = idx === last;
    });
  }

  // toggle-button-vertical-option.ts  (only the onClick changed)
  public onClick() {
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {value: this.value},
        bubbles: true,       //  ← add
        composed: true,      //  ← add (cross shadow DOM)
      })
    );
  }

  private onOptionSelected(e: Event): void {
    const newValue = (e as CustomEvent).detail.value;
    if (newValue === this.value) return;
    this.value = newValue;               // triggers willUpdate
    this.dispatchEvent(new CustomEvent('value', {detail: {value: newValue}}));
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
