import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-tidal-water-level-information')
export class ObiTidalWaterLevelInformation extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.52686 1.04028C10.8937 -0.326496 13.1093 -0.326533 14.4761 1.04028L22.9614 9.52563C24.3281 10.8925 24.3281 13.1081 22.9614 14.4749L14.4761 22.9602C13.1093 24.327 10.8937 24.3269 9.52686 22.9602L1.0415 14.4749C-0.325326 13.108 -0.325316 10.8925 1.0415 9.52563L9.52686 1.04028ZM13.4155 2.10083C12.6345 1.3198 11.3685 1.31984 10.5874 2.10083L2.10205 10.5862C1.32102 11.3672 1.32101 12.6333 2.10205 13.4143L10.5874 21.8997C11.3685 22.6805 12.6345 22.6806 13.4155 21.8997L21.9009 13.4143C22.6818 12.6333 22.6817 11.3672 21.9009 10.5862L13.4155 2.10083ZM15.0933 9.18091H12.8276V16.0002H11.1714V9.18091H8.90576V7.78931H15.0933V9.18091Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.52686 1.04028C10.8937 -0.326496 13.1093 -0.326533 14.4761 1.04028L22.9614 9.52563C24.3281 10.8925 24.3281 13.1081 22.9614 14.4749L14.4761 22.9602C13.1093 24.327 10.8937 24.3269 9.52686 22.9602L1.0415 14.4749C-0.325326 13.108 -0.325316 10.8925 1.0415 9.52563L9.52686 1.04028ZM13.4155 2.10083C12.6345 1.3198 11.3685 1.31984 10.5874 2.10083L2.10205 10.5862C1.32102 11.3672 1.32101 12.6333 2.10205 13.4143L10.5874 21.8997C11.3685 22.6805 12.6345 22.6806 13.4155 21.8997L21.9009 13.4143C22.6818 12.6333 22.6817 11.3672 21.9009 10.5862L13.4155 2.10083ZM15.0933 9.18091H12.8276V16.0002H11.1714V9.18091H8.90576V7.78931H15.0933V9.18091Z" style="fill: var(--element-active-color)"/>
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
    'obi-tidal-water-level-information': ObiTidalWaterLevelInformation;
  }
}
