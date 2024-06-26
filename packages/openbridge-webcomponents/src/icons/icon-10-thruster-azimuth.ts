import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-thruster-azimuth')
export class Obi10ThrusterAzimuth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0711 19.0711C16.4536 21.6884 12.7466 22.5515 9.41041 21.6606L10.6746 20.3964C13.2673 20.8033 16.012 20.0078 18.0098 18.0101C20.0076 16.0124 20.803 13.2675 20.3963 10.6749L21.6607 9.41048C22.5515 12.7466 21.6882 16.4538 19.0711 19.0711Z" fill="currentColor"/>
<path d="M3.60304 13.326L2.33937 14.5896C1.4485 11.2534 2.31154 7.54623 4.92897 4.92892C7.54616 2.31167 11.2534 1.44845 14.5896 2.33938L13.3257 3.60317C10.7327 3.19576 7.98707 3.99111 5.98903 5.98928C3.99098 7.98745 3.19557 10.7329 3.60304 13.326Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.80763 16.9497L7.05031 21.1923L13.4158 14.8269L14.8298 16.2412L16.2442 14.827L14.8298 13.4127L21.1924 7.05019L16.9497 2.80758L10.5872 9.17013L9.17311 7.75594L7.7588 9.17013L9.17311 10.5843L2.80763 16.9497ZM10.5872 11.9986L5.636 16.9497L7.05031 18.3639L12.0015 13.4127L10.5872 11.9986ZM18.364 7.05019L16.2439 9.17019L14.8298 7.756L16.9497 5.63601L18.364 7.05019Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0711 19.0711C16.4536 21.6884 12.7466 22.5515 9.41041 21.6606L10.6746 20.3964C13.2673 20.8033 16.012 20.0078 18.0098 18.0101C20.0076 16.0124 20.803 13.2675 20.3963 10.6749L21.6607 9.41048C22.5515 12.7466 21.6882 16.4538 19.0711 19.0711Z" style="fill: var(--element-active-color)"/>
<path d="M3.60304 13.326L2.33937 14.5896C1.4485 11.2534 2.31154 7.54623 4.92897 4.92892C7.54616 2.31167 11.2534 1.44845 14.5896 2.33938L13.3257 3.60317C10.7327 3.19576 7.98707 3.99111 5.98903 5.98928C3.99098 7.98745 3.19557 10.7329 3.60304 13.326Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.80763 16.9497L7.05031 21.1923L13.4158 14.8269L14.8298 16.2412L16.2442 14.827L14.8298 13.4127L21.1924 7.05019L16.9497 2.80758L10.5872 9.17013L9.17311 7.75594L7.7588 9.17013L9.17311 10.5843L2.80763 16.9497ZM10.5872 11.9986L5.636 16.9497L7.05031 18.3639L12.0015 13.4127L10.5872 11.9986ZM18.364 7.05019L16.2439 9.17019L14.8298 7.756L16.9497 5.63601L18.364 7.05019Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-thruster-azimuth': Obi10ThrusterAzimuth;
  }
}
