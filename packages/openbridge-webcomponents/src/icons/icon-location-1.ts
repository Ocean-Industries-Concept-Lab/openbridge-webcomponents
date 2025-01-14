import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-location-1')
export class ObiLocation1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4384 15H11.7224V9.924V9.42C11.7304 9.22 11.7384 9.016 11.7464 8.808C11.7544 8.6 11.7624 8.412 11.7704 8.244C11.7224 8.308 11.6304 8.4 11.4944 8.52C11.3664 8.64 11.2464 8.748 11.1344 8.844L10.1504 9.636L9.31041 8.58L12.0224 6.432H13.4384V15Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22ZM16.525 14.2625C15.5417 15.7875 14.0333 17.4833 12 19.35C9.96667 17.4833 8.45833 15.7875 7.475 14.2625C6.49167 12.7375 6 11.3833 6 10.2C6 8.38333 6.57917 6.89583 7.7375 5.7375C8.89583 4.57917 10.3167 4 12 4C13.6833 4 15.1042 4.57917 16.2625 5.7375C17.4208 6.89583 18 8.38333 18 10.2C18 11.3833 17.5083 12.7375 16.525 14.2625Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4384 15H11.7224V9.924V9.42C11.7304 9.22 11.7384 9.016 11.7464 8.808C11.7544 8.6 11.7624 8.412 11.7704 8.244C11.7224 8.308 11.6304 8.4 11.4944 8.52C11.3664 8.64 11.2464 8.748 11.1344 8.844L10.1504 9.636L9.31041 8.58L12.0224 6.432H13.4384V15Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22ZM16.525 14.2625C15.5417 15.7875 14.0333 17.4833 12 19.35C9.96667 17.4833 8.45833 15.7875 7.475 14.2625C6.49167 12.7375 6 11.3833 6 10.2C6 8.38333 6.57917 6.89583 7.7375 5.7375C8.89583 4.57917 10.3167 4 12 4C13.6833 4 15.1042 4.57917 16.2625 5.7375C17.4208 6.89583 18 8.38333 18 10.2C18 11.3833 17.5083 12.7375 16.525 14.2625Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-location-1': ObiLocation1;
  }
}