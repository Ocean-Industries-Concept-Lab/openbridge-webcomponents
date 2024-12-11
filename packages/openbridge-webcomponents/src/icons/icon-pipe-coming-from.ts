import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-coming-from')
export class ObiPipeComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0133 14.9999L0 14.9999L2.38419e-07 8.99986H9L15.4 4.19986C16.0592 3.70544 17 4.17582 17 4.99986V18.9979C17 19.8223 16.0585 20.2926 15.3994 19.7974L9.0133 14.9999Z" fill="currentColor"/>
<path d="M16 18.9979V4.99986L9.33333 9.99986H0V8.99986H9L15.4 4.19986C16.0592 3.70544 17 4.17582 17 4.99986V18.9979C17 19.8223 16.0585 20.2926 15.3994 19.7974L9.0133 14.9999L0 14.9999V13.9999L9.34707 13.9999L16 18.9979Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0133 14.9999L0 14.9999L2.38419e-07 8.99986H9L15.4 4.19986C16.0592 3.70544 17 4.17582 17 4.99986V18.9979C17 19.8223 16.0585 20.2926 15.3994 19.7974L9.0133 14.9999Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M16 18.9979V4.99986L9.33333 9.99986H0V8.99986H9L15.4 4.19986C16.0592 3.70544 17 4.17582 17 4.99986V18.9979C17 19.8223 16.0585 20.2926 15.3994 19.7974L9.0133 14.9999L0 14.9999V13.9999L9.34707 13.9999L16 18.9979Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
