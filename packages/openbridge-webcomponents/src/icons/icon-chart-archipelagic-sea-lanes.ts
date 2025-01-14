import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-archipelagic-sea-lanes')
export class ObiChartArchipelagicSeaLanes extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 3.75H11V2.25H1V3.75H3.75L6 6L8.25 3.75Z" fill="currentColor"/>
<path d="M3.61905 13H1V11H3.61905V13Z" fill="currentColor"/>
<path d="M10.9524 13H5.71429V11H10.9524V13Z" fill="currentColor"/>
<path d="M18.2857 13H13.0476V11H18.2857V13Z" fill="currentColor"/>
<path d="M23 13H20.381V11H23V13Z" fill="currentColor"/>
<path d="M18 18L20.25 20.25H23V21.75H13V20.25H15.75L18 18Z" fill="currentColor"/>
<path d="M20.25 3.75H23V2.25H13V3.75H15.75L18 6L20.25 3.75Z" fill="currentColor"/>
<path d="M6 18L8.25 20.25H11V21.75H1V20.25H3.75L6 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 3.75H11V2.25H1V3.75H3.75L6 6L8.25 3.75Z" style="fill: var(--element-active-color)"/>
<path d="M3.61905 13H1V11H3.61905V13Z" style="fill: var(--element-active-color)"/>
<path d="M10.9524 13H5.71429V11H10.9524V13Z" style="fill: var(--element-active-color)"/>
<path d="M18.2857 13H13.0476V11H18.2857V13Z" style="fill: var(--element-active-color)"/>
<path d="M23 13H20.381V11H23V13Z" style="fill: var(--element-active-color)"/>
<path d="M18 18L20.25 20.25H23V21.75H13V20.25H15.75L18 18Z" style="fill: var(--element-active-color)"/>
<path d="M20.25 3.75H23V2.25H13V3.75H15.75L18 6L20.25 3.75Z" style="fill: var(--element-active-color)"/>
<path d="M6 18L8.25 20.25H11V21.75H1V20.25H3.75L6 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-archipelagic-sea-lanes': ObiChartArchipelagicSeaLanes;
  }
}