import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-proposal')
export class ObiAisProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0166 11.8519L23.1979 1.67056L21.7837 0.256348L11.82 10.2201L0.777832 14.9824L8.72479 22.9293L13.0166 11.8519ZM7.96506 19.3275L4.29263 15.6551L10.4101 13.0168L7.96506 19.3275Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0166 11.8519L23.1979 1.67056L21.7837 0.256348L11.82 10.2201L0.777832 14.9824L8.72479 22.9293L13.0166 11.8519ZM7.96506 19.3275L4.29263 15.6551L10.4101 13.0168L7.96506 19.3275Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-proposal': ObiAisProposal;
  }
}
