import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-motor-on-horisontal')
export class Obi08MotorOnHorisontal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 5C6 3.89543 6.89543 3 8 3H16C17.1046 3 18 3.89543 18 5H21C22.1046 5 23 5.89543 23 7V13C23 14.1046 22.1046 15 21 15H18C18 16.1046 17.1046 17 16 17V19H18.5C19.3284 19 20 19.6716 20 20.5C20 21.3284 19.3284 22 18.5 22H5.5C4.67157 22 4 21.3284 4 20.5C4 19.6716 4.67157 19 5.5 19H8V17C6.89543 17 6 16.1046 6 15H5C3.89543 15 3 14.1046 3 13C1.34315 13 0 11.6569 0 10C0 8.34315 1.34315 7 3 7C3 5.89543 3.89543 5 5 5L6 5Z" fill="currentColor"/>
<path d="M16 4H8C7.44772 4 7 4.44772 7 5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V5C17 4.44772 16.5523 4 16 4Z" fill="currentColor"/>
<path d="M1 10C1 8.89543 1.89543 8 3 8V12C1.89543 12 1 11.1046 1 10Z" fill="currentColor"/>
<path d="M5 6H6V14H5C4.44772 14 4 13.5523 4 13V7C4 6.44772 4.44772 6 5 6Z" fill="currentColor"/>
<path d="M21 6H18V14H21C21.5523 14 22 13.5523 22 13V7C22 6.44772 21.5523 6 21 6Z" fill="currentColor"/>
<path d="M9 17H15V20H18.5C18.7761 20 19 20.2239 19 20.5C19 20.7761 18.7761 21 18.5 21H5.5C5.22386 21 5 20.7761 5 20.5C5 20.2239 5.22386 20 5.5 20H9V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 5C6 3.89543 6.89543 3 8 3H16C17.1046 3 18 3.89543 18 5H21C22.1046 5 23 5.89543 23 7V13C23 14.1046 22.1046 15 21 15H18C18 16.1046 17.1046 17 16 17V19H18.5C19.3284 19 20 19.6716 20 20.5C20 21.3284 19.3284 22 18.5 22H5.5C4.67157 22 4 21.3284 4 20.5C4 19.6716 4.67157 19 5.5 19H8V17C6.89543 17 6 16.1046 6 15H5C3.89543 15 3 14.1046 3 13C1.34315 13 0 11.6569 0 10C0 8.34315 1.34315 7 3 7C3 5.89543 3.89543 5 5 5L6 5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M16 4H8C7.44772 4 7 4.44772 7 5V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V5C17 4.44772 16.5523 4 16 4Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M1 10C1 8.89543 1.89543 8 3 8V12C1.89543 12 1 11.1046 1 10Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M5 6H6V14H5C4.44772 14 4 13.5523 4 13V7C4 6.44772 4.44772 6 5 6Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M21 6H18V14H21C21.5523 14 22 13.5523 22 13V7C22 6.44772 21.5523 6 21 6Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9 17H15V20H18.5C18.7761 20 19 20.2239 19 20.5C19 20.7761 18.7761 21 18.5 21H5.5C5.22386 21 5 20.7761 5 20.5C5 20.2239 5.22386 20 5.5 20H9V17Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-08-motor-on-horisontal': Obi08MotorOnHorisontal;
  }
}
