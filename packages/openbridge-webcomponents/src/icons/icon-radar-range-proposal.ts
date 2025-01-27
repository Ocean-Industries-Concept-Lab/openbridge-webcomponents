import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-range-proposal')
export class ObiRadarRangeProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 1.5C6.42945 1.5 8.83512 1.97852 11.0796 2.90823C13.3242 3.83794 15.3636 5.20064 17.0815 6.91852C18.7994 8.63641 20.1621 10.6758 21.0918 12.9204C22.0215 15.1649 22.5 17.5705 22.5 20H21C21 17.7675 20.5603 15.5569 19.706 13.4944C18.8516 11.4318 17.5994 9.55778 16.0208 7.97918C14.4422 6.40059 12.5682 5.14838 10.5056 4.29405C8.44308 3.43972 6.23247 3 4 3V1.5Z" fill="currentColor"/>
<path d="M6.5 20C6.5 21.3807 5.38071 22.5 4 22.5C2.61929 22.5 1.5 21.3807 1.5 20C1.5 18.6193 2.61929 17.5 4 17.5C5.38071 17.5 6.5 18.6193 6.5 20Z" fill="currentColor"/>
<path d="M15.0233 9.01721H10.2733V10.5172H12.4222L8.30579 14.6336V12.4847H6.80579L6.80579 17.2347L11.5558 17.2347V15.7347H9.32597L13.5233 11.5374V13.7672H15.0233V9.01721Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 1.5C6.42945 1.5 8.83512 1.97852 11.0796 2.90823C13.3242 3.83794 15.3636 5.20064 17.0815 6.91852C18.7994 8.63641 20.1621 10.6758 21.0918 12.9204C22.0215 15.1649 22.5 17.5705 22.5 20H21C21 17.7675 20.5603 15.5569 19.706 13.4944C18.8516 11.4318 17.5994 9.55778 16.0208 7.97918C14.4422 6.40059 12.5682 5.14838 10.5056 4.29405C8.44308 3.43972 6.23247 3 4 3V1.5Z" style="fill: var(--element-active-color)"/>
<path d="M6.5 20C6.5 21.3807 5.38071 22.5 4 22.5C2.61929 22.5 1.5 21.3807 1.5 20C1.5 18.6193 2.61929 17.5 4 17.5C5.38071 17.5 6.5 18.6193 6.5 20Z" style="fill: var(--element-active-color)"/>
<path d="M15.0233 9.01721H10.2733V10.5172H12.4222L8.30579 14.6336V12.4847H6.80579L6.80579 17.2347L11.5558 17.2347V15.7347H9.32597L13.5233 11.5374V13.7672H15.0233V9.01721Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-range-proposal': ObiRadarRangeProposal;
  }
}
