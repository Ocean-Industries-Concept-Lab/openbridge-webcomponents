import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './divider.css?inline';

@customElement('obc-divider')
export class ObcDivider extends LitElement {
  override render() {
    return html``;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-divider': ObcDivider;
  }
}
