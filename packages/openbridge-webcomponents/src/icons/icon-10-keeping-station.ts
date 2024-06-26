import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-keeping-station')
export class Obi10KeepingStation extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 7.25001C6.5 4.34749 8.95929 2 12 2C15.0407 2 17.5 4.34749 17.5 7.25001C17.5 11.1875 12 17 12 17C12 17 6.5 11.1875 6.5 7.25001ZM10.0357 7.25001C10.0357 8.28499 10.9157 9.12501 12 9.12501C13.0843 9.12501 13.9643 8.28499 13.9643 7.25001C13.9643 6.21501 13.0843 5.37501 12 5.37501C10.9157 5.37501 10.0357 6.21501 10.0357 7.25001Z" fill="currentColor"/>
<path d="M18 16.7573L16.4854 16L12 18.2427L7.51456 16L6 16.7573L10.4854 19L6 21.2427L7.51456 22L12 19.7573L16.4854 22L18 21.2427L13.5146 19L18 16.7573Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 7.25001C6.5 4.34749 8.95929 2 12 2C15.0407 2 17.5 4.34749 17.5 7.25001C17.5 11.1875 12 17 12 17C12 17 6.5 11.1875 6.5 7.25001ZM10.0357 7.25001C10.0357 8.28499 10.9157 9.12501 12 9.12501C13.0843 9.12501 13.9643 8.28499 13.9643 7.25001C13.9643 6.21501 13.0843 5.37501 12 5.37501C10.9157 5.37501 10.0357 6.21501 10.0357 7.25001Z" style="fill: var(--element-active-color)"/>
<path d="M18 16.7573L16.4854 16L12 18.2427L7.51456 16L6 16.7573L10.4854 19L6 21.2427L7.51456 22L12 19.7573L16.4854 22L18 21.2427L13.5146 19L18 16.7573Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-keeping-station': Obi10KeepingStation;
  }
}
