import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-55')
export class ObiWindShaft55 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3672 1.06044L12.2373 1.03603C11.5913 0.953184 11.0001 1.45694 11 2.12783V23.9999H13V10H16C16.5523 10 17 9.55228 17 9C17 8.44771 16.5523 8 16 8H13V6.78017L19.8545 5.06728C20.9654 4.78954 20.9654 3.21025 19.8545 2.93251L12.3672 1.06044Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3672 1.06044L12.2373 1.03603C11.5913 0.953184 11.0001 1.45694 11 2.12783V23.9999H13V10H16C16.5523 10 17 9.55228 17 9C17 8.44771 16.5523 8 16 8H13V6.78017L19.8545 5.06728C20.9654 4.78954 20.9654 3.21025 19.8545 2.93251L12.3672 1.06044Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-55': ObiWindShaft55;
  }
}
