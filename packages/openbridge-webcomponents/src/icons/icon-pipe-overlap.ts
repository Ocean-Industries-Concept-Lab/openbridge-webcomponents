import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-overlap')
export class ObiPipeOverlap extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0H9V24H15V0Z" fill="currentColor"/>
<path d="M0 9H7V15H0V9Z" fill="currentColor"/>
<path d="M17 9H24V15H17V9Z" fill="currentColor"/>
<path d="M10 24V0H9V24H10Z" fill="currentColor"/>
<path d="M14 0V24H15V0H14Z" fill="currentColor"/>
<path d="M7 10H0V9H7L7 10Z" fill="currentColor"/>
<path d="M0 14H7L7 15H0V14Z" fill="currentColor"/>
<path d="M24 10H17V9H24V10Z" fill="currentColor"/>
<path d="M17 14H24V15H17V14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0H9V24H15V0Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M0 9H7V15H0V9Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M17 9H24V15H17V9Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M10 24V0H9V24H10Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M14 0V24H15V0H14Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M7 10H0V9H7L7 10Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M0 14H7L7 15H0V14Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M24 10H17V9H24V10Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M17 14H24V15H17V14Z" style="fill: var(--automation-pipes-tertiary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-pipe-overlap': ObiPipeOverlap;
  }
}