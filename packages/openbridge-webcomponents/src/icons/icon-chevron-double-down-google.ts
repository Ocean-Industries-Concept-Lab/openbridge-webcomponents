import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chevron-double-down-google')
export class ObiChevronDoubleDownGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2948 5.29493L17.7048 6.70493L11.7048 12.7049L5.70483 6.70493L7.11483 5.29493L11.7048 9.87493L16.2948 5.29493Z" fill="currentColor"/>
<path d="M16.2948 11.2949L17.7048 12.7049L11.7048 18.7049L5.70483 12.7049L7.11483 11.2949L11.7048 15.8749L16.2948 11.2949Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2948 5.29493L17.7048 6.70493L11.7048 12.7049L5.70483 6.70493L7.11483 5.29493L11.7048 9.87493L16.2948 5.29493Z" style="fill: var(--element-active-color)"/>
<path d="M16.2948 11.2949L17.7048 12.7049L11.7048 18.7049L5.70483 12.7049L7.11483 11.2949L11.7048 15.8749L16.2948 11.2949Z" style="fill: var(--element-active-color)"/>
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
    'obi-chevron-double-down-google': ObiChevronDoubleDownGoogle;
  }
}