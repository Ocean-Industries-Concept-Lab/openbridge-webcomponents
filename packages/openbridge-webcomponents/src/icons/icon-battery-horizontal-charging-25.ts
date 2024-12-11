import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-charging-25')
export class ObiBatteryHorizontalCharging25 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384H10.6667V19.7265Z" fill="currentColor"/>
<path d="M6 9H8.44529L9.36973 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H9.16667V15H6V9Z" fill="currentColor"/>
<path d="M14.8333 7V9H19V15H15.5547L14.6303 17H19C20.1046 17 21 16.1046 21 15V14H22C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10H21V9C21 7.89543 20.1046 7 19 7H14.8333Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384H10.6667V19.7265Z" style="fill: var(--element-active-color)"/>
<path d="M6 9H8.44529L9.36973 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H9.16667V15H6V9Z" style="fill: var(--element-active-color)"/>
<path d="M14.8333 7V9H19V15H15.5547L14.6303 17H19C20.1046 17 21 16.1046 21 15V14H22C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10H21V9C21 7.89543 20.1046 7 19 7H14.8333Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-charging-25': ObiBatteryHorizontalCharging25;
  }
}