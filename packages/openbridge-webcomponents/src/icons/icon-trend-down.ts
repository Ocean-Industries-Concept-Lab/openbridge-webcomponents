import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-trend-down')
export class ObiTrendDown extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6076 16.3224L21.5077 10.6015L19.9848 11.9612L13.4999 4.66759L9.49988 8.66759L3.49988 2.65759L1.99988 4.15759L9.49988 11.6676L13.4999 7.66759L18.4993 13.2875L17.0474 14.5838L22.6076 16.3224Z" fill="currentColor"/>
<path d="M1.99988 18.9999H21.9999V20.9999H1.99988V18.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6076 16.3224L21.5077 10.6015L19.9848 11.9612L13.4999 4.66759L9.49988 8.66759L3.49988 2.65759L1.99988 4.15759L9.49988 11.6676L13.4999 7.66759L18.4993 13.2875L17.0474 14.5838L22.6076 16.3224Z" style="fill: var(--element-active-color)"/>
<path d="M1.99988 18.9999H21.9999V20.9999H1.99988V18.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-trend-down': ObiTrendDown;
  }
}
