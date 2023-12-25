import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-11-current-1')
export class Obi11Current1 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10.9999H3.06156e-05L0 12.9999H17L17 10.9999Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7928 6.79297L23.9999 12.0001L18.7928 17.2072L17.3786 15.793L21.1715 12.0001L17.3786 8.20718L18.7928 6.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10.9999H3.06156e-05L0 12.9999H17L17 10.9999Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7928 6.79297L23.9999 12.0001L18.7928 17.2072L17.3786 15.793L21.1715 12.0001L17.3786 8.20718L18.7928 6.79297Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-11-current-1': Obi11Current1;
  }
}
