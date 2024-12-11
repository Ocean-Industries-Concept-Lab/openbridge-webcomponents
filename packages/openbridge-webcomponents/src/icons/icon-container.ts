import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-container')
export class ObiContainer extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.2498 11L12.7498 7.625V2H11.2498V7.625L6.7498 11H3V21H21V11H17.2498ZM9.2498 11L11.9998 8.9375L14.7498 11H9.2498ZM17 13H19V19H17V13ZM13 13H15V19H13V13ZM11 13H9V19H11V13ZM7 19V13H5V19H7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.2498 11L12.7498 7.625V2H11.2498V7.625L6.7498 11H3V21H21V11H17.2498ZM9.2498 11L11.9998 8.9375L14.7498 11H9.2498ZM17 13H19V19H17V13ZM13 13H15V19H13V13ZM11 13H9V19H11V13ZM7 19V13H5V19H7Z" style="fill: var(--element-active-color)"/>
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
    'obi-container': ObiContainer;
  }
}
