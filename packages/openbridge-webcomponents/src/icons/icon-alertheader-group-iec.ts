import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alertheader-group-iec')
export class ObiAlertheaderGroupIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 2H11V5H8V7H11V10H13V7H16V5H13V2Z" fill="currentColor"/>
<path d="M19 8H17V11H14V13H17V16H19V13H22V11H19V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 2H11V5H8V7H11V10H13V7H16V5H13V2Z" style="fill: var(--element-active-color)"/>
<path d="M19 8H17V11H14V13H17V16H19V13H22V11H19V8Z" style="fill: var(--element-active-color)"/>
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
