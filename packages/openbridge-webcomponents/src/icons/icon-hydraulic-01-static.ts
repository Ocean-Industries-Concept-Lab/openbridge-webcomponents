import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-01-static')
export class ObiHydraulic01Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1402)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM17.5 1L23 1V23H17.5V14.8293C18.6652 14.4175 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58254 17.5 9.17071V1ZM8.5 1H15.5V9.17071C14.6476 9.47199 13.972 10.1476 13.6707 11L10.3293 11C10.028 10.1476 9.35241 9.47199 8.5 9.17071V1ZM1 1H6.5V9.17071C5.33481 9.58254 4.5 10.6938 4.5 12C4.5 13.3062 5.33481 14.4175 6.5 14.8293V23H1L1 1ZM15.5 23H8.5V14.8293C9.35241 14.528 10.028 13.8524 10.3293 13L13.6707 13C13.972 13.8524 14.6476 14.528 15.5 14.8293V23Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1402">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1402)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM17.5 1L23 1V23H17.5V14.8293C18.6652 14.4175 19.5 13.3062 19.5 12C19.5 10.6938 18.6652 9.58254 17.5 9.17071V1ZM8.5 1H15.5V9.17071C14.6476 9.47199 13.972 10.1476 13.6707 11L10.3293 11C10.028 10.1476 9.35241 9.47199 8.5 9.17071V1ZM1 1H6.5V9.17071C5.33481 9.58254 4.5 10.6938 4.5 12C4.5 13.3062 5.33481 14.4175 6.5 14.8293V23H1L1 1ZM15.5 23H8.5V14.8293C9.35241 14.528 10.028 13.8524 10.3293 13L13.6707 13C13.972 13.8524 14.6476 14.528 15.5 14.8293V23Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1402">
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
    'obi-hydraulic-01-static': ObiHydraulic01Static;
  }
}
