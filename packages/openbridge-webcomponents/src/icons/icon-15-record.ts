import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-record')
export class Obi15Record extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17ZM20 7H4V17H20V7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.5H16.5C17.8807 9.5 19 10.6193 19 12C19 13.3807 17.8807 14.5 16.5 14.5H7.5C6.11929 14.5 5 13.3807 5 12C5 10.6193 6.11929 9.5 7.5 9.5ZM9 12C9 12.8284 8.32843 13.5 7.5 13.5C6.67157 13.5 6 12.8284 6 12C6 11.1716 6.67157 10.5 7.5 10.5C8.32843 10.5 9 11.1716 9 12ZM14.4998 10.5H9.50018C9.81403 10.9178 10 11.4372 10 12C10 12.5628 9.81403 13.0822 9.50018 13.5H14.4998C14.186 13.0822 14 12.5628 14 12C14 11.4372 14.186 10.9178 14.4998 10.5ZM16.5 10.5C17.3284 10.5 18 11.1716 18 12C18 12.8284 17.3284 13.5 16.5 13.5C15.6716 13.5 15 12.8284 15 12C15 11.1716 15.6716 10.5 16.5 10.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17ZM20 7H4V17H20V7Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.5H16.5C17.8807 9.5 19 10.6193 19 12C19 13.3807 17.8807 14.5 16.5 14.5H7.5C6.11929 14.5 5 13.3807 5 12C5 10.6193 6.11929 9.5 7.5 9.5ZM9 12C9 12.8284 8.32843 13.5 7.5 13.5C6.67157 13.5 6 12.8284 6 12C6 11.1716 6.67157 10.5 7.5 10.5C8.32843 10.5 9 11.1716 9 12ZM14.4998 10.5H9.50018C9.81403 10.9178 10 11.4372 10 12C10 12.5628 9.81403 13.0822 9.50018 13.5H14.4998C14.186 13.0822 14 12.5628 14 12C14 11.4372 14.186 10.9178 14.4998 10.5ZM16.5 10.5C17.3284 10.5 18 11.1716 18 12C18 12.8284 17.3284 13.5 16.5 13.5C15.6716 13.5 15 12.8284 15 12C15 11.1716 15.6716 10.5 16.5 10.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-record': Obi15Record;
  }
}
