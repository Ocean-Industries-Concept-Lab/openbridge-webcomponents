import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-chart-four-shades-proposal')
export class ObiChartFourShadesProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21 19H3V17H21V19Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M11 15H3V13H11V15Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M21 15L13 15V13L21 13V15Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M5 7H3V5H5V7Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M7 11H3V9H7V11Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M9 7H7V5H9V7Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M15 11H9V9H15V11Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M13 7H11V5H13V7Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M17 7H15V5H17V7Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M21 11H17V9H21V11Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M21 7H19V5H21V7Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 19H3V17H21V19Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M11 15H3V13H11V15Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M21 15L13 15V13L21 13V15Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M5 7H3V5H5V7Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M7 11H3V9H7V11Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M9 7H7V5H9V7Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M15 11H9V9H15V11Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M13 7H11V5H13V7Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M17 7H15V5H17V7Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M21 11H17V9H21V11Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M21 7H19V5H21V7Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
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
    'obi-chart-four-shades-proposal': ObiChartFourShadesProposal;
  }
}
