import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-temp-hot')
export class Obi08TempHot extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 12.5H12.5V14.5H11.5L11.5 12.5H9.5L9.50005 11.5H11.5V9.5H12.5V11.5H14.5V12.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7V17C22 17.5523 21.5523 18 21 18H3C2.44772 18 2 17.5523 2 17V7ZM3 7H21V17H3V7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 12.5H12.5V14.5H11.5L11.5 12.5H9.5L9.50005 11.5H11.5V9.5H12.5V11.5H14.5V12.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7V17C22 17.5523 21.5523 18 21 18H3C2.44772 18 2 17.5523 2 17V7ZM3 7H21V17H3V7Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-temp-hot': Obi08TempHot;
  }
}
