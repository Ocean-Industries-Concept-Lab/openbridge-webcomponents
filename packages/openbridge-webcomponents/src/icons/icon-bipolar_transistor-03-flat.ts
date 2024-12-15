import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-bipolar_transistor-03-flat')
export class ObiBipolar_transistor03Flat extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.8247L8 10.1755L19.3032 3.64962L18.5532 2.35059L8 8.44349V6.00021C8 5.44793 7.55228 5.00021 7 5.00021C6.44772 5.00021 6 5.44793 6 6.00021L6 11.2502H1.00049L1.00049 12.7502H6L6 18.0002C6 18.5525 6.44772 19.0002 7 19.0002C7.55228 19.0002 8 18.5525 8 18.0002L8 15.5568L13.5211 18.7444L9.80576 19.7399L10.194 21.1888L16.3825 19.5306L14.7243 13.342L13.2754 13.7302L14.2708 17.4452L8 13.8247Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.8247L8 10.1755L19.3032 3.64962L18.5532 2.35059L8 8.44349V6.00021C8 5.44793 7.55228 5.00021 7 5.00021C6.44772 5.00021 6 5.44793 6 6.00021L6 11.2502H1.00049L1.00049 12.7502H6L6 18.0002C6 18.5525 6.44772 19.0002 7 19.0002C7.55228 19.0002 8 18.5525 8 18.0002L8 15.5568L13.5211 18.7444L9.80576 19.7399L10.194 21.1888L16.3825 19.5306L14.7243 13.342L13.2754 13.7302L14.2708 17.4452L8 13.8247Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-bipolar_transistor-03-flat': ObiBipolar_transistor03Flat;
  }
}
