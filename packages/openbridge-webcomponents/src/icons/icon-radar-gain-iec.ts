import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-gain-iec')
export class ObiRadarGainIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22 9.0627C20.123 6.03075 16.6857 4 12.7564 4C6.81585 4 2 8.64157 2 14.3663C2 16.4437 2.63394 18.3782 3.7256 20C3.65194 19.5171 3.61347 19.0201 3.61347 18.5129C3.61347 13.9331 6.74376 10.2198 10.6052 10.2198C12.5747 10.2198 14.354 11.1866 15.6248 12.7405L22 9.0627Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 9.0627C20.123 6.03075 16.6857 4 12.7564 4C6.81585 4 2 8.64157 2 14.3663C2 16.4437 2.63394 18.3782 3.7256 20C3.65194 19.5171 3.61347 19.0201 3.61347 18.5129C3.61347 13.9331 6.74376 10.2198 10.6052 10.2198C12.5747 10.2198 14.354 11.1866 15.6248 12.7405L22 9.0627Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-gain-iec': ObiRadarGainIec;
  }
}
