import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-star')
export class ObiStar extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9095 8.99537L12 2L9.09041 8.99537L1.53833 9.60081L7.29222 14.5296L5.53431 21.8992L12 17.95L18.4656 21.8992L16.7077 14.5296L22.4616 9.60081L14.9095 8.99537ZM18.7468 10.8078L13.8764 10.4174L12 5.90594L10.1235 10.4174L5.2531 10.8078L8.96387 13.9865L7.83017 18.7392L12 16.1923L16.1697 18.7392L15.036 13.9865L18.7468 10.8078Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9095 8.99537L12 2L9.09041 8.99537L1.53833 9.60081L7.29222 14.5296L5.53431 21.8992L12 17.95L18.4656 21.8992L16.7077 14.5296L22.4616 9.60081L14.9095 8.99537ZM18.7468 10.8078L13.8764 10.4174L12 5.90594L10.1235 10.4174L5.2531 10.8078L8.96387 13.9865L7.83017 18.7392L12 16.1923L16.1697 18.7392L15.036 13.9865L18.7468 10.8078Z" style="fill: var(--element-active-color)"/>
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
    'obi-star': ObiStar;
  }
}
