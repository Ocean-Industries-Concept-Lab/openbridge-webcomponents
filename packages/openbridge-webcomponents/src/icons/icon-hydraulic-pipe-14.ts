import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-pipe-14')
export class ObiHydraulicPipe14 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M27.0004 33H31.0013C31.8251 33 32.2951 33.9403 31.8011 34.5996L24.7943 44C24.3941 44.5341 23.5925 44.5334 23.1927 43.999L16.1966 34.5986C15.7034 33.9392 16.174 33 16.9974 33H21.0004V0H27.0004V33Z" fill="currentColor"/>
<path d="M2 3.21094C9.17358 7.36066 14 15.1166 14 24C14 32.8832 9.17334 40.6383 2 44.7881V42.4404C8.01998 38.5149 12 31.7228 12 24C12 16.277 8.02023 9.48403 2 5.55859V3.21094Z" fill="currentColor"/>
<path d="M46 5.55859C39.9798 9.48403 36 16.277 36 24C36 31.7228 39.98 38.5149 46 42.4404V44.7881C38.8267 40.6383 34 32.8832 34 24C34 15.1166 38.8264 7.36066 46 3.21094V5.55859Z" fill="currentColor"/>
<path d="M22 34H16.9971L23.9932 43.4424L31.001 34H26.001L26 0H27V33H31.001C31.8247 33 32.2955 33.9403 31.8018 34.5996L24.7939 44.042C24.3938 44.5761 23.5921 44.5754 23.1924 44.041L16.1963 34.5986C15.7032 33.9392 16.1737 33 16.9971 33H21V0H22V34Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.0004 33H31.0013C31.8251 33 32.2951 33.9403 31.8011 34.5996L24.7943 44C24.3941 44.5341 23.5925 44.5334 23.1927 43.999L16.1966 34.5986C15.7034 33.9392 16.174 33 16.9974 33H21.0004V0H27.0004V33Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M2 3.21094C9.17358 7.36066 14 15.1166 14 24C14 32.8832 9.17334 40.6383 2 44.7881V42.4404C8.01998 38.5149 12 31.7228 12 24C12 16.277 8.02023 9.48403 2 5.55859V3.21094Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M46 5.55859C39.9798 9.48403 36 16.277 36 24C36 31.7228 39.98 38.5149 46 42.4404V44.7881C38.8267 40.6383 34 32.8832 34 24C34 15.1166 38.8264 7.36066 46 3.21094V5.55859Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M22 34H16.9971L23.9932 43.4424L31.001 34H26.001L26 0H27V33H31.001C31.8247 33 32.2955 33.9403 31.8018 34.5996L24.7939 44.042C24.3938 44.5761 23.5921 44.5754 23.1924 44.041L16.1963 34.5986C15.7032 33.9392 16.1737 33 16.9971 33H21V0H22V34Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-hydraulic-pipe-14': ObiHydraulicPipe14;
  }
}
