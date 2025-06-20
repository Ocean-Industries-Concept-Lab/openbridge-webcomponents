import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-input-down')
export class ObiInputDown extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.20174 7C6.21325 7 5.64899 8.17595 6.24209 9L11.1703 16.2777C11.5669 16.8633 12.4294 16.8634 12.8262 16.2779L17.7579 9C18.351 8.17595 17.7867 7 16.7982 7L7.20174 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.20174 7C6.21325 7 5.64899 8.17595 6.24209 9L11.1703 16.2777C11.5669 16.8633 12.4294 16.8634 12.8262 16.2779L17.7579 9C18.351 8.17595 17.7867 7 16.7982 7L7.20174 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-down': ObiInputDown;
  }
}
