import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-low')
export class ObiBatteryHorizontalLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 7C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H19C20.1046 17 21 16.1046 21 15V14H22C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10H21V9C21 7.89543 20.1046 7 19 7H4ZM19 9H4L8 15H19V9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 7C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H19C20.1046 17 21 16.1046 21 15V14H22C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10H21V9C21 7.89543 20.1046 7 19 7H4ZM19 9H4L8 15H19V9Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-low': ObiBatteryHorizontalLow;
  }
}
