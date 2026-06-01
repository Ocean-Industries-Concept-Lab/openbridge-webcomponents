import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electric-motor-dc')
export class ObiElectricMotorDc extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8032 14L7.96565 5.26471H7.90225C7.91281 5.47012 7.92867 5.77311 7.9498 6.17367C7.97094 6.56396 7.99207 6.9902 8.01321 7.45238C8.03435 7.90429 8.04491 8.3254 8.04491 8.71569V14H6V3H9.13871L11.897 11.4734H11.9445L14.8771 3H18V14H15.86V8.62325C15.86 8.26377 15.8653 7.86835 15.8758 7.43698C15.897 6.99533 15.9128 6.57937 15.9234 6.18908C15.9445 5.78852 15.9604 5.48553 15.9709 5.28011H15.9075L12.8956 14H10.8032Z" fill="currentColor"/>
<path d="M18 18V20H6V18H18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8032 14L7.96565 5.26471H7.90225C7.91281 5.47012 7.92867 5.77311 7.9498 6.17367C7.97094 6.56396 7.99207 6.9902 8.01321 7.45238C8.03435 7.90429 8.04491 8.3254 8.04491 8.71569V14H6V3H9.13871L11.897 11.4734H11.9445L14.8771 3H18V14H15.86V8.62325C15.86 8.26377 15.8653 7.86835 15.8758 7.43698C15.897 6.99533 15.9128 6.57937 15.9234 6.18908C15.9445 5.78852 15.9604 5.48553 15.9709 5.28011H15.9075L12.8956 14H10.8032Z" style="fill: var(--element-active-color)"/>
<path d="M18 18V20H6V18H18Z" style="fill: var(--element-active-color)"/>
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
    'obi-electric-motor-dc': ObiElectricMotorDc;
  }
}
