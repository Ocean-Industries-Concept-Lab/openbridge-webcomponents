import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-display-brilliance-iec')
export class ObiDisplayBrillianceIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z" fill="currentColor"/>
<path d="M12.75 6V4H11.25V6H12.75Z" fill="currentColor"/>
<path d="M12.75 20V18H11.25V20H12.75Z" fill="currentColor"/>
<path d="M20 12.75H18V11.25H20V12.75Z" fill="currentColor"/>
<path d="M4 12.75H6V11.25H4V12.75Z" fill="currentColor"/>
<path d="M6.87342 5.81359L8.28788 7.22756L7.22722 8.28822L5.81252 6.874L6.87342 5.81359Z" fill="currentColor"/>
<path d="M16.7727 15.7128L15.712 16.7735L17.1262 18.1877L18.1874 17.1271L16.7727 15.7128Z" fill="currentColor"/>
<path d="M18.1876 6.87318L16.7734 8.28739L15.7128 7.22673L17.127 5.81252L18.1876 6.87318Z" fill="currentColor"/>
<path d="M6.87392 18.1869L8.28814 16.7727L7.22748 15.712L5.81326 17.1262L6.87392 18.1869Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z" style="fill: var(--element-active-color)"/>
<path d="M12.75 6V4H11.25V6H12.75Z" style="fill: var(--element-active-color)"/>
<path d="M12.75 20V18H11.25V20H12.75Z" style="fill: var(--element-active-color)"/>
<path d="M20 12.75H18V11.25H20V12.75Z" style="fill: var(--element-active-color)"/>
<path d="M4 12.75H6V11.25H4V12.75Z" style="fill: var(--element-active-color)"/>
<path d="M6.87342 5.81359L8.28788 7.22756L7.22722 8.28822L5.81252 6.874L6.87342 5.81359Z" style="fill: var(--element-active-color)"/>
<path d="M16.7727 15.7128L15.712 16.7735L17.1262 18.1877L18.1874 17.1271L16.7727 15.7128Z" style="fill: var(--element-active-color)"/>
<path d="M18.1876 6.87318L16.7734 8.28739L15.7128 7.22673L17.127 5.81252L18.1876 6.87318Z" style="fill: var(--element-active-color)"/>
<path d="M6.87392 18.1869L8.28814 16.7727L7.22748 15.712L5.81326 17.1262L6.87392 18.1869Z" style="fill: var(--element-active-color)"/>
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
    'obi-display-brilliance-iec': ObiDisplayBrillianceIec;
  }
}