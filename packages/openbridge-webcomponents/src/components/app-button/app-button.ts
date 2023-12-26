import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './app-button.style';

@customElement('obc-app-button')
export class AppButton extends LitElement {
  @property({type: String}) label = 'Button';
  @property({type: Boolean}) checked = false;
  @property({type: String}) size = 'normal';

  override render() {
    return html` <div
      class="wrapper ${this.size === 'small' ? 'small' : null}"
      ?checked=${this.checked}
    >
      <button>
        <span class="icon">
          <slot name="icon"></slot>
        </span>
      </button>
      <span class="label"> ${this.label} </span>
    </div>`;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-app-button': AppButton;
  }
}
