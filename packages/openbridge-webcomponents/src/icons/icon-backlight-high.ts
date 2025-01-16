import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-backlight-high')
export class ObiBacklightHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16V14H5V16H1ZM6.35 10.75L3.525 7.925L4.925 6.5L7.75 9.35L6.35 10.75ZM7 19V16H17V19H7ZM11 8V3H13V8H11ZM17.65 10.75L16.25 9.35L19.075 6.525L20.5 7.925L17.65 10.75ZM19 16V14H23V16H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16V14H5V16H1ZM6.35 10.75L3.525 7.925L4.925 6.5L7.75 9.35L6.35 10.75ZM7 19V16H17V19H7ZM11 8V3H13V8H11ZM17.65 10.75L16.25 9.35L19.075 6.525L20.5 7.925L17.65 10.75ZM19 16V14H23V16H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-backlight-high': ObiBacklightHigh;
  }
}
