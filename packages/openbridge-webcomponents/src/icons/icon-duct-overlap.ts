import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-overlap')
export class ObiDuctOverlap extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 0H6V24H18V0Z" fill="currentColor"/>
<path d="M0 6H4V18H0V6Z" fill="currentColor"/>
<path d="M20 6H24V18H20V6Z" fill="currentColor"/>
<path d="M7 24V0H6V24H7Z" fill="currentColor"/>
<path d="M17 0V24H18V0H17Z" fill="currentColor"/>
<path d="M4 7H0V6H4V7Z" fill="currentColor"/>
<path d="M0 17H4V18H0V17Z" fill="currentColor"/>
<path d="M24 7H20V6H24V7Z" fill="currentColor"/>
<path d="M20 17H24V18H20V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 0H6V24H18V0Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M0 6H4V18H0V6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M20 6H24V18H20V6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M7 24V0H6V24H7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M17 0V24H18V0H17Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M4 7H0V6H4V7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M0 17H4V18H0V17Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M24 7H20V6H24V7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M20 17H24V18H20V17Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-duct-overlap': ObiDuctOverlap;
  }
}