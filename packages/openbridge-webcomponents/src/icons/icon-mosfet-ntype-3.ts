import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-3')
export class ObiMosfetNtype3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25Z" fill="currentColor"/>
<path d="M9 1L11 1V4.25L23 4.25V5.75L11 5.75L11 18.25L19.75 18.25V12.75H18V16L12 12L18 8V11.25H21.25L21.25 18.25H23V19.75L11 19.75V23H9L9 1Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M9 1L11 1V4.25L23 4.25V5.75L11 5.75L11 18.25L19.75 18.25V12.75H18V16L12 12L18 8V11.25H21.25L21.25 18.25H23V19.75L11 19.75V23H9L9 1Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ntype-3': ObiMosfetNtype3;
  }
}