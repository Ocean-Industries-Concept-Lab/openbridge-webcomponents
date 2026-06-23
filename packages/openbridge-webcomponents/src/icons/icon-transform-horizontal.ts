import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-horizontal')
export class ObiTransformHorizontal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12L7 7L8.4 8.4L5.825 11L18.175 11L15.6 8.4L17 7L22 12L17 17L15.575 15.6L18.175 13L5.825 13L8.4 15.6L7 17L2 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12L7 7L8.4 8.4L5.825 11L18.175 11L15.6 8.4L17 7L22 12L17 17L15.575 15.6L18.175 13L5.825 13L8.4 15.6L7 17L2 12Z" style="fill: var(--element-active-color)"/>
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
