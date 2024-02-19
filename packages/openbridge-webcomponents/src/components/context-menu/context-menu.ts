import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './context-menu.css?inline';

@customElement('obc-context-menu')
export class ObcContextMenu extends LitElement {
  override render() {
    return html` <ol>
      <slot></slot>
    </ol>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu': ObcContextMenu;
  }
}
