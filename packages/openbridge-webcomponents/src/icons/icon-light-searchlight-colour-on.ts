import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-searchlight-colour-on')
export class ObiLightSearchlightColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5269 7.23414L20.259 6.23414C20.7373 5.958 20.9011 5.34641 20.625 4.86812C20.3489 4.38983 19.7373 4.22595 19.259 4.50209L17.5269 5.50209L18.5269 7.23414Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9637 3.94036L16.9637 2.20831C17.2398 1.73002 17.0759 1.11843 16.5977 0.842285C16.1194 0.566143 15.5078 0.730018 15.2316 1.20831L14.2316 2.94036L15.9637 3.94036Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0977 11.3686H21.0977C21.6499 11.3686 22.0977 10.9208 22.0977 10.3686C22.0977 9.81628 21.6499 9.36856 21.0977 9.36856H19.0977V11.3686Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96387 2.93794L11.6959 1.93794L18.6959 14.0623L16.9639 15.0623L15.9639 13.3304L13 15.0416V20H16C16.5523 20 17 20.4478 17 21V22H7V21C7 20.4478 7.44772 20 8 20H10V16.7736L8.17009 17.8301C7.6918 18.1063 7.08021 17.9424 6.80406 17.4641L2.80406 10.5359C2.52792 10.0576 2.6918 9.44602 3.17009 9.16988L10.9639 4.6701L9.96387 2.93794ZM11.9639 6.40215L5.03611 10.4019L8.03611 15.5981L14.9639 11.5983L11.9639 6.40215Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9639 6.40283L5.03613 10.4026L8.03613 15.5988L14.9639 11.599L11.9639 6.40283Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5269 7.23414L20.259 6.23414C20.7373 5.958 20.9011 5.34641 20.625 4.86812C20.3489 4.38983 19.7373 4.22595 19.259 4.50209L17.5269 5.50209L18.5269 7.23414Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9637 3.94036L16.9637 2.20831C17.2398 1.73002 17.0759 1.11843 16.5977 0.842285C16.1194 0.566143 15.5078 0.730018 15.2316 1.20831L14.2316 2.94036L15.9637 3.94036Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0977 11.3686H21.0977C21.6499 11.3686 22.0977 10.9208 22.0977 10.3686C22.0977 9.81628 21.6499 9.36856 21.0977 9.36856H19.0977V11.3686Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96387 2.93794L11.6959 1.93794L18.6959 14.0623L16.9639 15.0623L15.9639 13.3304L13 15.0416V20H16C16.5523 20 17 20.4478 17 21V22H7V21C7 20.4478 7.44772 20 8 20H10V16.7736L8.17009 17.8301C7.6918 18.1063 7.08021 17.9424 6.80406 17.4641L2.80406 10.5359C2.52792 10.0576 2.6918 9.44602 3.17009 9.16988L10.9639 4.6701L9.96387 2.93794ZM11.9639 6.40215L5.03611 10.4019L8.03611 15.5981L14.9639 11.5983L11.9639 6.40215Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9639 6.40283L5.03613 10.4026L8.03613 15.5988L14.9639 11.599L11.9639 6.40283Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-searchlight-colour-on': ObiLightSearchlightColourOn;
  }
}