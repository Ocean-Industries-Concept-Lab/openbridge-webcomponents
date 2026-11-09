import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-valve-reduction-closed')
export class ObiValveReductionClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.99938C2.00037 4.17579 2.94052 3.70572 3.59961 4.19957L12.9333 11.1994C13.4667 11.5994 13.4667 12.3994 12.9334 12.7994L3.59961 19.8002C2.94039 20.2941 2 19.8233 2 18.9994V4.99938Z" fill="currentColor"/>
<path d="M20.4453 9.03648C21.1099 8.59345 22 9.06982 22 9.86852V14.1312C22 14.9299 21.1099 15.4063 20.4453 14.9632L17.2481 12.8315C16.6544 12.4357 16.6544 11.5632 17.2482 11.1674L20.4453 9.03648Z" fill="currentColor"/>
<path d="M2 4.99938C2.00037 4.17579 2.94052 3.70572 3.59961 4.19957L12.9333 11.1994C13.4667 11.5994 13.4667 12.3994 12.9334 12.7994L3.59961 19.8002C2.94039 20.2941 2 19.8233 2 18.9994V4.99938ZM20.4453 9.03648C21.1099 8.59345 22 9.06982 22 9.86852V14.1312C22 14.9299 21.1099 15.4063 20.4453 14.9632L17.2481 12.8315C16.6544 12.4357 16.6544 11.5632 17.2482 11.1674L20.4453 9.03648Z" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.99938C2.00037 4.17579 2.94052 3.70572 3.59961 4.19957L12.9333 11.1994C13.4667 11.5994 13.4667 12.3994 12.9334 12.7994L3.59961 19.8002C2.94039 20.2941 2 19.8233 2 18.9994V4.99938Z" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M20.4453 9.03648C21.1099 8.59345 22 9.06982 22 9.86852V14.1312C22 14.9299 21.1099 15.4063 20.4453 14.9632L17.2481 12.8315C16.6544 12.4357 16.6544 11.5632 17.2482 11.1674L20.4453 9.03648Z" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M2 4.99938C2.00037 4.17579 2.94052 3.70572 3.59961 4.19957L12.9333 11.1994C13.4667 11.5994 13.4667 12.3994 12.9334 12.7994L3.59961 19.8002C2.94039 20.2941 2 19.8233 2 18.9994V4.99938ZM20.4453 9.03648C21.1099 8.59345 22 9.06982 22 9.86852V14.1312C22 14.9299 21.1099 15.4063 20.4453 14.9632L17.2481 12.8315C16.6544 12.4357 16.6544 11.5632 17.2482 11.1674L20.4453 9.03648Z" style="stroke: var(--automation-symbol-off-border-color)"/>
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
    'obi-valve-reduction-closed': ObiValveReductionClosed;
  }
}
