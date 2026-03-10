import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-horizontal')
export class ObiTransformHorizontal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12L7 8L8.4 9.4L6.825 11L17.175 11L15.6 9.4L17 8L21 12L17 16L15.575 14.6L17.175 13L6.825 13L8.4 14.6L7 16L3 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12L7 8L8.4 9.4L6.825 11L17.175 11L15.6 9.4L17 8L21 12L17 16L15.575 14.6L17.175 13L6.825 13L8.4 14.6L7 16L3 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-transform-horizontal': ObiTransformHorizontal;
  }
}
