import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-07')
export class ObiHydraulic07 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9786 9.77963L8 1.87534V1H6V1.87534C6 2.14804 6.05577 2.41786 6.16388 2.66821L10.861 12L6.16388 21.3318C6.05577 21.5821 6 21.852 6 22.1247V23H8V22.1247L11.9786 14.2204L14.0211 18.2783L11.6705 19.2455L17 23L18.1439 16.5819L15.8728 17.5164L13.0962 12L15.8728 6.48359L18.1439 7.41806L17 1L11.6705 4.75446L14.0211 5.72168L11.9786 9.77963Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9786 9.77963L8 1.87534V1H6V1.87534C6 2.14804 6.05577 2.41786 6.16388 2.66821L10.861 12L6.16388 21.3318C6.05577 21.5821 6 21.852 6 22.1247V23H8V22.1247L11.9786 14.2204L14.0211 18.2783L11.6705 19.2455L17 23L18.1439 16.5819L15.8728 17.5164L13.0962 12L15.8728 6.48359L18.1439 7.41806L17 1L11.6705 4.75446L14.0211 5.72168L11.9786 9.77963Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-07': ObiHydraulic07;
  }
}
