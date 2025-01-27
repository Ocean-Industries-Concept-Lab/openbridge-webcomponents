import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-keeping-station')
export class ObiKeepingStation extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3599 17.2573L16.8453 16.5L12.3599 18.7427L7.87442 16.5L6.35986 17.2573L10.8453 19.5L6.35986 21.7427L7.87442 22.5L12.3599 20.2573L16.8453 22.5L18.3599 21.7427L13.8744 19.5L18.3599 17.2573Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3599 1.5C9.04272 1.5 6.35986 4.09034 6.35986 7.29312C6.35986 11.6379 12.3599 17.5 12.3599 17.5C12.3599 17.5 18.3599 11.6379 18.3599 7.29312C18.3599 4.09034 15.677 1.5 12.3599 1.5ZM12.3975 9.5752C13.5228 9.5752 14.4351 8.66293 14.4351 7.5376C14.4351 6.41226 13.5228 5.5 12.3975 5.5C11.2721 5.5 10.3599 6.41226 10.3599 7.5376C10.3599 8.66293 11.2721 9.5752 12.3975 9.5752Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3599 17.2573L16.8453 16.5L12.3599 18.7427L7.87442 16.5L6.35986 17.2573L10.8453 19.5L6.35986 21.7427L7.87442 22.5L12.3599 20.2573L16.8453 22.5L18.3599 21.7427L13.8744 19.5L18.3599 17.2573Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3599 1.5C9.04272 1.5 6.35986 4.09034 6.35986 7.29312C6.35986 11.6379 12.3599 17.5 12.3599 17.5C12.3599 17.5 18.3599 11.6379 18.3599 7.29312C18.3599 4.09034 15.677 1.5 12.3599 1.5ZM12.3975 9.5752C13.5228 9.5752 14.4351 8.66293 14.4351 7.5376C14.4351 6.41226 13.5228 5.5 12.3975 5.5C11.2721 5.5 10.3599 6.41226 10.3599 7.5376C10.3599 8.66293 11.2721 9.5752 12.3975 9.5752Z" style="fill: var(--element-active-color)"/>
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
