import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-speed-half-right')
export class ObiSpeedHalfRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0011 17H11.1801L16.1711 12L11.1801 7H14.0011L19.0011 12L14.0011 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00111 17H5.18005L10.1711 12L5.18005 7H8.00114L13.0011 12L8.00111 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0011 17H11.1801L16.1711 12L11.1801 7H14.0011L19.0011 12L14.0011 17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00111 17H5.18005L10.1711 12L5.18005 7H8.00114L13.0011 12L8.00111 17Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-half-right': ObiSpeedHalfRight;
  }
}
