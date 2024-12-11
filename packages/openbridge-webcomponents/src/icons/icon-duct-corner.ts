import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-corner')
export class ObiDuctCorner extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 24C6 14.0589 14.0589 6 24 6V18C20.6863 18 18 20.6863 18 24H6Z" fill="currentColor"/>
<path d="M23 7.02892C14.0766 7.54654 7 14.9469 7 24H6C6 14.3944 13.524 6.54619 23 6.02731C23.331 6.00918 23.6644 6 24 6V7C23.6 7 23.1667 7.01928 23 7.02892Z" fill="currentColor"/>
<path d="M17 24C17 20.4735 19.6077 17.5561 23 17.0709C23.1667 17.0473 23.6 17 24 17V18C20.6863 18 18 20.6863 18 24H17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 24C6 14.0589 14.0589 6 24 6V18C20.6863 18 18 20.6863 18 24H6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M23 7.02892C14.0766 7.54654 7 14.9469 7 24H6C6 14.3944 13.524 6.54619 23 6.02731C23.331 6.00918 23.6644 6 24 6V7C23.6 7 23.1667 7.01928 23 7.02892Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M17 24C17 20.4735 19.6077 17.5561 23 17.0709C23.1667 17.0473 23.6 17 24 17V18C20.6863 18 18 20.6863 18 24H17Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-duct-corner': ObiDuctCorner;
  }
}
