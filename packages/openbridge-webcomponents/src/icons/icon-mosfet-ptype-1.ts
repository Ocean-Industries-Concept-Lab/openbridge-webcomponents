import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-1')
export class ObiMosfetPtype1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1L11 1V3.25L23 3.25V4.75L11 4.75L11 11.25H17V8L23 12L17 16V12.75H11L11 19.25L23 19.25V20.75L11 20.75V23H9L9 1Z" fill="currentColor"/>
<path d="M1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 5.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1L11 1V3.25L23 3.25V4.75L11 4.75L11 11.25H17V8L23 12L17 16V12.75H11L11 19.25L23 19.25V20.75L11 20.75V23H9L9 1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 5.75Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ptype-1': ObiMosfetPtype1;
  }
}