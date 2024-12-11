import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cent-off-iec')
export class ObiCentOffIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5579 13.1137C17.7138 11.9578 19.2953 11.4851 20.8009 11.6991C21.0148 13.2047 20.5422 14.7862 19.3863 15.9421L14.5251 20.8033L11.6967 17.9749L16.5579 13.1137Z" stroke="#373737" stroke-width="2"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5579 13.1137C17.7138 11.9578 19.2953 11.4851 20.8009 11.6991C21.0148 13.2047 20.5422 14.7862 19.3863 15.9421L14.5251 20.8033L11.6967 17.9749L16.5579 13.1137Z" style="stroke: var(--element-active-color)" stroke-width="2"/>
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
    'obi-cent-off-iec': ObiCentOffIec;
  }
}
