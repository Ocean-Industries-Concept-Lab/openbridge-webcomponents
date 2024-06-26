import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-wifi2')
export class Obi20Wifi2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 8.77613L3 10.7761C7.97 5.80613 16.03 5.80613 21 10.7761L23 8.77613C16.93 2.70613 7.08 2.70613 1 8.77613ZM9 16.7761L12 19.7761L15 16.7761C13.35 15.1161 10.66 15.1161 9 16.7761ZM7 14.7761L5 12.7761C8.87 8.91613 15.14 8.91613 19 12.7761L17 14.7761C14.24 12.0161 9.76 12.0161 7 14.7761Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 8.77613L3 10.7761C7.97 5.80613 16.03 5.80613 21 10.7761L23 8.77613C16.93 2.70613 7.08 2.70613 1 8.77613ZM9 16.7761L12 19.7761L15 16.7761C13.35 15.1161 10.66 15.1161 9 16.7761ZM7 14.7761L5 12.7761C8.87 8.91613 15.14 8.91613 19 12.7761L17 14.7761C14.24 12.0161 9.76 12.0161 7 14.7761Z" style="fill: var(--element-active-color)"/>
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
    'obi-20-wifi2': Obi20Wifi2;
  }
}
