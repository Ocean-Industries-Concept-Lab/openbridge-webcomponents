import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-charging-empty')
export class ObiBatteryHorizontalChargingEmpty extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384H10.6667V19.7265Z" fill="currentColor"/>
<path d="M8.44529 9L9.36973 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H9.16667V15H4V9H8.44529Z" fill="currentColor"/>
<path d="M14.8333 9V7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.6303L15.5547 15H19V9H14.8333Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384H10.6667V19.7265Z" style="fill: var(--element-active-color)"/>
<path d="M8.44529 9L9.36973 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H9.16667V15H4V9H8.44529Z" style="fill: var(--element-active-color)"/>
<path d="M14.8333 9V7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H14.6303L15.5547 15H19V9H14.8333Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-charging-empty': ObiBatteryHorizontalChargingEmpty;
  }
}