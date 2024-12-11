import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-cross')
export class ObiDuctCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2.77893V0H6V2.77893C4.71535 3.61654 3.61654 4.71535 2.77893 6H0V18H2.77893C3.61654 19.2847 4.71535 20.3835 6 21.2211V24H18V21.2211C19.2847 20.3835 20.3835 19.2847 21.2211 18H24V6H21.2211C20.3835 4.71535 19.2847 3.61654 18 2.77893Z" fill="currentColor"/>
<path d="M2.77893 6C3.61654 4.71535 4.71535 3.61654 6 2.77893V0H7V1V3.3207L6.54617 3.6166C5.37788 4.37835 4.37835 5.37788 3.6166 6.54617L3.3207 7H1H0V6H2.77893Z" fill="currentColor"/>
<path d="M6 21.2211C4.71535 20.3835 3.61654 19.2847 2.77893 18H0V17H1H3.3207L3.6166 17.4538C4.37835 18.6221 5.37788 19.6217 6.54617 20.3834L7 20.6793V23V24H6V21.2211Z" fill="currentColor"/>
<path d="M21.2211 18C20.3835 19.2847 19.2847 20.3835 18 21.2211V24H17V23V20.6793L17.4538 20.3834C18.6221 19.6217 19.6217 18.6221 20.3834 17.4538L20.6793 17H23H24V18H21.2211Z" fill="currentColor"/>
<path d="M18 2.77893C19.2847 3.61654 20.3835 4.71535 21.2211 6H24V7H23H20.6793L20.3834 6.54617C19.6217 5.37788 18.6221 4.37835 17.4538 3.6166L17 3.3207V1V0H18V2.77893Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2.77893V0H6V2.77893C4.71535 3.61654 3.61654 4.71535 2.77893 6H0V18H2.77893C3.61654 19.2847 4.71535 20.3835 6 21.2211V24H18V21.2211C19.2847 20.3835 20.3835 19.2847 21.2211 18H24V6H21.2211C20.3835 4.71535 19.2847 3.61654 18 2.77893Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M2.77893 6C3.61654 4.71535 4.71535 3.61654 6 2.77893V0H7V1V3.3207L6.54617 3.6166C5.37788 4.37835 4.37835 5.37788 3.6166 6.54617L3.3207 7H1H0V6H2.77893Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M6 21.2211C4.71535 20.3835 3.61654 19.2847 2.77893 18H0V17H1H3.3207L3.6166 17.4538C4.37835 18.6221 5.37788 19.6217 6.54617 20.3834L7 20.6793V23V24H6V21.2211Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M21.2211 18C20.3835 19.2847 19.2847 20.3835 18 21.2211V24H17V23V20.6793L17.4538 20.3834C18.6221 19.6217 19.6217 18.6221 20.3834 17.4538L20.6793 17H23H24V18H21.2211Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M18 2.77893C19.2847 3.61654 20.3835 4.71535 21.2211 6H24V7H23H20.6793L20.3834 6.54617C19.6217 5.37788 18.6221 4.37835 17.4538 3.6166L17 3.3207V1V0H18V2.77893Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-duct-cross': ObiDuctCross;
  }
}
