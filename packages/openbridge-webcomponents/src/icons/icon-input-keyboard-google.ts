import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-input-keyboard-google')
export class ObiInputKeyboardGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 19C3.1 19 2.75 18.8458 2.45 18.5375C2.15 18.2292 2 17.8833 2 17.5V6.5C2 6.1 2.15 5.75 2.45 5.45C2.75 5.15 3.1 5 3.5 5H20.5C20.9 5 21.25 5.15 21.55 5.45C21.85 5.75 22 6.1 22 6.5V17.5C22 17.8833 21.85 18.2292 21.55 18.5375C21.25 18.8458 20.9 19 20.5 19H3.5ZM3.5 17.5H20.5V6.5H3.5V17.5ZM7.5 15.875H16.5V14.375H7.5V15.875ZM5.075 12.75H6.575V11.25H5.075V12.75ZM8.175 12.75H9.675V11.25H8.175V12.75ZM11.25 12.75H12.75V11.25H11.25V12.75ZM14.35 12.75H15.85V11.25H14.35V12.75ZM17.425 12.75H18.925V11.25H17.425V12.75ZM5.075 9.625H6.575V8.125H5.075V9.625ZM8.175 9.625H9.675V8.125H8.175V9.625ZM11.25 9.625H12.75V8.125H11.25V9.625ZM14.35 9.625H15.85V8.125H14.35V9.625ZM17.425 9.625H18.925V8.125H17.425V9.625Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 19C3.1 19 2.75 18.8458 2.45 18.5375C2.15 18.2292 2 17.8833 2 17.5V6.5C2 6.1 2.15 5.75 2.45 5.45C2.75 5.15 3.1 5 3.5 5H20.5C20.9 5 21.25 5.15 21.55 5.45C21.85 5.75 22 6.1 22 6.5V17.5C22 17.8833 21.85 18.2292 21.55 18.5375C21.25 18.8458 20.9 19 20.5 19H3.5ZM3.5 17.5H20.5V6.5H3.5V17.5ZM7.5 15.875H16.5V14.375H7.5V15.875ZM5.075 12.75H6.575V11.25H5.075V12.75ZM8.175 12.75H9.675V11.25H8.175V12.75ZM11.25 12.75H12.75V11.25H11.25V12.75ZM14.35 12.75H15.85V11.25H14.35V12.75ZM17.425 12.75H18.925V11.25H17.425V12.75ZM5.075 9.625H6.575V8.125H5.075V9.625ZM8.175 9.625H9.675V8.125H8.175V9.625ZM11.25 9.625H12.75V8.125H11.25V9.625ZM14.35 9.625H15.85V8.125H14.35V9.625ZM17.425 9.625H18.925V8.125H17.425V9.625Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-keyboard-google': ObiInputKeyboardGoogle;
  }
}
