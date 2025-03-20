import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chevron-tripple-left')
export class ObiChevronTrippleLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.41 16.59L14 18L7.99997 12L14 6L15.41 7.41L10.83 12L15.41 16.59Z" fill="currentColor"/>
<path d="M9.41 16.59L8 18L2 12L8 6L9.41 7.41L4.83 12L9.41 16.59Z" fill="currentColor"/>
<path d="M21.41 16.59L20 18L14 12L20 6L21.41 7.41L16.83 12L21.41 16.59Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.41 16.59L14 18L7.99997 12L14 6L15.41 7.41L10.83 12L15.41 16.59Z" style="fill: var(--element-active-color)"/>
<path d="M9.41 16.59L8 18L2 12L8 6L9.41 7.41L4.83 12L9.41 16.59Z" style="fill: var(--element-active-color)"/>
<path d="M21.41 16.59L20 18L14 12L20 6L21.41 7.41L16.83 12L21.41 16.59Z" style="fill: var(--element-active-color)"/>
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
    'obi-chevron-tripple-left': ObiChevronTrippleLeft;
  }
}
