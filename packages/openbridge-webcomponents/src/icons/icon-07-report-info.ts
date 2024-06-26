import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-report-info')
export class Obi07ReportInfo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 2H8V6H6V2Z" fill="currentColor"/>
<path d="M6 8H2V6H6V8Z" fill="currentColor"/>
<path d="M8 8V12H6V8H8Z" fill="currentColor"/>
<path d="M8 8H12V6H8V8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 10H20C21.1 10 22 10.9 22 12V18C22 19.1 21.1 20 20 20H15L11 22V12C11 10.9 11.9 10 13 10ZM14.67 18H20V12H13V18.67L14.67 18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 12V15.5H15.5V12H13V18.67L14.67 18H20V12H17ZM15.5 16.5H17V18H15.5V16.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 2H8V6H6V2Z" style="fill: var(--element-active-color)"/>
<path d="M6 8H2V6H6V8Z" style="fill: var(--element-active-color)"/>
<path d="M8 8V12H6V8H8Z" style="fill: var(--element-active-color)"/>
<path d="M8 8H12V6H8V8Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 10H20C21.1 10 22 10.9 22 12V18C22 19.1 21.1 20 20 20H15L11 22V12C11 10.9 11.9 10 13 10ZM14.67 18H20V12H13V18.67L14.67 18Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 12V15.5H15.5V12H13V18.67L14.67 18H20V12H17ZM15.5 16.5H17V18H15.5V16.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-report-info': Obi07ReportInfo;
  }
}
