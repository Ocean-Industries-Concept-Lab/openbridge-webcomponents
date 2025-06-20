import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-simulation')
export class ObiSimulation extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9V7C4 6.45 4.19583 5.97917 4.5875 5.5875C4.97917 5.19583 5.45 5 6 5H9C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5H18C18.55 5 19.0208 5.19583 19.4125 5.5875C19.8042 5.97917 20 6.45 20 7V9C21.1046 9 22 9.89543 22 11V13C22 14.1046 21.1046 15 20 15V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H6C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V15C2.89543 15 2 14.1046 2 13V11C2 9.89543 2.89543 9 4 9ZM18 19H6V7H18V19Z" fill="currentColor"/>
<path d="M9 13C9.41667 13 9.77083 12.8542 10.0625 12.5625C10.3542 12.2708 10.5 11.9167 10.5 11.5C10.5 11.0833 10.3542 10.7292 10.0625 10.4375C9.77083 10.1458 9.41667 10 9 10C8.58333 10 8.22917 10.1458 7.9375 10.4375C7.64583 10.7292 7.5 11.0833 7.5 11.5C7.5 11.9167 7.64583 12.2708 7.9375 12.5625C8.22917 12.8542 8.58333 13 9 13Z" fill="currentColor"/>
<path d="M15 13C15.4167 13 15.7708 12.8542 16.0625 12.5625C16.3542 12.2708 16.5 11.9167 16.5 11.5C16.5 11.0833 16.3542 10.7292 16.0625 10.4375C15.7708 10.1458 15.4167 10 15 10C14.5833 10 14.2292 10.1458 13.9375 10.4375C13.6458 10.7292 13.5 11.0833 13.5 11.5C13.5 11.9167 13.6458 12.2708 13.9375 12.5625C14.2292 12.8542 14.5833 13 15 13Z" fill="currentColor"/>
<path d="M8 17H16V15H8V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9V7C4 6.45 4.19583 5.97917 4.5875 5.5875C4.97917 5.19583 5.45 5 6 5H9C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5H18C18.55 5 19.0208 5.19583 19.4125 5.5875C19.8042 5.97917 20 6.45 20 7V9C21.1046 9 22 9.89543 22 11V13C22 14.1046 21.1046 15 20 15V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H6C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V15C2.89543 15 2 14.1046 2 13V11C2 9.89543 2.89543 9 4 9ZM18 19H6V7H18V19Z" style="fill: var(--element-active-color)"/>
<path d="M9 13C9.41667 13 9.77083 12.8542 10.0625 12.5625C10.3542 12.2708 10.5 11.9167 10.5 11.5C10.5 11.0833 10.3542 10.7292 10.0625 10.4375C9.77083 10.1458 9.41667 10 9 10C8.58333 10 8.22917 10.1458 7.9375 10.4375C7.64583 10.7292 7.5 11.0833 7.5 11.5C7.5 11.9167 7.64583 12.2708 7.9375 12.5625C8.22917 12.8542 8.58333 13 9 13Z" style="fill: var(--element-active-color)"/>
<path d="M15 13C15.4167 13 15.7708 12.8542 16.0625 12.5625C16.3542 12.2708 16.5 11.9167 16.5 11.5C16.5 11.0833 16.3542 10.7292 16.0625 10.4375C15.7708 10.1458 15.4167 10 15 10C14.5833 10 14.2292 10.1458 13.9375 10.4375C13.6458 10.7292 13.5 11.0833 13.5 11.5C13.5 11.9167 13.6458 12.2708 13.9375 12.5625C14.2292 12.8542 14.5833 13 15 13Z" style="fill: var(--element-active-color)"/>
<path d="M8 17H16V15H8V17Z" style="fill: var(--element-active-color)"/>
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
