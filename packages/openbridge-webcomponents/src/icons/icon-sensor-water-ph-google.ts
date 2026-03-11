import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sensor-water-ph-google')
export class ObiSensorWaterPhGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 21.95C6.96667 21.7167 5.29167 20.8417 3.975 19.325C2.65833 17.8083 2 15.9667 2 13.8C2 12.1333 2.6625 10.3208 3.9875 8.3625C5.3125 6.40417 7.31667 4.28333 10 2C12.6833 4.28333 14.6875 6.40417 16.0125 8.3625C17.3375 10.3208 18 12.1333 18 13.8V14H16V13.8C16 12.5833 15.4958 11.2083 14.4875 9.675C13.4792 8.14167 11.9833 6.46667 10 4.65C8.01667 6.46667 6.52083 8.14167 5.5125 9.675C4.50417 11.2083 4 12.5833 4 13.8C4 15.4167 4.46667 16.7833 5.4 17.9C6.33333 19.0167 7.53333 19.6917 9 19.925V21.95ZM11 22V16H14.5C14.9 16 15.25 16.15 15.55 16.45C15.85 16.75 16 17.1 16 17.5V18.5C16 18.9 15.85 19.25 15.55 19.55C15.25 19.85 14.9 20 14.5 20H12.5V22H11ZM17 22V16H18.5V18H20.5V16H22V22H20.5V19.5H18.5V22H17ZM12.5 18.5H14.5V17.5H12.5V18.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 21.95C6.96667 21.7167 5.29167 20.8417 3.975 19.325C2.65833 17.8083 2 15.9667 2 13.8C2 12.1333 2.6625 10.3208 3.9875 8.3625C5.3125 6.40417 7.31667 4.28333 10 2C12.6833 4.28333 14.6875 6.40417 16.0125 8.3625C17.3375 10.3208 18 12.1333 18 13.8V14H16V13.8C16 12.5833 15.4958 11.2083 14.4875 9.675C13.4792 8.14167 11.9833 6.46667 10 4.65C8.01667 6.46667 6.52083 8.14167 5.5125 9.675C4.50417 11.2083 4 12.5833 4 13.8C4 15.4167 4.46667 16.7833 5.4 17.9C6.33333 19.0167 7.53333 19.6917 9 19.925V21.95ZM11 22V16H14.5C14.9 16 15.25 16.15 15.55 16.45C15.85 16.75 16 17.1 16 17.5V18.5C16 18.9 15.85 19.25 15.55 19.55C15.25 19.85 14.9 20 14.5 20H12.5V22H11ZM17 22V16H18.5V18H20.5V16H22V22H20.5V19.5H18.5V22H17ZM12.5 18.5H14.5V17.5H12.5V18.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-sensor-water-ph-google': ObiSensorWaterPhGoogle;
  }
}
