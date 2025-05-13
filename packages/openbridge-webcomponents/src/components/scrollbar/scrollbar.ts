import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './scrollbar.css?inline';

@customElement('obc-scrollbar')
export class ObcScrollbar extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
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
