import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-02-illustration')
export class Obi02Illustration extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C15.5147 3 13.5 5.01472 13.5 7.5L13.5 17.25C13.5 19.7353 15.5147 21.75 18 21.75C20.4853 21.75 22.5 19.7353 22.5 17.25L22.5 7.5C22.5 5.01472 20.4853 3 18 3ZM19.5 17.25L19.5 7.5C19.5 6.67157 18.8284 6 18 6C17.1716 6 16.5 6.67157 16.5 7.5L16.5 17.25C16.5 18.0784 17.1716 18.75 18 18.75C18.8284 18.75 19.5 18.0784 19.5 17.25Z" fill="currentColor"/>
<path d="M18 24C13.8579 24 10.5 20.6421 10.5 16.5H7.5C7.5 21.7897 11.4116 26.1658 16.5 26.8937V33H19.5V26.8937C24.5884 26.1658 28.5 21.7897 28.5 16.5L25.5 16.5C25.5 20.6421 22.1421 24 18 24Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3C15.5147 3 13.5 5.01472 13.5 7.5L13.5 17.25C13.5 19.7353 15.5147 21.75 18 21.75C20.4853 21.75 22.5 19.7353 22.5 17.25L22.5 7.5C22.5 5.01472 20.4853 3 18 3ZM19.5 17.25L19.5 7.5C19.5 6.67157 18.8284 6 18 6C17.1716 6 16.5 6.67157 16.5 7.5L16.5 17.25C16.5 18.0784 17.1716 18.75 18 18.75C18.8284 18.75 19.5 18.0784 19.5 17.25Z" style="fill: var(--element-active-color)"/>
<path d="M18 24C13.8579 24 10.5 20.6421 10.5 16.5H7.5C7.5 21.7897 11.4116 26.1658 16.5 26.8937V33H19.5V26.8937C24.5884 26.1658 28.5 21.7897 28.5 16.5L25.5 16.5C25.5 20.6421 22.1421 24 18 24Z" style="fill: var(--element-active-color)"/>
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
    'obi-02-illustration': Obi02Illustration;
  }
}
