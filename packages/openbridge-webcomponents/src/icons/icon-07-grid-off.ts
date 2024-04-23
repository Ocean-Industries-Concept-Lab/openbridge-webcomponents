import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-grid-off')
export class Obi07GridOff extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.97506 0.569824L0.565063 1.97924L2.56506 3.9784L4.56506 5.97757L6.01506 7.42697L8.01506 9.42613L8.56506 9.9759L10.5651 11.9751L12.0151 13.4245L14.0151 15.4236L14.5651 15.9734L16.5651 17.9726L18.0151 19.422L20.0151 21.4211L22.0251 23.4303L23.4351 22.0209L1.97506 0.569824Z" fill="currentColor"/>
<path d="M10.5649 3.42863H14.5649H16.5651H20.5651V7.42697L20.5649 9.42613V13.4245V15.4236V16.3133L22.5649 18.3124V3.42863C22.5649 2.32909 21.6649 1.42947 20.5649 1.42947H5.67494L7.67494 3.42863H8.56494H10.5649Z" fill="currentColor"/>
<path d="M14.5649 3.42863V7.42697H11.6749L13.6749 9.42613H14.5649V10.3158L16.5649 12.3149V9.42613H20.5649L20.5651 7.42697H16.5651V3.42863H14.5649Z" fill="currentColor"/>
<path d="M8.56494 3.42863V4.31826L10.5649 6.31743V3.42863H8.56494Z" fill="currentColor"/>
<path d="M20.5649 13.4245H17.6749L19.6749 15.4236H20.5649V13.4245Z" fill="currentColor"/>
<path d="M14.5651 15.9734V19.422L16.5651 19.422V17.9726L14.5651 15.9734Z" fill="currentColor"/>
<path d="M12.0151 13.4245H10.5651V11.9751L8.56506 9.9759V13.4245H4.56506V15.4236H8.56506V19.422H10.5651V15.4236H14.0151L12.0151 13.4245Z" fill="currentColor"/>
<path d="M6.01506 7.42697H4.56506V9.42613H8.01506L6.01506 7.42697Z" fill="currentColor"/>
<path d="M4.56506 21.4211H20.0151L18.0151 19.422H16.5651L14.5651 19.422H10.5651H8.56506H4.56506V15.4236V13.4245V9.42613V7.42697V5.97757L2.56506 3.9784V19.422C2.56506 20.5215 3.46506 21.4211 4.56506 21.4211Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.97506 0.569824L0.565063 1.97924L2.56506 3.9784L4.56506 5.97757L6.01506 7.42697L8.01506 9.42613L8.56506 9.9759L10.5651 11.9751L12.0151 13.4245L14.0151 15.4236L14.5651 15.9734L16.5651 17.9726L18.0151 19.422L20.0151 21.4211L22.0251 23.4303L23.4351 22.0209L1.97506 0.569824Z" style="fill: var(--element-active-color)"/>
<path d="M10.5649 3.42863H14.5649H16.5651H20.5651V7.42697L20.5649 9.42613V13.4245V15.4236V16.3133L22.5649 18.3124V3.42863C22.5649 2.32909 21.6649 1.42947 20.5649 1.42947H5.67494L7.67494 3.42863H8.56494H10.5649Z" style="fill: var(--element-active-color)"/>
<path d="M14.5649 3.42863V7.42697H11.6749L13.6749 9.42613H14.5649V10.3158L16.5649 12.3149V9.42613H20.5649L20.5651 7.42697H16.5651V3.42863H14.5649Z" style="fill: var(--element-active-color)"/>
<path d="M8.56494 3.42863V4.31826L10.5649 6.31743V3.42863H8.56494Z" style="fill: var(--element-active-color)"/>
<path d="M20.5649 13.4245H17.6749L19.6749 15.4236H20.5649V13.4245Z" style="fill: var(--element-active-color)"/>
<path d="M14.5651 15.9734V19.422L16.5651 19.422V17.9726L14.5651 15.9734Z" style="fill: var(--element-active-color)"/>
<path d="M12.0151 13.4245H10.5651V11.9751L8.56506 9.9759V13.4245H4.56506V15.4236H8.56506V19.422H10.5651V15.4236H14.0151L12.0151 13.4245Z" style="fill: var(--element-active-color)"/>
<path d="M6.01506 7.42697H4.56506V9.42613H8.01506L6.01506 7.42697Z" style="fill: var(--element-active-color)"/>
<path d="M4.56506 21.4211H20.0151L18.0151 19.422H16.5651L14.5651 19.422H10.5651H8.56506H4.56506V15.4236V13.4245V9.42613V7.42697V5.97757L2.56506 3.9784V19.422C2.56506 20.5215 3.46506 21.4211 4.56506 21.4211Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-grid-off': Obi07GridOff;
  }
}
