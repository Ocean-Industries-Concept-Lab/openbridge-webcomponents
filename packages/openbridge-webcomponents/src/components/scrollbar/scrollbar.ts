import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './scrollbar.style';

@customElement('obc-scrollbar')
export class ObcScrollbar extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-scrollbar': ObcScrollbar;
  }
}
