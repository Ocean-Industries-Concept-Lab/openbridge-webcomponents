import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-screen-recording')
export class ObiScreenRecording extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V20C2 21.1046 2.89543 22 4 22H6V20H4L4 17H2ZM7 2H4C2.89543 2 2 2.89543 2 4V7H4V4L7 4V2ZM2 14H4V10H2V14ZM10 2V4H14V2H10ZM17 2V4H20V7H22V4C22 2.89543 21.1046 2 20 2H17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 12H10V20H17V12ZM19 14.125L21.1496 12.2102C21.4659 11.8996 22 12.1236 22 12.5669V19.4331C22 19.8764 21.4659 20.1004 21.1496 19.7898L19 17.875V20.625C19 21.0146 18.8658 21.3411 18.5975 21.6047C18.3292 21.8682 17.9967 22 17.6 22H9.4C9.00333 22 8.67083 21.8682 8.4025 21.6047C8.13417 21.3411 8 21.0146 8 20.625V11.375C8 10.9854 8.13417 10.6589 8.4025 10.3953C8.67083 10.1318 9.00333 10 9.4 10H17.6C17.9967 10 18.3292 10.1318 18.5975 10.3953C18.8658 10.6589 19 10.9854 19 11.375V14.125Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V20C2 21.1046 2.89543 22 4 22H6V20H4L4 17H2ZM7 2H4C2.89543 2 2 2.89543 2 4V7H4V4L7 4V2ZM2 14H4V10H2V14ZM10 2V4H14V2H10ZM17 2V4H20V7H22V4C22 2.89543 21.1046 2 20 2H17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 12H10V20H17V12ZM19 14.125L21.1496 12.2102C21.4659 11.8996 22 12.1236 22 12.5669V19.4331C22 19.8764 21.4659 20.1004 21.1496 19.7898L19 17.875V20.625C19 21.0146 18.8658 21.3411 18.5975 21.6047C18.3292 21.8682 17.9967 22 17.6 22H9.4C9.00333 22 8.67083 21.8682 8.4025 21.6047C8.13417 21.3411 8 21.0146 8 20.625V11.375C8 10.9854 8.13417 10.6589 8.4025 10.3953C8.67083 10.1318 9.00333 10 9.4 10H17.6C17.9967 10 18.3292 10.1318 18.5975 10.3953C18.8658 10.6589 19 10.9854 19 11.375V14.125Z" style="fill: var(--element-active-color)"/>
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
    'obi-screen-recording': ObiScreenRecording;
  }
}
