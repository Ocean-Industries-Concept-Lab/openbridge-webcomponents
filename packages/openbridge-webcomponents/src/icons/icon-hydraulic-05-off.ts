import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-05-off')
export class ObiHydraulic05Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1437)">
<path d="M6.5 11C6.5 12.1046 7.39543 13 8.5 13H13.6709C13.9722 13.8524 14.6476 14.5278 15.5 14.8291V23H8.5V19H10.5V17H4.5V19H6.5V23H1V1H6.5V11Z" fill="currentColor"/>
<path d="M23 23H17.5V14.8291C18.6652 14.4172 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58275 17.5 9.1709V1H23V23Z" fill="currentColor"/>
<path d="M15.5 9.1709C14.6476 9.47219 13.9722 10.1476 13.6709 11H8.5V1H15.5V9.1709Z" fill="currentColor"/>
<path d="M0 0V24H24V0H0ZM17.5 1L23 1V23H17.5V14.8293C18.6652 14.4175 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58254 17.5 9.17071V1ZM8.5 1H15.5V9.17071C14.6476 9.47199 13.972 10.1476 13.6707 11H8.5V1ZM1 1H6.5V11C6.5 12.1046 7.39543 13 8.5 13H13.6707C13.972 13.8524 14.6476 14.528 15.5 14.8293V23H8.5V19H10.5V17H4.5V19H6.5V23H1L1 1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1437">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1437)">
<path d="M6.5 11C6.5 12.1046 7.39543 13 8.5 13H13.6709C13.9722 13.8524 14.6476 14.5278 15.5 14.8291V23H8.5V19H10.5V17H4.5V19H6.5V23H1V1H6.5V11Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 23H17.5V14.8291C18.6652 14.4172 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58275 17.5 9.1709V1H23V23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M15.5 9.1709C14.6476 9.47219 13.9722 10.1476 13.6709 11H8.5V1H15.5V9.1709Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M0 0V24H24V0H0ZM17.5 1L23 1V23H17.5V14.8293C18.6652 14.4175 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58254 17.5 9.17071V1ZM8.5 1H15.5V9.17071C14.6476 9.47199 13.972 10.1476 13.6707 11H8.5V1ZM1 1H6.5V11C6.5 12.1046 7.39543 13 8.5 13H13.6707C13.972 13.8524 14.6476 14.528 15.5 14.8293V23H8.5V19H10.5V17H4.5V19H6.5V23H1L1 1Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1437">
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
    'obi-hydraulic-05-off': ObiHydraulic05Off;
  }
}
