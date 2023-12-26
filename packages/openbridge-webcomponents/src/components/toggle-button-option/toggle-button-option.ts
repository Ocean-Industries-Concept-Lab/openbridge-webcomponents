import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import comonentStyle from './toggle-button-option.style';

@customElement('obc-toggle-button-option')
export class ToggleButtonOption extends LitElement {
  @property({type: String}) value = 'value';
  @property({type: Boolean}) selected = false;

  onClick() {
    this.dispatchEvent(
      new CustomEvent('selected', {detail: {value: this.value}})
    );
  }

  override render() {
    return html`
      <button class="wrapper" ?selected=${this.selected} @click=${this.onClick}>
        <div class="icon">
          <slot name="icon"> </slot>
        </div>
        <div class="label" ?selected=${this.selected}><slot></slot></div>
      </button>
    `;
  }

  static override styles = comonentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ToggleButtonOption;
  }
}
