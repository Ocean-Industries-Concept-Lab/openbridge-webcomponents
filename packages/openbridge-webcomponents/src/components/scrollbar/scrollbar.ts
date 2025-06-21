import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './scrollbar.css?inline';

@customElement('obc-scrollbar')
export class ObcScrollbar extends LitElement {
  override render() {
    return html`
        <slot></slot>
    `;
  }

  scrollToBottom() {
    const wrapper = this.shadowRoot?.querySelector('.wrapper');
    if (wrapper) {
      wrapper.scrollTop = wrapper.scrollHeight;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-scrollbar': ObcScrollbar;
  }
}
