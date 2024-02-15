import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './context-menu.style';

@customElement('obc-context-menu')
export class ObcContextMenu extends LitElement {
  override render() {
    return html` <ol>
      <slot></slot>
    </ol>`;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu': ObcContextMenu;
  }
}
