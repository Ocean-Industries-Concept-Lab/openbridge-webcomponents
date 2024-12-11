import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-threeway')
export class ObiPipeThreeway extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M24 9H0V15H9V24H15V15H24V9Z" fill="currentColor"/>
<path d="M24 10H0V9H24V10Z" fill="currentColor"/>
<path d="M9 15H0V14H10V24H9V15Z" fill="currentColor"/>
<path d="M15 15V24H14V14H24V15H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 9H0V15H9V24H15V15H24V9Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M24 10H0V9H24V10Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M9 15H0V14H10V24H9V15Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M15 15V24H14V14H24V15H15Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-pipe-threeway': ObiPipeThreeway;
  }
}
