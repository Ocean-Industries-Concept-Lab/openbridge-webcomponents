import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-engine')
export class ObiEngine extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 19H20V16.5H17L17 19H7.49995L4.49995 13.5H3.5L3.49995 16.5L2 16.5V8.5H3.49995L3.5 11.5H4.49991L7.49995 7H9.99995V5.5H6.99995V4H15V5.5L12 5.5V7H15.4997L17 11.5H20V9H21C21.1821 9 21.3529 9.0487 21.5 9.13378C21.7989 9.30669 22 9.62986 22 10V18C22 18.3701 21.7989 18.6933 21.5 18.8662C21.3529 18.9513 21.1821 19 21 19ZM8.3904 17.5H15.5L15.4999 15H20V13H15.9189L14.4186 8.5H8.30272L5.65093 12.4776L8.3904 17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 19H20V16.5H17L17 19H7.49995L4.49995 13.5H3.5L3.49995 16.5L2 16.5V8.5H3.49995L3.5 11.5H4.49991L7.49995 7H9.99995V5.5H6.99995V4H15V5.5L12 5.5V7H15.4997L17 11.5H20V9H21C21.1821 9 21.3529 9.0487 21.5 9.13378C21.7989 9.30669 22 9.62986 22 10V18C22 18.3701 21.7989 18.6933 21.5 18.8662C21.3529 18.9513 21.1821 19 21 19ZM8.3904 17.5H15.5L15.4999 15H20V13H15.9189L14.4186 8.5H8.30272L5.65093 12.4776L8.3904 17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-engine': ObiEngine;
  }
}