import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-13-coffee')
export class Obi13Coffee extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 3H19C20.11 3 21 3.89 21 5V8C21 9.1 20.11 10 19 10H17V13C17 15.21 15.21 17 13 17H7C4.79 17 3 15.21 3 13V3ZM19 19H3V21H19V19ZM15 13C15 14.1 14.1 15 13 15H7C5.9 15 5 14.1 5 13V5H15V13ZM17 8H19V5H17V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 3H19C20.11 3 21 3.89 21 5V8C21 9.1 20.11 10 19 10H17V13C17 15.21 15.21 17 13 17H7C4.79 17 3 15.21 3 13V3ZM19 19H3V21H19V19ZM15 13C15 14.1 14.1 15 13 15H7C5.9 15 5 14.1 5 13V5H15V13ZM17 8H19V5H17V8Z" style="fill: var(--element-active-color)"/>
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
    'obi-13-coffee': Obi13Coffee;
  }
}