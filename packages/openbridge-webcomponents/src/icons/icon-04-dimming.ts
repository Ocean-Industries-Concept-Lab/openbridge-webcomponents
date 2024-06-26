import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-dimming')
export class Obi04Dimming extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 15.3099V19.9999H8.69L12 23.3099L15.31 19.9999H20V15.3099L23.31 11.9999L20 8.68994V3.99994H15.31L12 0.689941L8.69 3.99994H4V8.68994L0.690002 11.9999L4 15.3099ZM14.5 6.54995C13.74 6.19995 12.89 5.99995 12 5.99995C8.69 5.99995 6 8.68995 6 12C6 15.31 8.69 18 12 18C12.89 18 13.74 17.8 14.5 17.45C12.44 16.5 11 14.42 11 12C11 9.57995 12.44 7.49995 14.5 6.54995Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 15.3099V19.9999H8.69L12 23.3099L15.31 19.9999H20V15.3099L23.31 11.9999L20 8.68994V3.99994H15.31L12 0.689941L8.69 3.99994H4V8.68994L0.690002 11.9999L4 15.3099ZM14.5 6.54995C13.74 6.19995 12.89 5.99995 12 5.99995C8.69 5.99995 6 8.68995 6 12C6 15.31 8.69 18 12 18C12.89 18 13.74 17.8 14.5 17.45C12.44 16.5 11 14.42 11 12C11 9.57995 12.44 7.49995 14.5 6.54995Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-dimming': Obi04Dimming;
  }
}
