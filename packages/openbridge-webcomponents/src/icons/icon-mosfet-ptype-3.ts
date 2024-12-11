import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-3')
export class ObiMosfetPtype3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 1L9 1L9 23H11V19.75L23 19.75V18.25L11 18.25L11 12.75H13V16L17.875 12.75H20.75L20.75 5.75H23V4.25L11 4.25V1ZM17.875 11.25H19.25V5.75L11 5.75L11 11.25H13V8L17.875 11.25Z" fill="currentColor"/>
<path d="M1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 5.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 1L9 1L9 23H11V19.75L23 19.75V18.25L11 18.25L11 12.75H13V16L17.875 12.75H20.75L20.75 5.75H23V4.25L11 4.25V1ZM17.875 11.25H19.25V5.75L11 5.75L11 11.25H13V8L17.875 11.25Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ptype-3': ObiMosfetPtype3;
  }
}