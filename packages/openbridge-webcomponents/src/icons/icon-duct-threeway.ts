import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-threeway')
export class ObiDuctThreeway extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M24 6H0V18H6V24H18V18H24V6Z" fill="currentColor"/>
<path d="M24 7H0V6H24V7Z" fill="currentColor"/>
<path d="M6 18H0V17H7V24H6V18Z" fill="currentColor"/>
<path d="M18 18V24H17V17H24V18H18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 6H0V18H6V24H18V18H24V6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M24 7H0V6H24V7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M6 18H0V17H7V24H6V18Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M18 18V24H17V17H24V18H18Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-duct-threeway': ObiDuctThreeway;
  }
}