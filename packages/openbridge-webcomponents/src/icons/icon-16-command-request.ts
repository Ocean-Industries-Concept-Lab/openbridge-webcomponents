import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-16-command-request')
export class Obi16CommandRequest extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.625 11.0909C9.24632 11.0909 9.75 10.6025 9.75 10C9.75 9.39751 9.24632 8.90909 8.625 8.90909C8.00368 8.90909 7.5 9.39751 7.5 10C7.5 10.6025 8.00368 11.0909 8.625 11.0909Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2ZM8.625 14C10.5132 14 12.105 12.7698 12.5947 11.0909H14.25V12.5455H15.75V11.0909H16.5V13.2727H18.75V11.0909H19.5V8.18182H12.3002C11.6175 6.88666 10.228 6 8.625 6C6.34683 6 4.5 7.79086 4.5 10C4.5 12.2091 6.34683 14 8.625 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.625 11.0909C9.24632 11.0909 9.75 10.6025 9.75 10C9.75 9.39751 9.24632 8.90909 8.625 8.90909C8.00368 8.90909 7.5 9.39751 7.5 10C7.5 10.6025 8.00368 11.0909 8.625 11.0909Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2ZM8.625 14C10.5132 14 12.105 12.7698 12.5947 11.0909H14.25V12.5455H15.75V11.0909H16.5V13.2727H18.75V11.0909H19.5V8.18182H12.3002C11.6175 6.88666 10.228 6 8.625 6C6.34683 6 4.5 7.79086 4.5 10C4.5 12.2091 6.34683 14 8.625 14Z" style="fill: var(--element-active-color)"/>
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
    'obi-16-command-request': Obi16CommandRequest;
  }
}
