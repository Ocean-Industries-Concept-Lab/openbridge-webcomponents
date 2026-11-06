import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-shield-google')
export class ObiShieldGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22.0001C9.68671 21.4134 7.77338 20.0834 6.26004 18.0101C4.74671 15.9368 3.99338 13.6334 4.00004 11.1001V5.69311C4.00004 5.27627 4.25862 4.90315 4.64892 4.75679L11.6489 2.13179C11.8753 2.04689 12.1248 2.04689 12.3512 2.13179L19.3512 4.75679C19.7415 4.90315 20 5.27627 20 5.69312V11.1001C20 13.6334 19.2467 15.9368 17.74 18.0101C16.2334 20.0834 14.32 21.4134 12 22.0001ZM12 19.9001C13.7334 19.3534 15.1667 18.2534 16.3 16.6001C17.4334 14.9468 18 13.1134 18 11.1001V6.38012L12 4.13011L6.00004 6.38012V11.1001C6.00004 13.1201 6.56671 14.9534 7.70004 16.6001C8.83338 18.2468 10.2667 19.3468 12 19.9001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22.0001C9.68671 21.4134 7.77338 20.0834 6.26004 18.0101C4.74671 15.9368 3.99338 13.6334 4.00004 11.1001V5.69311C4.00004 5.27627 4.25862 4.90315 4.64892 4.75679L11.6489 2.13179C11.8753 2.04689 12.1248 2.04689 12.3512 2.13179L19.3512 4.75679C19.7415 4.90315 20 5.27627 20 5.69312V11.1001C20 13.6334 19.2467 15.9368 17.74 18.0101C16.2334 20.0834 14.32 21.4134 12 22.0001ZM12 19.9001C13.7334 19.3534 15.1667 18.2534 16.3 16.6001C17.4334 14.9468 18 13.1134 18 11.1001V6.38012L12 4.13011L6.00004 6.38012V11.1001C6.00004 13.1201 6.56671 14.9534 7.70004 16.6001C8.83338 18.2468 10.2667 19.3468 12 19.9001Z" style="fill: var(--element-active-color)"/>
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
    'obi-shield-google': ObiShieldGoogle;
  }
}
