import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-tidal-stream')
export class Obi03TidalStream extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 22L12 15L18 22M6 15L12 8L18 15M6 8L12 1L18 8" stroke="black"/>
<path d="M12 24V1" stroke="black" stroke-dasharray="2 4"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 22L12 15L18 22M6 15L12 8L18 15M6 8L12 1L18 8" stroke="currentColor"/>
<path d="M12 24V1" stroke="currentColor" stroke-dasharray="2 4"/>
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
    'obi-03-tidal-stream': Obi03TidalStream;
  }
}
