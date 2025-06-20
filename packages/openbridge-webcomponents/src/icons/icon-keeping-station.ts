import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-keeping-station')
export class ObiKeepingStation extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 17.2573L16.4854 16.5L12 18.7427L7.51456 16.5L6 17.2573L10.4854 19.5L6 21.7427L7.51456 22.5L12 20.2573L16.4854 22.5L18 21.7427L13.5146 19.5L18 17.2573Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.49976C8.68286 1.49976 6 4.09009 6 7.29287C6 11.6377 12 17.4998 12 17.4998C12 17.4998 18 11.6377 18 7.29287C18 4.09009 15.3171 1.49976 12 1.49976ZM12.0376 9.57495C13.1629 9.57495 14.0752 8.66269 14.0752 7.53735C14.0752 6.41202 13.1629 5.49976 12.0376 5.49976C10.9123 5.49976 10 6.41202 10 7.53735C10 8.66269 10.9123 9.57495 12.0376 9.57495Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 17.2573L16.4854 16.5L12 18.7427L7.51456 16.5L6 17.2573L10.4854 19.5L6 21.7427L7.51456 22.5L12 20.2573L16.4854 22.5L18 21.7427L13.5146 19.5L18 17.2573Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.49976C8.68286 1.49976 6 4.09009 6 7.29287C6 11.6377 12 17.4998 12 17.4998C12 17.4998 18 11.6377 18 7.29287C18 4.09009 15.3171 1.49976 12 1.49976ZM12.0376 9.57495C13.1629 9.57495 14.0752 8.66269 14.0752 7.53735C14.0752 6.41202 13.1629 5.49976 12.0376 5.49976C10.9123 5.49976 10 6.41202 10 7.53735C10 8.66269 10.9123 9.57495 12.0376 9.57495Z" style="fill: var(--element-active-color)"/>
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
    'obi-keeping-station': ObiKeepingStation;
  }
}
