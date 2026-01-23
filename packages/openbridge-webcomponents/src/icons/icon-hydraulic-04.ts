import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-04')
export class ObiHydraulic04 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 15V17H15.5V23H17.5V17H19.5V15H13.5Z" fill="currentColor"/>
<path d="M8.49223 22.9863L8.49223 6.99988H11.5L7.5 0.999878L3.5 6.99988H6.49223L6.49223 22.9863H8.49223Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 15V17H15.5V23H17.5V17H19.5V15H13.5Z" style="fill: var(--element-active-color)"/>
<path d="M8.49223 22.9863L8.49223 6.99988H11.5L7.5 0.999878L3.5 6.99988H6.49223L6.49223 22.9863H8.49223Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-04': ObiHydraulic04;
  }
}
