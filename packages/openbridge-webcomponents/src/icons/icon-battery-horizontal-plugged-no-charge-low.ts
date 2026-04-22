import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-battery-horizontal-plugged-no-charge-low')
export class ObiBatteryHorizontalPluggedNoChargeLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 4C13.9142 4 14.25 4.33579 14.25 4.75V7H14.75C15.3023 7 15.75 7.44772 15.75 8V10.9297C15.75 11.5984 15.4158 12.2228 14.8594 12.5938L12.75 14V19H10.75V14L8.64062 12.5938C8.08424 12.2228 7.75002 11.5984 7.75 10.9297V8C7.75 7.44772 8.19772 7 8.75 7H9.25V4.75C9.25 4.33579 9.58579 4 10 4C10.4142 4 10.75 4.33579 10.75 4.75V7H12.75V4.75C12.75 4.33579 13.0858 4 13.5 4Z" fill="currentColor"/>
<path d="M6.45996 7C6.32587 7.30633 6.25 7.64411 6.25 8V9H4L8 15H9.25V17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7H6.45996Z" fill="currentColor"/>
<path d="M19 7C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.25V15H19V9H17.25V8C17.25 7.64411 17.1741 7.30633 17.04 7H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 4C13.9142 4 14.25 4.33579 14.25 4.75V7H14.75C15.3023 7 15.75 7.44772 15.75 8V10.9297C15.75 11.5984 15.4158 12.2228 14.8594 12.5938L12.75 14V19H10.75V14L8.64062 12.5938C8.08424 12.2228 7.75002 11.5984 7.75 10.9297V8C7.75 7.44772 8.19772 7 8.75 7H9.25V4.75C9.25 4.33579 9.58579 4 10 4C10.4142 4 10.75 4.33579 10.75 4.75V7H12.75V4.75C12.75 4.33579 13.0858 4 13.5 4Z" style="fill: var(--element-active-color)"/>
<path d="M6.45996 7C6.32587 7.30633 6.25 7.64411 6.25 8V9H4L8 15H9.25V17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7H6.45996Z" style="fill: var(--element-active-color)"/>
<path d="M19 7C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.25V15H19V9H17.25V8C17.25 7.64411 17.1741 7.30633 17.04 7H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-plugged-no-charge-low': ObiBatteryHorizontalPluggedNoChargeLow;
  }
}
