import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-original-scale-iec')
export class ObiChartOriginalScaleIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.4383 16.0001H5.7223V10.9241C5.7223 10.7801 5.7223 10.6121 5.7223 10.4201C5.7303 10.2201 5.7383 10.0161 5.7463 9.80813C5.7543 9.60013 5.7623 9.41213 5.7703 9.24413C5.7223 9.30813 5.6303 9.40013 5.4943 9.52013C5.3663 9.64013 5.2463 9.74813 5.1343 9.84413L4.1503 10.6361L3.3103 9.58013L6.0223 7.43213H7.4383V16.0001Z" fill="currentColor"/>
<path d="M19.4383 16.0001H17.7223V10.9241C17.7223 10.7801 17.7223 10.6121 17.7223 10.4201C17.7303 10.2201 17.7383 10.0161 17.7463 9.80813C17.7543 9.60013 17.7623 9.41213 17.7703 9.24413C17.7223 9.30813 17.6303 9.40013 17.4943 9.52013C17.3663 9.64013 17.2463 9.74813 17.1343 9.84413L16.1503 10.6361L15.3103 9.58013L18.0223 7.43213H19.4383V16.0001Z" fill="currentColor"/>
<path d="M10.9999 9.00013H12.9999V11.0001H10.9999V9.00013Z" fill="currentColor"/>
<path d="M10.9999 13.0001H12.9999V15.0001H10.9999V13.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.4383 16.0001H5.7223V10.9241C5.7223 10.7801 5.7223 10.6121 5.7223 10.4201C5.7303 10.2201 5.7383 10.0161 5.7463 9.80813C5.7543 9.60013 5.7623 9.41213 5.7703 9.24413C5.7223 9.30813 5.6303 9.40013 5.4943 9.52013C5.3663 9.64013 5.2463 9.74813 5.1343 9.84413L4.1503 10.6361L3.3103 9.58013L6.0223 7.43213H7.4383V16.0001Z" style="fill: var(--element-active-color)"/>
<path d="M19.4383 16.0001H17.7223V10.9241C17.7223 10.7801 17.7223 10.6121 17.7223 10.4201C17.7303 10.2201 17.7383 10.0161 17.7463 9.80813C17.7543 9.60013 17.7623 9.41213 17.7703 9.24413C17.7223 9.30813 17.6303 9.40013 17.4943 9.52013C17.3663 9.64013 17.2463 9.74813 17.1343 9.84413L16.1503 10.6361L15.3103 9.58013L18.0223 7.43213H19.4383V16.0001Z" style="fill: var(--element-active-color)"/>
<path d="M10.9999 9.00013H12.9999V11.0001H10.9999V9.00013Z" style="fill: var(--element-active-color)"/>
<path d="M10.9999 13.0001H12.9999V15.0001H10.9999V13.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-original-scale-iec': ObiChartOriginalScaleIec;
  }
}
