import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-threeway-digital-closed-bottom')
export class ObiThreewayDigitalClosedBottom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8055 21.3999C17.2997 22.0591 16.8287 22.9995 16.0048 22.9995H8.00476C7.18103 22.9992 6.71078 22.059 7.20496 21.3999L11.2048 16.0662C11.6048 15.5329 12.4048 15.5328 12.8048 16.0661L16.8055 21.3999Z" fill="currentColor" stroke="currentColor"/>
<path d="M20.4268 6.10156C21.0895 5.63771 22 6.11191 22 6.9209V17.0791C22 17.8881 21.0895 18.3623 20.4268 17.8984L14.4008 13.6807C14.2327 13.5631 14.0325 13.5 13.8274 13.5H10.1726C9.96746 13.5 9.76727 13.5631 9.5992 13.6807L3.57324 17.8984C2.91047 18.3623 2 17.8881 2 17.0791V6.9209C2 6.11191 2.91047 5.63772 3.57324 6.10156L9.5992 10.3193C9.76727 10.4369 9.96746 10.5 10.1726 10.5H13.8274C14.0325 10.5 14.2327 10.4369 14.4008 10.3193L20.4268 6.10156Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8055 21.3999C17.2997 22.0591 16.8287 22.9995 16.0048 22.9995H8.00476C7.18103 22.9992 6.71078 22.059 7.20496 21.3999L11.2048 16.0662C11.6048 15.5329 12.4048 15.5328 12.8048 16.0661L16.8055 21.3999Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M20.4268 6.10156C21.0895 5.63771 22 6.11191 22 6.9209V17.0791C22 17.8881 21.0895 18.3623 20.4268 17.8984L14.4008 13.6807C14.2327 13.5631 14.0325 13.5 13.8274 13.5H10.1726C9.96746 13.5 9.76727 13.5631 9.5992 13.6807L3.57324 17.8984C2.91047 18.3623 2 17.8881 2 17.0791V6.9209C2 6.11191 2.91047 5.63772 3.57324 6.10156L9.5992 10.3193C9.76727 10.4369 9.96746 10.5 10.1726 10.5H13.8274C14.0325 10.5 14.2327 10.4369 14.4008 10.3193L20.4268 6.10156Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-threeway-digital-closed-bottom': ObiThreewayDigitalClosedBottom;
  }
}
