import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-input-up')
export class ObiInputUp extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7983 17C17.7868 17 18.351 15.824 17.7579 15L12.8297 7.72235C12.4331 7.13673 11.5706 7.1366 11.1738 7.72209L6.2421 15C5.64901 15.824 6.21326 17 7.20176 17L16.7983 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7983 17C17.7868 17 18.351 15.824 17.7579 15L12.8297 7.72235C12.4331 7.13673 11.5706 7.1366 11.1738 7.72209L6.2421 15C5.64901 15.824 6.21326 17 7.20176 17L16.7983 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-up': ObiInputUp;
  }
}
