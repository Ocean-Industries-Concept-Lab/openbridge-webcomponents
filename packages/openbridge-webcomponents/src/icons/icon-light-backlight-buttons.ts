import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-backlight-buttons')
export class ObiLightBacklightButtons extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1 15V13H5V15H1ZM6.35 9.75L3.525 6.925L4.925 5.5L7.75 8.35L6.35 9.75ZM7 18V15H17V18H7ZM11 7V3H13V7H11ZM17.65 9.75L16.25 8.35L19.075 5.525L20.5 6.925L17.65 9.75ZM19 15V13H23V15H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 15V13H5V15H1ZM6.35 9.75L3.525 6.925L4.925 5.5L7.75 8.35L6.35 9.75ZM7 18V15H17V18H7ZM11 7V3H13V7H11ZM17.65 9.75L16.25 8.35L19.075 5.525L20.5 6.925L17.65 9.75ZM19 15V13H23V15H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-backlight-buttons': ObiLightBacklightButtons;
  }
}
