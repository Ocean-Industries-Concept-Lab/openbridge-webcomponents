import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-electronic-bearing-line-proposal')
export class ObiRadarElectronicBearingLineProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2886 4.2941L19.7028 2.87988L21.117 4.2941L19.7028 5.70831L18.2886 4.2941Z" fill="currentColor"/>
<path d="M15.4601 7.12252L16.8743 5.70831L18.2886 7.12252L16.8743 8.53674L15.4601 7.12252Z" fill="currentColor"/>
<path d="M14.0459 8.53674L12.6317 9.95095L14.0459 11.3652L15.4601 9.95095L14.0459 8.53674Z" fill="currentColor"/>
<path d="M9.80328 12.7794L11.2175 11.3652L12.6317 12.7794L11.2175 14.1936L9.80328 12.7794Z" fill="currentColor"/>
<path d="M8.38907 14.1936L6.97485 15.6078L8.38907 17.022L9.80328 15.6078L8.38907 14.1936Z" fill="currentColor"/>
<path d="M4.5 21.9969C5.88071 21.9969 7 20.8776 7 19.4969C7 18.1162 5.88071 16.9969 4.5 16.9969C3.11929 16.9969 2 18.1162 2 19.4969C2 20.8776 3.11929 21.9969 4.5 21.9969Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2886 4.2941L19.7028 2.87988L21.117 4.2941L19.7028 5.70831L18.2886 4.2941Z" style="fill: var(--element-active-color)"/>
<path d="M15.4601 7.12252L16.8743 5.70831L18.2886 7.12252L16.8743 8.53674L15.4601 7.12252Z" style="fill: var(--element-active-color)"/>
<path d="M14.0459 8.53674L12.6317 9.95095L14.0459 11.3652L15.4601 9.95095L14.0459 8.53674Z" style="fill: var(--element-active-color)"/>
<path d="M9.80328 12.7794L11.2175 11.3652L12.6317 12.7794L11.2175 14.1936L9.80328 12.7794Z" style="fill: var(--element-active-color)"/>
<path d="M8.38907 14.1936L6.97485 15.6078L8.38907 17.022L9.80328 15.6078L8.38907 14.1936Z" style="fill: var(--element-active-color)"/>
<path d="M4.5 21.9969C5.88071 21.9969 7 20.8776 7 19.4969C7 18.1162 5.88071 16.9969 4.5 16.9969C3.11929 16.9969 2 18.1162 2 19.4969C2 20.8776 3.11929 21.9969 4.5 21.9969Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-electronic-bearing-line-proposal': ObiRadarElectronicBearingLineProposal;
  }
}
