import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-05')
export class ObiDiodes05 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C11 3.96548 11.0017 3.93137 11.0052 3.89776C11.0564 3.3935 11.4822 3 12 3H16C16.5523 3 17 3.44772 17 4C17 4.55228 16.5523 5 16 5H13V11.3333L21 6V18L13 12.6667V20C13 20.5523 12.5523 21 12 21H8C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19H11V12.6667L3 18V6L11 11.3333V4ZM4 7.86852L10.1972 12L4 16.1315L4 7.86852ZM13.8028 12L20 16.1315V7.86852L13.8028 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C11 3.96548 11.0017 3.93137 11.0052 3.89776C11.0564 3.3935 11.4822 3 12 3H16C16.5523 3 17 3.44772 17 4C17 4.55228 16.5523 5 16 5H13V11.3333L21 6V18L13 12.6667V20C13 20.5523 12.5523 21 12 21H8C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19H11V12.6667L3 18V6L11 11.3333V4ZM4 7.86852L10.1972 12L4 16.1315L4 7.86852ZM13.8028 12L20 16.1315V7.86852L13.8028 12Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-diodes-05': ObiDiodes05;
  }
}
