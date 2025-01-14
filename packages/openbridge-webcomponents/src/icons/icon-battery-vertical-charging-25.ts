import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-charging-25')
export class ObiBatteryVerticalCharging25 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1C10.4477 1 10 1.44772 10 2V3H9C7.89543 3 7 3.89543 7 5L7 20C7 21.1046 7.89543 22 9 22H15C15.1727 22 15.3402 21.9781 15.5 21.937V20H15C14.2895 20 13.6323 19.6231 13.2736 19.0097C12.9149 18.3964 12.9085 17.6388 13.2568 17.0195L13.8303 16H9L9 5L15 5L15 13.9206L16.8211 10.6831C16.8767 10.5843 16.9365 10.4915 17 10.4047V5C17 3.89543 16.1046 3 15 3H14V2C14 1.44772 13.5523 1 13 1H11Z" fill="currentColor"/>
<path d="M15 18L17.5 18V22.0913C17.5 22.6058 18.1835 22.7849 18.4358 22.3364L22 16H19.5V11.9088C19.5 11.3943 18.8165 11.2152 18.5642 11.6637L15 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1C10.4477 1 10 1.44772 10 2V3H9C7.89543 3 7 3.89543 7 5L7 20C7 21.1046 7.89543 22 9 22H15C15.1727 22 15.3402 21.9781 15.5 21.937V20H15C14.2895 20 13.6323 19.6231 13.2736 19.0097C12.9149 18.3964 12.9085 17.6388 13.2568 17.0195L13.8303 16H9L9 5L15 5L15 13.9206L16.8211 10.6831C16.8767 10.5843 16.9365 10.4915 17 10.4047V5C17 3.89543 16.1046 3 15 3H14V2C14 1.44772 13.5523 1 13 1H11Z" style="fill: var(--element-active-color)"/>
<path d="M15 18L17.5 18V22.0913C17.5 22.6058 18.1835 22.7849 18.4358 22.3364L22 16H19.5V11.9088C19.5 11.3943 18.8165 11.2152 18.5642 11.6637L15 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-vertical-charging-25': ObiBatteryVerticalCharging25;
  }
}