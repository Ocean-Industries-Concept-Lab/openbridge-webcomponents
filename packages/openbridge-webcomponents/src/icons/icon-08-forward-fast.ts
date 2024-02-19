import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-forward-fast')
export class Obi08ForwardFast extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5526 18.9562L14.5526 5.04375L23.2022 12L14.5526 18.9562ZM3.5 18.9562L3.5 5.04375L12.1495 12L3.5 18.9562Z" fill="currentColor" stroke="black"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5526 18.9562L14.5526 5.04375L23.2022 12L14.5526 18.9562ZM3.5 18.9562L3.5 5.04375L12.1495 12L3.5 18.9562Z" style="fill: var(--automation-device-primary-color)" stroke="black"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-08-forward-fast': Obi08ForwardFast;
  }
}
