import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-reset')
export class ObiReset extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C10.067 19 8.317 18.2165 7.05025 16.9497L5.63604 18.364C7.26472 19.9926 9.51472 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.17273 3 6.64996 4.30367 5 6.34267V3H3V10H10V8H6.25469C7.51964 6.18652 9.62125 5 12 5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C10.067 19 8.317 18.2165 7.05025 16.9497L5.63604 18.364C7.26472 19.9926 9.51472 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.17273 3 6.64996 4.30367 5 6.34267V3H3V10H10V8H6.25469C7.51964 6.18652 9.62125 5 12 5Z" style="fill: var(--element-active-color)"/>
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
    'obi-reset': ObiReset;
  }
}
