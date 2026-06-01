import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-pipe-16')
export class ObiHydraulicPipe16 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 39H15V48H9V39H4V33H20V39Z" fill="currentColor"/>
<path d="M44 39H39V48H33V39H28V33H44V39Z" fill="currentColor"/>
<path d="M15 9H20V15H4V9H9V0H15V9Z" fill="currentColor"/>
<path d="M39 0V9H44V15H28V9H33V0H39Z" fill="currentColor"/>
<path d="M20 39H15V48H14V38H19V34H5V38H10V48H9V39H4V33H20V39Z" fill="currentColor"/>
<path d="M44 39H39V48H38V38H43V34H29V38H34V48H33V39H28V33H44V39Z" fill="currentColor"/>
<path d="M10 10H5V14H19V10H14V0H15V9H20V15H4V9H9V0H10V10Z" fill="currentColor"/>
<path d="M34 0V10H29V14H43V10H38V0H39V9H44V15H28V9H33V0H34Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 39H15V48H9V39H4V33H20V39Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M44 39H39V48H33V39H28V33H44V39Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M15 9H20V15H4V9H9V0H15V9Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M39 0V9H44V15H28V9H33V0H39Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M20 39H15V48H14V38H19V34H5V38H10V48H9V39H4V33H20V39Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M44 39H39V48H38V38H43V34H29V38H34V48H33V39H28V33H44V39Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M10 10H5V14H19V10H14V0H15V9H20V15H4V9H9V0H10V10Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M34 0V10H29V14H43V10H38V0H39V9H44V15H28V9H33V0H34Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-hydraulic-pipe-16': ObiHydraulicPipe16;
  }
}
