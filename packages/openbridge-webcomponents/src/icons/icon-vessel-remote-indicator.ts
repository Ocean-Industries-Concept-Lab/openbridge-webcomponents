import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-remote-indicator')
export class ObiVesselRemoteIndicator extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.60938 8.93848C2.20736 9.90903 2.00002 10.9495 2 12C2.00002 13.0505 2.2074 14.091 2.60938 15.0615L1.68555 15.4443L0.760742 15.8262C0.258417 14.6132 2.39124e-05 13.3129 0 12C2.3876e-05 10.6869 0.258232 9.38604 0.760742 8.17285L2.60938 8.93848Z" fill="currentColor"/>
<path d="M23.2393 8.17285C23.7418 9.38604 24 10.6869 24 12C24 13.3129 23.7416 14.6132 23.2393 15.8262L22.3145 15.4443L21.3906 15.0615C21.7926 14.091 22 13.0505 22 12C22 10.9495 21.7926 9.90903 21.3906 8.93848L23.2393 8.17285Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.60938 8.93848C2.20736 9.90903 2.00002 10.9495 2 12C2.00002 13.0505 2.2074 14.091 2.60938 15.0615L1.68555 15.4443L0.760742 15.8262C0.258417 14.6132 2.39124e-05 13.3129 0 12C2.3876e-05 10.6869 0.258232 9.38604 0.760742 8.17285L2.60938 8.93848Z" style="fill: var(--element-active-color)"/>
<path d="M23.2393 8.17285C23.7418 9.38604 24 10.6869 24 12C24 13.3129 23.7416 14.6132 23.2393 15.8262L22.3145 15.4443L21.3906 15.0615C21.7926 14.091 22 13.0505 22 12C22 10.9495 21.7926 9.90903 21.3906 8.93848L23.2393 8.17285Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-remote-indicator': ObiVesselRemoteIndicator;
  }
}
