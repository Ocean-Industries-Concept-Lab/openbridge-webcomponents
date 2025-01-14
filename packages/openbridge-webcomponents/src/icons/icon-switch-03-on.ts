import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-switch-03-on')
export class ObiSwitch03On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4904 5.36619C16.9687 5.09005 17.1326 4.47846 16.8564 4.00017C16.5803 3.52187 15.9687 3.358 15.4904 3.63414L4.00051 10.2678C3.70622 10.0975 3.3645 9.99998 3 9.99998C1.89543 9.99998 1 10.8954 1 12C1 13.1046 1.89543 14 3 14C4.1045 14 4.99989 13.1047 5 12.0002L16.4904 5.36619Z" fill="currentColor"/>
<path d="M19.2676 13H17L17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V12C15 11.9655 15.0017 11.9314 15.0052 11.8977C15.0188 11.7633 15.0591 11.6367 15.1207 11.5233C15.209 11.3608 15.341 11.2255 15.501 11.1332C15.62 11.0645 15.7544 11.0197 15.8978 11.0051C15.9314 11.0017 15.9655 11 16 11H19.2676C19.6134 10.4022 20.2597 9.99998 21 9.99998C22.1046 9.99998 23 10.8954 23 12C23 13.1046 22.1046 14 21 14C20.2597 14 19.6134 13.5978 19.2676 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7225 3.50021C18.2748 4.4568 17.947 5.67998 16.9904 6.23226L5.93714 12.6139C5.65385 13.9763 4.44648 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3432 1.34315 9.00003 3 9.00003C3.32651 9.00003 3.64185 9.05251 3.93735 9.14966L14.9904 2.76816C15.947 2.21588 17.1702 2.54363 17.7225 3.50021ZM4.00051 10.2679L15.4904 3.63419C15.9687 3.35804 16.5803 3.52192 16.8564 4.00021C17.1326 4.4785 16.9687 5.09009 16.4904 5.36624L5 12.0002C4.99989 13.1047 4.1045 14 3 14C1.89543 14 1 13.1046 1 12C1 10.8955 1.89543 10 3 10C3.3645 10 3.70622 10.0975 4.00051 10.2679Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7967 10.0103C15.5096 10.0395 15.2397 10.1295 15.0014 10.267C14.6818 10.4513 14.4185 10.7211 14.242 11.046C14.1185 11.2733 14.0376 11.5275 14.0103 11.7967C14.0035 11.8639 14 11.9317 14 12V19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19L18 14H18.7641C19.3125 14.6127 20.1107 15 21 15C22.6569 15 24 13.6569 24 12C24 10.3432 22.6569 9.00003 21 9.00003C20.1107 9.00003 19.3125 9.38733 18.7641 10H16C15.9317 10 15.8638 10.0035 15.7967 10.0103ZM15.1207 11.5234C15.0591 11.6367 15.0188 11.7633 15.0052 11.8978C15.0017 11.9314 15 11.9655 15 12V19C15 19.5523 15.4477 20 16 20C16.5523 20 17 19.5523 17 19V13H19.2676C19.6134 13.5978 20.2597 14 21 14C22.1046 14 23 13.1046 23 12C23 10.8955 22.1046 10 21 10C20.2597 10 19.6134 10.4022 19.2676 11H16C15.9655 11 15.9314 11.0018 15.8978 11.0052C15.7544 11.0197 15.62 11.0646 15.501 11.1332C15.341 11.2255 15.209 11.3608 15.1207 11.5234Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4904 5.36619C16.9687 5.09005 17.1326 4.47846 16.8564 4.00017C16.5803 3.52187 15.9687 3.358 15.4904 3.63414L4.00051 10.2678C3.70622 10.0975 3.3645 9.99998 3 9.99998C1.89543 9.99998 1 10.8954 1 12C1 13.1046 1.89543 14 3 14C4.1045 14 4.99989 13.1047 5 12.0002L16.4904 5.36619Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M19.2676 13H17L17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V12C15 11.9655 15.0017 11.9314 15.0052 11.8977C15.0188 11.7633 15.0591 11.6367 15.1207 11.5233C15.209 11.3608 15.341 11.2255 15.501 11.1332C15.62 11.0645 15.7544 11.0197 15.8978 11.0051C15.9314 11.0017 15.9655 11 16 11H19.2676C19.6134 10.4022 20.2597 9.99998 21 9.99998C22.1046 9.99998 23 10.8954 23 12C23 13.1046 22.1046 14 21 14C20.2597 14 19.6134 13.5978 19.2676 13Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7225 3.50021C18.2748 4.4568 17.947 5.67998 16.9904 6.23226L5.93714 12.6139C5.65385 13.9763 4.44648 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3432 1.34315 9.00003 3 9.00003C3.32651 9.00003 3.64185 9.05251 3.93735 9.14966L14.9904 2.76816C15.947 2.21588 17.1702 2.54363 17.7225 3.50021ZM4.00051 10.2679L15.4904 3.63419C15.9687 3.35804 16.5803 3.52192 16.8564 4.00021C17.1326 4.4785 16.9687 5.09009 16.4904 5.36624L5 12.0002C4.99989 13.1047 4.1045 14 3 14C1.89543 14 1 13.1046 1 12C1 10.8955 1.89543 10 3 10C3.3645 10 3.70622 10.0975 4.00051 10.2679Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7967 10.0103C15.5096 10.0395 15.2397 10.1295 15.0014 10.267C14.6818 10.4513 14.4185 10.7211 14.242 11.046C14.1185 11.2733 14.0376 11.5275 14.0103 11.7967C14.0035 11.8639 14 11.9317 14 12V19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19L18 14H18.7641C19.3125 14.6127 20.1107 15 21 15C22.6569 15 24 13.6569 24 12C24 10.3432 22.6569 9.00003 21 9.00003C20.1107 9.00003 19.3125 9.38733 18.7641 10H16C15.9317 10 15.8638 10.0035 15.7967 10.0103ZM15.1207 11.5234C15.0591 11.6367 15.0188 11.7633 15.0052 11.8978C15.0017 11.9314 15 11.9655 15 12V19C15 19.5523 15.4477 20 16 20C16.5523 20 17 19.5523 17 19V13H19.2676C19.6134 13.5978 20.2597 14 21 14C22.1046 14 23 13.1046 23 12C23 10.8955 22.1046 10 21 10C20.2597 10 19.6134 10.4022 19.2676 11H16C15.9655 11 15.9314 11.0018 15.8978 11.0052C15.7544 11.0197 15.62 11.0646 15.501 11.1332C15.341 11.2255 15.209 11.3608 15.1207 11.5234Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-switch-03-on': ObiSwitch03On;
  }
}