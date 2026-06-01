import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-battery-horizontal-plugged-no-charge-25')
export class ObiBatteryHorizontalPluggedNoCharge25 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 4C14.1642 4 14.5 4.33579 14.5 4.75V7H15C15.5523 7 16 7.44772 16 8V10.9297C16 11.5984 15.6658 12.2228 15.1094 12.5938L13 14V19H11V14L8.89062 12.5938C8.33424 12.2228 8.00002 11.5984 8 10.9297V8C8 7.44772 8.44772 7 9 7H9.5V4.75C9.5 4.33579 9.83579 4 10.25 4C10.6642 4 11 4.33579 11 4.75V7H13V4.75C13 4.33579 13.3358 4 13.75 4Z" fill="currentColor"/>
<path d="M6.70996 7C6.57587 7.30633 6.5 7.64411 6.5 8V9H6V15H9.5V17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7H6.70996Z" fill="currentColor"/>
<path d="M19 7C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.5V15H19V9H17.5V8C17.5 7.64411 17.4241 7.30633 17.29 7H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 4C14.1642 4 14.5 4.33579 14.5 4.75V7H15C15.5523 7 16 7.44772 16 8V10.9297C16 11.5984 15.6658 12.2228 15.1094 12.5938L13 14V19H11V14L8.89062 12.5938C8.33424 12.2228 8.00002 11.5984 8 10.9297V8C8 7.44772 8.44772 7 9 7H9.5V4.75C9.5 4.33579 9.83579 4 10.25 4C10.6642 4 11 4.33579 11 4.75V7H13V4.75C13 4.33579 13.3358 4 13.75 4Z" style="fill: var(--element-active-color)"/>
<path d="M6.70996 7C6.57587 7.30633 6.5 7.64411 6.5 8V9H6V15H9.5V17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7H6.70996Z" style="fill: var(--element-active-color)"/>
<path d="M19 7C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.5V15H19V9H17.5V8C17.5 7.64411 17.4241 7.30633 17.29 7H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-plugged-no-charge-25': ObiBatteryHorizontalPluggedNoCharge25;
  }
}
