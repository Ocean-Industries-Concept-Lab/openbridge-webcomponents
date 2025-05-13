import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-tune-proposal')
export class ObiRadarTuneProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>
<path d="M19.3559 10.5368C19.5803 11.6651 19.5422 12.8299 19.2444 13.9411L19.0835 13.898C19.1128 13.6952 19.1279 13.4891 19.1279 13.2803C19.1279 10.2427 15.9366 7.78027 12 7.78027C8.06335 7.78027 4.87207 10.2427 4.87207 13.2803C4.87207 13.4891 4.88715 13.6952 4.91653 13.898L4.75556 13.9411C4.45781 12.8299 4.41968 11.6651 4.64411 10.5368C4.86854 9.40852 5.34953 8.34697 6.04985 7.43429C6.75017 6.52161 7.65107 5.78227 8.68283 5.27345C9.7146 4.76464 10.8496 4.5 12 4.5C13.1504 4.5 14.2854 4.76464 15.3172 5.27345C16.3489 5.78227 17.2498 6.52161 17.9501 7.43429C18.6505 8.34697 19.1315 9.40852 19.3559 10.5368Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" style="fill: var(--element-active-color)"/>
<path d="M19.3559 10.5368C19.5803 11.6651 19.5422 12.8299 19.2444 13.9411L19.0835 13.898C19.1128 13.6952 19.1279 13.4891 19.1279 13.2803C19.1279 10.2427 15.9366 7.78027 12 7.78027C8.06335 7.78027 4.87207 10.2427 4.87207 13.2803C4.87207 13.4891 4.88715 13.6952 4.91653 13.898L4.75556 13.9411C4.45781 12.8299 4.41968 11.6651 4.64411 10.5368C4.86854 9.40852 5.34953 8.34697 6.04985 7.43429C6.75017 6.52161 7.65107 5.78227 8.68283 5.27345C9.7146 4.76464 10.8496 4.5 12 4.5C13.1504 4.5 14.2854 4.76464 15.3172 5.27345C16.3489 5.78227 17.2498 6.52161 17.9501 7.43429C18.6505 8.34697 19.1315 9.40852 19.3559 10.5368Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-tune-proposal': ObiRadarTuneProposal;
  }
}
