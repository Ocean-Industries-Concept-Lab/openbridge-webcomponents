import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-move')
export class ObiTransformMove extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.793 6.79297L14.3799 8.20508L13 6.8252V11H17.1748L15.8047 9.6084L17.207 8.20703L21 12L17.207 15.793L15.7939 14.3799L17.1748 13H13V17.1748L14.3906 15.8047L15.793 17.207L12 21L8.20703 17.207L9.6084 15.8047L11 17.1748V13H6.8252L8.19434 14.3906L6.79297 15.793L3 12L6.79297 8.20703L8.19434 9.6084L6.8252 11H11V6.8252L9.6084 8.19434L8.20703 6.79297L12 3L15.793 6.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.793 6.79297L14.3799 8.20508L13 6.8252V11H17.1748L15.8047 9.6084L17.207 8.20703L21 12L17.207 15.793L15.7939 14.3799L17.1748 13H13V17.1748L14.3906 15.8047L15.793 17.207L12 21L8.20703 17.207L9.6084 15.8047L11 17.1748V13H6.8252L8.19434 14.3906L6.79297 15.793L3 12L6.79297 8.20703L8.19434 9.6084L6.8252 11H11V6.8252L9.6084 8.19434L8.20703 6.79297L12 3L15.793 6.79297Z" style="fill: var(--element-active-color)"/>
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
