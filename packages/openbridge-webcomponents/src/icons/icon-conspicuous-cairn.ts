import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-conspicuous-cairn')
export class ObiConspicuousCairn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 9.72864 15.8052 10.4118 15.4648 11.0002L15.5 11C17.7091 11 19.5 12.7909 19.5 15C19.5 16.1947 18.9762 17.2671 18.1458 18H21V19.5H3V18H5.85418C5.02375 17.2671 4.5 16.1947 4.5 15C4.5 12.7909 6.29086 11 8.5 11L8.53522 11.0002C8.19482 10.4118 8 9.72864 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9ZM11 15C11 16.3807 9.88071 17.5 8.5 17.5C7.11929 17.5 6 16.3807 6 15C6 13.6193 7.11929 12.5 8.5 12.5C9.88071 12.5 11 13.6193 11 15ZM15.5 17.5C16.8807 17.5 18 16.3807 18 15C18 13.6193 16.8807 12.5 15.5 12.5C14.1193 12.5 13 13.6193 13 15C13 16.3807 14.1193 17.5 15.5 17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 9.72864 15.8052 10.4118 15.4648 11.0002L15.5 11C17.7091 11 19.5 12.7909 19.5 15C19.5 16.1947 18.9762 17.2671 18.1458 18H21V19.5H3V18H5.85418C5.02375 17.2671 4.5 16.1947 4.5 15C4.5 12.7909 6.29086 11 8.5 11L8.53522 11.0002C8.19482 10.4118 8 9.72864 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9ZM11 15C11 16.3807 9.88071 17.5 8.5 17.5C7.11929 17.5 6 16.3807 6 15C6 13.6193 7.11929 12.5 8.5 12.5C9.88071 12.5 11 13.6193 11 15ZM15.5 17.5C16.8807 17.5 18 16.3807 18 15C18 13.6193 16.8807 12.5 15.5 12.5C14.1193 12.5 13 13.6193 13 15C13 16.3807 14.1193 17.5 15.5 17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-conspicuous-cairn': ObiConspicuousCairn;
  }
}
