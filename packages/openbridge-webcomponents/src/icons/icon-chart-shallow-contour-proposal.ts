import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-shallow-contour-proposal')
export class ObiChartShallowContourProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.95 9.25H2V7.75H4.95C7.02107 7.75 8.75 9.42893 8.75 11.5V15H13.5C15.5711 15 17.25 16.6789 17.25 18.75V22H15.75V18.75C15.75 17.5074 14.7426 16.5 13.5 16.5H7.25V11.5C7.25 10.2574 6.19264 9.25 4.95 9.25Z" fill="currentColor"/>
<path d="M5 2.5H6.5V4H5V2.5Z" fill="currentColor"/>
<path d="M8 2.5H9.5V4H8V2.5Z" fill="currentColor"/>
<path d="M11 5.5H12.5V7H11V5.5Z" fill="currentColor"/>
<path d="M11 8.5H12.5V10H11V8.5Z" fill="currentColor"/>
<path d="M11 11.5H12.5V13H11V11.5Z" fill="currentColor"/>
<path d="M2 2.5H3.5V4H2V2.5Z" fill="currentColor"/>
<path d="M14 11.5H15.5V13H14V11.5Z" fill="currentColor"/>
<path d="M17 11.5H18.5V13H17V11.5Z" fill="currentColor"/>
<path d="M20 11.5H21.5V13H20V11.5Z" fill="currentColor"/>
<path d="M20 14.5H21.5V16H20V14.5Z" fill="currentColor"/>
<path d="M20 17.5H21.5V19H20V17.5Z" fill="currentColor"/>
<path d="M20 20.5H21.5V22H20V20.5Z" fill="currentColor"/>
<path d="M11 11.5H12.5V13H11V11.5Z" fill="currentColor"/>
<path d="M11 2.5H12.5V4H11V2.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.95 9.25H2V7.75H4.95C7.02107 7.75 8.75 9.42893 8.75 11.5V15H13.5C15.5711 15 17.25 16.6789 17.25 18.75V22H15.75V18.75C15.75 17.5074 14.7426 16.5 13.5 16.5H7.25V11.5C7.25 10.2574 6.19264 9.25 4.95 9.25Z" style="fill: var(--element-active-color)"/>
<path d="M5 2.5H6.5V4H5V2.5Z" style="fill: var(--element-active-color)"/>
<path d="M8 2.5H9.5V4H8V2.5Z" style="fill: var(--element-active-color)"/>
<path d="M11 5.5H12.5V7H11V5.5Z" style="fill: var(--element-active-color)"/>
<path d="M11 8.5H12.5V10H11V8.5Z" style="fill: var(--element-active-color)"/>
<path d="M11 11.5H12.5V13H11V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M2 2.5H3.5V4H2V2.5Z" style="fill: var(--element-active-color)"/>
<path d="M14 11.5H15.5V13H14V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M17 11.5H18.5V13H17V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M20 11.5H21.5V13H20V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M20 14.5H21.5V16H20V14.5Z" style="fill: var(--element-active-color)"/>
<path d="M20 17.5H21.5V19H20V17.5Z" style="fill: var(--element-active-color)"/>
<path d="M20 20.5H21.5V22H20V20.5Z" style="fill: var(--element-active-color)"/>
<path d="M11 11.5H12.5V13H11V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11 2.5H12.5V4H11V2.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-shallow-contour-proposal': ObiChartShallowContourProposal;
  }
}