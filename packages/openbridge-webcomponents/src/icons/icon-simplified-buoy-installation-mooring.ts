import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-installation-mooring')
export class ObiSimplifiedBuoyInstallationMooring extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7324 11C13.9026 10.7058 14 10.3643 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 10.3643 10.0974 10.7058 10.2676 11H5.13333L3 17H21L18.8667 11H13.7324Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7324 11C13.9026 10.7058 14 10.3643 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 10.3643 10.0974 10.7058 10.2676 11H5.13333L3 17H21L18.8667 11H13.7324Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-installation-mooring': ObiSimplifiedBuoyInstallationMooring;
  }
}
