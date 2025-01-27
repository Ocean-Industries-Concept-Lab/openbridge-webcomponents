import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-boundary-iec')
export class ObiChartBoundaryIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5858 11L8.41421 11L4.41421 15H1.58579L5.58579 11L1 11V9L23 9V11H22.4142L18.4142 15H15.5858L19.5858 11L15.4142 11L11.4142 15H8.58579L12.5858 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5858 11L8.41421 11L4.41421 15H1.58579L5.58579 11L1 11V9L23 9V11H22.4142L18.4142 15H15.5858L19.5858 11L15.4142 11L11.4142 15H8.58579L12.5858 11Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-boundary-iec': ObiChartBoundaryIec;
  }
}
