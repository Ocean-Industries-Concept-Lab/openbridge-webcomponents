import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-off-iec')
export class ObiOffIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 20C16.4185 20 20.0002 16.4183 20.0002 12C20.0002 7.58172 16.4185 4 12.0002 4C7.58197 4 4.00024 7.58172 4.00024 12C4.00024 16.4183 7.58197 20 12.0002 20ZM12.0002 22C17.5231 22 22.0002 17.5228 22.0002 12C22.0002 6.47715 17.5231 2 12.0002 2C6.4774 2 2.00024 6.47715 2.00024 12C2.00024 17.5228 6.4774 22 12.0002 22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 20C16.4185 20 20.0002 16.4183 20.0002 12C20.0002 7.58172 16.4185 4 12.0002 4C7.58197 4 4.00024 7.58172 4.00024 12C4.00024 16.4183 7.58197 20 12.0002 20ZM12.0002 22C17.5231 22 22.0002 17.5228 22.0002 12C22.0002 6.47715 17.5231 2 12.0002 2C6.4774 2 2.00024 6.47715 2.00024 12C2.00024 17.5228 6.4774 22 12.0002 22Z" style="fill: var(--element-active-color)"/>
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
    'obi-off-iec': ObiOffIec;
  }
}
