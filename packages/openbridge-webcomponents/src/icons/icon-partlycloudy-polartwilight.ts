import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-partlycloudy-polartwilight')
export class ObiPartlycloudyPolartwilight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33325 7.33337C2.96506 7.33337 2.66659 7.63185 2.66659 8.00004C2.66659 8.36823 2.96506 8.66671 3.33325 8.66671H4.88745C4.88745 8.80478 4.82811 8.94286 4.70943 9.04255L2.84531 10.6083C2.50005 10.8983 2.68508 11.4417 3.14304 11.4826L5.61563 11.7038C5.93047 11.732 6.14788 12.0175 6.07866 12.3119L5.53504 14.6242C5.43436 15.0524 5.91878 15.3883 6.31451 15.1645L7.95392 14.2378C7.59747 14.5253 7.29189 14.8703 7.05188 15.2599C5.47609 15.2824 4.01719 15.9106 2.94779 17.0158C1.91215 18.0875 1.33325 19.4708 1.33325 20.931V21.0061L1.33352 21.0172C1.37101 22.5507 1.97259 23.9764 3.10139 25.0316C4.16021 26.0813 5.61174 26.6667 7.13973 26.6667H25.0206C28.1684 26.6667 30.6666 24.1406 30.6666 21.1232C30.6666 18.8255 29.2309 16.7648 27.1003 15.9413C26.1886 12.1802 22.7293 9.33337 18.6323 9.33337C18.1195 9.33337 17.6152 9.37742 17.1236 9.4624L16.6237 9.04255C16.5051 8.94286 16.4457 8.80478 16.4457 8.66671H17.9999C18.3681 8.66671 18.6666 8.36823 18.6666 8.00004C18.6666 7.63185 18.3681 7.33337 17.9999 7.33337H3.33325ZM14.8771 8.66671H6.45606C6.45606 10.8758 8.34118 12.6667 10.6666 12.6667C11.0965 12.6667 11.5113 12.6055 11.9019 12.4918C12.6131 11.6258 13.4879 10.9082 14.4739 10.377C14.7325 9.85844 14.8771 9.27862 14.8771 8.66671ZM18.6323 11.2593C16.1298 11.2593 13.8451 12.6581 12.72 14.9033L12.2942 15.753L11.381 15.3734C11.1406 15.2734 10.8985 15.2313 10.6389 15.2313C9.74042 15.2313 8.95915 15.7606 8.64919 16.5779L8.35865 17.3441L7.5074 17.2026C7.41468 17.1871 7.33851 17.1852 7.13974 17.1852C6.11684 17.1852 5.17003 17.5798 4.46158 18.3118C3.76385 19.0339 3.37976 19.9569 3.37976 20.931V20.9835C3.4088 22.0662 3.82964 23.002 4.55207 23.6731L4.56507 23.6852L4.57761 23.6977C5.25124 24.3698 6.16981 24.7408 7.13973 24.7408H25.0206C26.945 24.7408 28.6201 23.1668 28.6201 21.1232C28.6201 19.4097 27.4507 17.989 25.9383 17.5995L25.3012 17.4355L25.1978 16.8215C24.6593 13.6262 21.8396 11.2593 18.6323 11.2593Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33325 7.33337C2.96506 7.33337 2.66659 7.63185 2.66659 8.00004C2.66659 8.36823 2.96506 8.66671 3.33325 8.66671H4.88745C4.88745 8.80478 4.82811 8.94286 4.70943 9.04255L2.84531 10.6083C2.50005 10.8983 2.68508 11.4417 3.14304 11.4826L5.61563 11.7038C5.93047 11.732 6.14788 12.0175 6.07866 12.3119L5.53504 14.6242C5.43436 15.0524 5.91878 15.3883 6.31451 15.1645L7.95392 14.2378C7.59747 14.5253 7.29189 14.8703 7.05188 15.2599C5.47609 15.2824 4.01719 15.9106 2.94779 17.0158C1.91215 18.0875 1.33325 19.4708 1.33325 20.931V21.0061L1.33352 21.0172C1.37101 22.5507 1.97259 23.9764 3.10139 25.0316C4.16021 26.0813 5.61174 26.6667 7.13973 26.6667H25.0206C28.1684 26.6667 30.6666 24.1406 30.6666 21.1232C30.6666 18.8255 29.2309 16.7648 27.1003 15.9413C26.1886 12.1802 22.7293 9.33337 18.6323 9.33337C18.1195 9.33337 17.6152 9.37742 17.1236 9.4624L16.6237 9.04255C16.5051 8.94286 16.4457 8.80478 16.4457 8.66671H17.9999C18.3681 8.66671 18.6666 8.36823 18.6666 8.00004C18.6666 7.63185 18.3681 7.33337 17.9999 7.33337H3.33325ZM14.8771 8.66671H6.45606C6.45606 10.8758 8.34118 12.6667 10.6666 12.6667C11.0965 12.6667 11.5113 12.6055 11.9019 12.4918C12.6131 11.6258 13.4879 10.9082 14.4739 10.377C14.7325 9.85844 14.8771 9.27862 14.8771 8.66671ZM18.6323 11.2593C16.1298 11.2593 13.8451 12.6581 12.72 14.9033L12.2942 15.753L11.381 15.3734C11.1406 15.2734 10.8985 15.2313 10.6389 15.2313C9.74042 15.2313 8.95915 15.7606 8.64919 16.5779L8.35865 17.3441L7.5074 17.2026C7.41468 17.1871 7.33851 17.1852 7.13974 17.1852C6.11684 17.1852 5.17003 17.5798 4.46158 18.3118C3.76385 19.0339 3.37976 19.9569 3.37976 20.931V20.9835C3.4088 22.0662 3.82964 23.002 4.55207 23.6731L4.56507 23.6852L4.57761 23.6977C5.25124 24.3698 6.16981 24.7408 7.13973 24.7408H25.0206C26.945 24.7408 28.6201 23.1668 28.6201 21.1232C28.6201 19.4097 27.4507 17.989 25.9383 17.5995L25.3012 17.4355L25.1978 16.8215C24.6593 13.6262 21.8396 11.2593 18.6323 11.2593Z" style="fill: var(--element-active-color)"/>
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
    'obi-partlycloudy-polartwilight': ObiPartlycloudyPolartwilight;
  }
}