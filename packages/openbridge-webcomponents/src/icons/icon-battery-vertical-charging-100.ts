import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-charging-100')
export class ObiBatteryVerticalCharging100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V10.4047C16.9365 10.4915 16.8767 10.5843 16.8211 10.6831L13.2568 17.0195C12.9085 17.6388 12.9149 18.3964 13.2736 19.0097C13.6323 19.6231 14.2895 20 15 20H15.5V21.937C15.3402 21.9781 15.1727 22 15 22H9C7.89543 22 7 21.1046 7 20L7 5C7 3.89543 7.89543 3 9 3L10 3V2Z" fill="currentColor"/>
<path d="M15 18L18.5642 11.6637C18.8165 11.2152 19.5 11.3943 19.5 11.9088V16H22L18.4358 22.3364C18.1835 22.7849 17.5 22.6058 17.5 22.0913V18L15 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V10.4047C16.9365 10.4915 16.8767 10.5843 16.8211 10.6831L13.2568 17.0195C12.9085 17.6388 12.9149 18.3964 13.2736 19.0097C13.6323 19.6231 14.2895 20 15 20H15.5V21.937C15.3402 21.9781 15.1727 22 15 22H9C7.89543 22 7 21.1046 7 20L7 5C7 3.89543 7.89543 3 9 3L10 3V2Z" style="fill: var(--element-active-color)"/>
<path d="M15 18L18.5642 11.6637C18.8165 11.2152 19.5 11.3943 19.5 11.9088V16H22L18.4358 22.3364C18.1835 22.7849 17.5 22.6058 17.5 22.0913V18L15 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-vertical-charging-100': ObiBatteryVerticalCharging100;
  }
}