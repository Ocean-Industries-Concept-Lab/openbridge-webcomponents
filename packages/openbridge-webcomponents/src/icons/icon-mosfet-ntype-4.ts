import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-4')
export class ObiMosfetNtype4 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1L13 1V6.25L23 6.25V7.75L13 7.75V16.25L23 16.25V17.75L13 17.75V23L11 23L11 1Z" fill="currentColor"/>
<path d="M5 21L11 17L5 13L5 16.25H1L1 17.75H5L5 21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1L13 1V6.25L23 6.25V7.75L13 7.75V16.25L23 16.25V17.75L13 17.75V23L11 23L11 1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M5 21L11 17L5 13L5 16.25H1L1 17.75H5L5 21Z" style="fill: var(--automation-device-secondary-color)"/>
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
