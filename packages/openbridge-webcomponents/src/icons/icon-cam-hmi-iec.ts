import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cam-hmi-iec')
export class ObiCamHmiIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5598 4.81764C11.7486 4.46704 12.2515 4.46704 12.4402 4.81764L18.6031 16.263C18.7825 16.5961 18.5412 17.0001 18.1629 17.0001H5.83712C5.45879 17.0001 5.21752 16.5961 5.39689 16.263L11.5598 4.81764ZM12.5 8.00006H11.25V12.5H12.5V8.00006ZM12.5 14H11.25V15.5H12.5V14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 2C1 1.44772 1.44772 1 2 1H22C22.5523 1 23 1.44772 23 2V22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22V2ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5598 4.81764C11.7486 4.46704 12.2515 4.46704 12.4402 4.81764L18.6031 16.263C18.7825 16.5961 18.5412 17.0001 18.1629 17.0001H5.83712C5.45879 17.0001 5.21752 16.5961 5.39689 16.263L11.5598 4.81764ZM12.5 8.00006H11.25V12.5H12.5V8.00006ZM12.5 14H11.25V15.5H12.5V14Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 2C1 1.44772 1.44772 1 2 1H22C22.5523 1 23 1.44772 23 2V22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22V2ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-cam-hmi-iec': ObiCamHmiIec;
  }
}
