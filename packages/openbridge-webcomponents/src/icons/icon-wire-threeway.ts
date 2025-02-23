import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-threeway')
export class ObiWireThreeway extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M24 10H0V14H10V24H14V14H24V10Z" fill="currentColor"/>
<path d="M24 11H0V10H24V11Z" fill="currentColor"/>
<path d="M10 14H0V13H11V24H10V14Z" fill="currentColor"/>
<path d="M14 14V24H13V13H24V14H14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 10H0V14H10V24H14V14H24V10Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M24 11H0V10H24V11Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M10 14H0V13H11V24H10V14Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M14 14V24H13V13H24V14H14Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-wire-threeway': ObiWireThreeway;
  }
}
