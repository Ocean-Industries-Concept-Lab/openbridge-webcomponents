import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-logo-oicl')
export class Obi06LogoOicl extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.84997 4.92893C9.64992 1.02369 15.8109 1.02369 19.6108 4.92893C21.5085 6.87914 21.3159 9.59709 19.9134 11.3254C19.2146 12.1867 18.2196 12.794 17.038 12.9324C15.8582 13.0706 14.4582 12.7449 12.9466 11.6768C11.3091 10.5199 9.75335 10.1534 8.39207 10.3603C7.03352 10.5667 5.91336 11.3376 5.1349 12.3705C4.32209 13.449 3.86501 14.8433 3.9053 16.2186C2.23092 12.5183 2.87915 7.98207 5.84997 4.92893Z" fill="currentColor"/>
<path d="M20 18.8904C19.9517 18.943 19.9027 18.9952 19.853 19.0469C16.0764 22.9844 9.95324 22.9844 6.17659 19.0469C4.54479 17.3455 4.70805 14.6026 6.06557 12.7753C6.73607 11.8728 7.68295 11.2209 8.81404 11.0466C9.94242 10.8726 11.2987 11.1673 12.8 12.2434C12.8304 12.2652 12.8607 12.2867 12.8911 12.308C11.1435 18.24 16.6446 20.7718 20 18.8904Z" fill="currentColor" />
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.84997 4.92893C9.64992 1.02369 15.8109 1.02369 19.6108 4.92893C21.5085 6.87914 21.3159 9.59709 19.9134 11.3254C19.2146 12.1867 18.2196 12.794 17.038 12.9324C15.8582 13.0706 14.4582 12.7449 12.9466 11.6768C11.3091 10.5199 9.75335 10.1534 8.39207 10.3603C7.03352 10.5667 5.91336 11.3376 5.1349 12.3705C4.32209 13.449 3.86501 14.8433 3.9053 16.2186C2.23092 12.5183 2.87915 7.98207 5.84997 4.92893Z" style="fill: var(--element-active-color)"/>
<path d="M20 18.8904C19.9517 18.943 19.9027 18.9952 19.853 19.0469C16.0764 22.9844 9.95324 22.9844 6.17659 19.0469C4.54479 17.3455 4.70805 14.6026 6.06557 12.7753C6.73607 11.8728 7.68295 11.2209 8.81404 11.0466C9.94242 10.8726 11.2987 11.1673 12.8 12.2434C12.8304 12.2652 12.8607 12.2867 12.8911 12.308C11.1435 18.24 16.6446 20.7718 20 18.8904Z" style="fill: var(--element-neutral-color)" />
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
    'obi-06-logo-oicl': Obi06LogoOicl;
  }
}
