import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-straight')
export class ObiPipeStraight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0 9H24V15H0V9Z" fill="currentColor"/>
<path d="M24 10H0V9H24V10Z" fill="currentColor"/>
<path d="M0 14H24V15H0V14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 9H24V15H0V9Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M24 10H0V9H24V10Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M0 14H24V15H0V14Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-pipe-straight': ObiPipeStraight;
  }
}
