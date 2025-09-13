import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-speed-full-down')
export class ObiSpeedFullDown extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V14.1789L12 19.17L7 14.1789L7 17L12 22L17 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 11V8.17896L12 13.17L7 8.17896L7 11L12 16L17 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 5.00001V2.17896L12 7.17001L7 2.17896L7 5.00004L12 10L17 5.00001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V14.1789L12 19.17L7 14.1789L7 17L12 22L17 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 11V8.17896L12 13.17L7 8.17896L7 11L12 16L17 11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 5.00001V2.17896L12 7.17001L7 2.17896L7 5.00004L12 10L17 5.00001Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-full-down': ObiSpeedFullDown;
  }
}
