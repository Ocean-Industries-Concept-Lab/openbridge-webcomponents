import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-connector-corner')
export class Obi09ConnectorCorner extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20146_393638)">
<path d="M16.5 11.5L15 11.5C14.9951 11.5 14.9902 11.5 14.9853 11.5C13.0826 11.5079 11.5382 13.0339 11.5007 14.9294C11.5002 14.9529 11.5 14.9764 11.5 15V16.5L12.5 16.5L12.5 15C12.5 13.6355 13.5932 12.5263 14.9516 12.5005C14.9677 12.5002 14.9838 12.5 15 12.5L16.5 12.5V11.5Z" fill="currentColor"/>
<path d="M24 11.5H22.5V12.5L24 12.5V11.5Z" fill="currentColor"/>
<path d="M21 11.5H18V12.5L21 12.5V11.5Z" fill="currentColor"/>
<path d="M11.5 18V21H12.5L12.5 18H11.5Z" fill="currentColor"/>
<path d="M11.5 22.5V24H12.5V22.5H11.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_20146_393638">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20146_393638)">
<path d="M16.5 11.5L15 11.5C14.9951 11.5 14.9902 11.5 14.9853 11.5C13.0826 11.5079 11.5382 13.0339 11.5007 14.9294C11.5002 14.9529 11.5 14.9764 11.5 15V16.5L12.5 16.5L12.5 15C12.5 13.6355 13.5932 12.5263 14.9516 12.5005C14.9677 12.5002 14.9838 12.5 15 12.5L16.5 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M24 11.5H22.5V12.5L24 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M21 11.5H18V12.5L21 12.5V11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 18V21H12.5L12.5 18H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 22.5V24H12.5V22.5H11.5Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_20146_393638">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-09-connector-corner': Obi09ConnectorCorner;
  }
}
