import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-connector-coming-from')
export class ObiConnectorComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 11.5L14 9V15L10.6667 12.5H9.16667V11.5H10.6667Z" fill="currentColor"/>
<path d="M0 12.5H1.83333V11.5H0V12.5Z" fill="currentColor"/>
<path d="M3.66667 12.5H7.33333V11.5H3.66667V12.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 11.5L14 9V15L10.6667 12.5H9.16667V11.5H10.6667Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M0 12.5H1.83333V11.5H0V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3.66667 12.5H7.33333V11.5H3.66667V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-connector-coming-from': ObiConnectorComingFrom;
  }
}
