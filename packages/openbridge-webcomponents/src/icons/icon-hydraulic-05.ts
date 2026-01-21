import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-05')
export class ObiHydraulic05 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 17V19H6.5L6.5 23H8.5V19H10.5V17H4.5Z" fill="currentColor"/>
<path d="M8.5 1V11H13.6707C13.972 10.1476 14.6476 9.47199 15.5 9.17071V1H17.5V9.17071C18.6652 9.58254 19.5 10.6938 19.5 12C19.5 13.3062 18.6652 14.4175 17.5 14.8293V23H15.5V14.8293C14.6476 14.528 13.972 13.8524 13.6707 13H8.5C7.39543 13 6.5 12.1046 6.5 11V1H8.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 17V19H6.5L6.5 23H8.5V19H10.5V17H4.5Z" style="fill: var(--element-active-color)"/>
<path d="M8.5 1V11H13.6707C13.972 10.1476 14.6476 9.47199 15.5 9.17071V1H17.5V9.17071C18.6652 9.58254 19.5 10.6938 19.5 12C19.5 13.3062 18.6652 14.4175 17.5 14.8293V23H15.5V14.8293C14.6476 14.528 13.972 13.8524 13.6707 13H8.5C7.39543 13 6.5 12.1046 6.5 11V1H8.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-05': ObiHydraulic05;
  }
}
