import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-rotate')
export class ObiTransformRotate extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7891 7.00333C13.4709 6.9639 15.1298 7.39657 16.5781 8.25235C17.5083 8.80199 18.327 9.51226 19 10.3451V8.0004H21V14.0004H15V12.0004H17.7432C17.1714 11.1792 16.4289 10.4867 15.5615 9.97403C14.435 9.30839 13.144 8.97168 11.8359 9.00235C10.5278 9.03308 9.25422 9.43005 8.16016 10.1479C7.40987 10.6402 6.76457 11.2701 6.25586 12.0004H9V14.0004H3V8.0004H5V10.3432C5.58373 9.62096 6.27879 8.99029 7.0625 8.47598C8.46918 7.55302 10.1071 7.04284 11.7891 7.00333Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7891 7.00333C13.4709 6.9639 15.1298 7.39657 16.5781 8.25235C17.5083 8.80199 18.327 9.51226 19 10.3451V8.0004H21V14.0004H15V12.0004H17.7432C17.1714 11.1792 16.4289 10.4867 15.5615 9.97403C14.435 9.30839 13.144 8.97168 11.8359 9.00235C10.5278 9.03308 9.25422 9.43005 8.16016 10.1479C7.40987 10.6402 6.76457 11.2701 6.25586 12.0004H9V14.0004H3V8.0004H5V10.3432C5.58373 9.62096 6.27879 8.99029 7.0625 8.47598C8.46918 7.55302 10.1071 7.04284 11.7891 7.00333Z" style="fill: var(--element-active-color)"/>
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
    'obi-transform-rotate': ObiTransformRotate;
  }
}
