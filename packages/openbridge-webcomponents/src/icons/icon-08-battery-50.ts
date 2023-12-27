import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-battery-50')
export class Obi08Battery50 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4H15.6699C16.3999 4 17 4.6001 17 5.33008V20.6699C17 21.3999 16.3999 22 15.6602 22H8.33008C7.6001 22 7 21.3999 7 20.6602V5.33008C7 4.88232 7.22559 4.4834 7.56836 4.24219C7.78467 4.08984 8.04785 4 8.33008 4H10V2H14V4ZM15 6H9V13H15V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4H15.6699C16.3999 4 17 4.6001 17 5.33008V20.6699C17 21.3999 16.3999 22 15.6602 22H8.33008C7.6001 22 7 21.3999 7 20.6602V5.33008C7 4.88232 7.22559 4.4834 7.56836 4.24219C7.78467 4.08984 8.04785 4 8.33008 4H10V2H14V4ZM15 6H9V13H15V6Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-08-battery-50': Obi08Battery50;
  }
}
