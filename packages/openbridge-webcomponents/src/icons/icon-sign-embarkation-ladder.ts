import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-embarkation-ladder')
export class ObiSignEmbarkationLadder extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21 22C19.97 22 18.94 21.75 18 21.25C16.11 22.25 13.89 22.25 12 21.25C10.11 22.25 7.89 22.25 6 21.25C5.05 21.75 4.03 22 3 22H2V20.5H3C3.68364 20.5 4.36216 20.3488 5.01172 20.0605C5.31167 19.9313 6.00021 19.5 6.00021 19.5C6.00021 19.5 6.6857 19.9268 6.98565 20.056C8.27971 20.6143 9.71724 20.6147 11.0115 20.0572C11.3115 19.928 12.0002 19.5 12.0002 19.5C12.0002 19.5 12.6885 19.928 12.9885 20.0572C14.2809 20.6139 15.7161 20.6143 17.0086 20.0584C17.3086 19.9292 17.9996 19.5073 17.9996 19.5073C17.9996 19.5073 18.6879 19.9353 18.9878 20.0645C19.6348 20.3502 20.3196 20.5 21 20.5H22V22H21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 18.9187V17.75H9.75V18.9187C9.25236 18.9938 8.74764 18.9938 8.25 18.9187V2H9.75V4.25H14.25V2H15.75V18.9187C15.2524 18.9938 14.7476 18.9938 14.25 18.9187ZM14.25 13.75V16.25H9.75V13.75H14.25ZM14.25 9.75V12.25H9.75V9.75H14.25ZM14.25 5.75V8.25H9.75V5.75H14.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 22C19.97 22 18.94 21.75 18 21.25C16.11 22.25 13.89 22.25 12 21.25C10.11 22.25 7.89 22.25 6 21.25C5.05 21.75 4.03 22 3 22H2V20.5H3C3.68364 20.5 4.36216 20.3488 5.01172 20.0605C5.31167 19.9313 6.00021 19.5 6.00021 19.5C6.00021 19.5 6.6857 19.9268 6.98565 20.056C8.27971 20.6143 9.71724 20.6147 11.0115 20.0572C11.3115 19.928 12.0002 19.5 12.0002 19.5C12.0002 19.5 12.6885 19.928 12.9885 20.0572C14.2809 20.6139 15.7161 20.6143 17.0086 20.0584C17.3086 19.9292 17.9996 19.5073 17.9996 19.5073C17.9996 19.5073 18.6879 19.9353 18.9878 20.0645C19.6348 20.3502 20.3196 20.5 21 20.5H22V22H21Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 18.9187V17.75H9.75V18.9187C9.25236 18.9938 8.74764 18.9938 8.25 18.9187V2H9.75V4.25H14.25V2H15.75V18.9187C15.2524 18.9938 14.7476 18.9938 14.25 18.9187ZM14.25 13.75V16.25H9.75V13.75H14.25ZM14.25 9.75V12.25H9.75V9.75H14.25ZM14.25 5.75V8.25H9.75V5.75H14.25Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-embarkation-ladder': ObiSignEmbarkationLadder;
  }
}
