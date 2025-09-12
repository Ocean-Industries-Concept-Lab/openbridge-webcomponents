import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-code-google')
export class ObiCodeGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 18L2 12L8 6L9.425 7.425L4.825 12.025L9.4 16.6L8 18ZM16 18L14.575 16.575L19.175 11.975L14.6 7.4L16 6L22 12L16 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 18L2 12L8 6L9.425 7.425L4.825 12.025L9.4 16.6L8 18ZM16 18L14.575 16.575L19.175 11.975L14.6 7.4L16 6L22 12L16 18Z" style="fill: var(undefined)"/>
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
    'obi-code-google': ObiCodeGoogle;
  }
}
