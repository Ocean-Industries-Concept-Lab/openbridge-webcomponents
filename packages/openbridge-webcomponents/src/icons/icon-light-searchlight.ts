import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-searchlight')
export class ObiLightSearchlight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5269 7.23414L21.125 5.73414L20.125 4.00209L17.5269 5.50209L18.5269 7.23414Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9637 3.94036L17.4637 1.34229L15.7316 0.342285L14.2316 2.94036L15.9637 3.94036Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0977 11.3686H22.0977V9.36856H19.0977V11.3686Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96387 2.93794L11.6959 1.93794L18.6959 14.0623L16.9639 15.0623L15.9639 13.3304L13 15.0416V20H16C16.5523 20 17 20.4478 17 21V22H7V21C7 20.4478 7.44772 20 8 20H10V16.7736L8.17009 17.8301C7.6918 18.1063 7.08021 17.9424 6.80406 17.4641L2.80406 10.5359C2.52792 10.0576 2.6918 9.44602 3.17009 9.16988L10.9639 4.6701L9.96387 2.93794ZM11.9639 6.40215L5.03611 10.4019L8.03611 15.5981L14.9639 11.5983L11.9639 6.40215Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5269 7.23414L21.125 5.73414L20.125 4.00209L17.5269 5.50209L18.5269 7.23414Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9637 3.94036L17.4637 1.34229L15.7316 0.342285L14.2316 2.94036L15.9637 3.94036Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0977 11.3686H22.0977V9.36856H19.0977V11.3686Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96387 2.93794L11.6959 1.93794L18.6959 14.0623L16.9639 15.0623L15.9639 13.3304L13 15.0416V20H16C16.5523 20 17 20.4478 17 21V22H7V21C7 20.4478 7.44772 20 8 20H10V16.7736L8.17009 17.8301C7.6918 18.1063 7.08021 17.9424 6.80406 17.4641L2.80406 10.5359C2.52792 10.0576 2.6918 9.44602 3.17009 9.16988L10.9639 4.6701L9.96387 2.93794ZM11.9639 6.40215L5.03611 10.4019L8.03611 15.5981L14.9639 11.5983L11.9639 6.40215Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-searchlight': ObiLightSearchlight;
  }
}
