import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-02-illustration')
export class Obi02Illustration extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M25.5 7.5L25.5 28.5L30 28.5L30 7.5L25.5 7.5Z" fill="currentColor"/>
<path d="M6 7.5L6 28.5L22.5 18L6 7.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.5 7.5L25.5 28.5L30 28.5L30 7.5L25.5 7.5Z" style="fill: var(--element-active-color)"/>
<path d="M6 7.5L6 28.5L22.5 18L6 7.5Z" style="fill: var(--element-active-color)"/>
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
