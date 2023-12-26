import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './navigation-item.style';

@customElement('obc-navigation-item')
export class NavigationItem extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: String}) href = '#';
  @property({type: Boolean}) checked = false;

  onClick() {
    dispatchEvent(new CustomEvent('click'));
  }

  override render() {
    return html`
      <a
        class="wrapper"
        ?checked=${this.checked}
        href="${this.href}"
        @click=${this.onClick}
      >
        <slot name="icon" class="icon"> </slot name="icon">
        <span class="label"> ${this.label} </span>
      </a>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item': NavigationItem;
  }
}
