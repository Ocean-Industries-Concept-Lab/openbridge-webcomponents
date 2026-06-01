import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-shaft-13')
export class ObiWindShaft13 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2373 1.03603L12.3672 1.06044L19.8545 2.93251C20.9654 3.21025 20.9654 4.78954 19.8545 5.06728L13 6.78017V8.9999H19C19.5523 8.9999 20 9.44763 20 9.9999C20 10.5522 19.5523 10.9999 19 10.9999H13V23.9999H11V2.12783C11.0001 1.45694 11.5913 0.953184 12.2373 1.03603Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2373 1.03603L12.3672 1.06044L19.8545 2.93251C20.9654 3.21025 20.9654 4.78954 19.8545 5.06728L13 6.78017V8.9999H19C19.5523 8.9999 20 9.44763 20 9.9999C20 10.5522 19.5523 10.9999 19 10.9999H13V23.9999H11V2.12783C11.0001 1.45694 11.5913 0.953184 12.2373 1.03603Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-shaft-13': ObiWindShaft13;
  }
}
