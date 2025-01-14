import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-coffee')
export class ObiCoffee extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 3H20C21.11 3 22 3.89 22 5V8C22 9.1 21.11 10 20 10H18V13C18 15.21 16.21 17 14 17H8C5.79 17 4 15.21 4 13V3ZM14 15C15.1 15 16 14.1 16 13V5H6V13C6 14.1 6.9 15 8 15H14ZM20 8H18V5H20V8Z" fill="currentColor"/>
<path d="M19 19H4V21H19V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 3H20C21.11 3 22 3.89 22 5V8C22 9.1 21.11 10 20 10H18V13C18 15.21 16.21 17 14 17H8C5.79 17 4 15.21 4 13V3ZM14 15C15.1 15 16 14.1 16 13V5H6V13C6 14.1 6.9 15 8 15H14ZM20 8H18V5H20V8Z" style="fill: var(--element-active-color)"/>
<path d="M19 19H4V21H19V19Z" style="fill: var(--element-active-color)"/>
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
    'obi-coffee': ObiCoffee;
  }
}