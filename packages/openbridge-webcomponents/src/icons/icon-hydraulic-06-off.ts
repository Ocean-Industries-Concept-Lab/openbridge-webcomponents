import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-06-off')
export class ObiHydraulic06Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8526_1311)">
<path d="M17.5 11C17.5 12.1046 16.6046 13 15.5 13H10.3291C10.0278 13.8524 9.35236 14.5278 8.5 14.8291V23H15.5V19H13.5V17H19.5V19H17.5V23H23V1H17.5V11Z" fill="currentColor"/>
<path d="M1 23H6.5V14.8291C5.33484 14.4172 4.5 13.3062 4.5 12C4.5 10.6938 5.33484 9.58275 6.5 9.1709V1H1V23Z" fill="currentColor"/>
<path d="M8.5 9.1709C9.35236 9.47219 10.0278 10.1476 10.3291 11H15.5V1H8.5V9.1709Z" fill="currentColor"/>
<path d="M24 0V24H0V0H24ZM6.5 1L1 1V23H6.5V14.8293C5.33481 14.4175 4.5 13.3062 4.5 12C4.5 10.6938 5.33481 9.58254 6.5 9.17071V1ZM15.5 1H8.5V9.17071C9.35241 9.47199 10.028 10.1476 10.3293 11H15.5V1ZM23 1H17.5V11C17.5 12.1046 16.6046 13 15.5 13H10.3293C10.028 13.8524 9.35241 14.528 8.5 14.8293V23H15.5V19H13.5V17H19.5V19H17.5V23H23V1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8526_1311">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8526_1311)">
<path d="M17.5 11C17.5 12.1046 16.6046 13 15.5 13H10.3291C10.0278 13.8524 9.35236 14.5278 8.5 14.8291V23H15.5V19H13.5V17H19.5V19H17.5V23H23V1H17.5V11Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M1 23H6.5V14.8291C5.33484 14.4172 4.5 13.3062 4.5 12C4.5 10.6938 5.33484 9.58275 6.5 9.1709V1H1V23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M8.5 9.1709C9.35236 9.47219 10.0278 10.1476 10.3291 11H15.5V1H8.5V9.1709Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M24 0V24H0V0H24ZM6.5 1L1 1V23H6.5V14.8293C5.33481 14.4175 4.5 13.3062 4.5 12C4.5 10.6938 5.33481 9.58254 6.5 9.17071V1ZM15.5 1H8.5V9.17071C9.35241 9.47199 10.028 10.1476 10.3293 11H15.5V1ZM23 1H17.5V11C17.5 12.1046 16.6046 13 15.5 13H10.3293C10.028 13.8524 9.35241 14.528 8.5 14.8293V23H15.5V19H13.5V17H19.5V19H17.5V23H23V1Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_8526_1311">
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
    'obi-hydraulic-06-off': ObiHydraulic06Off;
  }
}
