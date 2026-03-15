import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-true-3')
export class ObiWindTrue3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9997 0C12.552 0 12.9997 0.447715 12.9997 1V3.5H15.9997C16.552 3.5 16.9997 3.94772 16.9997 4.5C16.9997 5.05228 16.552 5.5 15.9997 5.5H12.9997V15H14.9978C15.7413 15 16.226 15.7823 15.8933 16.4482L12.8952 22.4453L12.8942 22.4443C12.5485 23.1367 11.6023 23.1802 11.1813 22.5752L11.1042 22.4453L8.10615 16.4482C7.77418 15.7833 8.25736 15.0002 9.00166 15H10.9997V1C10.9997 0.447811 11.4476 0.000155104 11.9997 0Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9997 0C12.552 0 12.9997 0.447715 12.9997 1V3.5H15.9997C16.552 3.5 16.9997 3.94772 16.9997 4.5C16.9997 5.05228 16.552 5.5 15.9997 5.5H12.9997V15H14.9978C15.7413 15 16.226 15.7823 15.8933 16.4482L12.8952 22.4453L12.8942 22.4443C12.5485 23.1367 11.6023 23.1802 11.1813 22.5752L11.1042 22.4453L8.10615 16.4482C7.77418 15.7833 8.25736 15.0002 9.00166 15H10.9997V1C10.9997 0.447811 11.4476 0.000155104 11.9997 0Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-true-3': ObiWindTrue3;
  }
}
