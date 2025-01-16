import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motion-tm-reset-proposal-1')
export class ObiMotionTmResetProposal1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 9V3H5V6.35C5.83333 5.31667 6.85417 4.5 8.0625 3.9C9.27083 3.3 10.5833 3 12 3C13.9667 3 15.7208 3.55833 17.2625 4.675C18.8042 5.79167 19.8833 7.23333 20.5 9H18.325C17.7583 7.8 16.9167 6.83333 15.8 6.1C14.6833 5.36667 13.4167 5 12 5C11.05 5 10.1542 5.175 9.3125 5.525C8.47083 5.875 7.73333 6.36667 7.1 7H9V9H3Z" fill="currentColor"/>
<path d="M7.22579 20.9999H5.49779V13.8839H3.13379V12.4319H9.58979V13.8839H7.22579V20.9999Z" fill="currentColor"/>
<path d="M14.5479 20.9999L12.3999 14.1959H12.3519C12.3599 14.3559 12.3719 14.5919 12.3879 14.9039C12.4039 15.2079 12.4199 15.5399 12.4359 15.8999C12.4519 16.2519 12.4599 16.5799 12.4599 16.8839V20.9999H10.9119V12.4319H13.2879L15.3759 19.0319H15.4119L17.6319 12.4319H19.9959V20.9999H18.3759V16.8119C18.3759 16.5319 18.3799 16.2239 18.3879 15.8879C18.4039 15.5439 18.4159 15.2199 18.4239 14.9159C18.4399 14.6039 18.4519 14.3679 18.4599 14.2079H18.4119L16.1319 20.9999H14.5479Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 9V3H5V6.35C5.83333 5.31667 6.85417 4.5 8.0625 3.9C9.27083 3.3 10.5833 3 12 3C13.9667 3 15.7208 3.55833 17.2625 4.675C18.8042 5.79167 19.8833 7.23333 20.5 9H18.325C17.7583 7.8 16.9167 6.83333 15.8 6.1C14.6833 5.36667 13.4167 5 12 5C11.05 5 10.1542 5.175 9.3125 5.525C8.47083 5.875 7.73333 6.36667 7.1 7H9V9H3Z" style="fill: var(--element-active-color)"/>
<path d="M7.22579 20.9999H5.49779V13.8839H3.13379V12.4319H9.58979V13.8839H7.22579V20.9999Z" style="fill: var(--element-active-color)"/>
<path d="M14.5479 20.9999L12.3999 14.1959H12.3519C12.3599 14.3559 12.3719 14.5919 12.3879 14.9039C12.4039 15.2079 12.4199 15.5399 12.4359 15.8999C12.4519 16.2519 12.4599 16.5799 12.4599 16.8839V20.9999H10.9119V12.4319H13.2879L15.3759 19.0319H15.4119L17.6319 12.4319H19.9959V20.9999H18.3759V16.8119C18.3759 16.5319 18.3799 16.2239 18.3879 15.8879C18.4039 15.5439 18.4159 15.2199 18.4239 14.9159C18.4399 14.6039 18.4519 14.3679 18.4599 14.2079H18.4119L16.1319 20.9999H14.5479Z" style="fill: var(--element-active-color)"/>
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
    'obi-motion-tm-reset-proposal-1': ObiMotionTmResetProposal1;
  }
}
