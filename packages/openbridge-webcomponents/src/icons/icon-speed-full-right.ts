import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-speed-full-right')
export class ObiSpeedFullRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H14.1789L19.17 12L14.1789 7H17L22 12L17 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 17H8.17896L13.17 12L8.17896 7H11L16 12L11 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.00001 17H2.17896L7.17001 12L2.17896 7H5.00004L10 12L5.00001 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H14.1789L19.17 12L14.1789 7H17L22 12L17 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 17H8.17896L13.17 12L8.17896 7H11L16 12L11 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.00001 17H2.17896L7.17001 12L2.17896 7H5.00004L10 12L5.00001 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-full-right': ObiSpeedFullRight;
  }
}
