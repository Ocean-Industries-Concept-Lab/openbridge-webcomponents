import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-1')
export class ObiMosfetNtype1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1V19.75H6.25V5H4.75V18.25Z" fill="currentColor"/>
<path d="M9 1H11V3.25H23V4.75H11V19.25H23V20.75H11V23H9V1Z" fill="currentColor"/>
<path d="M18 8L12 12L18 16V12.75H23V11.25H18V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 18.25H1V19.75H6.25V5H4.75V18.25Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M9 1H11V3.25H23V4.75H11V19.25H23V20.75H11V23H9V1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M18 8L12 12L18 16V12.75H23V11.25H18V8Z" style="fill: var(--automation-device-secondary-color)"/>
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