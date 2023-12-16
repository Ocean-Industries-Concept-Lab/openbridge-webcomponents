import {LitElement, unsafeCSS, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './divider.css?inline';

@customElement('obc-divider')
export class Divider extends LitElement {
  render() {
    return html``;
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-divider': Divider;
  }
}
