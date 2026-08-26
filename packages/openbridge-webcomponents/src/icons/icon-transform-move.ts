import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-move')
export class ObiTransformMove extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.793 5.79297L14.3799 7.20508L13 5.8252V11H18.1748L16.8047 9.6084L18.207 8.20703L22 12L18.207 15.793L16.7939 14.3799L18.1748 13H13V18.1748L14.3906 16.8047L15.793 18.207L12 22L8.20703 18.207L9.6084 16.8047L11 18.1748V13H5.8252L7.19434 14.3906L5.79297 15.793L2 12L5.79297 8.20703L7.19434 9.6084L5.8252 11H11V5.8252L9.6084 7.19434L8.20703 5.79297L12 2L15.793 5.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.793 5.79297L14.3799 7.20508L13 5.8252V11H18.1748L16.8047 9.6084L18.207 8.20703L22 12L18.207 15.793L16.7939 14.3799L18.1748 13H13V18.1748L14.3906 16.8047L15.793 18.207L12 22L8.20703 18.207L9.6084 16.8047L11 18.1748V13H5.8252L7.19434 14.3906L5.79297 15.793L2 12L5.79297 8.20703L7.19434 9.6084L5.8252 11H11V5.8252L9.6084 7.19434L8.20703 5.79297L12 2L15.793 5.79297Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-transform-move': ObiTransformMove;
  }
}
