import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
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
