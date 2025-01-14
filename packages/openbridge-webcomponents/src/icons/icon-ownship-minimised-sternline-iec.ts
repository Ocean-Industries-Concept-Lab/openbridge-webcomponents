import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ownship-minimised-sternline-iec')
export class ObiOwnshipMinimisedSternlineIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2862_786)">
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.5H0V11.5H9V12.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 9V0L12.5 4.37121e-08V9H11.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 16.125V15H12.5V16.125H11.5ZM11.5 20.625V18.375H12.5V20.625H11.5ZM11.5 24V22.875H12.5V24H11.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12.5H15V11.5H24V12.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2862_786">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2862_786)">
<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.5H0V11.5H9V12.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 9V0L12.5 4.37121e-08V9H11.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 16.125V15H12.5V16.125H11.5ZM11.5 20.625V18.375H12.5V20.625H11.5ZM11.5 24V22.875H12.5V24H11.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12.5H15V11.5H24V12.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2862_786">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-ownship-minimised-sternline-iec': ObiOwnshipMinimisedSternlineIec;
  }
}