import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-draw-icon')
export class ObiCursorDrawIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3L7.25 3L20.4 16.175C20.6 16.375 20.75 16.6 20.85 16.85C20.95 17.1 21 17.35 21 17.6C21 17.8667 20.95 18.1208 20.85 18.3625C20.75 18.6042 20.6 18.8167 20.4 19L19 20.4C18.8167 20.6 18.6042 20.75 18.3625 20.85C18.1208 20.95 17.8667 21 17.6 21C17.35 21 17.1 20.95 16.85 20.85C16.6 20.75 16.375 20.6 16.175 20.4L3 7.25L3 3ZM5 5L5 6.4L9.9 11.3125L14.8 16.225L15.525 15.525L16.225 14.8L6.4 5L5 5ZM15.525 15.525L16.225 14.8L14.8 16.225L15.525 15.525Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3L7.25 3L20.4 16.175C20.6 16.375 20.75 16.6 20.85 16.85C20.95 17.1 21 17.35 21 17.6C21 17.8667 20.95 18.1208 20.85 18.3625C20.75 18.6042 20.6 18.8167 20.4 19L19 20.4C18.8167 20.6 18.6042 20.75 18.3625 20.85C18.1208 20.95 17.8667 21 17.6 21C17.35 21 17.1 20.95 16.85 20.85C16.6 20.75 16.375 20.6 16.175 20.4L3 7.25L3 3ZM5 5L5 6.4L9.9 11.3125L14.8 16.225L15.525 15.525L16.225 14.8L6.4 5L5 5ZM15.525 15.525L16.225 14.8L14.8 16.225L15.525 15.525Z" style="fill: var(--element-active-color)"/>
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
    'obi-cursor-draw-icon': ObiCursorDrawIcon;
  }
}