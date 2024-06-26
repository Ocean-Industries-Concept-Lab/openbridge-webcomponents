import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alert-list')
export class Obi14AlertList extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.995V6.99667H3.9802V8.995H2Z" fill="currentColor"/>
<path d="M2 12.9917V10.9933H3.9802V12.9917H2Z" fill="currentColor"/>
<path d="M2 4.99833V3H3.9802V4.99833H2Z" fill="currentColor"/>
<path d="M5.9604 8.995V6.99667H12.9901L12.4257 8.12573L12 8.995H5.9604Z" fill="currentColor"/>
<path d="M5.9604 12.9917V10.9933H10.9901L10 12.9917H5.9604Z" fill="currentColor"/>
<path d="M5.9604 4.99833V3H19.8218V4.99833H5.9604Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2893 7.49141L21.904 18.7194C22.2018 19.315 21.7699 20 21.1147 20H9.88535C9.23006 20 8.79816 19.315 9.09602 18.7194L14.7107 7.49141C15.0383 6.8362 15.9617 6.8362 16.2893 7.49141ZM14.4426 19.3001H16.5574V17.2749H14.4426V19.3001ZM14.4426 15.9198H16.5574V10.8419H14.4426V15.9198Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.995V6.99667H3.9802V8.995H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 12.9917V10.9933H3.9802V12.9917H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 4.99833V3H3.9802V4.99833H2Z" style="fill: var(--element-active-color)"/>
<path d="M5.9604 8.995V6.99667H12.9901L12.4257 8.12573L12 8.995H5.9604Z" style="fill: var(--element-active-color)"/>
<path d="M5.9604 12.9917V10.9933H10.9901L10 12.9917H5.9604Z" style="fill: var(--element-active-color)"/>
<path d="M5.9604 4.99833V3H19.8218V4.99833H5.9604Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2893 7.49141L21.904 18.7194C22.2018 19.315 21.7699 20 21.1147 20H9.88535C9.23006 20 8.79816 19.315 9.09602 18.7194L14.7107 7.49141C15.0383 6.8362 15.9617 6.8362 16.2893 7.49141ZM14.4426 19.3001H16.5574V17.2749H14.4426V19.3001ZM14.4426 15.9198H16.5574V10.8419H14.4426V15.9198Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alert-list': Obi14AlertList;
  }
}
