import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-01')
export class ObiHydraulic01 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6707 11C13.972 10.1476 14.6476 9.47199 15.5 9.17071V1H17.5V9.17071C18.6652 9.58254 19.5 10.6938 19.5 12C19.5 13.3062 18.6652 14.4175 17.5 14.8293V23H15.5V14.8293C14.6476 14.528 13.972 13.8524 13.6707 13L10.3293 13C10.028 13.8524 9.35241 14.528 8.5 14.8293V23H6.5V14.8293C5.33481 14.4175 4.5 13.3062 4.5 12C4.5 10.6938 5.33481 9.58254 6.5 9.17071V1H8.5V9.17071C9.35241 9.47199 10.028 10.1476 10.3293 11L13.6707 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6707 11C13.972 10.1476 14.6476 9.47199 15.5 9.17071V1H17.5V9.17071C18.6652 9.58254 19.5 10.6938 19.5 12C19.5 13.3062 18.6652 14.4175 17.5 14.8293V23H15.5V14.8293C14.6476 14.528 13.972 13.8524 13.6707 13L10.3293 13C10.028 13.8524 9.35241 14.528 8.5 14.8293V23H6.5V14.8293C5.33481 14.4175 4.5 13.3062 4.5 12C4.5 10.6938 5.33481 9.58254 6.5 9.17071V1H8.5V9.17071C9.35241 9.47199 10.028 10.1476 10.3293 11L13.6707 11Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-01': ObiHydraulic01;
  }
}
