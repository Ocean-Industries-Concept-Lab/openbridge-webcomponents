import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './divider.style';

@customElement('obc-divider')
export class ObcDivider extends LitElement {
  override render() {
    return html``;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-divider': ObcDivider;
  }
}
