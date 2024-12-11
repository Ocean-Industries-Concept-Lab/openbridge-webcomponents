import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-print-screen-proposal')
export class ObiPrintScreenProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V20C2 21.1046 2.89543 22 4 22H6V20H4L4 17H2ZM7 2H4C2.89543 2 2 2.89543 2 4V7H4V4L7 4V2ZM2 14H4V10H2V14ZM10 2V4H14V2H10ZM17 2V4H20V7H22V4C22 2.89543 21.1046 2 20 2H17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V8H18V11H20C21.1046 11 22 11.8954 22 13V19H18V22H11V19H7V13C7 11.8954 7.89543 11 9 11H11ZM9 13H20V17H18V15H11V17H9V13ZM16 17H13V20H16V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V20C2 21.1046 2.89543 22 4 22H6V20H4L4 17H2ZM7 2H4C2.89543 2 2 2.89543 2 4V7H4V4L7 4V2ZM2 14H4V10H2V14ZM10 2V4H14V2H10ZM17 2V4H20V7H22V4C22 2.89543 21.1046 2 20 2H17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V8H18V11H20C21.1046 11 22 11.8954 22 13V19H18V22H11V19H7V13C7 11.8954 7.89543 11 9 11H11ZM9 13H20V17H18V15H11V17H9V13ZM16 17H13V20H16V17Z" style="fill: var(--element-active-color)"/>
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
    'obi-print-screen-proposal': ObiPrintScreenProposal;
  }
}
