import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-scale-boundaries-iec')
export class ObiChartScaleBoundariesIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 10L2 10L2 7L22 7V10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 14.5L2 14.5L2 13L22 13V14.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 17.5L2 17.5L2 16L22 16V17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 10L2 10L2 7L22 7V10Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 14.5L2 14.5L2 13L22 13V14.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 17.5L2 17.5L2 16L22 16V17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-scale-boundaries-iec': ObiChartScaleBoundariesIec;
  }
}