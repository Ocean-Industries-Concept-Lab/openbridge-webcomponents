import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-track-on')
export class ObiTrackOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.4574 2.95718L20.9574 4.45718L19.5431 3.04297L21.0431 1.54297L22.4574 2.95718Z" fill="currentColor"/>
<path d="M17.9574 7.45719L19.4574 5.95719L18.0431 4.54297L16.5431 6.04298L17.9574 7.45719Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C13.9983 7.46544 11.774 7.98336 10.2037 9.55373L4.63538 15.122L6.04971 16.5364L1.54309 21.043L2.9573 22.4572L7.46392 17.9506L8.87802 19.3647L14.4463 13.7964C16.0167 12.226 16.5346 10.0017 16 8ZM14.1962 9.80385C13.2558 9.86231 12.3344 10.2514 11.6179 10.9679L7.4638 15.122L8.87802 16.5362L13.0321 12.3822C13.7487 11.6656 14.1377 10.7443 14.1962 9.80385Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.4574 2.95718L20.9574 4.45718L19.5431 3.04297L21.0431 1.54297L22.4574 2.95718Z" style="fill: var(--element-active-color)"/>
<path d="M17.9574 7.45719L19.4574 5.95719L18.0431 4.54297L16.5431 6.04298L17.9574 7.45719Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C13.9983 7.46544 11.774 7.98336 10.2037 9.55373L4.63538 15.122L6.04971 16.5364L1.54309 21.043L2.9573 22.4572L7.46392 17.9506L8.87802 19.3647L14.4463 13.7964C16.0167 12.226 16.5346 10.0017 16 8ZM14.1962 9.80385C13.2558 9.86231 12.3344 10.2514 11.6179 10.9679L7.4638 15.122L8.87802 16.5362L13.0321 12.3822C13.7487 11.6656 14.1377 10.7443 14.1962 9.80385Z" style="fill: var(--element-active-color)"/>
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
    'obi-track-on': ObiTrackOn;
  }
}
