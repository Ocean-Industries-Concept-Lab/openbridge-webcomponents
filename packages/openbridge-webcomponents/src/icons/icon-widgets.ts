import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-widgets')
export class ObiWidgets extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.65 12.9992L11 7.34922L16.65 1.69922L22.3 7.34922L16.65 12.9992ZM3 10.9992V2.99922H11V10.9992H3ZM13 20.9992V12.9992H21V20.9992H13ZM3 20.9992V12.9992H11V20.9992H3ZM5 8.99922H9V4.99922H5V8.99922ZM16.675 10.1992L19.5 7.37422L16.675 4.54922L13.85 7.37422L16.675 10.1992ZM15 18.9992H19V14.9992H15V18.9992ZM5 18.9992H9V14.9992H5V18.9992Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.65 12.9992L11 7.34922L16.65 1.69922L22.3 7.34922L16.65 12.9992ZM3 10.9992V2.99922H11V10.9992H3ZM13 20.9992V12.9992H21V20.9992H13ZM3 20.9992V12.9992H11V20.9992H3ZM5 8.99922H9V4.99922H5V8.99922ZM16.675 10.1992L19.5 7.37422L16.675 4.54922L13.85 7.37422L16.675 10.1992ZM15 18.9992H19V14.9992H15V18.9992ZM5 18.9992H9V14.9992H5V18.9992Z" style="fill: var(--element-active-color)"/>
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
    'obi-widgets': ObiWidgets;
  }
}
