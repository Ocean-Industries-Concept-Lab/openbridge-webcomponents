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
  ObcToggleButtonOptionType,
} from '../toggle-button-option/toggle-button-option.js';
import componentStyle from './toggle-button-group.css?inline';
import {customElement} from '../../decorator.js';

export type ObcToggleButtonGroupValueChangeEvent = CustomEvent<{value: string}>;

/**
 * @fires value {ObcToggleButtonGroupValueChangeEvent} - Emitted when the value changes.
 */
@customElement('obc-toggle-button-group')
export class ObcToggleButtonGroup extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) type = ObcToggleButtonOptionType.text;

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
  }

  handleOptionClick(event: Event) {
    const value = (event as CustomEvent).detail.value;
    this.dispatchEvent(new CustomEvent('value', {detail: {value}}));
    this.options.forEach((option) => {
      option.selected = option.value === value;
    });
  }

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
    }
  }

  override render() {
    return html`
      <div
        class="outer-wrapper ${this.type ===
        ObcToggleButtonOptionType.iconTextUnder
          ? 'has-labels'
          : ''}"
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
