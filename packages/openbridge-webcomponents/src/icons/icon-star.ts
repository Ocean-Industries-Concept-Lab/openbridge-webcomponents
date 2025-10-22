import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-star')
export class ObiStar extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9097 8.99537L12.0002 2L9.09066 8.99537L1.53857 9.60081L7.29247 14.5296L5.53456 21.8992L12.0002 17.95L18.4658 21.8992L16.7079 14.5296L22.4618 9.60081L14.9097 8.99537ZM18.747 10.8078L13.8766 10.4174L12.0002 5.90594L10.1238 10.4174L5.25334 10.8078L8.96411 13.9865L7.83041 18.7392L12.0002 16.1923L16.17 18.7392L15.0363 13.9865L18.747 10.8078Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9097 8.99537L12.0002 2L9.09066 8.99537L1.53857 9.60081L7.29247 14.5296L5.53456 21.8992L12.0002 17.95L18.4658 21.8992L16.7079 14.5296L22.4618 9.60081L14.9097 8.99537ZM18.747 10.8078L13.8766 10.4174L12.0002 5.90594L10.1238 10.4174L5.25334 10.8078L8.96411 13.9865L7.83041 18.7392L12.0002 16.1923L16.17 18.7392L15.0363 13.9865L18.747 10.8078Z" style="fill: var(--element-active-color)"/>
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
