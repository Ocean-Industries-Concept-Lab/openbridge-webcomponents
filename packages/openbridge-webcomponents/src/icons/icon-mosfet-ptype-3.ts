import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-3')
export class ObiMosfetPtype3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H9V23H11V19.75H23V18.25H11V12.75H13V16L17.875 12.75H20.75V5.75H23V4.25H11V1ZM17.875 11.25H19.25V5.75H11V11.25H13V8L17.875 11.25Z" fill="currentColor"/>
<path d="M1 5.75H4.75V19H6.25V4.25H1V5.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H9V23H11V19.75H23V18.25H11V12.75H13V16L17.875 12.75H20.75V5.75H23V4.25H11V1ZM17.875 11.25H19.25V5.75H11V11.25H13V8L17.875 11.25Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M1 5.75H4.75V19H6.25V4.25H1V5.75Z" style="fill: var(--automation-device-secondary-color)"/>
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