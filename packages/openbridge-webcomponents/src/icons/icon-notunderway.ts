import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-notunderway')
export class ObiNotunderway extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.10051 5L5 9.10051V14.8995L9.1005 19H14.8995L19 14.8995V9.10051L14.8995 5H9.10051ZM15.7279 3H8.27208L3 8.27208V15.7279L8.27208 21H15.7279L21 15.7279V8.27208L15.7279 3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.10051 5L5 9.10051V14.8995L9.1005 19H14.8995L19 14.8995V9.10051L14.8995 5H9.10051ZM15.7279 3H8.27208L3 8.27208V15.7279L8.27208 21H15.7279L21 15.7279V8.27208L15.7279 3Z" style="fill: var(--element-active-color)"/>
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
    'obi-notunderway': ObiNotunderway;
  }
}
