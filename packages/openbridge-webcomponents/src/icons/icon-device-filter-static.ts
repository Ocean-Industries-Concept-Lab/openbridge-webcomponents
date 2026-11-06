import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-device-filter-static')
export class ObiDeviceFilterStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4C2 2.89543 2.89543 2 4 2H10H16H20C20.5523 2 21.0523 2.22386 21.4142 2.58579C21.7761 2.94772 22 3.44772 22 4V8V14V20C22 21.1046 21.1046 22 20 22H14H8H4C3.44772 22 2.94772 21.7761 2.58579 21.4142C2.22386 21.0523 2 20.5523 2 20V16V10V4Z" fill="currentColor" stroke="currentColor"/>
<path d="M4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22Z" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4C2 2.89543 2.89543 2 4 2H10H16H20C20.5523 2 21.0523 2.22386 21.4142 2.58579C21.7761 2.94772 22 3.44772 22 4V8V14V20C22 21.1046 21.1046 22 20 22H14H8H4C3.44772 22 2.94772 21.7761 2.58579 21.4142C2.22386 21.0523 2 20.5523 2 20V16V10V4Z" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
<path d="M4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22Z" style="stroke: var(--automation-symbol-static-background-color)"/>
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
    'obi-device-filter-static': ObiDeviceFilterStatic;
  }
}
