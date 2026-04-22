import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-connection-off')
export class ObiConnectionOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.30078 1.97363L21.7002 20.374L20.2754 21.7734L18.502 20H18.5V19.998L15.5 16.998V20H13.5V14.998L10.5 11.998V20H8.5V10H8.50195L1.90039 3.39844L3.30078 1.97363Z" fill="currentColor"/>
<path d="M5.5 20H3.5V13H5.5V20Z" fill="currentColor"/>
<path d="M20.5 17.0518L18.5 15.0518V4H20.5V17.0518Z" fill="currentColor"/>
<path d="M15.5 12.0518L13.5 10.0508V7H15.5V12.0518Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.30078 1.97363L21.7002 20.374L20.2754 21.7734L18.502 20H18.5V19.998L15.5 16.998V20H13.5V14.998L10.5 11.998V20H8.5V10H8.50195L1.90039 3.39844L3.30078 1.97363Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 20H3.5V13H5.5V20Z" style="fill: var(--element-active-color)"/>
<path d="M20.5 17.0518L18.5 15.0518V4H20.5V17.0518Z" style="fill: var(--element-active-color)"/>
<path d="M15.5 12.0518L13.5 10.0508V7H15.5V12.0518Z" style="fill: var(--element-active-color)"/>
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
    'obi-connection-off': ObiConnectionOff;
  }
}
