import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-straight')
export class ObiDuctStraight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0 6H24V18H0V6Z" fill="currentColor"/>
<path d="M24 7H0V6H24V7Z" fill="currentColor"/>
<path d="M0 17H24V18H0V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 6H24V18H0V6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M24 7H0V6H24V7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M0 17H24V18H0V17Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-duct-straight': ObiDuctStraight;
  }
}