import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-logo-oicl')
export class ObiLogoOicl extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.84997 4.92893C9.64992 1.02369 15.8109 1.02369 19.6108 4.92893C21.5085 6.87914 21.3159 9.59709 19.9134 11.3254C19.2146 12.1867 18.2196 12.794 17.038 12.9324C15.8582 13.0706 14.4582 12.7449 12.9466 11.6768C11.3091 10.5199 9.75335 10.1534 8.39207 10.3603C7.03352 10.5667 5.91336 11.3376 5.1349 12.3705C4.32209 13.449 3.86501 14.8433 3.9053 16.2186C2.23092 12.5183 2.87915 7.98207 5.84997 4.92893Z" fill="currentColor"/>
<path d="M19.6107 19.0711C19.6607 19.0198 19.71 18.968 19.7586 18.9159C16.3825 20.7819 10.8475 18.2708 12.6058 12.3872C12.5753 12.3661 12.5447 12.3448 12.5141 12.3232C11.0036 11.2559 9.63894 10.9637 8.5036 11.1362C7.36553 11.3091 6.41281 11.9556 5.73816 12.8508C4.37226 14.6631 4.208 17.3836 5.84987 19.0711C9.64983 22.9763 15.8108 22.9763 19.6107 19.0711Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.84997 4.92893C9.64992 1.02369 15.8109 1.02369 19.6108 4.92893C21.5085 6.87914 21.3159 9.59709 19.9134 11.3254C19.2146 12.1867 18.2196 12.794 17.038 12.9324C15.8582 13.0706 14.4582 12.7449 12.9466 11.6768C11.3091 10.5199 9.75335 10.1534 8.39207 10.3603C7.03352 10.5667 5.91336 11.3376 5.1349 12.3705C4.32209 13.449 3.86501 14.8433 3.9053 16.2186C2.23092 12.5183 2.87915 7.98207 5.84997 4.92893Z" style="fill: var(--element-active-color)"/>
<path d="M19.6107 19.0711C19.6607 19.0198 19.71 18.968 19.7586 18.9159C16.3825 20.7819 10.8475 18.2708 12.6058 12.3872C12.5753 12.3661 12.5447 12.3448 12.5141 12.3232C11.0036 11.2559 9.63894 10.9637 8.5036 11.1362C7.36553 11.3091 6.41281 11.9556 5.73816 12.8508C4.37226 14.6631 4.208 17.3836 5.84987 19.0711C9.64983 22.9763 15.8108 22.9763 19.6107 19.0711Z" style="fill: var(--element-neutral-color)"/>
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
    'obi-logo-oicl': ObiLogoOicl;
  }
}