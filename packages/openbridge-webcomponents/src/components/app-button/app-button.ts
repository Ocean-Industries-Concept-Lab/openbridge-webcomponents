import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './app-button.style';
import '../icon/icon';

@customElement('obc-app-button')
export class AppButton extends LitElement {
  @property({type: String}) label = 'Button';
  @property({type: String}) icon = '01-placeholder';
  @property({type: Boolean}) checked = false;
  @property({type: String}) size = 'normal';

  override render() {
    return html` <div
      class="wrapper ${this.size === 'small' ? 'small' : null}"
      ?checked=${this.checked}
    >
      <button>
        <span class="icon"
          ><obc-icon
            icon=${this.icon}
            size="${this.size === 'small' ? 20 : 48}"
          ></obc-icon
        ></span>
      </button>
      <span class="label"> ${this.label} </span>
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-app-button': AppButton;
  }
}
