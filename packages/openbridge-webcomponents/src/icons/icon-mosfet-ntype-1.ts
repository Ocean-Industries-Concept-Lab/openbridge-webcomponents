import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-1')
export class ObiMosfetNtype1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25Z" fill="currentColor"/>
<path d="M9 1L11 1V3.25L23 3.25V4.75L11 4.75L11 19.25L23 19.25V20.75L11 20.75V23H9L9 1Z" fill="currentColor"/>
<path d="M18 8L12 12L18 16V12.75H23L23 11.25H18V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M9 1L11 1V3.25L23 3.25V4.75L11 4.75L11 19.25L23 19.25V20.75L11 20.75V23H9L9 1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M18 8L12 12L18 16V12.75H23L23 11.25H18V8Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ntype-1': ObiMosfetNtype1;
  }
}