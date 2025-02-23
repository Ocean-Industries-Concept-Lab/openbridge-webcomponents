import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-coming-from')
export class ObiWireComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0133 9.99994L1.78814e-07 9.99995L0 13.9999H8L13.3492 18.585C13.9979 19.141 15 18.6801 15 17.8257L15 6.17686C15 5.32207 13.997 4.86131 13.3485 5.41822L8.0133 9.99994Z" fill="currentColor"/>
<path d="M14 17.8257L14 6.17686L8.38375 10.9999L0 10.9999V10L8.0133 9.99994L13.3485 5.41822C13.997 4.86131 15 5.32207 15 6.17686L15 17.8257C15 18.6801 13.9979 19.141 13.3492 18.585L8 13.9999H0V12.9999H8.36992L14 17.8257Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0133 9.99994L1.78814e-07 9.99995L0 13.9999H8L13.3492 18.585C13.9979 19.141 15 18.6801 15 17.8257L15 6.17686C15 5.32207 13.997 4.86131 13.3485 5.41822L8.0133 9.99994Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M14 17.8257L14 6.17686L8.38375 10.9999L0 10.9999V10L8.0133 9.99994L13.3485 5.41822C13.997 4.86131 15 5.32207 15 6.17686L15 17.8257C15 18.6801 13.9979 19.141 13.3492 18.585L8 13.9999H0V12.9999H8.36992L14 17.8257Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-wire-coming-from': ObiWireComingFrom;
  }
}
