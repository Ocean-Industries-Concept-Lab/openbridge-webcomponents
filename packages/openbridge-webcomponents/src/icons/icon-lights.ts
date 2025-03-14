import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lights')
export class ObiLights extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 22.45H9V17.64C7.21 16.6 6 14.67 6 12.45C6 9.14002 8.69 6.45001 12 6.45001C15.31 6.45001 18 9.14001 18 12.45C18 14.67 16.79 16.6 15 17.64V22.45ZM11 16.49L11 20.45H13L13 16.49L14 15.91C15.23 15.19 16 13.87 16 12.45C16 10.24 14.21 8.45001 12 8.45001C9.79 8.45001 8 10.24 8 12.45C8 13.87 8.76 15.19 10 15.91L11 16.49Z" fill="currentColor"/>
<path d="M23 13.5H20L20 11.5H23V13.5Z" fill="currentColor"/>
<path d="M19.04 4L20.45 5.41L18.66 7.21L17.25 5.8L19.04 4Z" fill="currentColor"/>
<path d="M11 1.5V4.5L13 4.5V1.5H11Z" fill="currentColor"/>
<path d="M1 13.5H4L4 11.5L1 11.5V13.5Z" fill="currentColor"/>
<path d="M6.76 5.79L4.97 3.99L3.56 5.4L5.36 7.19L6.76 5.79Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 22.45H9V17.64C7.21 16.6 6 14.67 6 12.45C6 9.14002 8.69 6.45001 12 6.45001C15.31 6.45001 18 9.14001 18 12.45C18 14.67 16.79 16.6 15 17.64V22.45ZM11 16.49L11 20.45H13L13 16.49L14 15.91C15.23 15.19 16 13.87 16 12.45C16 10.24 14.21 8.45001 12 8.45001C9.79 8.45001 8 10.24 8 12.45C8 13.87 8.76 15.19 10 15.91L11 16.49Z" style="fill: var(--element-active-color)"/>
<path d="M23 13.5H20L20 11.5H23V13.5Z" style="fill: var(--element-active-color)"/>
<path d="M19.04 4L20.45 5.41L18.66 7.21L17.25 5.8L19.04 4Z" style="fill: var(--element-active-color)"/>
<path d="M11 1.5V4.5L13 4.5V1.5H11Z" style="fill: var(--element-active-color)"/>
<path d="M1 13.5H4L4 11.5L1 11.5V13.5Z" style="fill: var(--element-active-color)"/>
<path d="M6.76 5.79L4.97 3.99L3.56 5.4L5.36 7.19L6.76 5.79Z" style="fill: var(--element-active-color)"/>
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
    'obi-lights': ObiLights;
  }
}
