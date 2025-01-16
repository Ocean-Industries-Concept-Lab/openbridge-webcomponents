import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-sar-vessel-iec')
export class ObiAisSarVesselIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1L5 21H19L12 1ZM11.9999 7.0542L10.5435 11.2155C11.0043 11.0754 11.4934 11 12 11C12.5066 11 12.9955 11.0753 13.4563 11.2154L11.9999 7.0542ZM14.4528 19.1599C13.7755 19.6865 12.9244 20 12 20C11.0757 20 10.2246 19.6865 9.54726 19.16L12.0001 16.7072L14.4528 19.1599ZM15.1599 18.4528L12.7072 16.0001L15.16 13.5473C15.6865 14.2246 16 15.0757 16 16C16 16.9244 15.6865 17.7755 15.1599 18.4528ZM14.4529 12.8401L12.0001 15.293L9.54718 12.8401C10.2245 12.3135 11.0756 12 12 12C12.9244 12 13.7756 12.3136 14.4529 12.8401ZM8.84007 13.5472C8.31354 14.2245 8 15.0756 8 16C8 16.9244 8.31357 17.7756 8.84014 18.4529L11.293 16.0001L8.84007 13.5472Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1L5 21H19L12 1ZM11.9999 7.0542L10.5435 11.2155C11.0043 11.0754 11.4934 11 12 11C12.5066 11 12.9955 11.0753 13.4563 11.2154L11.9999 7.0542ZM14.4528 19.1599C13.7755 19.6865 12.9244 20 12 20C11.0757 20 10.2246 19.6865 9.54726 19.16L12.0001 16.7072L14.4528 19.1599ZM15.1599 18.4528L12.7072 16.0001L15.16 13.5473C15.6865 14.2246 16 15.0757 16 16C16 16.9244 15.6865 17.7755 15.1599 18.4528ZM14.4529 12.8401L12.0001 15.293L9.54718 12.8401C10.2245 12.3135 11.0756 12 12 12C12.9244 12 13.7756 12.3136 14.4529 12.8401ZM8.84007 13.5472C8.31354 14.2245 8 15.0756 8 16C8 16.9244 8.31357 17.7756 8.84014 18.4529L11.293 16.0001L8.84007 13.5472Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-sar-vessel-iec': ObiAisSarVesselIec;
  }
}
