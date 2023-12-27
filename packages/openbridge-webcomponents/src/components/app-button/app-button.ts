import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './app-button.style';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-app-button')
export class AppButton extends LitElement {
  @property({type: String}) label = 'Button';
  @property({type: Boolean}) checked = false;
  @property({type: String}) size = 'normal';

  override render() {
    return html` <div
      class="${classMap({
        wrapper: true,
        checked: this.checked,
        small: this.size === 'small',
      })}"
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
