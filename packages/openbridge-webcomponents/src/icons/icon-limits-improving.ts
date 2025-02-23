import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-limits-improving')
export class ObiLimitsImproving extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 21V19H3V21H5Z" fill="currentColor"/>
<path d="M21 19H19V21H21V19Z" fill="currentColor"/>
<path d="M17 19H15V21H17V19Z" fill="currentColor"/>
<path d="M13 19H11V21H13V19Z" fill="currentColor"/>
<path d="M9 21H7V19H9V21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 16.4141L17.7072 10.707L16.293 9.29274L13.0001 12.5856V3.99985H11.0001V12.5856L7.70718 9.29274L6.29297 10.707L12.0001 16.4141Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 21V19H3V21H5Z" style="fill: var(--element-active-color)"/>
<path d="M21 19H19V21H21V19Z" style="fill: var(--element-active-color)"/>
<path d="M17 19H15V21H17V19Z" style="fill: var(--element-active-color)"/>
<path d="M13 19H11V21H13V19Z" style="fill: var(--element-active-color)"/>
<path d="M9 21H7V19H9V21Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 16.4141L17.7072 10.707L16.293 9.29274L13.0001 12.5856V3.99985H11.0001V12.5856L7.70718 9.29274L6.29297 10.707L12.0001 16.4141Z" style="fill: var(--element-active-color)"/>
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
    'obi-limits-improving': ObiLimitsImproving;
  }
}
