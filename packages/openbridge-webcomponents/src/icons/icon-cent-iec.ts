import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cent-iec')
export class ObiCentIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 5V1H13V5H11Z" fill="currentColor"/>
<path d="M1 13H5L5 11H1V13Z" fill="currentColor"/>
<path d="M23 13H19V11H23V13Z" fill="currentColor"/>
<path d="M11 23V19H13V23H11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9039 8.09607C14.9635 8.15453 14.0422 8.5436 13.3256 9.26016L9.17154 13.4142L10.5858 14.8285L14.7398 10.6744C15.4564 9.95781 15.8455 9.0365 15.9039 8.09607ZM17.7078 6.29222C15.7061 5.75766 13.4818 6.27557 11.9114 7.84595L6.34312 13.4142L10.5858 17.6569L16.154 12.0886C17.7244 10.5182 18.2423 8.29392 17.7078 6.29222Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 5V1H13V5H11Z" style="fill: var(--element-active-color)"/>
<path d="M1 13H5L5 11H1V13Z" style="fill: var(--element-active-color)"/>
<path d="M23 13H19V11H23V13Z" style="fill: var(--element-active-color)"/>
<path d="M11 23V19H13V23H11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9039 8.09607C14.9635 8.15453 14.0422 8.5436 13.3256 9.26016L9.17154 13.4142L10.5858 14.8285L14.7398 10.6744C15.4564 9.95781 15.8455 9.0365 15.9039 8.09607ZM17.7078 6.29222C15.7061 5.75766 13.4818 6.27557 11.9114 7.84595L6.34312 13.4142L10.5858 17.6569L16.154 12.0886C17.7244 10.5182 18.2423 8.29392 17.7078 6.29222Z" style="fill: var(--element-active-color)"/>
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
    'obi-cent-iec': ObiCentIec;
  }
}
