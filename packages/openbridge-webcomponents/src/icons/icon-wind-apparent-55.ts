import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-apparent-55')
export class ObiWindApparent55 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1969 0.0200333L12.0816 0.00343171C11.508 -0.0441718 10.9997 0.409303 10.9996 1.00148V15.0005H9.00156C8.25784 15.0008 7.77356 15.7833 8.10605 16.4487L11.1041 22.4458C11.473 23.1833 12.526 23.1831 12.8951 22.4458L15.8932 16.4487C16.2259 15.7828 15.7412 15.0005 14.9977 15.0005H12.9996L12.9996 8H15.9996C16.5519 8 16.9996 7.55228 16.9996 7C16.9996 6.44772 16.5519 6 15.9996 6H12.9996V4.81984L19.691 3.48195C20.7637 3.26722 20.7637 1.73378 19.691 1.51906L12.1969 0.0200333ZM13.3814 17.0005L11.9996 19.7642L10.6178 17.0005H13.3814Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1969 0.0200333L12.0816 0.00343171C11.508 -0.0441718 10.9997 0.409303 10.9996 1.00148V15.0005H9.00156C8.25784 15.0008 7.77356 15.7833 8.10605 16.4487L11.1041 22.4458C11.473 23.1833 12.526 23.1831 12.8951 22.4458L15.8932 16.4487C16.2259 15.7828 15.7412 15.0005 14.9977 15.0005H12.9996L12.9996 8H15.9996C16.5519 8 16.9996 7.55228 16.9996 7C16.9996 6.44772 16.5519 6 15.9996 6H12.9996V4.81984L19.691 3.48195C20.7637 3.26722 20.7637 1.73378 19.691 1.51906L12.1969 0.0200333ZM13.3814 17.0005L11.9996 19.7642L10.6178 17.0005H13.3814Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-apparent-55': ObiWindApparent55;
  }
}
