import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-content-paste-google')
export class ObiContentPasteGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H9.175C9.35833 3.41667 9.71667 2.9375 10.25 2.5625C10.7833 2.1875 11.3667 2 12 2C12.6667 2 13.2625 2.1875 13.7875 2.5625C14.3125 2.9375 14.6667 3.41667 14.85 4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V6H17V9H7V6H5V20ZM12 6C12.2833 6 12.5208 5.90417 12.7125 5.7125C12.9042 5.52083 13 5.28333 13 5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5C11 5.28333 11.0958 5.52083 11.2875 5.7125C11.4792 5.90417 11.7167 6 12 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H9.175C9.35833 3.41667 9.71667 2.9375 10.25 2.5625C10.7833 2.1875 11.3667 2 12 2C12.6667 2 13.2625 2.1875 13.7875 2.5625C14.3125 2.9375 14.6667 3.41667 14.85 4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V6H17V9H7V6H5V20ZM12 6C12.2833 6 12.5208 5.90417 12.7125 5.7125C12.9042 5.52083 13 5.28333 13 5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5C11 5.28333 11.0958 5.52083 11.2875 5.7125C11.4792 5.90417 11.7167 6 12 6Z" style="fill: var(--element-active-color)"/>
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
    'obi-content-paste-google': ObiContentPasteGoogle;
  }
}
