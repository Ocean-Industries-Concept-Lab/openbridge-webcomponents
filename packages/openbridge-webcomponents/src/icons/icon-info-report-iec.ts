import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-info-report-iec')
export class ObiInfoReportIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 4V1H6.75V4H5.25Z" fill="currentColor"/>
<path d="M5.25 11V8H6.75V11H5.25Z" fill="currentColor"/>
<path d="M1 5.25H4V6.75H1L1 5.25Z" fill="currentColor"/>
<path d="M11 5.25H8V6.75H11V5.25Z" fill="currentColor"/>
<path d="M15.25 14V17H16.75V14H15.25Z" fill="currentColor"/>
<path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2727 19H21C21.5523 19 22 18.5523 22 18V10C22 9.44772 21.5523 9 21 9H11C10.4477 9 10 9.44771 10 10V22L13.2727 19ZM11.5 18.5901L12.6893 17.5H20.5V10.5H11.5V18.5901Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 4V1H6.75V4H5.25Z" style="fill: var(--element-active-color)"/>
<path d="M5.25 11V8H6.75V11H5.25Z" style="fill: var(--element-active-color)"/>
<path d="M1 5.25H4V6.75H1L1 5.25Z" style="fill: var(--element-active-color)"/>
<path d="M11 5.25H8V6.75H11V5.25Z" style="fill: var(--element-active-color)"/>
<path d="M15.25 14V17H16.75V14H15.25Z" style="fill: var(--element-active-color)"/>
<path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2727 19H21C21.5523 19 22 18.5523 22 18V10C22 9.44772 21.5523 9 21 9H11C10.4477 9 10 9.44771 10 10V22L13.2727 19ZM11.5 18.5901L12.6893 17.5H20.5V10.5H11.5V18.5901Z" style="fill: var(--element-active-color)"/>
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
    'obi-info-report-iec': ObiInfoReportIec;
  }
}
