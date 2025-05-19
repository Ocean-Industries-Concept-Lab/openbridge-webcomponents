import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './card.css?inline';

@customElement('obc-card')
export class ObcCard extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-card': ObcCard;
  }
}
