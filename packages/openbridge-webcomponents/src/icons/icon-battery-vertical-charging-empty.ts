import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-charging-empty')
export class ObiBatteryVerticalChargingEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V10.4047C16.9365 10.4915 16.8767 10.5843 16.8211 10.6831L15 13.9206L15 5L9 5L9 20H14.9876L15 20H15.5V21.937C15.3402 21.9781 15.1727 22 15 22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2ZM15 18L17 14.4445L18.5642 11.6637C18.8165 11.2152 19.5 11.3943 19.5 11.9088V16H22L18.4358 22.3364C18.1835 22.7849 17.5 22.6058 17.5 22.0913V18L17 18H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V10.4047C16.9365 10.4915 16.8767 10.5843 16.8211 10.6831L15 13.9206L15 5L9 5L9 20H14.9876L15 20H15.5V21.937C15.3402 21.9781 15.1727 22 15 22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2ZM15 18L17 14.4445L18.5642 11.6637C18.8165 11.2152 19.5 11.3943 19.5 11.9088V16H22L18.4358 22.3364C18.1835 22.7849 17.5 22.6058 17.5 22.0913V18L17 18H15Z" style="fill: var(--element-active-color)"/>
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
