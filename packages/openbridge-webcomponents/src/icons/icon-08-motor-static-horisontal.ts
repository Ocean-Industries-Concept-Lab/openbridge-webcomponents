import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-motor-static-horisontal')
export class Obi08MotorStaticHorisontal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 5C7 3.89543 7.89543 3 9 3H17C18.1046 3 19 3.89543 19 5H22C23.1046 5 24 5.89543 24 7V13C24 14.1046 23.1046 15 22 15H19C19 16.1046 18.1046 17 17 17V19H19.5C20.3284 19 21 19.6716 21 20.5C21 21.3284 20.3284 22 19.5 22H6.5C5.67157 22 5 21.3284 5 20.5C5 19.6716 5.67157 19 6.5 19H9V17C7.89543 17 7 16.1046 7 15H6C4.89543 15 4 14.1046 4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C4 5.89543 4.89543 5 6 5L7 5Z" fill="currentColor"/>
<path d="M17 4H9C8.44772 4 8 4.44772 8 5V15C8 15.5523 8.44772 16 9 16H17C17.5523 16 18 15.5523 18 15V5C18 4.44772 17.5523 4 17 4Z" fill="currentColor"/>
<path d="M2 10C2 8.89543 2.89543 8 4 8V12C2.89543 12 2 11.1046 2 10Z" fill="currentColor"/>
<path d="M6 6H7V14H6C5.44772 14 5 13.5523 5 13V7C5 6.44772 5.44772 6 6 6Z" fill="currentColor"/>
<path d="M22 6H19V14H22C22.5523 14 23 13.5523 23 13V7C23 6.44772 22.5523 6 22 6Z" fill="currentColor"/>
<path d="M10 17H16V20H19.5C19.7761 20 20 20.2239 20 20.5C20 20.7761 19.7761 21 19.5 21H6.5C6.22386 21 6 20.7761 6 20.5C6 20.2239 6.22386 20 6.5 20H10V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 5C7 3.89543 7.89543 3 9 3H17C18.1046 3 19 3.89543 19 5H22C23.1046 5 24 5.89543 24 7V13C24 14.1046 23.1046 15 22 15H19C19 16.1046 18.1046 17 17 17V19H19.5C20.3284 19 21 19.6716 21 20.5C21 21.3284 20.3284 22 19.5 22H6.5C5.67157 22 5 21.3284 5 20.5C5 19.6716 5.67157 19 6.5 19H9V17C7.89543 17 7 16.1046 7 15H6C4.89543 15 4 14.1046 4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C4 5.89543 4.89543 5 6 5L7 5Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M17 4H9C8.44772 4 8 4.44772 8 5V15C8 15.5523 8.44772 16 9 16H17C17.5523 16 18 15.5523 18 15V5C18 4.44772 17.5523 4 17 4Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M2 10C2 8.89543 2.89543 8 4 8V12C2.89543 12 2 11.1046 2 10Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M6 6H7V14H6C5.44772 14 5 13.5523 5 13V7C5 6.44772 5.44772 6 6 6Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M22 6H19V14H22C22.5523 14 23 13.5523 23 13V7C23 6.44772 22.5523 6 22 6Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M10 17H16V20H19.5C19.7761 20 20 20.2239 20 20.5C20 20.7761 19.7761 21 19.5 21H6.5C6.22386 21 6 20.7761 6 20.5C6 20.2239 6.22386 20 6.5 20H10V17Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-08-motor-static-horisontal': Obi08MotorStaticHorisontal;
  }
}
