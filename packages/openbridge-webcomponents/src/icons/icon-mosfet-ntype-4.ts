import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-4')
export class ObiMosfetNtype4 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1H13V6.25H23V7.75H13V16.25L23 16.25V17.75L13 17.75V23H11V1Z" fill="currentColor"/>
<path d="M5 21L11 17L5 13V16.25H1V17.75H5V21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1H13V6.25H23V7.75H13V16.25L23 16.25V17.75L13 17.75V23H11V1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M5 21L11 17L5 13V16.25H1V17.75H5V21Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ntype-4': ObiMosfetNtype4;
  }
}
