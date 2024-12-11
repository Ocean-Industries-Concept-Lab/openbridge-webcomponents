import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-placeholder-icon')
export class ObiCursorPlaceholderIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3333 11.6666H15.6666V14.3333H18.3333V15.6666H15.6666V18.3333H14.3333V15.6666H11.6666V14.3333H14.3333V11.6666Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.07472 14.0106L14.0106 8.07472C14.5548 7.53059 15.4452 7.53059 15.9893 8.07472L21.9252 14.0106C22.4693 14.5548 22.4693 15.4452 21.9252 15.9893L15.9893 21.9252C15.4452 22.4693 14.5548 22.4693 14.0106 21.9252L8.07472 15.9893C7.53059 15.4452 7.53059 14.5548 8.07472 14.0106ZM15 8.99996L8.99996 15L15 21L21 15L15 8.99996Z" fill="currentColor"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3333 11.6666H15.6666V14.3333H18.3333V15.6666H15.6666V18.3333H14.3333V15.6666H11.6666V14.3333H14.3333V11.6666Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.07472 14.0106L14.0106 8.07472C14.5548 7.53059 15.4452 7.53059 15.9893 8.07472L21.9252 14.0106C22.4693 14.5548 22.4693 15.4452 21.9252 15.9893L15.9893 21.9252C15.4452 22.4693 14.5548 22.4693 14.0106 21.9252L8.07472 15.9893C7.53059 15.4452 7.53059 14.5548 8.07472 14.0106ZM15 8.99996L8.99996 15L15 21L21 15L15 8.99996Z" style="fill: var(--element-active-color)"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-cursor-placeholder-icon': ObiCursorPlaceholderIcon;
  }
}