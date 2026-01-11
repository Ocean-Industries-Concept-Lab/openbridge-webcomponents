import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-speed-full-up')
export class ObiSpeedFullUp extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7V9.82105L12 4.83L7 9.82105L7 7L12 2L17 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 13V15.821L12 10.83L7 15.821L7 13L12 7.99996L17 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 19V21.821L12 16.83L7 21.821L7 18.9999L12 14L17 19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 7V9.82105L12 4.83L7 9.82105L7 7L12 2L17 7Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 13V15.821L12 10.83L7 15.821L7 13L12 7.99996L17 13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 19V21.821L12 16.83L7 21.821L7 18.9999L12 14L17 19Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-full-up': ObiSpeedFullUp;
  }
}
