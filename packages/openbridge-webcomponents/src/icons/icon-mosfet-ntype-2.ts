import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-2')
export class ObiMosfetNtype2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 9H11V15H9V9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1V19.75H6.25V5H4.75V18.25Z" fill="currentColor"/>
<path d="M11 1H9V6H11V4.75H23V3.25H11V1Z" fill="currentColor"/>
<path d="M12 12L18 8V11.25H21.25V19.25H23V20.75H11V23H9V18H11V19.25H19.75V12.75H18V16L12 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 9H11V15H9V9Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1V19.75H6.25V5H4.75V18.25Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M11 1H9V6H11V4.75H23V3.25H11V1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M12 12L18 8V11.25H21.25V19.25H23V20.75H11V23H9V18H11V19.25H19.75V12.75H18V16L12 12Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ntype-2': ObiMosfetNtype2;
  }
}
