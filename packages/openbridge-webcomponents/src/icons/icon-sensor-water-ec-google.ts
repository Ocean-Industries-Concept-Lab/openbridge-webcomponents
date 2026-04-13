import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sensor-water-ec-google')
export class ObiSensorWaterEcGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 18H12L16 12H13V8H12L8 14H11V18ZM6.2875 19.65C4.7625 18.0833 4 16.1333 4 13.8C4 12.1333 4.6625 10.3208 5.9875 8.3625C7.3125 6.40417 9.31667 4.28333 12 2C14.6833 4.28333 16.6875 6.40417 18.0125 8.3625C19.3375 10.3208 20 12.1333 20 13.8C20 16.1333 19.2375 18.0833 17.7125 19.65C16.1875 21.2167 14.2833 22 12 22C9.71667 22 7.8125 21.2167 6.2875 19.65ZM16.3 18.2375C17.4333 17.0625 18 15.5833 18 13.8C18 12.5833 17.4958 11.2083 16.4875 9.675C15.4792 8.14167 13.9833 6.46667 12 4.65C10.0167 6.46667 8.52083 8.14167 7.5125 9.675C6.50417 11.2083 6 12.5833 6 13.8C6 15.5833 6.56667 17.0625 7.7 18.2375C8.83333 19.4125 10.2667 20 12 20C13.7333 20 15.1667 19.4125 16.3 18.2375Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 18H12L16 12H13V8H12L8 14H11V18ZM6.2875 19.65C4.7625 18.0833 4 16.1333 4 13.8C4 12.1333 4.6625 10.3208 5.9875 8.3625C7.3125 6.40417 9.31667 4.28333 12 2C14.6833 4.28333 16.6875 6.40417 18.0125 8.3625C19.3375 10.3208 20 12.1333 20 13.8C20 16.1333 19.2375 18.0833 17.7125 19.65C16.1875 21.2167 14.2833 22 12 22C9.71667 22 7.8125 21.2167 6.2875 19.65ZM16.3 18.2375C17.4333 17.0625 18 15.5833 18 13.8C18 12.5833 17.4958 11.2083 16.4875 9.675C15.4792 8.14167 13.9833 6.46667 12 4.65C10.0167 6.46667 8.52083 8.14167 7.5125 9.675C6.50417 11.2083 6 12.5833 6 13.8C6 15.5833 6.56667 17.0625 7.7 18.2375C8.83333 19.4125 10.2667 20 12 20C13.7333 20 15.1667 19.4125 16.3 18.2375Z" style="fill: var(--element-active-color)"/>
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
    'obi-sensor-water-ec-google': ObiSensorWaterEcGoogle;
  }
}
