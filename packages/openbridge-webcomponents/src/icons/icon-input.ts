import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-input')
export class ObiInput extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16 12L11 7L9.6 8.4L12.175 11H2V13H12.175L9.6 15.6L11 17L16 12ZM12 2V4C14.2333 4 16.125 4.775 17.675 6.325C19.225 7.875 20 9.76667 20 12C20 14.2333 19.225 16.125 17.675 17.675C16.125 19.225 14.2333 20 12 20V22C13.3833 22 14.6833 21.7375 15.9 21.2125C17.1167 20.6875 18.175 19.975 19.075 19.075C19.975 18.175 20.6875 17.1167 21.2125 15.9C21.7375 14.6833 22 13.3833 22 12C22 10.6167 21.7375 9.31667 21.2125 8.1C20.6875 6.88333 19.975 5.825 19.075 4.925C18.175 4.025 17.1167 3.3125 15.9 2.7875C14.6833 2.2625 13.3833 2 12 2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 12L11 7L9.6 8.4L12.175 11H2V13H12.175L9.6 15.6L11 17L16 12ZM12 2V4C14.2333 4 16.125 4.775 17.675 6.325C19.225 7.875 20 9.76667 20 12C20 14.2333 19.225 16.125 17.675 17.675C16.125 19.225 14.2333 20 12 20V22C13.3833 22 14.6833 21.7375 15.9 21.2125C17.1167 20.6875 18.175 19.975 19.075 19.075C19.975 18.175 20.6875 17.1167 21.2125 15.9C21.7375 14.6833 22 13.3833 22 12C22 10.6167 21.7375 9.31667 21.2125 8.1C20.6875 6.88333 19.975 5.825 19.075 4.925C18.175 4.025 17.1167 3.3125 15.9 2.7875C14.6833 2.2625 13.3833 2 12 2Z" style="fill: var(--element-active-color)"/>
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
    'obi-input': ObiInput;
  }
}
