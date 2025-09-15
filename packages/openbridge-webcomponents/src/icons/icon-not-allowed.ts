import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-not-allowed')
export class ObiNotAllowed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C7.58172 20 4 16.4183 4 12C4 10.1513 4.62708 8.44904 5.68015 7.09435L16.9056 18.3199C15.551 19.3729 13.8487 20 12 20ZM20 12C20 7.58172 16.4183 4 12 4C10.1513 4 8.44904 4.62708 7.09436 5.68014L18.3199 16.9056C19.3729 15.551 20 13.8487 20 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C7.58172 20 4 16.4183 4 12C4 10.1513 4.62708 8.44904 5.68015 7.09435L16.9056 18.3199C15.551 19.3729 13.8487 20 12 20ZM20 12C20 7.58172 16.4183 4 12 4C10.1513 4 8.44904 4.62708 7.09436 5.68014L18.3199 16.9056C19.3729 15.551 20 13.8487 20 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-not-allowed': ObiNotAllowed;
  }
}
