import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-01-on')
export class ObiHydraulic01On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1404)">
<path d="M6.5 9.1709C5.33484 9.58275 4.5 10.6938 4.5 12C4.5 13.3062 5.33484 14.4172 6.5 14.8291V23H1V1H6.5V9.1709Z" fill="currentColor"/>
<path d="M13.6709 13C13.9722 13.8524 14.6476 14.5278 15.5 14.8291V23H8.5V14.8291C9.35236 14.5278 10.0278 13.8524 10.3291 13H13.6709Z" fill="currentColor"/>
<path d="M23 23H17.5V14.8291C18.6652 14.4172 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58275 17.5 9.1709V1H23V23Z" fill="currentColor"/>
<path d="M15.5 9.1709C14.6476 9.47219 13.9722 10.1476 13.6709 11H10.3291C10.0278 10.1476 9.35236 9.47219 8.5 9.1709V1H15.5V9.1709Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM17.5 1L23 1V23H17.5V14.8293C18.6652 14.4175 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58254 17.5 9.17071V1ZM8.5 1H15.5V9.17071C14.6476 9.47199 13.972 10.1476 13.6707 11L10.3293 11C10.028 10.1476 9.35241 9.47199 8.5 9.17071V1ZM1 1H6.5V9.17071C5.33481 9.58254 4.5 10.6938 4.5 12C4.5 13.3062 5.33481 14.4175 6.5 14.8293V23H1L1 1ZM15.5 23H8.5V14.8293C9.35241 14.528 10.028 13.8524 10.3293 13L13.6707 13C13.972 13.8524 14.6476 14.528 15.5 14.8293V23Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1404">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1404)">
<path d="M6.5 9.1709C5.33484 9.58275 4.5 10.6938 4.5 12C4.5 13.3062 5.33484 14.4172 6.5 14.8291V23H1V1H6.5V9.1709Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M13.6709 13C13.9722 13.8524 14.6476 14.5278 15.5 14.8291V23H8.5V14.8291C9.35236 14.5278 10.0278 13.8524 10.3291 13H13.6709Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 23H17.5V14.8291C18.6652 14.4172 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58275 17.5 9.1709V1H23V23Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M15.5 9.1709C14.6476 9.47219 13.9722 10.1476 13.6709 11H10.3291C10.0278 10.1476 9.35236 9.47219 8.5 9.1709V1H15.5V9.1709Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM17.5 1L23 1V23H17.5V14.8293C18.6652 14.4175 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58254 17.5 9.17071V1ZM8.5 1H15.5V9.17071C14.6476 9.47199 13.972 10.1476 13.6707 11L10.3293 11C10.028 10.1476 9.35241 9.47199 8.5 9.17071V1ZM1 1H6.5V9.17071C5.33481 9.58254 4.5 10.6938 4.5 12C4.5 13.3062 5.33481 14.4175 6.5 14.8293V23H1L1 1ZM15.5 23H8.5V14.8293C9.35241 14.528 10.028 13.8524 10.3293 13L13.6707 13C13.972 13.8524 14.6476 14.528 15.5 14.8293V23Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1404">
<rect width="24" height="24" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-hydraulic-01-on': ObiHydraulic01On;
  }
}
