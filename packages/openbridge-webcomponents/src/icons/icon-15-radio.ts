import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-radio')
export class Obi15Radio extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 2H10V8H14V7H16V8.02363C17.1308 8.18537 18 9.15784 18 10.3333V19.6667C18 20.9553 16.9553 22 15.6667 22H8.33333C7.04467 22 6 20.9553 6 19.6667V10.3333C6 9.15784 6.86924 8.18537 8 8.02363V2ZM16.014 11H8.01399V12H16.014V11ZM8.01399 13H16.014V14H8.01399V13ZM16.014 15H8.01399V16H16.014V15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 2H10V8H14V7H16V8.02363C17.1308 8.18537 18 9.15784 18 10.3333V19.6667C18 20.9553 16.9553 22 15.6667 22H8.33333C7.04467 22 6 20.9553 6 19.6667V10.3333C6 9.15784 6.86924 8.18537 8 8.02363V2ZM16.014 11H8.01399V12H16.014V11ZM8.01399 13H16.014V14H8.01399V13ZM16.014 15H8.01399V16H16.014V15Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-radio': Obi15Radio;
  }
}
