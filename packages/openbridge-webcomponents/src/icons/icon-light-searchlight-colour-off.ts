import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-searchlight-colour-off')
export class ObiLightSearchlightColourOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96387 2.93799L11.6959 1.93799L18.6959 14.0623L16.9639 15.0623L15.9639 13.3304L13 15.0416V20.0001H16C16.5523 20.0001 17 20.4478 17 21.0001V22.0001H7V21.0001C7 20.4478 7.44772 20.0001 8 20.0001H10V16.7737L8.17009 17.8302C7.6918 18.1063 7.08021 17.9424 6.80406 17.4641L2.80406 10.5359C2.52792 10.0577 2.6918 9.44606 3.17009 9.16992L10.9639 4.67015L9.96387 2.93799ZM11.9639 6.4022L5.03611 10.402L8.03611 15.5981L14.9639 11.5983L11.9639 6.4022Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9639 6.40259L5.03613 10.4024L8.03613 15.5985L14.9639 11.5987L11.9639 6.40259Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96387 2.93799L11.6959 1.93799L18.6959 14.0623L16.9639 15.0623L15.9639 13.3304L13 15.0416V20.0001H16C16.5523 20.0001 17 20.4478 17 21.0001V22.0001H7V21.0001C7 20.4478 7.44772 20.0001 8 20.0001H10V16.7737L8.17009 17.8302C7.6918 18.1063 7.08021 17.9424 6.80406 17.4641L2.80406 10.5359C2.52792 10.0577 2.6918 9.44606 3.17009 9.16992L10.9639 4.67015L9.96387 2.93799ZM11.9639 6.4022L5.03611 10.402L8.03611 15.5981L14.9639 11.5983L11.9639 6.4022Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9639 6.40259L5.03613 10.4024L8.03613 15.5985L14.9639 11.5987L11.9639 6.40259Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-light-searchlight-colour-off': ObiLightSearchlightColourOff;
  }
}
