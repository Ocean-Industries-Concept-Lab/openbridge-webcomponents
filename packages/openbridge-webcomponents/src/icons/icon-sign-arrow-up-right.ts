import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-arrow-up-right')
export class ObiSignArrowUpRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75781 8.92969L7.75781 4.92969L19.0714 4.92969L19.0714 16.2435L15.0714 20.2435V11.7581L7.05057 19.7789L4.22215 16.9505L12.243 8.92969L3.75781 8.92969Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75781 8.92969L7.75781 4.92969L19.0714 4.92969L19.0714 16.2435L15.0714 20.2435V11.7581L7.05057 19.7789L4.22215 16.9505L12.243 8.92969L3.75781 8.92969Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-arrow-up-right': ObiSignArrowUpRight;
  }
}
