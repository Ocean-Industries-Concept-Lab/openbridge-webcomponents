import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sound-no')
export class ObiSoundNo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2686 19.2685L8 15.9999H5.2C4.07989 15.9999 3.51984 15.9999 3.09202 15.7819C2.71569 15.5901 2.40973 15.2842 2.21799 14.9078C2 14.48 2 13.92 2 12.7999V11.1999C2 10.0797 2 9.5197 2.21799 9.09187C2.40973 8.71555 2.71569 8.40959 3.09202 8.21784C3.51984 7.99985 4.0799 7.99985 5.2 7.99985H8L11.2686 4.73123C12.1254 3.87447 12.5538 3.4461 12.9215 3.41715C13.2407 3.39204 13.5525 3.52121 13.7604 3.76462C14 4.04515 14 4.65096 14 5.8626V18.1371C14 19.3487 14 19.9546 13.7604 20.2351C13.5525 20.4785 13.2407 20.6077 12.9215 20.5826C12.5538 20.5536 12.1254 20.1252 11.2686 19.2685ZM8.82843 9.99985L12 6.82828V17.1714L8.82843 13.9999H4V9.99985H8.82843Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2686 19.2685L8 15.9999H5.2C4.07989 15.9999 3.51984 15.9999 3.09202 15.7819C2.71569 15.5901 2.40973 15.2842 2.21799 14.9078C2 14.48 2 13.92 2 12.7999V11.1999C2 10.0797 2 9.5197 2.21799 9.09187C2.40973 8.71555 2.71569 8.40959 3.09202 8.21784C3.51984 7.99985 4.0799 7.99985 5.2 7.99985H8L11.2686 4.73123C12.1254 3.87447 12.5538 3.4461 12.9215 3.41715C13.2407 3.39204 13.5525 3.52121 13.7604 3.76462C14 4.04515 14 4.65096 14 5.8626V18.1371C14 19.3487 14 19.9546 13.7604 20.2351C13.5525 20.4785 13.2407 20.6077 12.9215 20.5826C12.5538 20.5536 12.1254 20.1252 11.2686 19.2685ZM8.82843 9.99985L12 6.82828V17.1714L8.82843 13.9999H4V9.99985H8.82843Z" style="fill: var(--element-active-color)"/>
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
    'obi-sound-no': ObiSoundNo;
  }
}
