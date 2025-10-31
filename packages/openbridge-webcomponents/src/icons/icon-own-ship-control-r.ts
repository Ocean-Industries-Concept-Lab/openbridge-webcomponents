import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-control-r')
export class ObiOwnShipControlR extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3072)">
<path d="M11.5059 8.86035C11.9058 8.86035 12.2343 8.89953 12.4902 8.97949C12.7541 9.05945 12.9501 9.18371 13.0781 9.35156C13.2061 9.51956 13.2705 9.74813 13.2705 10.0361C13.2705 10.3 13.2098 10.5278 13.0898 10.7197C12.9778 10.9037 12.794 11.0437 12.5381 11.1396C12.2821 11.2276 11.9499 11.2715 11.542 11.2715H10.8818V8.86035H11.5059Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.1543 7.43164V16H10.8818V12.6875H11.9385L13.9785 16H15.9102L13.4141 12.2559C13.6941 12.1279 13.9543 11.9637 14.1943 11.7637C14.4422 11.5638 14.642 11.32 14.7939 11.0322C14.9459 10.7363 15.0224 10.3881 15.0225 9.98828C15.0225 9.41228 14.8984 8.93557 14.6504 8.55957C14.4024 8.18366 14.0301 7.9037 13.5342 7.71973C13.0383 7.5278 12.4064 7.43167 11.6387 7.43164H9.1543Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_7025_3072">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3072)">
<path d="M11.5059 8.86035C11.9058 8.86035 12.2343 8.89953 12.4902 8.97949C12.7541 9.05945 12.9501 9.18371 13.0781 9.35156C13.2061 9.51956 13.2705 9.74813 13.2705 10.0361C13.2705 10.3 13.2098 10.5278 13.0898 10.7197C12.9778 10.9037 12.794 11.0437 12.5381 11.1396C12.2821 11.2276 11.9499 11.2715 11.542 11.2715H10.8818V8.86035H11.5059Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.1543 7.43164V16H10.8818V12.6875H11.9385L13.9785 16H15.9102L13.4141 12.2559C13.6941 12.1279 13.9543 11.9637 14.1943 11.7637C14.4422 11.5638 14.642 11.32 14.7939 11.0322C14.9459 10.7363 15.0224 10.3881 15.0225 9.98828C15.0225 9.41228 14.8984 8.93557 14.6504 8.55957C14.4024 8.18366 14.0301 7.9037 13.5342 7.71973C13.0383 7.5278 12.4064 7.43167 11.6387 7.43164H9.1543Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_7025_3072">
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
    'obi-own-ship-control-r': ObiOwnShipControlR;
  }
}
