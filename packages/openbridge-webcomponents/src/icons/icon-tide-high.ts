import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-tide-high')
export class ObiTideHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 22.1921V20.1921H22V22.1921H2Z" fill="currentColor"/>
<path d="M21 15.9792C19.97 15.9792 18.94 15.7292 18 15.2292C16.11 16.2292 13.89 16.2292 12 15.2292C10.11 16.2292 7.89 16.2292 6 15.2292C5.05 15.7292 4.03 15.9792 3 15.9792H2V13.9792H3C3.68364 13.9792 4.36195 13.828 5.01151 13.5397C5.31146 13.4105 6 12.9792 6 12.9792C6 12.9792 6.6857 13.4073 6.98565 13.5365C8.27971 14.0947 9.71724 14.0939 11.0115 13.5365C11.3115 13.4073 12 12.9792 12 12.9792C12 12.9792 12.6885 13.4073 12.9885 13.5365C14.2809 14.0931 15.7161 14.0935 17.0086 13.5377C17.3086 13.4085 17.9994 12.9866 17.9994 12.9866C17.9994 12.9866 18.6879 13.4146 18.9878 13.5438C19.6348 13.8294 20.3196 13.9792 21 13.9792H22V15.9792H21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 5.82818L11 10.9998H13L13.0001 5.82818L14.793 7.62108L16.2072 6.20686L12.0001 1.99976L7.79297 6.20686L9.20718 7.62108L11.0001 5.82818Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 22.1921V20.1921H22V22.1921H2Z" style="fill: var(--element-active-color)"/>
<path d="M21 15.9792C19.97 15.9792 18.94 15.7292 18 15.2292C16.11 16.2292 13.89 16.2292 12 15.2292C10.11 16.2292 7.89 16.2292 6 15.2292C5.05 15.7292 4.03 15.9792 3 15.9792H2V13.9792H3C3.68364 13.9792 4.36195 13.828 5.01151 13.5397C5.31146 13.4105 6 12.9792 6 12.9792C6 12.9792 6.6857 13.4073 6.98565 13.5365C8.27971 14.0947 9.71724 14.0939 11.0115 13.5365C11.3115 13.4073 12 12.9792 12 12.9792C12 12.9792 12.6885 13.4073 12.9885 13.5365C14.2809 14.0931 15.7161 14.0935 17.0086 13.5377C17.3086 13.4085 17.9994 12.9866 17.9994 12.9866C17.9994 12.9866 18.6879 13.4146 18.9878 13.5438C19.6348 13.8294 20.3196 13.9792 21 13.9792H22V15.9792H21Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 5.82818L11 10.9998H13L13.0001 5.82818L14.793 7.62108L16.2072 6.20686L12.0001 1.99976L7.79297 6.20686L9.20718 7.62108L11.0001 5.82818Z" style="fill: var(--element-active-color)"/>
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
    'obi-tide-high': ObiTideHigh;
  }
}
