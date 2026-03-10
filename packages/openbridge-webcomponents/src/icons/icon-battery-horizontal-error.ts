import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-battery-horizontal-error')
export class ObiBatteryHorizontalError extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.46545 6.87857L2.87966 5.46436L5.00069 7.58539L7.1217 5.46438L8.53591 6.8786L6.41491 8.9996L8.53652 11.1212L7.1223 12.5354L5.00069 10.4138L2.87906 12.5355L1.46484 11.1212L3.58648 8.9996L1.46545 6.87857Z" fill="currentColor"/>
<path d="M2 14.9999V13.9999H4V14.9999H19V8.99988H10V6.99988H19C20.1046 6.99988 21 7.89531 21 8.99988V9.99988H22C22.5523 9.99988 23 10.4476 23 10.9999V12.9999C23 13.5522 22.5523 13.9999 22 13.9999H21V14.9999C21 16.1044 20.1046 16.9999 19 16.9999H4C2.89543 16.9999 2 16.1044 2 14.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.46545 6.87857L2.87966 5.46436L5.00069 7.58539L7.1217 5.46438L8.53591 6.8786L6.41491 8.9996L8.53652 11.1212L7.1223 12.5354L5.00069 10.4138L2.87906 12.5355L1.46484 11.1212L3.58648 8.9996L1.46545 6.87857Z" style="fill: var(--element-active-color)"/>
<path d="M2 14.9999V13.9999H4V14.9999H19V8.99988H10V6.99988H19C20.1046 6.99988 21 7.89531 21 8.99988V9.99988H22C22.5523 9.99988 23 10.4476 23 10.9999V12.9999C23 13.5522 22.5523 13.9999 22 13.9999H21V14.9999C21 16.1044 20.1046 16.9999 19 16.9999H4C2.89543 16.9999 2 16.1044 2 14.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-battery-horizontal-error': ObiBatteryHorizontalError;
  }
}
