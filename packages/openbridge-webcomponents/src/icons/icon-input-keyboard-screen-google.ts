import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-input-keyboard-screen-google')
export class ObiInputKeyboardScreenGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 16.875H15.75C15.9625 16.875 16.1406 16.8027 16.2844 16.6581C16.4281 16.5135 16.5 16.3344 16.5 16.1206C16.5 15.9069 16.4281 15.7292 16.2844 15.5875C16.1406 15.4458 15.9625 15.375 15.75 15.375H8.25C8.0375 15.375 7.85938 15.4473 7.71563 15.5919C7.57188 15.7365 7.5 15.9156 7.5 16.1294C7.5 16.3431 7.57188 16.5208 7.71563 16.6625C7.85938 16.8042 8.0375 16.875 8.25 16.875ZM5.075 13.75H6.575V12.25H5.075V13.75ZM8.175 13.75H9.675V12.25H8.175V13.75ZM11.25 13.75H12.75V12.25H11.25V13.75ZM14.35 13.75H15.85V12.25H14.35V13.75ZM17.425 13.75H18.925V12.25H17.425V13.75ZM3.5 20C3.1 20 2.75 19.85 2.45 19.55C2.15 19.25 2 18.9 2 18.5V5.5C2 5.1 2.15 4.75 2.45 4.45C2.75 4.15 3.1 4 3.5 4H20.5C20.9 4 21.25 4.15 21.55 4.45C21.85 4.75 22 5.1 22 5.5V18.5C22 18.9 21.85 19.25 21.55 19.55C21.25 19.85 20.9 20 20.5 20H3.5ZM3.5 9.125H20.5V5.5H3.5V9.125ZM3.5 18.5H20.5V10.625H3.5V18.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 16.875H15.75C15.9625 16.875 16.1406 16.8027 16.2844 16.6581C16.4281 16.5135 16.5 16.3344 16.5 16.1206C16.5 15.9069 16.4281 15.7292 16.2844 15.5875C16.1406 15.4458 15.9625 15.375 15.75 15.375H8.25C8.0375 15.375 7.85938 15.4473 7.71563 15.5919C7.57188 15.7365 7.5 15.9156 7.5 16.1294C7.5 16.3431 7.57188 16.5208 7.71563 16.6625C7.85938 16.8042 8.0375 16.875 8.25 16.875ZM5.075 13.75H6.575V12.25H5.075V13.75ZM8.175 13.75H9.675V12.25H8.175V13.75ZM11.25 13.75H12.75V12.25H11.25V13.75ZM14.35 13.75H15.85V12.25H14.35V13.75ZM17.425 13.75H18.925V12.25H17.425V13.75ZM3.5 20C3.1 20 2.75 19.85 2.45 19.55C2.15 19.25 2 18.9 2 18.5V5.5C2 5.1 2.15 4.75 2.45 4.45C2.75 4.15 3.1 4 3.5 4H20.5C20.9 4 21.25 4.15 21.55 4.45C21.85 4.75 22 5.1 22 5.5V18.5C22 18.9 21.85 19.25 21.55 19.55C21.25 19.85 20.9 20 20.5 20H3.5ZM3.5 9.125H20.5V5.5H3.5V9.125ZM3.5 18.5H20.5V10.625H3.5V18.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-keyboard-screen-google': ObiInputKeyboardScreenGoogle;
  }
}
