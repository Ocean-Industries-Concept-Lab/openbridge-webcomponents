import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-vertical-notification')
export class ObiBatteryVerticalNotification extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V9H15V5L9 5L9 20L14 16.6667V22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2Z" fill="currentColor"/>
<path d="M16 11H18V18H16V11Z" fill="currentColor"/>
<path d="M16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V9H15V5L9 5L9 20L14 16.6667V22H9C7.89543 22 7 21.1046 7 20V5C7 3.89543 7.89543 3 9 3H10V2Z" style="fill: var(--element-active-color)"/>
<path d="M16 11H18V18H16V11Z" style="fill: var(--element-active-color)"/>
<path d="M16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-vertical-notification': ObiBatteryVerticalNotification;
  }
}