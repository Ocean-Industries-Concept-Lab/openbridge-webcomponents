import {LitElement, PropertyValueMap, html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {ObcToggleButtonOption} from '../toggle-button-option/toggle-button-option';
import componentStyle from './toggle-button-group.style';

@customElement('obc-toggle-button-group')
export class ObcToggleButtonGroup extends LitElement {
  @property({type: Boolean, attribute: 'has-labels'}) hasLabels = false;
  @property({type: String}) value = '';

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

  override requestUpdate(name?: PropertyKey, oldValue?: unknown) {
    if (name && name == 'value' && this.value !== oldValue) {
      this.options.forEach((option) => {
        option.selected = option.value === this.value;
      });
    }
    return super.requestUpdate(name, oldValue);
  }

  override render() {
    return html`
      <div class="wrapper ${this.hasLabels ? 'has-labels' : ''}">
        <slot></slot>
      </div>
    `;
  }

  static override styles = componentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-group': ObcToggleButtonGroup;
  }
}
