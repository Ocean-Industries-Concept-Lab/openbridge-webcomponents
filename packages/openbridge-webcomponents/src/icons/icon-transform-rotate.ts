import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-transform-rotate')
export class ObiTransformRotate extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 8C14.387 8 16.6765 8.84255 18.3643 10.3428C19.0291 10.9337 19.5775 11.6085 20 12.3379V9H22V16H15V14H18.5957C18.2687 13.2105 17.7464 12.4701 17.0352 11.8379C15.7355 10.6827 13.9275 10 12 10C10.0725 10 8.26448 10.6827 6.96484 11.8379C6.25363 12.4701 5.73135 13.2105 5.4043 14H9V16H2V9H4V12.3379C4.42248 11.6085 4.97095 10.9337 5.63574 10.3428C7.3235 8.84255 9.61297 8 12 8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 8C14.387 8 16.6765 8.84255 18.3643 10.3428C19.0291 10.9337 19.5775 11.6085 20 12.3379V9H22V16H15V14H18.5957C18.2687 13.2105 17.7464 12.4701 17.0352 11.8379C15.7355 10.6827 13.9275 10 12 10C10.0725 10 8.26448 10.6827 6.96484 11.8379C6.25363 12.4701 5.73135 13.2105 5.4043 14H9V16H2V9H4V12.3379C4.42248 11.6085 4.97095 10.9337 5.63574 10.3428C7.3235 8.84255 9.61297 8 12 8Z" style="fill: var(--element-active-color)"/>
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
