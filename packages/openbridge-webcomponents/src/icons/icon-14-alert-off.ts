import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alert-off')
export class Obi14AlertOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.27 3.49L20 18.69L21 19.72L19.73 20.99L17.73 18.99H4V17.99L6 15.99V10.99C6 9.73 6.28 8.56 6.8 7.57V7.56L4 4.76L5.27 3.49ZM14 20C14 21.11 13.11 22 12 22C10.89 22 10 21.11 10 20H14Z" fill="currentColor"/>
<path d="M18 14.68V11C18 7.92 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C10.384 4.7032 9.5 5 9.06 5.24L18 14.68Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.27 3.49L20 18.69L21 19.72L19.73 20.99L17.73 18.99H4V17.99L6 15.99V10.99C6 9.73 6.28 8.56 6.8 7.57V7.56L4 4.76L5.27 3.49ZM14 20C14 21.11 13.11 22 12 22C10.89 22 10 21.11 10 20H14Z" style="fill: var(--element-active-color)"/>
<path d="M18 14.68V11C18 7.92 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C10.384 4.7032 9.5 5 9.06 5.24L18 14.68Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alert-off': Obi14AlertOff;
  }
}
