import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wind')
export class ObiWind extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13V4L16 5V12L12 13Z" fill="currentColor"/>
<path d="M22 9L18 11V5L22 4V9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H2V22H4V11.5L10 13V3.5L6 2.5L4 2.75V2ZM4 4.76556V9.43845L6 9.93845V4.5L4 4.76556Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13V4L16 5V12L12 13Z" style="fill: var(--element-active-color)"/>
<path d="M22 9L18 11V5L22 4V9Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H2V22H4V11.5L10 13V3.5L6 2.5L4 2.75V2ZM4 4.76556V9.43845L6 9.93845V4.5L4 4.76556Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind': ObiWind;
  }
}
