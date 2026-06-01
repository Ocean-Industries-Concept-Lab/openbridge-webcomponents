import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-food-google')
export class ObiFoodGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 22V12.85C6.15 12.6167 5.4375 12.15 4.8625 11.45C4.2875 10.75 4 9.93333 4 9V2H6V9H7V2H9V9H10V2H12V9C12 9.93333 11.7125 10.75 11.1375 11.45C10.5625 12.15 9.85 12.6167 9 12.85V22H7ZM17 22V14H14V7C14 5.61667 14.4875 4.4375 15.4625 3.4625C16.4375 2.4875 17.6167 2 19 2V22H17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 22V12.85C6.15 12.6167 5.4375 12.15 4.8625 11.45C4.2875 10.75 4 9.93333 4 9V2H6V9H7V2H9V9H10V2H12V9C12 9.93333 11.7125 10.75 11.1375 11.45C10.5625 12.15 9.85 12.6167 9 12.85V22H7ZM17 22V14H14V7C14 5.61667 14.4875 4.4375 15.4625 3.4625C16.4375 2.4875 17.6167 2 19 2V22H17Z" style="fill: var(--element-active-color)"/>
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
    'obi-food-google': ObiFoodGoogle;
  }
}
