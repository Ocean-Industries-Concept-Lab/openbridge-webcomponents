import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-going-to')
export class ObiPipeGoingTo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 15L0 15V9.01416L9 9L9 4.99876C9 4.17494 9.94031 3.7045 10.5996 4.19847L20 11.2061C20.5341 11.6063 20.5338 12.4074 19.9994 12.8072L10.599 19.8038C9.93962 20.2971 9 19.8266 9 19.0031L9 15Z" fill="currentColor"/>
<path d="M9 19.0031C9 19.8266 9.93962 20.2971 10.599 19.8038L20.0412 12.8072C20.5756 12.4074 20.5759 11.6063 20.0418 11.2061L10.5996 4.19847C9.94031 3.7045 9 4.17494 9 4.99876L9 9L0 9.01276V10.0128L10 9.9986L10 4.99876L19.4422 12.0064L10 19.0031L10 14L0 14V15L9 15L9 19.0031Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 15L0 15V9.01416L9 9L9 4.99876C9 4.17494 9.94031 3.7045 10.5996 4.19847L20 11.2061C20.5341 11.6063 20.5338 12.4074 19.9994 12.8072L10.599 19.8038C9.93962 20.2971 9 19.8266 9 19.0031L9 15Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M9 19.0031C9 19.8266 9.93962 20.2971 10.599 19.8038L20.0412 12.8072C20.5756 12.4074 20.5759 11.6063 20.0418 11.2061L10.5996 4.19847C9.94031 3.7045 9 4.17494 9 4.99876L9 9L0 9.01276V10.0128L10 9.9986L10 4.99876L19.4422 12.0064L10 19.0031L10 14L0 14V15L9 15L9 19.0031Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-pipe-going-to': ObiPipeGoingTo;
  }
}