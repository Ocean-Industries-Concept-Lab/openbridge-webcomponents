import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-overlap')
export class ObiWireOverlap extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14 0H10V24H14V0Z" fill="currentColor"/>
<path d="M0 10H8V14H0V10Z" fill="currentColor"/>
<path d="M16 10H24V14H16V10Z" fill="currentColor"/>
<path d="M11 24V0H10V24H11Z" fill="currentColor"/>
<path d="M13 0V24H14V0H13Z" fill="currentColor"/>
<path d="M8 11H0V10H8V11Z" fill="currentColor"/>
<path d="M0 13H8V14H0V13Z" fill="currentColor"/>
<path d="M24 11H16V10H24V11Z" fill="currentColor"/>
<path d="M16 13H24V14H16V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 0H10V24H14V0Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M0 10H8V14H0V10Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M16 10H24V14H16V10Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M11 24V0H10V24H11Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M13 0V24H14V0H13Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M8 11H0V10H8V11Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M0 13H8V14H0V13Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M24 11H16V10H24V11Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M16 13H24V14H16V13Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-wire-overlap': ObiWireOverlap;
  }
}
