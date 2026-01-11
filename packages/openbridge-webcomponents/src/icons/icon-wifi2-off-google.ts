import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wifi2-off-google')
export class ObiWifi2OffGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.7764C10.66 15.1164 13.35 15.1164 15 16.7764L12 19.7764L9 16.7764Z" fill="currentColor"/>
<path d="M19.7783 17.7783L18.3643 19.1924L11.8799 12.708C10.1101 12.7379 8.34947 13.4269 7 14.7764L5 12.7764C6.26616 11.5135 7.78986 10.666 9.40137 10.2295L7.16895 7.99707C5.65223 8.61827 4.23135 9.54502 3 10.7764L1 8.77637C2.21507 7.5633 3.58116 6.59345 5.03711 5.86523L2.80762 3.63574L4.22168 2.22168L19.7783 17.7783Z" fill="currentColor"/>
<path d="M15.2578 10.4297C16.6253 10.9035 17.909 11.6853 19 12.7764L18.3018 13.4736L15.2578 10.4297Z" fill="currentColor"/>
<path d="M9.29004 4.46191C14.12 3.61157 19.2726 5.04895 23 8.77637L21 10.7764C18.4848 8.26116 15.1786 7.02235 11.8818 7.05371L9.29004 4.46191Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.7764C10.66 15.1164 13.35 15.1164 15 16.7764L12 19.7764L9 16.7764Z" style="fill: var(--element-active-color)"/>
<path d="M19.7783 17.7783L18.3643 19.1924L11.8799 12.708C10.1101 12.7379 8.34947 13.4269 7 14.7764L5 12.7764C6.26616 11.5135 7.78986 10.666 9.40137 10.2295L7.16895 7.99707C5.65223 8.61827 4.23135 9.54502 3 10.7764L1 8.77637C2.21507 7.5633 3.58116 6.59345 5.03711 5.86523L2.80762 3.63574L4.22168 2.22168L19.7783 17.7783Z" style="fill: var(--element-active-color)"/>
<path d="M15.2578 10.4297C16.6253 10.9035 17.909 11.6853 19 12.7764L18.3018 13.4736L15.2578 10.4297Z" style="fill: var(--element-active-color)"/>
<path d="M9.29004 4.46191C14.12 3.61157 19.2726 5.04895 23 8.77637L21 10.7764C18.4848 8.26116 15.1786 7.02235 11.8818 7.05371L9.29004 4.46191Z" style="fill: var(--element-active-color)"/>
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
    'obi-wifi2-off-google': ObiWifi2OffGoogle;
  }
}
