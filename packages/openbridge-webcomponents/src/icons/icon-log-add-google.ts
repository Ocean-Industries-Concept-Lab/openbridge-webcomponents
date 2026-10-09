import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-log-add-google')
export class ObiLogAddGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 16H22V18H18V22H16V18H12V16H16V12H18V16Z" fill="currentColor"/>
<path d="M14 13H7V11H14V13Z" fill="currentColor"/>
<path d="M17 9H7V7H17V9Z" fill="currentColor"/>
<path d="M19 3C19.55 3 20.0204 3.19622 20.4121 3.58789C20.8038 3.97956 21 4.45 21 5V11H19V5H5V19H10V21H5C4.45 21 3.97956 20.8038 3.58789 20.4121C3.19622 20.0204 3 19.55 3 19L3 5C3 4.45 3.19622 3.97956 3.58789 3.58789C3.97956 3.19622 4.45 3 5 3H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 16H22V18H18V22H16V18H12V16H16V12H18V16Z" style="fill: var(--element-active-color)"/>
<path d="M14 13H7V11H14V13Z" style="fill: var(--element-active-color)"/>
<path d="M17 9H7V7H17V9Z" style="fill: var(--element-active-color)"/>
<path d="M19 3C19.55 3 20.0204 3.19622 20.4121 3.58789C20.8038 3.97956 21 4.45 21 5V11H19V5H5V19H10V21H5C4.45 21 3.97956 20.8038 3.58789 20.4121C3.19622 20.0204 3 19.55 3 19L3 5C3 4.45 3.19622 3.97956 3.58789 3.58789C3.97956 3.19622 4.45 3 5 3H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-log-add-google': ObiLogAddGoogle;
  }
}
