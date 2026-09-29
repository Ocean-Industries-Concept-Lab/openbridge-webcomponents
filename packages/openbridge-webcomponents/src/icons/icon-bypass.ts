import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-bypass')
export class ObiBypass extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 17C9.05 17 9.52044 16.8038 9.91211 16.4121C10.3038 16.0204 10.5 15.55 10.5 15C10.5 12.7667 11.2752 10.8752 12.8252 9.3252C14.3707 7.77972 16.2556 7.00548 18.4805 7.00098L17 8.59961L18.2959 10L22 6L18.2959 2L17 3.40039L18.4814 5C17.105 5.00234 15.8108 5.26446 14.5996 5.78711C13.383 6.3121 12.3248 7.02485 11.4248 7.9248C10.5249 8.82476 9.8121 9.88302 9.28711 11.0996C8.76211 12.3163 8.5 13.6167 8.5 15H2V17H8.5Z" fill="currentColor"/>
<path d="M19 14H15V18H19V14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 17C9.05 17 9.52044 16.8038 9.91211 16.4121C10.3038 16.0204 10.5 15.55 10.5 15C10.5 12.7667 11.2752 10.8752 12.8252 9.3252C14.3707 7.77972 16.2556 7.00548 18.4805 7.00098L17 8.59961L18.2959 10L22 6L18.2959 2L17 3.40039L18.4814 5C17.105 5.00234 15.8108 5.26446 14.5996 5.78711C13.383 6.3121 12.3248 7.02485 11.4248 7.9248C10.5249 8.82476 9.8121 9.88302 9.28711 11.0996C8.76211 12.3163 8.5 13.6167 8.5 15H2V17H8.5Z" style="fill: var(--element-active-color)"/>
<path d="M19 14H15V18H19V14Z" style="fill: var(--element-active-color)"/>
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
    'obi-bypass': ObiBypass;
  }
}
