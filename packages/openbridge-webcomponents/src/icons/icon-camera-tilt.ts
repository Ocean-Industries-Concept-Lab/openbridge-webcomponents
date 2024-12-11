import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-camera-tilt')
export class ObiCameraTilt extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.09968 14.414L11.585 5.92872C11.9739 5.53981 12.6103 5.53981 12.9992 5.92872L15.4741 8.4036V2.74674L23.2522 10.5249H17.5954L20.0702 12.9998C20.4592 13.3887 20.4592 14.0251 20.0702 14.414L11.585 22.8993C11.1961 23.2882 10.5597 23.2882 10.1708 22.8993L3.09968 15.8282C2.71078 15.4393 2.71078 14.8029 3.09968 14.414ZM17.9489 13.7069L12.2921 8.05004L5.22101 15.1211L10.8779 20.778L17.9489 13.7069Z" fill="currentColor"/>
<path d="M3.52 8.47037C5.07 5.20037 8.24 2.86037 12 2.50037L12 1.00037C5.84 1.51037 1 6.66037 1 12.9504L1.03 13.6104L4.84 9.80037L3.52 8.47037Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.09968 14.414L11.585 5.92872C11.9739 5.53981 12.6103 5.53981 12.9992 5.92872L15.4741 8.4036V2.74674L23.2522 10.5249H17.5954L20.0702 12.9998C20.4592 13.3887 20.4592 14.0251 20.0702 14.414L11.585 22.8993C11.1961 23.2882 10.5597 23.2882 10.1708 22.8993L3.09968 15.8282C2.71078 15.4393 2.71078 14.8029 3.09968 14.414ZM17.9489 13.7069L12.2921 8.05004L5.22101 15.1211L10.8779 20.778L17.9489 13.7069Z" style="fill: var(--element-active-color)"/>
<path d="M3.52 8.47037C5.07 5.20037 8.24 2.86037 12 2.50037L12 1.00037C5.84 1.51037 1 6.66037 1 12.9504L1.03 13.6104L4.84 9.80037L3.52 8.47037Z" style="fill: var(--element-active-color)"/>
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
    'obi-camera-tilt': ObiCameraTilt;
  }
}