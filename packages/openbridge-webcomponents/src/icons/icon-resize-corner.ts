import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resize-corner')
export class ObiResizeCorner extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8Z" fill="currentColor"/>
<path d="M17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12Z" fill="currentColor"/>
<path d="M13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12Z" fill="currentColor"/>
<path d="M9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16Z" fill="currentColor"/>
<path d="M13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16Z" fill="currentColor"/>
<path d="M16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8Z" style="fill: var(--element-active-color)"/>
<path d="M17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12Z" style="fill: var(--element-active-color)"/>
<path d="M13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12Z" style="fill: var(--element-active-color)"/>
<path d="M9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16Z" style="fill: var(--element-active-color)"/>
<path d="M13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16Z" style="fill: var(--element-active-color)"/>
<path d="M16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-resize-corner': ObiResizeCorner;
  }
}