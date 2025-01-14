import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-forward-fast')
export class ObiForwardFast extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28673 4.59039C3.134 4.48347 2.93446 4.47041 2.76909 4.55651C2.60373 4.64261 2.5 4.81356 2.5 5V19C2.5 19.1864 2.60373 19.3574 2.76909 19.4435C2.93446 19.5296 3.134 19.5165 3.28673 19.4096L12.5 12.9603V19C12.5 19.1864 12.6037 19.3574 12.7691 19.4435C12.9345 19.5296 13.134 19.5165 13.2867 19.4096L23.2867 12.4096C23.4204 12.3161 23.5 12.1632 23.5 12C23.5 11.8368 23.4204 11.6839 23.2867 11.5904L13.2867 4.59039C13.134 4.48347 12.9345 4.47041 12.7691 4.55651C12.6037 4.64261 12.5 4.81356 12.5 5V11.0397L3.28673 4.59039ZM13.5 18.0397L22.1281 12L13.5 5.96033V18.0397ZM12.1281 12L3.5 18.0397V5.96033L12.1281 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 18.0397L22.1281 12L13.5 5.96033V18.0397ZM12.1281 12L3.5 18.0397V5.96033L12.1281 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28673 4.59039C3.134 4.48347 2.93446 4.47041 2.76909 4.55651C2.60373 4.64261 2.5 4.81356 2.5 5V19C2.5 19.1864 2.60373 19.3574 2.76909 19.4435C2.93446 19.5296 3.134 19.5165 3.28673 19.4096L12.5 12.9603V19C12.5 19.1864 12.6037 19.3574 12.7691 19.4435C12.9345 19.5296 13.134 19.5165 13.2867 19.4096L23.2867 12.4096C23.4204 12.3161 23.5 12.1632 23.5 12C23.5 11.8368 23.4204 11.6839 23.2867 11.5904L13.2867 4.59039C13.134 4.48347 12.9345 4.47041 12.7691 4.55651C12.6037 4.64261 12.5 4.81356 12.5 5V11.0397L3.28673 4.59039ZM13.5 18.0397L22.1281 12L13.5 5.96033V18.0397ZM12.1281 12L3.5 18.0397V5.96033L12.1281 12Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 18.0397L22.1281 12L13.5 5.96033V18.0397ZM12.1281 12L3.5 18.0397V5.96033L12.1281 12Z" style="fill: var(--automation-device-primary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-forward-fast': ObiForwardFast;
  }
}