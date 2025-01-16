import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-energy-battery')
export class ObiEnergyBattery extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9472 18.1056C11.7113 18.5775 11 18.4096 11 17.882V14H9L12.0528 7.89443C12.2887 7.42252 13 7.59042 13 8.11803V12H15L11.9472 18.1056Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V4H17C18.1046 4 19 4.89543 19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6C5 4.89543 5.89543 4 7 4H10V3ZM17 6H7V20H17V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9472 18.1056C11.7113 18.5775 11 18.4096 11 17.882V14H9L12.0528 7.89443C12.2887 7.42252 13 7.59042 13 8.11803V12H15L11.9472 18.1056Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V4H17C18.1046 4 19 4.89543 19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6C5 4.89543 5.89543 4 7 4H10V3ZM17 6H7V20H17V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-energy-battery': ObiEnergyBattery;
  }
}
