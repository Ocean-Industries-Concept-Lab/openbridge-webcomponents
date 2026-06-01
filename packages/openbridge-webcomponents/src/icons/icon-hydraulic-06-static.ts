import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-06-static')
export class ObiHydraulic06Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8526_1312)">
<path d="M24 0V24H0V0H24ZM6.5 1L1 1V23H6.5V14.8293C5.33481 14.4175 4.5 13.3062 4.5 12C4.5 10.6938 5.33481 9.58254 6.5 9.17071V1ZM15.5 1H8.5V9.17071C9.35241 9.47199 10.028 10.1476 10.3293 11H15.5V1ZM23 1H17.5V11C17.5 12.1046 16.6046 13 15.5 13H10.3293C10.028 13.8524 9.35241 14.528 8.5 14.8293V23H15.5V19H13.5V17H19.5V19H17.5V23H23V1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8526_1312">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8526_1312)">
<path d="M24 0V24H0V0H24ZM6.5 1L1 1V23H6.5V14.8293C5.33481 14.4175 4.5 13.3062 4.5 12C4.5 10.6938 5.33481 9.58254 6.5 9.17071V1ZM15.5 1H8.5V9.17071C9.35241 9.47199 10.028 10.1476 10.3293 11H15.5V1ZM23 1H17.5V11C17.5 12.1046 16.6046 13 15.5 13H10.3293C10.028 13.8524 9.35241 14.528 8.5 14.8293V23H15.5V19H13.5V17H19.5V19H17.5V23H23V1Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8526_1312">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-hydraulic-06-static': ObiHydraulic06Static;
  }
}
