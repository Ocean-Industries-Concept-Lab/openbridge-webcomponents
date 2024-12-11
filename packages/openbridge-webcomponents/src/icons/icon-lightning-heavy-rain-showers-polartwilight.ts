import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-heavy-rain-showers-polartwilight')
export class ObiLightningHeavyRainShowersPolartwilight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.66663 5.33341C2.66663 4.96522 2.9651 4.66675 3.33329 4.66675H18C18.3681 4.66675 18.6666 4.96522 18.6666 5.33341C18.6666 5.7016 18.3681 6.00008 18 6.00008H16.4458C16.4458 6.13816 16.5051 6.27623 16.6238 6.37592L18.4879 7.94165C18.5118 7.96174 18.5332 7.98304 18.5521 8.0053C18.6429 8.00897 18.7346 8.01449 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H19.829L19.8533 21.3014C20.0173 20.9812 20.045 20.6084 19.9301 20.2675C19.8152 19.9266 19.5674 19.6466 19.243 19.4911L18.9461 19.3488H25.3333C26.4379 19.3488 27.2486 18.4501 27.3333 17.3488C27.4497 15.8352 24 15.3488 24 15.3488C24 15.3488 24 10.4446 18.6666 10.0155C16.5282 9.84342 14.8895 11.1454 13.8692 12.3091C13.0854 13.2031 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 11.999 13.014 11.1362 12.6646C10.7796 12.5203 10.3898 12.4872 9.99996 12.6822C9.66663 12.8488 9.45829 13.0988 9.33329 13.3801C8.95829 14.2238 9.33329 15.3488 9.33329 15.3488H6.66663C5.33329 15.3488 4.66663 16.2442 4.66663 17.3488C4.66663 18.4534 5.56206 19.3488 6.66663 19.3488H12.7266L12.1374 20.5438C12.0137 20.7948 11.9729 21.0764 12.0175 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.40352 12.6549 7.74847 11.8519 8.52378 11.2558C8.49911 11.2653 8.47483 11.2767 8.45116 11.2901L6.31455 12.4979C5.91882 12.7216 5.4344 12.3858 5.53509 11.9575L6.0787 9.64531C6.14792 9.35089 5.93051 9.06536 5.61567 9.0372L3.14308 8.81601C2.68513 8.77504 2.50009 8.23165 2.84536 7.94165L4.70947 6.37592C4.82815 6.27623 4.88749 6.13816 4.88749 6.00008H3.33329C2.9651 6.00008 2.66663 5.7016 2.66663 5.33341ZM6.4561 6.00008H14.8772C14.8772 8.20922 12.992 10.0001 10.6666 10.0001C8.34122 10.0001 6.4561 8.20922 6.4561 6.00008Z" fill="currentColor"/>
<path d="M17.1791 13.3334L16.1632 19.4934L18.6666 20.6934L14.2403 29.3334L15.9093 22.3334L13.3333 21.1334L17.1791 13.3334Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5447 23.3371C4.81533 22.7508 5.45447 22.531 6.02302 22.7497L6.03317 22.7536L6.04304 22.7582C6.6294 23.0288 6.84914 23.6679 6.63047 24.2365L6.62506 24.2506L5.50671 26.8059C5.3199 27.2666 4.89785 27.4901 4.46336 27.4901C4.31243 27.4901 4.14318 27.4441 4.03795 27.409L4.02043 27.4032L4.00367 27.3955C3.41732 27.1248 3.19757 26.4857 3.41624 25.9172L3.42166 25.9031L4.5447 23.3371Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21137 26.0038C9.482 25.4174 10.1211 25.1977 10.6897 25.4164L10.6998 25.4203L10.7097 25.4248C11.2961 25.6955 11.5158 26.3346 11.2971 26.9031L11.2917 26.9172L10.1734 29.4726C9.98656 29.9333 9.56451 30.1568 9.13002 30.1568C8.9791 30.1568 8.80985 30.1108 8.70462 30.0757L8.6871 30.0699L8.67034 30.0621C8.08398 29.7915 7.86424 29.1524 8.08291 28.5838L8.08833 28.5697L9.21137 26.0038Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.878 24.6705C20.1487 24.0841 20.7878 23.8644 21.3564 24.083L21.3665 24.0869L21.3764 24.0915C21.9627 24.3621 22.1825 25.0013 21.9638 25.5698L21.9584 25.5839L20.84 28.1393C20.6532 28.5999 20.2312 28.8235 19.7967 28.8235C19.6458 28.8235 19.4765 28.7775 19.3713 28.7424L19.3538 28.7365L19.337 28.7288C18.7507 28.4582 18.5309 27.819 18.7496 27.2505L18.755 27.2364L19.878 24.6705Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.878 26.6705C28.1487 26.0841 28.7878 25.8644 29.3564 26.083L29.3665 26.0869L29.3764 26.0915C29.9627 26.3621 30.1825 27.0013 29.9638 27.5698L29.9584 27.5839L28.84 30.1393C28.6532 30.5999 28.2312 30.8235 27.7967 30.8235C27.6458 30.8235 27.4765 30.7775 27.3713 30.7424L27.3538 30.7365L27.337 30.7288C26.7507 30.4582 26.5309 29.819 26.7496 29.2505L26.755 29.2364L27.878 26.6705Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.5447 23.3371C24.8153 22.7508 25.4545 22.531 26.023 22.7497L26.0332 22.7536L26.043 22.7582C26.6294 23.0288 26.8491 23.6679 26.6305 24.2365L26.6251 24.2506L25.5067 26.8059C25.3199 27.2666 24.8978 27.4901 24.4634 27.4901C24.3124 27.4901 24.1432 27.4441 24.0379 27.409L24.0204 27.4032L24.0037 27.3955C23.4173 27.1248 23.1976 26.4857 23.4162 25.9172L23.4217 25.9031L24.5447 23.3371Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.66663 5.33341C2.66663 4.96522 2.9651 4.66675 3.33329 4.66675H18C18.3681 4.66675 18.6666 4.96522 18.6666 5.33341C18.6666 5.7016 18.3681 6.00008 18 6.00008H16.4458C16.4458 6.13816 16.5051 6.27623 16.6238 6.37592L18.4879 7.94165C18.5118 7.96174 18.5332 7.98304 18.5521 8.0053C18.6429 8.00897 18.7346 8.01449 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H19.829L19.8533 21.3014C20.0173 20.9812 20.045 20.6084 19.9301 20.2675C19.8152 19.9266 19.5674 19.6466 19.243 19.4911L18.9461 19.3488H25.3333C26.4379 19.3488 27.2486 18.4501 27.3333 17.3488C27.4497 15.8352 24 15.3488 24 15.3488C24 15.3488 24 10.4446 18.6666 10.0155C16.5282 9.84342 14.8895 11.1454 13.8692 12.3091C13.0854 13.2031 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 11.999 13.014 11.1362 12.6646C10.7796 12.5203 10.3898 12.4872 9.99996 12.6822C9.66663 12.8488 9.45829 13.0988 9.33329 13.3801C8.95829 14.2238 9.33329 15.3488 9.33329 15.3488H6.66663C5.33329 15.3488 4.66663 16.2442 4.66663 17.3488C4.66663 18.4534 5.56206 19.3488 6.66663 19.3488H12.7266L12.1374 20.5438C12.0137 20.7948 11.9729 21.0764 12.0175 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.40352 12.6549 7.74847 11.8519 8.52378 11.2558C8.49911 11.2653 8.47483 11.2767 8.45116 11.2901L6.31455 12.4979C5.91882 12.7216 5.4344 12.3858 5.53509 11.9575L6.0787 9.64531C6.14792 9.35089 5.93051 9.06536 5.61567 9.0372L3.14308 8.81601C2.68513 8.77504 2.50009 8.23165 2.84536 7.94165L4.70947 6.37592C4.82815 6.27623 4.88749 6.13816 4.88749 6.00008H3.33329C2.9651 6.00008 2.66663 5.7016 2.66663 5.33341ZM6.4561 6.00008H14.8772C14.8772 8.20922 12.992 10.0001 10.6666 10.0001C8.34122 10.0001 6.4561 8.20922 6.4561 6.00008Z" style="fill: var(--element-active-color)"/>
<path d="M17.1791 13.3334L16.1632 19.4934L18.6666 20.6934L14.2403 29.3334L15.9093 22.3334L13.3333 21.1334L17.1791 13.3334Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5447 23.3371C4.81533 22.7508 5.45447 22.531 6.02302 22.7497L6.03317 22.7536L6.04304 22.7582C6.6294 23.0288 6.84914 23.6679 6.63047 24.2365L6.62506 24.2506L5.50671 26.8059C5.3199 27.2666 4.89785 27.4901 4.46336 27.4901C4.31243 27.4901 4.14318 27.4441 4.03795 27.409L4.02043 27.4032L4.00367 27.3955C3.41732 27.1248 3.19757 26.4857 3.41624 25.9172L3.42166 25.9031L4.5447 23.3371Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21137 26.0038C9.482 25.4174 10.1211 25.1977 10.6897 25.4164L10.6998 25.4203L10.7097 25.4248C11.2961 25.6955 11.5158 26.3346 11.2971 26.9031L11.2917 26.9172L10.1734 29.4726C9.98656 29.9333 9.56451 30.1568 9.13002 30.1568C8.9791 30.1568 8.80985 30.1108 8.70462 30.0757L8.6871 30.0699L8.67034 30.0621C8.08398 29.7915 7.86424 29.1524 8.08291 28.5838L8.08833 28.5697L9.21137 26.0038Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.878 24.6705C20.1487 24.0841 20.7878 23.8644 21.3564 24.083L21.3665 24.0869L21.3764 24.0915C21.9627 24.3621 22.1825 25.0013 21.9638 25.5698L21.9584 25.5839L20.84 28.1393C20.6532 28.5999 20.2312 28.8235 19.7967 28.8235C19.6458 28.8235 19.4765 28.7775 19.3713 28.7424L19.3538 28.7365L19.337 28.7288C18.7507 28.4582 18.5309 27.819 18.7496 27.2505L18.755 27.2364L19.878 24.6705Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.878 26.6705C28.1487 26.0841 28.7878 25.8644 29.3564 26.083L29.3665 26.0869L29.3764 26.0915C29.9627 26.3621 30.1825 27.0013 29.9638 27.5698L29.9584 27.5839L28.84 30.1393C28.6532 30.5999 28.2312 30.8235 27.7967 30.8235C27.6458 30.8235 27.4765 30.7775 27.3713 30.7424L27.3538 30.7365L27.337 30.7288C26.7507 30.4582 26.5309 29.819 26.7496 29.2505L26.755 29.2364L27.878 26.6705Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.5447 23.3371C24.8153 22.7508 25.4545 22.531 26.023 22.7497L26.0332 22.7536L26.043 22.7582C26.6294 23.0288 26.8491 23.6679 26.6305 24.2365L26.6251 24.2506L25.5067 26.8059C25.3199 27.2666 24.8978 27.4901 24.4634 27.4901C24.3124 27.4901 24.1432 27.4441 24.0379 27.409L24.0204 27.4032L24.0037 27.3955C23.4173 27.1248 23.1976 26.4857 23.4162 25.9172L23.4217 25.9031L24.5447 23.3371Z" style="fill: var(--element-active-color)"/>
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
    'obi-lightning-heavy-rain-showers-polartwilight': ObiLightningHeavyRainShowersPolartwilight;
  }
}
