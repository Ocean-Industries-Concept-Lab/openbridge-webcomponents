import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-info-report-proposal')
export class ObiInfoReportProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 8.5C12.2833 8.5 12.5208 8.40417 12.7125 8.2125C12.9042 8.02083 13 7.78333 13 7.5C13 7.21667 12.9042 6.97917 12.7125 6.7875C12.5208 6.59583 12.2833 6.5 12 6.5C11.7167 6.5 11.4792 6.59583 11.2875 6.7875C11.0958 6.97917 11 7.21667 11 7.5C11 7.78333 11.0958 8.02083 11.2875 8.2125C11.4792 8.40417 11.7167 8.5 12 8.5ZM11 15H13V10H11V15ZM2 23V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V17C22 17.55 21.8042 18.0208 21.4125 18.4125C21.0208 18.8042 20.55 19 20 19H6L2 23ZM5.15 17H20V5H4V18.125L5.15 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 8.5C12.2833 8.5 12.5208 8.40417 12.7125 8.2125C12.9042 8.02083 13 7.78333 13 7.5C13 7.21667 12.9042 6.97917 12.7125 6.7875C12.5208 6.59583 12.2833 6.5 12 6.5C11.7167 6.5 11.4792 6.59583 11.2875 6.7875C11.0958 6.97917 11 7.21667 11 7.5C11 7.78333 11.0958 8.02083 11.2875 8.2125C11.4792 8.40417 11.7167 8.5 12 8.5ZM11 15H13V10H11V15ZM2 23V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V17C22 17.55 21.8042 18.0208 21.4125 18.4125C21.0208 18.8042 20.55 19 20 19H6L2 23ZM5.15 17H20V5H4V18.125L5.15 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-info-report-proposal': ObiInfoReportProposal;
  }
}
