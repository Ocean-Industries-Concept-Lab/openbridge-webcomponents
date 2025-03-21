import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alertheader-group-iec')
export class ObiAlertheaderGroupIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H14V3H12V5H14V7H16V5H18V3H16V1Z" fill="currentColor"/>
<path d="M21 6H19V8H17V10H19V12H21V10H23V8H21V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H14V3H12V5H14V7H16V5H18V3H16V1Z" style="fill: var(--element-active-color)"/>
<path d="M21 6H19V8H17V10H19V12H21V10H23V8H21V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-alertheader-group-iec': ObiAlertheaderGroupIec;
  }
}
