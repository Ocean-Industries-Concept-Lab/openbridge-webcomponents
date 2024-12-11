import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-silence-iec')
export class ObiSilenceIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.1929 20.1928L21.7787 21.607L18 17.8283V23L11.8889 16.125H3V7.875H8.04669L3.39389 3.2222L4.80811 1.80798L23.1929 20.1928ZM10.0467 9.875H5L5 14.125H12.787L16 17.7396V15.8283L10.0467 9.875Z" fill="currentColor"/>
<path d="M16 6.2604V10.1711L18 12.1711L18 1L12.743 6.91413L14.1596 8.33079L16 6.2604Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.1929 20.1928L21.7787 21.607L18 17.8283V23L11.8889 16.125H3V7.875H8.04669L3.39389 3.2222L4.80811 1.80798L23.1929 20.1928ZM10.0467 9.875H5L5 14.125H12.787L16 17.7396V15.8283L10.0467 9.875Z" style="fill: var(--element-active-color)"/>
<path d="M16 6.2604V10.1711L18 12.1711L18 1L12.743 6.91413L14.1596 8.33079L16 6.2604Z" style="fill: var(--element-active-color)"/>
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
    'obi-silence-iec': ObiSilenceIec;
  }
}
