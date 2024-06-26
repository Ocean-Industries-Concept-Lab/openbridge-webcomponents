import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-13-camera-tilt')
export class Obi13CameraTilt extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.09968 14.4141L11.585 5.92884C11.9739 5.53994 12.6103 5.53994 12.9992 5.92884L15.4741 8.40372V2.74686L23.2522 10.525H17.5954L20.0702 12.9999C20.4592 13.3888 20.4592 14.0252 20.0702 14.4141L11.585 22.8994C11.1961 23.2883 10.5597 23.2883 10.1708 22.8994L3.09968 15.8283C2.71078 15.4394 2.71078 14.803 3.09968 14.4141ZM17.9489 13.707L12.2921 8.05017L5.22101 15.1212L10.8779 20.7781L17.9489 13.707Z" fill="currentColor"/>
<path d="M3.52 8.47049C5.07 5.20049 8.24 2.86049 12 2.50049L12 1.00049C5.84 1.51049 1 6.66049 1 12.9505L1.03 13.6105L4.84 9.80049L3.52 8.47049Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.09968 14.4141L11.585 5.92884C11.9739 5.53994 12.6103 5.53994 12.9992 5.92884L15.4741 8.40372V2.74686L23.2522 10.525H17.5954L20.0702 12.9999C20.4592 13.3888 20.4592 14.0252 20.0702 14.4141L11.585 22.8994C11.1961 23.2883 10.5597 23.2883 10.1708 22.8994L3.09968 15.8283C2.71078 15.4394 2.71078 14.803 3.09968 14.4141ZM17.9489 13.707L12.2921 8.05017L5.22101 15.1212L10.8779 20.7781L17.9489 13.707Z" style="fill: var(--element-active-color)"/>
<path d="M3.52 8.47049C5.07 5.20049 8.24 2.86049 12 2.50049L12 1.00049C5.84 1.51049 1 6.66049 1 12.9505L1.03 13.6105L4.84 9.80049L3.52 8.47049Z" style="fill: var(--element-active-color)"/>
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
    'obi-13-camera-tilt': Obi13CameraTilt;
  }
}
