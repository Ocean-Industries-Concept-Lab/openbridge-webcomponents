import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-control-p')
export class ObiOwnShipControlP extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3073)">
<path d="M11.9219 8.86035C12.4498 8.86036 12.8379 8.96764 13.0859 9.18359C13.3339 9.39154 13.4579 9.71172 13.458 10.1436C13.458 10.4634 13.3861 10.7239 13.2422 10.9238C13.0982 11.1238 12.8939 11.2722 12.6299 11.3682C12.3739 11.4562 12.0614 11.5 11.6934 11.5H11.0693V8.86035H11.9219Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.3418 7.43164V16H11.0693V12.916H11.874C12.4978 12.916 13.0214 12.8394 13.4453 12.6875C13.8693 12.5355 14.2135 12.3275 14.4775 12.0635C14.7415 11.7995 14.93 11.5 15.042 11.1641C15.154 10.8201 15.21 10.4637 15.21 10.0957C15.2099 9.26379 14.9534 8.61161 14.4414 8.13965C13.9374 7.66785 13.1293 7.43164 12.0176 7.43164H9.3418Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_7025_3073">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3073)">
<path d="M11.9219 8.86035C12.4498 8.86036 12.8379 8.96764 13.0859 9.18359C13.3339 9.39154 13.4579 9.71172 13.458 10.1436C13.458 10.4634 13.3861 10.7239 13.2422 10.9238C13.0982 11.1238 12.8939 11.2722 12.6299 11.3682C12.3739 11.4562 12.0614 11.5 11.6934 11.5H11.0693V8.86035H11.9219Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.3418 7.43164V16H11.0693V12.916H11.874C12.4978 12.916 13.0214 12.8394 13.4453 12.6875C13.8693 12.5355 14.2135 12.3275 14.4775 12.0635C14.7415 11.7995 14.93 11.5 15.042 11.1641C15.154 10.8201 15.21 10.4637 15.21 10.0957C15.2099 9.26379 14.9534 8.61161 14.4414 8.13965C13.9374 7.66785 13.1293 7.43164 12.0176 7.43164H9.3418Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_7025_3073">
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
    'obi-own-ship-control-p': ObiOwnShipControlP;
  }
}
