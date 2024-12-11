import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-stbd')
export class ObiLightLanternStbd extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 13H2V11H5V13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5718 8.86603L2.97372 7.36603L3.97372 5.63397L6.5718 7.13397L5.5718 8.86603Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.57269 16.866L3.97461 18.366L2.97461 16.634L5.57269 15.134L6.57269 16.866Z" fill="currentColor"/>
<path d="M9 2C8.44772 2 8 2.44772 8 3V4H18V3C18 2.44772 17.5523 2 17 2H9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C8 6.89543 8.89543 6 10 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H10C8.89543 18 8 17.1046 8 16V8ZM10 8H16V16H10V8Z" fill="currentColor"/>
<path d="M8 20H20V2H22V21C22 21.5523 21.5523 22 21 22H8V20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 13H2V11H5V13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5718 8.86603L2.97372 7.36603L3.97372 5.63397L6.5718 7.13397L5.5718 8.86603Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.57269 16.866L3.97461 18.366L2.97461 16.634L5.57269 15.134L6.57269 16.866Z" style="fill: var(--element-active-color)"/>
<path d="M9 2C8.44772 2 8 2.44772 8 3V4H18V3C18 2.44772 17.5523 2 17 2H9Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C8 6.89543 8.89543 6 10 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H10C8.89543 18 8 17.1046 8 16V8ZM10 8H16V16H10V8Z" style="fill: var(--element-active-color)"/>
<path d="M8 20H20V2H22V21C22 21.5523 21.5523 22 21 22H8V20Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-stbd': ObiLightLanternStbd;
  }
}
