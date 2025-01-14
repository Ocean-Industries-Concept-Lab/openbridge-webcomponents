import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-print')
export class ObiPrint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19 7H18V2H6V7H5C3.34 7 2 8.34 2 10V18H6V22H18V18H22V10C22 8.34 20.66 7 19 7ZM8 4H16V7H8V4ZM16 20H8V16H16V20ZM18 16V14H6V16H4V10C4 9.45 4.45 9 5 9H19C19.55 9 20 9.45 20 10V16H18Z" fill="currentColor"/>
<path d="M17.5 12.5C18.0523 12.5 18.5 12.0523 18.5 11.5C18.5 10.9477 18.0523 10.5 17.5 10.5C16.9477 10.5 16.5 10.9477 16.5 11.5C16.5 12.0523 16.9477 12.5 17.5 12.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 7H18V2H6V7H5C3.34 7 2 8.34 2 10V18H6V22H18V18H22V10C22 8.34 20.66 7 19 7ZM8 4H16V7H8V4ZM16 20H8V16H16V20ZM18 16V14H6V16H4V10C4 9.45 4.45 9 5 9H19C19.55 9 20 9.45 20 10V16H18Z" style="fill: var(--element-active-color)"/>
<path d="M17.5 12.5C18.0523 12.5 18.5 12.0523 18.5 11.5C18.5 10.9477 18.0523 10.5 17.5 10.5C16.9477 10.5 16.5 10.9477 16.5 11.5C16.5 12.0523 16.9477 12.5 17.5 12.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-print': ObiPrint;
  }
}