import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simulation')
export class ObiSimulation extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 10V8C4 7.45 4.19583 6.97917 4.5875 6.5875C4.97917 6.19583 5.45 6 6 6H9C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V10C21.1046 10 22 10.8954 22 12V14C22 15.1046 21.1046 16 20 16V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V16C2.89543 16 2 15.1046 2 14V12C2 10.8954 2.89543 10 4 10ZM18 20H6V8H18V20Z" fill="currentColor"/>
<path d="M9 14C9.41667 14 9.77083 13.8542 10.0625 13.5625C10.3542 13.2708 10.5 12.9167 10.5 12.5C10.5 12.0833 10.3542 11.7292 10.0625 11.4375C9.77083 11.1458 9.41667 11 9 11C8.58333 11 8.22917 11.1458 7.9375 11.4375C7.64583 11.7292 7.5 12.0833 7.5 12.5C7.5 12.9167 7.64583 13.2708 7.9375 13.5625C8.22917 13.8542 8.58333 14 9 14Z" fill="currentColor"/>
<path d="M15 14C15.4167 14 15.7708 13.8542 16.0625 13.5625C16.3542 13.2708 16.5 12.9167 16.5 12.5C16.5 12.0833 16.3542 11.7292 16.0625 11.4375C15.7708 11.1458 15.4167 11 15 11C14.5833 11 14.2292 11.1458 13.9375 11.4375C13.6458 11.7292 13.5 12.0833 13.5 12.5C13.5 12.9167 13.6458 13.2708 13.9375 13.5625C14.2292 13.8542 14.5833 14 15 14Z" fill="currentColor"/>
<path d="M8 18H16V16H8V18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 10V8C4 7.45 4.19583 6.97917 4.5875 6.5875C4.97917 6.19583 5.45 6 6 6H9C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V10C21.1046 10 22 10.8954 22 12V14C22 15.1046 21.1046 16 20 16V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V16C2.89543 16 2 15.1046 2 14V12C2 10.8954 2.89543 10 4 10ZM18 20H6V8H18V20Z" style="fill: var(--element-active-color)"/>
<path d="M9 14C9.41667 14 9.77083 13.8542 10.0625 13.5625C10.3542 13.2708 10.5 12.9167 10.5 12.5C10.5 12.0833 10.3542 11.7292 10.0625 11.4375C9.77083 11.1458 9.41667 11 9 11C8.58333 11 8.22917 11.1458 7.9375 11.4375C7.64583 11.7292 7.5 12.0833 7.5 12.5C7.5 12.9167 7.64583 13.2708 7.9375 13.5625C8.22917 13.8542 8.58333 14 9 14Z" style="fill: var(--element-active-color)"/>
<path d="M15 14C15.4167 14 15.7708 13.8542 16.0625 13.5625C16.3542 13.2708 16.5 12.9167 16.5 12.5C16.5 12.0833 16.3542 11.7292 16.0625 11.4375C15.7708 11.1458 15.4167 11 15 11C14.5833 11 14.2292 11.1458 13.9375 11.4375C13.6458 11.7292 13.5 12.0833 13.5 12.5C13.5 12.9167 13.6458 13.2708 13.9375 13.5625C14.2292 13.8542 14.5833 14 15 14Z" style="fill: var(--element-active-color)"/>
<path d="M8 18H16V16H8V18Z" style="fill: var(--element-active-color)"/>
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
    'obi-simulation': ObiSimulation;
  }
}
