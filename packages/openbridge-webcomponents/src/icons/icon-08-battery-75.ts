import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-battery-75')
export class Obi08Battery75 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4H15.67C16.4 4 17 4.6 17 5.33V20.67C17 21.4 16.4 22 15.66 22H8.33C7.6 22 7 21.4 7 20.66V5.33C7 4.6 7.6 4 8.33 4H10V2H14V4ZM15 6H9V9H15V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4H15.67C16.4 4 17 4.6 17 5.33V20.67C17 21.4 16.4 22 15.66 22H8.33C7.6 22 7 21.4 7 20.66V5.33C7 4.6 7.6 4 8.33 4H10V2H14V4ZM15 6H9V9H15V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-battery-75': Obi08Battery75;
  }
}
