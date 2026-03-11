import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-battery-vertical-charging-empty')
export class ObiBatteryVerticalChargingEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5645 11.6641C18.8167 11.2156 19.5 11.3947 19.5 11.9092V16H22L18.4355 22.3359C18.1833 22.7844 17.5 22.6053 17.5 22.0908V18H15L18.5645 11.6641ZM13 1C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V10.4082C16.9371 10.4943 16.8764 10.5856 16.8213 10.6836L15 13.9209V5H9V20H15.5V21.9336C15.3399 21.9749 15.1729 22 15 22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2C10 1.44772 10.4477 1 11 1H13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5645 11.6641C18.8167 11.2156 19.5 11.3947 19.5 11.9092V16H22L18.4355 22.3359C18.1833 22.7844 17.5 22.6053 17.5 22.0908V18H15L18.5645 11.6641ZM13 1C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V10.4082C16.9371 10.4943 16.8764 10.5856 16.8213 10.6836L15 13.9209V5H9V20H15.5V21.9336C15.3399 21.9749 15.1729 22 15 22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2C10 1.44772 10.4477 1 11 1H13Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-vertical-charging-empty': ObiBatteryVerticalChargingEmpty;
  }
}
