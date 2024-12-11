import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alert-list')
export class ObiAlertList extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.995V6.99667H3.9802V8.995H2Z" fill="currentColor"/>
<path d="M2 12.9917V10.9933H3.9802V12.9917H2Z" fill="currentColor"/>
<path d="M2 4.99833V3H3.9802V4.99833H2Z" fill="currentColor"/>
<path d="M5.9604 8.995V6.99667H12.9901L12.4257 8.12573L12 8.995H5.9604Z" fill="currentColor"/>
<path d="M5.9604 12.9917V10.9933H10.9901L10 12.9917H5.9604Z" fill="currentColor"/>
<path d="M5.9604 4.99833V3H19.8218V4.99833H5.9604Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.904 18.7194L16.2893 7.49141C15.9617 6.8362 15.0383 6.8362 14.7107 7.49141L9.09602 18.7194C8.79816 19.315 9.23006 20 9.88535 20H21.1147C21.7699 20 22.2018 19.315 21.904 18.7194ZM14.7499 18.5002H16.2499V17.0002H14.7499V18.5002ZM14.7499 15.5002H16.2499V11.0002H14.7499V15.5002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.995V6.99667H3.9802V8.995H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 12.9917V10.9933H3.9802V12.9917H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 4.99833V3H3.9802V4.99833H2Z" style="fill: var(--element-active-color)"/>
<path d="M5.9604 8.995V6.99667H12.9901L12.4257 8.12573L12 8.995H5.9604Z" style="fill: var(--element-active-color)"/>
<path d="M5.9604 12.9917V10.9933H10.9901L10 12.9917H5.9604Z" style="fill: var(--element-active-color)"/>
<path d="M5.9604 4.99833V3H19.8218V4.99833H5.9604Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.904 18.7194L16.2893 7.49141C15.9617 6.8362 15.0383 6.8362 14.7107 7.49141L9.09602 18.7194C8.79816 19.315 9.23006 20 9.88535 20H21.1147C21.7699 20 22.2018 19.315 21.904 18.7194ZM14.7499 18.5002H16.2499V17.0002H14.7499V18.5002ZM14.7499 15.5002H16.2499V11.0002H14.7499V15.5002Z" style="fill: var(--element-active-color)"/>
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
    'obi-alert-list': ObiAlertList;
  }
}