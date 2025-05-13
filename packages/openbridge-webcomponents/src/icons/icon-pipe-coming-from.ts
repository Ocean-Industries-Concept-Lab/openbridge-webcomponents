import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-coming-from')
export class ObiPipeComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0133 15L0 15L2.38419e-07 8.99998H9L15.4 4.19998C16.0592 3.70556 17 4.17594 17 4.99998V18.998C17 19.8224 16.0585 20.2927 15.3994 19.7975L9.0133 15Z" fill="currentColor"/>
<path d="M16 18.998V4.99998L9.33333 9.99998H0V8.99998H9L15.4 4.19998C16.0592 3.70556 17 4.17594 17 4.99998V18.998C17 19.8224 16.0585 20.2927 15.3994 19.7975L9.0133 15L0 15V14L9.34707 14L16 18.998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0133 15L0 15L2.38419e-07 8.99998H9L15.4 4.19998C16.0592 3.70556 17 4.17594 17 4.99998V18.998C17 19.8224 16.0585 20.2927 15.3994 19.7975L9.0133 15Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M16 18.998V4.99998L9.33333 9.99998H0V8.99998H9L15.4 4.19998C16.0592 3.70556 17 4.17594 17 4.99998V18.998C17 19.8224 16.0585 20.2927 15.3994 19.7975L9.0133 15L0 15V14L9.34707 14L16 18.998Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-pipe-coming-from': ObiPipeComingFrom;
  }
}
