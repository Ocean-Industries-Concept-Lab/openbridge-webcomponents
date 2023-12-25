import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-05-server')
export class Obi05Server extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 20V16H21V20H3ZM5 19H7V17H5V19ZM3 8V4H21V8H3ZM5 7H7V5H5V7ZM3 14V10H21V14H3ZM5 13H7V11H5V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 20V16H21V20H3ZM5 19H7V17H5V19ZM3 8V4H21V8H3ZM5 7H7V5H5V7ZM3 14V10H21V14H3ZM5 13H7V11H5V13Z" fill="currentColor"/>
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
    'obi-05-server': Obi05Server;
  }
}
