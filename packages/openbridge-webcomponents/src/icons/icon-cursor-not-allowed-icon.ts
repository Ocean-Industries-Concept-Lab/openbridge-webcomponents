import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-cursor-not-allowed-icon')
export class ObiCursorNotAllowedIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.6667C18.6819 21.6667 21.6667 18.6819 21.6667 15C21.6667 11.3181 18.6819 8.33337 15 8.33337C11.3181 8.33337 8.33333 11.3181 8.33333 15C8.33333 18.6819 11.3181 21.6667 15 21.6667ZM15 20.3334C12.0545 20.3334 9.66667 17.9456 9.66667 15C9.66667 13.7676 10.0847 12.6327 10.7868 11.7296L18.2704 19.2133C17.3673 19.9153 16.2325 20.3334 15 20.3334ZM20.3333 15C20.3333 12.0545 17.9455 9.66671 15 9.66671C13.7675 9.66671 12.6327 10.0848 11.7296 10.7868L19.2132 18.2705C19.9153 17.3673 20.3333 16.2325 20.3333 15Z" fill="currentColor"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.6667C18.6819 21.6667 21.6667 18.6819 21.6667 15C21.6667 11.3181 18.6819 8.33337 15 8.33337C11.3181 8.33337 8.33333 11.3181 8.33333 15C8.33333 18.6819 11.3181 21.6667 15 21.6667ZM15 20.3334C12.0545 20.3334 9.66667 17.9456 9.66667 15C9.66667 13.7676 10.0847 12.6327 10.7868 11.7296L18.2704 19.2133C17.3673 19.9153 16.2325 20.3334 15 20.3334ZM20.3333 15C20.3333 12.0545 17.9455 9.66671 15 9.66671C13.7675 9.66671 12.6327 10.0848 11.7296 10.7868L19.2132 18.2705C19.9153 17.3673 20.3333 16.2325 20.3333 15Z" style="fill: var(--element-active-color)"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" style="fill: var(--element-active-color)"/>
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
    'obi-cursor-not-allowed-icon': ObiCursorNotAllowedIcon;
  }
}
