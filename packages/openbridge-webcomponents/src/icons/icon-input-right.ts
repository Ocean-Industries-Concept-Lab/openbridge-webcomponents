import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-input-right')
export class ObiInputRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 7.20382C7 6.21532 8.17595 5.65107 9 6.24417L16.2777 11.1724C16.8633 11.5689 16.8634 12.4315 16.2779 12.8282L9 17.76C8.17595 18.3531 7 17.7888 7 16.8003L7 7.20382Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 7.20382C7 6.21532 8.17595 5.65107 9 6.24417L16.2777 11.1724C16.8633 11.5689 16.8634 12.4315 16.2779 12.8282L9 17.76C8.17595 18.3531 7 17.7888 7 16.8003L7 7.20382Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-right': ObiInputRight;
  }
}
