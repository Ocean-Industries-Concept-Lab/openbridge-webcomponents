import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-arrow-down-left')
export class ObiSignArrowDownLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2433 15.0717L16.2433 19.0717H4.92969L4.92969 7.75781L8.92969 3.75781V12.2432L16.9505 4.22241L19.7789 7.05084L11.7581 15.0717L20.2433 15.0717Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2433 15.0717L16.2433 19.0717H4.92969L4.92969 7.75781L8.92969 3.75781V12.2432L16.9505 4.22241L19.7789 7.05084L11.7581 15.0717L20.2433 15.0717Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-arrow-down-left': ObiSignArrowDownLeft;
  }
}
