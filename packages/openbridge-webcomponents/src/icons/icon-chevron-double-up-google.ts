import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chevron-double-up-google')
export class ObiChevronDoubleUpGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.11495 18.7051L5.70496 17.2951L11.705 11.2951L17.705 17.2951L16.295 18.7051L11.705 14.1251L7.11495 18.7051Z" fill="currentColor"/>
<path d="M7.11496 12.7051L5.70496 11.2951L11.705 5.2951L17.705 11.2951L16.295 12.7051L11.705 8.1251L7.11496 12.7051Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.11495 18.7051L5.70496 17.2951L11.705 11.2951L17.705 17.2951L16.295 18.7051L11.705 14.1251L7.11495 18.7051Z" style="fill: var(--element-active-color)"/>
<path d="M7.11496 12.7051L5.70496 11.2951L11.705 5.2951L17.705 11.2951L16.295 12.7051L11.705 8.1251L7.11496 12.7051Z" style="fill: var(--element-active-color)"/>
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
    'obi-chevron-double-up-google': ObiChevronDoubleUpGoogle;
  }
}
