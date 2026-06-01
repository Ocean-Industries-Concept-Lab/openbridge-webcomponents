import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-compare-google')
export class ObiCompareGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 20L6.6 18.575L9.175 16H2V14H9.175L6.6 11.425L8 10L13 15L8 20ZM16 14L11 9L16 4L17.4 5.425L14.825 8H22V10H14.825L17.4 12.575L16 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 20L6.6 18.575L9.175 16H2V14H9.175L6.6 11.425L8 10L13 15L8 20ZM16 14L11 9L16 4L17.4 5.425L14.825 8H22V10H14.825L17.4 12.575L16 14Z" style="fill: var(--element-active-color)"/>
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
    'obi-compare-google': ObiCompareGoogle;
  }
}
