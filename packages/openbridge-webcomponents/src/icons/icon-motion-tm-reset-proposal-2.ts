import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motion-tm-reset-proposal-2')
export class ObiMotionTmResetProposal2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3225 14.5376C11.4371 14.5464 10.5568 14.889 9.88327 15.5626L6.22813 19.2177L7.64234 20.6319L11.2975 16.9768C11.9711 16.3032 12.3137 15.4229 12.3225 14.5376ZM13.6528 13.2073C11.9847 12.7618 10.1312 13.1934 8.82261 14.5019L4.10681 19.2177L7.64234 22.7533L12.3581 18.0375C13.6667 16.7289 14.0982 14.8754 13.6528 13.2073Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.015 5.30955C19.3236 4.00097 21.1771 3.56944 22.8451 4.01494C23.2906 5.68299 22.8591 7.53651 21.5505 8.84508L16.8347 13.5609L13.2992 10.0253L18.015 5.30955Z" fill="currentColor"/>
<path d="M4.6814 10.3822C4.79212 8.78595 5.44261 7.222 6.66517 5.99945C8.81041 3.85421 12.0213 3.439 14.591 4.73537L13.8621 6.18398C11.906 5.19671 9.45628 5.51504 7.81852 7.1528C6.91891 8.05242 6.42988 9.20577 6.32378 10.3822L9.66389 10.3822L5.51182 14.5343L1.35974 10.3822H4.6814Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3225 14.5376C11.4371 14.5464 10.5568 14.889 9.88327 15.5626L6.22813 19.2177L7.64234 20.6319L11.2975 16.9768C11.9711 16.3032 12.3137 15.4229 12.3225 14.5376ZM13.6528 13.2073C11.9847 12.7618 10.1312 13.1934 8.82261 14.5019L4.10681 19.2177L7.64234 22.7533L12.3581 18.0375C13.6667 16.7289 14.0982 14.8754 13.6528 13.2073Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.015 5.30955C19.3236 4.00097 21.1771 3.56944 22.8451 4.01494C23.2906 5.68299 22.8591 7.53651 21.5505 8.84508L16.8347 13.5609L13.2992 10.0253L18.015 5.30955Z" style="fill: var(--element-active-color)"/>
<path d="M4.6814 10.3822C4.79212 8.78595 5.44261 7.222 6.66517 5.99945C8.81041 3.85421 12.0213 3.439 14.591 4.73537L13.8621 6.18398C11.906 5.19671 9.45628 5.51504 7.81852 7.1528C6.91891 8.05242 6.42988 9.20577 6.32378 10.3822L9.66389 10.3822L5.51182 14.5343L1.35974 10.3822H4.6814Z" style="fill: var(--element-active-color)"/>
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
    'obi-motion-tm-reset-proposal-2': ObiMotionTmResetProposal2;
  }
}
