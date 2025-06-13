import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './checkbox.css?inline';

@customElement('obc-checkbox')
export class ObcCheckbox extends LitElement {
  override render() {
    return html` <button class="wrapper"></button> `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-checkbox': ObcCheckbox;
  }
}
