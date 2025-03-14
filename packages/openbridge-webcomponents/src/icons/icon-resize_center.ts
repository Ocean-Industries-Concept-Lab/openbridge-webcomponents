import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resize_center')
export class ObiResize_center extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11C4.55228 11 5 10.5523 5 10C5 9.44772 4.55228 9 4 9Z" fill="currentColor"/>
<path d="M4 13C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15C4.55228 15 5 14.5523 5 14C5 13.4477 4.55228 13 4 13Z" fill="currentColor"/>
<path d="M7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10Z" fill="currentColor"/>
<path d="M8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15C8.55228 15 9 14.5523 9 14C9 13.4477 8.55228 13 8 13Z" fill="currentColor"/>
<path d="M11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10Z" fill="currentColor"/>
<path d="M12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13Z" fill="currentColor"/>
<path d="M15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10Z" fill="currentColor"/>
<path d="M20 9C19.4477 9 19 9.44772 19 10C19 10.5523 19.4477 11 20 11C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9Z" fill="currentColor"/>
<path d="M15 14C15 13.4477 15.4477 13 16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15C15.4477 15 15 14.5523 15 14Z" fill="currentColor"/>
<path d="M20 13C19.4477 13 19 13.4477 19 14C19 14.5523 19.4477 15 20 15C20.5523 15 21 14.5523 21 14C21 13.4477 20.5523 13 20 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11C4.55228 11 5 10.5523 5 10C5 9.44772 4.55228 9 4 9Z" style="fill: var(--element-active-color)"/>
<path d="M4 13C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15C4.55228 15 5 14.5523 5 14C5 13.4477 4.55228 13 4 13Z" style="fill: var(--element-active-color)"/>
<path d="M7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10Z" style="fill: var(--element-active-color)"/>
<path d="M8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15C8.55228 15 9 14.5523 9 14C9 13.4477 8.55228 13 8 13Z" style="fill: var(--element-active-color)"/>
<path d="M11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10Z" style="fill: var(--element-active-color)"/>
<path d="M12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13Z" style="fill: var(--element-active-color)"/>
<path d="M15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10Z" style="fill: var(--element-active-color)"/>
<path d="M20 9C19.4477 9 19 9.44772 19 10C19 10.5523 19.4477 11 20 11C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9Z" style="fill: var(--element-active-color)"/>
<path d="M15 14C15 13.4477 15.4477 13 16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15C15.4477 15 15 14.5523 15 14Z" style="fill: var(--element-active-color)"/>
<path d="M20 13C19.4477 13 19 13.4477 19 14C19 14.5523 19.4477 15 20 15C20.5523 15 21 14.5523 21 14C21 13.4477 20.5523 13 20 13Z" style="fill: var(--element-active-color)"/>
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
    'obi-resize_center': ObiResize_center;
  }
}
