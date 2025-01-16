import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-charging-50')
export class ObiBatteryHorizontalCharging50 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384L10.6667 13.5384L10.6667 19.7265Z" fill="currentColor"/>
<path d="M6.63842 12.9091L9.36973 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H9.16667V15.0384H8C7.48832 15.0384 7.01193 14.7776 6.73627 14.3465C6.46062 13.9154 6.42373 13.3736 6.63842 12.9091Z" fill="currentColor"/>
<path d="M19 9H14.8333V7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.6303L15.5547 15H19V9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384L10.6667 13.5384L10.6667 19.7265Z" style="fill: var(--element-active-color)"/>
<path d="M6.63842 12.9091L9.36973 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H9.16667V15.0384H8C7.48832 15.0384 7.01193 14.7776 6.73627 14.3465C6.46062 13.9154 6.42373 13.3736 6.63842 12.9091Z" style="fill: var(--element-active-color)"/>
<path d="M19 9H14.8333V7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.6303L15.5547 15H19V9Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-charging-50': ObiBatteryHorizontalCharging50;
  }
}
