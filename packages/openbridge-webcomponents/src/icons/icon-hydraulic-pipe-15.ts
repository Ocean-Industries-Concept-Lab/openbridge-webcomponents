import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-pipe-15')
export class ObiHydraulicPipe15 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M32 39H27V48H21V39H16V33H32V39Z" fill="currentColor"/>
<path d="M27 0V9H32V15H16V9H21V0H27Z" fill="currentColor"/>
<path d="M32 39H27V48H26V38H31V34H17V38H22V48H21V39H16V33H32V39Z" fill="currentColor"/>
<path d="M22 0V10H17V14H31V10H26V0H27V9H32V15H16V9H21V0H22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 39H27V48H21V39H16V33H32V39Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M27 0V9H32V15H16V9H21V0H27Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M32 39H27V48H26V38H31V34H17V38H22V48H21V39H16V33H32V39Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M22 0V10H17V14H31V10H26V0H27V9H32V15H16V9H21V0H22Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-hydraulic-pipe-15': ObiHydraulicPipe15;
  }
}
