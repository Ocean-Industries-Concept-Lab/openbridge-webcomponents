import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resize-bottom')
export class ObiResizeBottom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 14C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16C4.55228 16 5 15.5523 5 15C5 14.4477 4.55228 14 4 14Z" fill="currentColor"/>
<path d="M7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15Z" fill="currentColor"/>
<path d="M11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15Z" fill="currentColor"/>
<path d="M15 15C15 14.4477 15.4477 14 16 14C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15Z" fill="currentColor"/>
<path d="M20 14C19.4477 14 19 14.4477 19 15C19 15.5523 19.4477 16 20 16C20.5523 16 21 15.5523 21 15C21 14.4477 20.5523 14 20 14Z" fill="currentColor"/>
<path d="M20 18C19.4477 18 19 18.4477 19 19C19 19.5523 19.4477 20 20 20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18Z" fill="currentColor"/>
<path d="M15 19C15 18.4477 15.4477 18 16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19Z" fill="currentColor"/>
<path d="M12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18Z" fill="currentColor"/>
<path d="M8 18C7.44772 18 7 18.4477 7 19C7 19.5523 7.44772 20 8 20C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18Z" fill="currentColor"/>
<path d="M4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20C4.55228 20 5 19.5523 5 19C5 18.4477 4.55228 18 4 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 14C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16C4.55228 16 5 15.5523 5 15C5 14.4477 4.55228 14 4 14Z" style="fill: var(--element-active-color)"/>
<path d="M7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15Z" style="fill: var(--element-active-color)"/>
<path d="M11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15Z" style="fill: var(--element-active-color)"/>
<path d="M15 15C15 14.4477 15.4477 14 16 14C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15Z" style="fill: var(--element-active-color)"/>
<path d="M20 14C19.4477 14 19 14.4477 19 15C19 15.5523 19.4477 16 20 16C20.5523 16 21 15.5523 21 15C21 14.4477 20.5523 14 20 14Z" style="fill: var(--element-active-color)"/>
<path d="M20 18C19.4477 18 19 18.4477 19 19C19 19.5523 19.4477 20 20 20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18Z" style="fill: var(--element-active-color)"/>
<path d="M15 19C15 18.4477 15.4477 18 16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19Z" style="fill: var(--element-active-color)"/>
<path d="M12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18Z" style="fill: var(--element-active-color)"/>
<path d="M8 18C7.44772 18 7 18.4477 7 19C7 19.5523 7.44772 20 8 20C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18Z" style="fill: var(--element-active-color)"/>
<path d="M4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20C4.55228 20 5 19.5523 5 19C5 18.4477 4.55228 18 4 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-resize-bottom': ObiResizeBottom;
  }
}
