import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-battery-horizontal-error')
export class ObiBatteryHorizontalError extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.46545 6.87869L2.87966 5.46448L5.00069 7.58551L7.1217 5.46451L8.53591 6.87872L6.41491 8.99972L8.53652 11.1213L7.1223 12.5355L5.00069 10.4139L2.87906 12.5356L1.46484 11.1214L3.58648 8.99972L1.46545 6.87869Z" fill="currentColor"/>
<path d="M2 15V14H4V15H19V9H10V7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H4C2.89543 17 2 16.1046 2 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.46545 6.87869L2.87966 5.46448L5.00069 7.58551L7.1217 5.46451L8.53591 6.87872L6.41491 8.99972L8.53652 11.1213L7.1223 12.5355L5.00069 10.4139L2.87906 12.5356L1.46484 11.1214L3.58648 8.99972L1.46545 6.87869Z" style="fill: var(--element-active-color)"/>
<path d="M2 15V14H4V15H19V9H10V7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23 13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H4C2.89543 17 2 16.1046 2 15Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-error': ObiBatteryHorizontalError;
  }
}