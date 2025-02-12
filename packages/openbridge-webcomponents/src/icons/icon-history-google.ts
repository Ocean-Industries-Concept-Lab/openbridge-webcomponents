import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-history-google')
export class ObiHistoryGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C9.7 21 7.696 20.2373 5.988 18.712C4.27933 17.1873 3.3 15.2833 3.05 13H5.1C5.33333 14.7333 6.104 16.1667 7.412 17.3C8.72067 18.4333 10.25 19 12 19C13.95 19 15.604 18.3207 16.962 16.962C18.3207 15.604 19 13.95 19 12C19 10.05 18.3207 8.39567 16.962 7.037C15.604 5.679 13.95 5 12 5C10.85 5 9.775 5.26667 8.775 5.8C7.775 6.33333 6.93333 7.06667 6.25 8H9V10H3V4H5V6.35C5.85 5.28333 6.88767 4.45833 8.113 3.875C9.33767 3.29167 10.6333 3 12 3C13.25 3 14.421 3.23733 15.513 3.712C16.6043 4.18733 17.5543 4.829 18.363 5.637C19.171 6.44567 19.8127 7.39567 20.288 8.487C20.7627 9.579 21 10.75 21 12C21 13.25 20.7627 14.4207 20.288 15.512C19.8127 16.604 19.171 17.554 18.363 18.362C17.5543 19.1707 16.6043 19.8127 15.513 20.288C14.421 20.7627 13.25 21 12 21ZM14.8 16.2L11 12.4V7H13V11.6L16.2 14.8L14.8 16.2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C9.7 21 7.696 20.2373 5.988 18.712C4.27933 17.1873 3.3 15.2833 3.05 13H5.1C5.33333 14.7333 6.104 16.1667 7.412 17.3C8.72067 18.4333 10.25 19 12 19C13.95 19 15.604 18.3207 16.962 16.962C18.3207 15.604 19 13.95 19 12C19 10.05 18.3207 8.39567 16.962 7.037C15.604 5.679 13.95 5 12 5C10.85 5 9.775 5.26667 8.775 5.8C7.775 6.33333 6.93333 7.06667 6.25 8H9V10H3V4H5V6.35C5.85 5.28333 6.88767 4.45833 8.113 3.875C9.33767 3.29167 10.6333 3 12 3C13.25 3 14.421 3.23733 15.513 3.712C16.6043 4.18733 17.5543 4.829 18.363 5.637C19.171 6.44567 19.8127 7.39567 20.288 8.487C20.7627 9.579 21 10.75 21 12C21 13.25 20.7627 14.4207 20.288 15.512C19.8127 16.604 19.171 17.554 18.363 18.362C17.5543 19.1707 16.6043 19.8127 15.513 20.288C14.421 20.7627 13.25 21 12 21ZM14.8 16.2L11 12.4V7H13V11.6L16.2 14.8L14.8 16.2Z" style="fill: var(--element-active-color)"/>
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
    'obi-history-google': ObiHistoryGoogle;
  }
}
