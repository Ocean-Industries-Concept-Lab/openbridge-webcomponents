import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-boundaries-limits-proposal')
export class ObiChartBoundariesLimitsProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5858 7L8.41421 7L4.41421 11H1.58579L5.58579 7L1 7V5L23 5V7H22.4142L18.4142 11H15.5858L19.5858 7L15.4142 7L11.4142 11H8.58579L12.5858 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 17H3V19H1V17ZM7 19H5V17H7V19ZM11 19H9V17H11V19ZM15 19H13V17H15V19ZM19 19H17V17H19V19ZM21 19V17H23V19H21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5858 7L8.41421 7L4.41421 11H1.58579L5.58579 7L1 7V5L23 5V7H22.4142L18.4142 11H15.5858L19.5858 7L15.4142 7L11.4142 11H8.58579L12.5858 7Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 17H3V19H1V17ZM7 19H5V17H7V19ZM11 19H9V17H11V19ZM15 19H13V17H15V19ZM19 19H17V17H19V19ZM21 19V17H23V19H21Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-chart-boundaries-limits-proposal': ObiChartBoundariesLimitsProposal;
  }
}