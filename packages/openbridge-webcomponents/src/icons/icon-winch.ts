import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-winch')
export class ObiWinch extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 5C3 4.44772 3.44772 4 4 4H6C6.55228 4 7 4.44772 7 5V13C7 13.5523 6.55228 14 6 14H4C3.44772 14 3 13.5523 3 13V5Z" fill="currentColor"/>
<path d="M8 6.5C8 6.22386 8.22386 6 8.5 6H9.5C9.77614 6 10 6.22386 10 6.5V11.5C10 11.7761 9.77614 12 9.5 12H8.5C8.22386 12 8 11.7761 8 11.5V6.5Z" fill="currentColor"/>
<path d="M11 6.5C11 6.22386 11.2239 6 11.5 6H12.5C12.7761 6 13 6.22386 13 6.5V11.5C13 11.7761 12.7761 12 12.5 12H11.5C11.2239 12 11 11.7761 11 11.5V6.5Z" fill="currentColor"/>
<path d="M14 6.5C14 6.22386 14.2239 6 14.5 6H15.5C15.7761 6 16 6.22386 16 6.5V19.5C16 19.7761 15.7761 20 15.5 20H14.5C14.2239 20 14 19.7761 14 19.5V6.5Z" fill="currentColor"/>
<path d="M17 5C17 4.44772 17.4477 4 18 4H20C20.5523 4 21 4.44772 21 5V13C21 13.5523 20.5523 14 20 14H18C17.4477 14 17 13.5523 17 13V5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 5C3 4.44772 3.44772 4 4 4H6C6.55228 4 7 4.44772 7 5V13C7 13.5523 6.55228 14 6 14H4C3.44772 14 3 13.5523 3 13V5Z" style="fill: var(--element-active-color)"/>
<path d="M8 6.5C8 6.22386 8.22386 6 8.5 6H9.5C9.77614 6 10 6.22386 10 6.5V11.5C10 11.7761 9.77614 12 9.5 12H8.5C8.22386 12 8 11.7761 8 11.5V6.5Z" style="fill: var(--element-active-color)"/>
<path d="M11 6.5C11 6.22386 11.2239 6 11.5 6H12.5C12.7761 6 13 6.22386 13 6.5V11.5C13 11.7761 12.7761 12 12.5 12H11.5C11.2239 12 11 11.7761 11 11.5V6.5Z" style="fill: var(--element-active-color)"/>
<path d="M14 6.5C14 6.22386 14.2239 6 14.5 6H15.5C15.7761 6 16 6.22386 16 6.5V19.5C16 19.7761 15.7761 20 15.5 20H14.5C14.2239 20 14 19.7761 14 19.5V6.5Z" style="fill: var(--element-active-color)"/>
<path d="M17 5C17 4.44772 17.4477 4 18 4H20C20.5523 4 21 4.44772 21 5V13C21 13.5523 20.5523 14 20 14H18C17.4477 14 17 13.5523 17 13V5Z" style="fill: var(--element-active-color)"/>
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
    'obi-winch': ObiWinch;
  }
}