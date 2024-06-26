import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-move')
export class Obi10Move extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.45996 5.54L12 2L15.54 5.54H8.45996ZM2 12L5.54 8.46V15.54L2 12ZM8.50004 18.5L12 18.46H15.54L12 22L8.46 18.46L8.50004 18.5ZM18.46 8.46L18.4602 15.54L22 12L18.46 8.46Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 9V5.5H13V9H11ZM10 13H5.5V11H10V13ZM15 11H18.5V13H15V11ZM13 15V18.5H11V15H13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.45996 5.54L12 2L15.54 5.54H8.45996ZM2 12L5.54 8.46V15.54L2 12ZM8.50004 18.5L12 18.46H15.54L12 22L8.46 18.46L8.50004 18.5ZM18.46 8.46L18.4602 15.54L22 12L18.46 8.46Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 9V5.5H13V9H11ZM10 13H5.5V11H10V13ZM15 11H18.5V13H15V11ZM13 15V18.5H11V15H13Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-move': Obi10Move;
  }
}
