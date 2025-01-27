import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-keeping-track')
export class ObiKeepingTrack extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 22H5V20H2V22Z" fill="currentColor"/>
<path d="M7 22H11V20H7V22Z" fill="currentColor"/>
<path d="M13 22H17V20H13V22Z" fill="currentColor"/>
<path d="M19 22H22V20H19V22Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C8.68286 2 6 4.59034 6 7.79312C6 12.1379 12 18 12 18C12 18 18 12.1379 18 7.79312C18 4.59034 15.3171 2 12 2ZM12.0376 10.0752C13.1629 10.0752 14.0752 9.16293 14.0752 8.0376C14.0752 6.91226 13.1629 6 12.0376 6C10.9123 6 10 6.91226 10 8.0376C10 9.16293 10.9123 10.0752 12.0376 10.0752Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 22H5V20H2V22Z" style="fill: var(--element-active-color)"/>
<path d="M7 22H11V20H7V22Z" style="fill: var(--element-active-color)"/>
<path d="M13 22H17V20H13V22Z" style="fill: var(--element-active-color)"/>
<path d="M19 22H22V20H19V22Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C8.68286 2 6 4.59034 6 7.79312C6 12.1379 12 18 12 18C12 18 18 12.1379 18 7.79312C18 4.59034 15.3171 2 12 2ZM12.0376 10.0752C13.1629 10.0752 14.0752 9.16293 14.0752 8.0376C14.0752 6.91226 13.1629 6 12.0376 6C10.9123 6 10 6.91226 10 8.0376C10 9.16293 10.9123 10.0752 12.0376 10.0752Z" style="fill: var(--element-active-color)"/>
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
    'obi-keeping-track': ObiKeepingTrack;
  }
}
