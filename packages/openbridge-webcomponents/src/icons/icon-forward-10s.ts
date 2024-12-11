import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-forward-10s')
export class ObiForward10s extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.686 16.5259H9.32809V12.8081C9.32809 12.7056 9.32956 12.5796 9.33249 12.4302C9.33542 12.2778 9.33981 12.1226 9.34567 11.9644C9.35153 11.8032 9.35739 11.6582 9.36325 11.5293C9.33102 11.5674 9.26511 11.6333 9.1655 11.7271C9.06882 11.8179 8.978 11.8999 8.89304 11.9731L8.15475 12.5664L7.49997 11.749L9.56979 10.1011H10.686V16.5259Z" fill="currentColor"/>
<path d="M16.435 13.3135C16.435 13.832 16.394 14.2949 16.312 14.7021C16.2329 15.1094 16.104 15.4551 15.9253 15.7393C15.7495 16.0234 15.518 16.2402 15.2309 16.3896C14.9438 16.5391 14.5952 16.6138 14.185 16.6138C13.6694 16.6138 13.2461 16.4834 12.915 16.2227C12.584 15.959 12.3393 15.5811 12.1811 15.0889C12.0229 14.5938 11.9438 14.002 11.9438 13.3135C11.9438 12.6191 12.0156 12.0259 12.1591 11.5337C12.3056 11.0386 12.5429 10.6592 12.8711 10.3955C13.1992 10.1318 13.6372 10 14.185 10C14.6977 10 15.1196 10.1318 15.4507 10.3955C15.7846 10.6562 16.0322 11.0342 16.1933 11.5293C16.3545 12.0215 16.435 12.6162 16.435 13.3135ZM13.2929 13.3135C13.2929 13.8027 13.3193 14.2114 13.372 14.5396C13.4277 14.8647 13.52 15.1094 13.6489 15.2734C13.7778 15.4375 13.9565 15.5195 14.185 15.5195C14.4106 15.5195 14.5879 15.439 14.7168 15.2778C14.8486 15.1138 14.9424 14.8691 14.998 14.5439C15.0537 14.2158 15.0815 13.8057 15.0815 13.3135C15.0815 12.8242 15.0537 12.4155 14.998 12.0874C14.9424 11.7593 14.8486 11.5132 14.7168 11.3491C14.5879 11.1821 14.4106 11.0986 14.185 11.0986C13.9565 11.0986 13.7778 11.1821 13.6489 11.3491C13.52 11.5132 13.4277 11.7593 13.372 12.0874C13.3193 12.4155 13.2929 12.8242 13.2929 13.3135Z" fill="currentColor"/>
<path d="M7.05025 8.05027C4.31658 10.7839 4.31658 15.2161 7.05025 17.9498C9.78392 20.6834 14.2161 20.6834 16.9497 17.9498C18.3166 16.5829 19 14.7915 19 13H21C21 15.3033 20.1213 17.6066 18.364 19.364C14.8492 22.8787 9.15076 22.8787 5.63604 19.364C2.12132 15.8493 2.12132 10.1508 5.63604 6.63606C7.63522 4.63688 10.3409 3.77484 12.9494 4.04993L11.5858 2.68631L13 1.27209L16.9497 5.22184L13 9.17159L11.5858 7.75738L13.2341 6.10904C11.0573 5.72117 8.73228 6.36824 7.05025 8.05027Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.686 16.5259H9.32809V12.8081C9.32809 12.7056 9.32956 12.5796 9.33249 12.4302C9.33542 12.2778 9.33981 12.1226 9.34567 11.9644C9.35153 11.8032 9.35739 11.6582 9.36325 11.5293C9.33102 11.5674 9.26511 11.6333 9.1655 11.7271C9.06882 11.8179 8.978 11.8999 8.89304 11.9731L8.15475 12.5664L7.49997 11.749L9.56979 10.1011H10.686V16.5259Z" style="fill: var(--element-active-color)"/>
<path d="M16.435 13.3135C16.435 13.832 16.394 14.2949 16.312 14.7021C16.2329 15.1094 16.104 15.4551 15.9253 15.7393C15.7495 16.0234 15.518 16.2402 15.2309 16.3896C14.9438 16.5391 14.5952 16.6138 14.185 16.6138C13.6694 16.6138 13.2461 16.4834 12.915 16.2227C12.584 15.959 12.3393 15.5811 12.1811 15.0889C12.0229 14.5938 11.9438 14.002 11.9438 13.3135C11.9438 12.6191 12.0156 12.0259 12.1591 11.5337C12.3056 11.0386 12.5429 10.6592 12.8711 10.3955C13.1992 10.1318 13.6372 10 14.185 10C14.6977 10 15.1196 10.1318 15.4507 10.3955C15.7846 10.6562 16.0322 11.0342 16.1933 11.5293C16.3545 12.0215 16.435 12.6162 16.435 13.3135ZM13.2929 13.3135C13.2929 13.8027 13.3193 14.2114 13.372 14.5396C13.4277 14.8647 13.52 15.1094 13.6489 15.2734C13.7778 15.4375 13.9565 15.5195 14.185 15.5195C14.4106 15.5195 14.5879 15.439 14.7168 15.2778C14.8486 15.1138 14.9424 14.8691 14.998 14.5439C15.0537 14.2158 15.0815 13.8057 15.0815 13.3135C15.0815 12.8242 15.0537 12.4155 14.998 12.0874C14.9424 11.7593 14.8486 11.5132 14.7168 11.3491C14.5879 11.1821 14.4106 11.0986 14.185 11.0986C13.9565 11.0986 13.7778 11.1821 13.6489 11.3491C13.52 11.5132 13.4277 11.7593 13.372 12.0874C13.3193 12.4155 13.2929 12.8242 13.2929 13.3135Z" style="fill: var(--element-active-color)"/>
<path d="M7.05025 8.05027C4.31658 10.7839 4.31658 15.2161 7.05025 17.9498C9.78392 20.6834 14.2161 20.6834 16.9497 17.9498C18.3166 16.5829 19 14.7915 19 13H21C21 15.3033 20.1213 17.6066 18.364 19.364C14.8492 22.8787 9.15076 22.8787 5.63604 19.364C2.12132 15.8493 2.12132 10.1508 5.63604 6.63606C7.63522 4.63688 10.3409 3.77484 12.9494 4.04993L11.5858 2.68631L13 1.27209L16.9497 5.22184L13 9.17159L11.5858 7.75738L13.2341 6.10904C11.0573 5.72117 8.73228 6.36824 7.05025 8.05027Z" style="fill: var(--element-active-color)"/>
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
    'obi-forward-10s': ObiForward10s;
  }
}
