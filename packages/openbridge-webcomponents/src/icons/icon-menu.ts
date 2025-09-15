import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-menu')
export class ObiMenu extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19 19V21H6V19H19ZM19 5H6V21L5.7959 20.9893C4.85435 20.8938 4.1062 20.1457 4.01074 19.2041L4 19V5C4 3.89543 4.89543 3 6 3H19C20.1046 3 21 3.89543 21 5V19C21 20.0357 20.2128 20.887 19.2041 20.9893L19 21V5Z" fill="currentColor"/>
<path d="M8 7H17V9H8V7Z" fill="currentColor"/>
<path d="M8 11H17V13H8V11Z" fill="currentColor"/>
<path d="M8 15H17V17H8V15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 19V21H6V19H19ZM19 5H6V21L5.7959 20.9893C4.85435 20.8938 4.1062 20.1457 4.01074 19.2041L4 19V5C4 3.89543 4.89543 3 6 3H19C20.1046 3 21 3.89543 21 5V19C21 20.0357 20.2128 20.887 19.2041 20.9893L19 21V5Z" style="fill: var(--element-active-color)"/>
<path d="M8 7H17V9H8V7Z" style="fill: var(--element-active-color)"/>
<path d="M8 11H17V13H8V11Z" style="fill: var(--element-active-color)"/>
<path d="M8 15H17V17H8V15Z" style="fill: var(--element-active-color)"/>
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
    'obi-menu': ObiMenu;
  }
}
