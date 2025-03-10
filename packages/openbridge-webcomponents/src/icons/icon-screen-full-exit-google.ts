import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-screen-full-exit-google')
export class ObiScreenFullExitGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 22V17.25H2V15.1071H8.89286V22H6.75ZM2 8.89286V6.75H6.75V2H8.89286V8.89286H2ZM15.1071 22V15.1071H22V17.25H17.25V22H15.1071ZM15.1071 8.89286V2H17.25V6.75H22V8.89286H15.1071Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 22V17.25H2V15.1071H8.89286V22H6.75ZM2 8.89286V6.75H6.75V2H8.89286V8.89286H2ZM15.1071 22V15.1071H22V17.25H17.25V22H15.1071ZM15.1071 8.89286V2H17.25V6.75H22V8.89286H15.1071Z" style="fill: var(--element-active-color)"/>
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
    'obi-screen-full-exit-google': ObiScreenFullExitGoogle;
  }
}
