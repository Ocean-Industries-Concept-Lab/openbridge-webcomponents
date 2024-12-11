import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-insert-point-icon')
export class ObiCursorInsertPointIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6667 15.6667H19.6667V14.3333H15.6667V10.3333H14.3333V14.3333H10.3333V15.6667H14.3333V19.6667H15.6667V15.6667Z" fill="currentColor"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6667 15.6667H19.6667V14.3333H15.6667V10.3333H14.3333V14.3333H10.3333V15.6667H14.3333V19.6667H15.6667V15.6667Z" style="fill: var(--element-active-color)"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" style="fill: var(--element-active-color)"/>
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
    'obi-cursor-insert-point-icon': ObiCursorInsertPointIcon;
  }
}