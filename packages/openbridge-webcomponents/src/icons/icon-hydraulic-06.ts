import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-06')
export class ObiHydraulic06 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 17V19H17.5V23H15.5V19H13.5V17H19.5Z" fill="currentColor"/>
<path d="M15.5 1V11H10.3293C10.028 10.1476 9.35241 9.47199 8.5 9.17071V1H6.5V9.17071C5.33481 9.58254 4.5 10.6938 4.5 12C4.5 13.3062 5.33481 14.4175 6.5 14.8293V23H8.5V14.8293C9.35241 14.528 10.028 13.8524 10.3293 13H15.5C16.6046 13 17.5 12.1046 17.5 11V1H15.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 17V19H17.5V23H15.5V19H13.5V17H19.5Z" style="fill: var(--element-active-color)"/>
<path d="M15.5 1V11H10.3293C10.028 10.1476 9.35241 9.47199 8.5 9.17071V1H6.5V9.17071C5.33481 9.58254 4.5 10.6938 4.5 12C4.5 13.3062 5.33481 14.4175 6.5 14.8293V23H8.5V14.8293C9.35241 14.528 10.028 13.8524 10.3293 13H15.5C16.6046 13 17.5 12.1046 17.5 11V1H15.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-06': ObiHydraulic06;
  }
}
