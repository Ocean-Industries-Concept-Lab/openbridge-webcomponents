import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-relativemotion')
export class Obi07Relativemotion extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.27344 12.2363H5.85938C6.43359 12.2363 6.85742 12.1406 7.13086 11.9492C7.4043 11.7578 7.54102 11.457 7.54102 11.0469C7.54102 10.6406 7.40039 10.3516 7.11914 10.1797C6.8418 10.0078 6.41016 9.92188 5.82422 9.92188H5.27344V12.2363ZM5.27344 13.7129V17H3.45703V8.43359H5.95312C7.11719 8.43359 7.97852 8.64648 8.53711 9.07227C9.0957 9.49414 9.375 10.1367 9.375 11C9.375 11.5039 9.23633 11.9531 8.95898 12.3477C8.68164 12.7383 8.28906 13.0449 7.78125 13.2676C9.07031 15.1934 9.91016 16.4375 10.3008 17H8.28516L6.24023 13.7129H5.27344Z" fill="currentColor"/>
<path d="M15.0059 17L12.9434 10.2793H12.8906C12.9648 11.6465 13.002 12.5586 13.002 13.0156V17H11.3789V8.43359H13.8516L15.8789 14.9844H15.9141L18.0645 8.43359H20.5371V17H18.8438V12.9453C18.8438 12.7539 18.8457 12.5332 18.8496 12.2832C18.8574 12.0332 18.8848 11.3691 18.9316 10.291H18.8789L16.6699 17H15.0059Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.27344 12.2363H5.85938C6.43359 12.2363 6.85742 12.1406 7.13086 11.9492C7.4043 11.7578 7.54102 11.457 7.54102 11.0469C7.54102 10.6406 7.40039 10.3516 7.11914 10.1797C6.8418 10.0078 6.41016 9.92188 5.82422 9.92188H5.27344V12.2363ZM5.27344 13.7129V17H3.45703V8.43359H5.95312C7.11719 8.43359 7.97852 8.64648 8.53711 9.07227C9.0957 9.49414 9.375 10.1367 9.375 11C9.375 11.5039 9.23633 11.9531 8.95898 12.3477C8.68164 12.7383 8.28906 13.0449 7.78125 13.2676C9.07031 15.1934 9.91016 16.4375 10.3008 17H8.28516L6.24023 13.7129H5.27344Z" style="fill: var(--element-active-color)"/>
<path d="M15.0059 17L12.9434 10.2793H12.8906C12.9648 11.6465 13.002 12.5586 13.002 13.0156V17H11.3789V8.43359H13.8516L15.8789 14.9844H15.9141L18.0645 8.43359H20.5371V17H18.8438V12.9453C18.8438 12.7539 18.8457 12.5332 18.8496 12.2832C18.8574 12.0332 18.8848 11.3691 18.9316 10.291H18.8789L16.6699 17H15.0059Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-07-relativemotion': Obi07Relativemotion;
  }
}
