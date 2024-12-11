import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-coming-from')
export class ObiWireComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0133 9.99982L1.78814e-07 9.99982L0 13.9998H8L13.3492 18.5849C13.9979 19.1409 15 18.68 15 17.8256L15 6.17674C15 5.32194 13.997 4.86119 13.3485 5.41809L8.0133 9.99982Z" fill="currentColor"/>
<path d="M14 17.8256L14 6.17674L8.38375 10.9998L0 10.9998V9.99988L8.0133 9.99982L13.3485 5.41809C13.997 4.86119 15 5.32194 15 6.17674L15 17.8256C15 18.68 13.9979 19.1409 13.3492 18.5849L8 13.9998H0V12.9998H8.36992L14 17.8256Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0133 9.99982L1.78814e-07 9.99982L0 13.9998H8L13.3492 18.5849C13.9979 19.1409 15 18.68 15 17.8256L15 6.17674C15 5.32194 13.997 4.86119 13.3485 5.41809L8.0133 9.99982Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M14 17.8256L14 6.17674L8.38375 10.9998L0 10.9998V9.99988L8.0133 9.99982L13.3485 5.41809C13.997 4.86119 15 5.32194 15 6.17674L15 17.8256C15 18.68 13.9979 19.1409 13.3492 18.5849L8 13.9998H0V12.9998H8.36992L14 17.8256Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-wire-coming-from': ObiWireComingFrom;
  }
}