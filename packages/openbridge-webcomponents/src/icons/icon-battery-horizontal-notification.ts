import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-notification')
export class ObiBatteryHorizontalNotification extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 6H11V14H13V6Z" fill="currentColor"/>
<path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z" fill="currentColor"/>
<path d="M4 7H9V9H4L8 15H9V17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7Z" fill="currentColor"/>
<path d="M19 15H15V17H19C20.1046 17 21 16.1046 21 15V14H22C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10H21V9C21 7.89543 20.1046 7 19 7H15V9H19V15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 6H11V14H13V6Z" style="fill: var(--element-active-color)"/>
<path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z" style="fill: var(--element-active-color)"/>
<path d="M4 7H9V9H4L8 15H9V17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7Z" style="fill: var(--element-active-color)"/>
<path d="M19 15H15V17H19C20.1046 17 21 16.1046 21 15V14H22C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10H21V9C21 7.89543 20.1046 7 19 7H15V9H19V15Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-notification': ObiBatteryHorizontalNotification;
  }
}