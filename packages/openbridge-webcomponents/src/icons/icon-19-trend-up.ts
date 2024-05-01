import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-trend-up')
export class Obi19TrendUp extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 2.31543L21.5078 8.03633L19.9849 6.67659L13.5 13.9702L9.5 9.97019L3.5 15.9802L2 14.4802L9.5 6.97019L13.5 10.9702L18.4994 5.35027L17.0475 4.05395L22.6077 2.31543Z" fill="currentColor"/>
<path d="M2 19.0002H22V21.0002H2V19.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 2.31543L21.5078 8.03633L19.9849 6.67659L13.5 13.9702L9.5 9.97019L3.5 15.9802L2 14.4802L9.5 6.97019L13.5 10.9702L18.4994 5.35027L17.0475 4.05395L22.6077 2.31543Z" style="fill: var(--element-active-color)"/>
<path d="M2 19.0002H22V21.0002H2V19.0002Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-trend-up': Obi19TrendUp;
  }
}
