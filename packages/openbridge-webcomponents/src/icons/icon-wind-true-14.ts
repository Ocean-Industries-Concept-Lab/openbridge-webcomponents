import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-true-14')
export class ObiWindTrue14 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0816 0.00343268L12.1969 0.0200342L19.691 1.51906C20.7637 1.73378 20.7637 3.26722 19.691 3.48195L12.9996 4.81984V6.0005H18.9996C19.5519 6.0005 19.9996 6.44822 19.9996 7.0005C19.9994 7.5526 19.5518 8.0005 18.9996 8.0005H12.9996V9.5005H18.9996C19.5519 9.5005 19.9996 9.94822 19.9996 10.5005C19.9994 11.0526 19.5518 11.5005 18.9996 11.5005H12.9996V15.0005H14.9977C15.7412 15.0005 16.2259 15.7828 15.8932 16.4487L12.8951 22.4458C12.526 23.1831 11.473 23.1833 11.1041 22.4458L8.10605 16.4487C7.77356 15.7833 8.25783 15.0008 9.00156 15.0005H10.9996V1.00148C10.9997 0.4093 11.508 -0.0441781 12.0816 0.00343268Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0816 0.00343268L12.1969 0.0200342L19.691 1.51906C20.7637 1.73378 20.7637 3.26722 19.691 3.48195L12.9996 4.81984V6.0005H18.9996C19.5519 6.0005 19.9996 6.44822 19.9996 7.0005C19.9994 7.5526 19.5518 8.0005 18.9996 8.0005H12.9996V9.5005H18.9996C19.5519 9.5005 19.9996 9.94822 19.9996 10.5005C19.9994 11.0526 19.5518 11.5005 18.9996 11.5005H12.9996V15.0005H14.9977C15.7412 15.0005 16.2259 15.7828 15.8932 16.4487L12.8951 22.4458C12.526 23.1831 11.473 23.1833 11.1041 22.4458L8.10605 16.4487C7.77356 15.7833 8.25783 15.0008 9.00156 15.0005H10.9996V1.00148C10.9997 0.4093 11.508 -0.0441781 12.0816 0.00343268Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-true-14': ObiWindTrue14;
  }
}
