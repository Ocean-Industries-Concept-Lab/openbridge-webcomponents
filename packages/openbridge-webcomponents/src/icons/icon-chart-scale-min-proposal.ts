import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-scale-min-proposal')
export class ObiChartScaleMinProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.62893 22.7711L1.22893 21.3711L5.6 17H1L1 15H9V23H7L7 18.4L2.62893 22.7711Z" fill="currentColor"/>
<path d="M21.3711 1.22893L22.7711 2.62893L18.4 7H23V9H15V1L17 1V5.6L21.3711 1.22893Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4912 22.1481L1.85184 7.50873L3.26606 6.09452L17.9054 20.7339L16.4912 22.1481ZM20.7338 17.9054L6.09448 3.26609L7.5087 1.85188L22.1481 16.4912L20.7338 17.9054Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.62893 22.7711L1.22893 21.3711L5.6 17H1L1 15H9V23H7L7 18.4L2.62893 22.7711Z" style="fill: var(--element-active-color)"/>
<path d="M21.3711 1.22893L22.7711 2.62893L18.4 7H23V9H15V1L17 1V5.6L21.3711 1.22893Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4912 22.1481L1.85184 7.50873L3.26606 6.09452L17.9054 20.7339L16.4912 22.1481ZM20.7338 17.9054L6.09448 3.26609L7.5087 1.85188L22.1481 16.4912L20.7338 17.9054Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-scale-min-proposal': ObiChartScaleMinProposal;
  }
}
