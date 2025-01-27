import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-log-edit-google')
export class ObiLogEditGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM19 19H5V5H19V19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1 11.05L9.1 17H7V14.85L12.95 8.9L15.1 11.05ZM16.85 9.25L15.8 10.35L13.65 8.2L14.75 7.15C14.85 7.05 14.9667 7 15.1 7C15.2333 7 15.35 7.05 15.45 7.15L16.85 8.55C16.95 8.65 17 8.76667 17 8.9C17 9.03333 16.95 9.15 16.85 9.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM19 19H5V5H19V19Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1 11.05L9.1 17H7V14.85L12.95 8.9L15.1 11.05ZM16.85 9.25L15.8 10.35L13.65 8.2L14.75 7.15C14.85 7.05 14.9667 7 15.1 7C15.2333 7 15.35 7.05 15.45 7.15L16.85 8.55C16.95 8.65 17 8.76667 17 8.9C17 9.03333 16.95 9.15 16.85 9.25Z" style="fill: var(--element-active-color)"/>
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
    'obi-log-edit-google': ObiLogEditGoogle;
  }
}
