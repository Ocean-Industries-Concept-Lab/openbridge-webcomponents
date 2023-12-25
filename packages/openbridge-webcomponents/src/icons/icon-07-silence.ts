import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-silence')
export class Obi07Silence extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.34005 2.93506L2.93005 4.34506L7.29005 8.70506L7.00005 9.00506H3.00005V15.0051H7.00005L12.0001 20.0051V13.4151L16.1801 17.5951C15.5301 18.0851 14.8001 18.4751 14.0001 18.7051V20.7651C15.3401 20.4651 16.5701 19.8451 17.6101 19.0151L19.6601 21.0651L21.0701 19.6551L4.34005 2.93506ZM10.0001 15.1751L7.83005 13.0051H5.00005V11.0051H7.83005L8.71005 10.1251L10.0001 11.4151V15.1751ZM18.5901 14.3451C18.8501 13.6151 19.0001 12.8251 19.0001 12.0051C19.0001 8.83506 16.8901 6.15506 14.0001 5.29506V3.23506C18.0101 4.14506 21.0001 7.72506 21.0001 12.0051C21.0001 13.3951 20.6801 14.7051 20.1201 15.8751L18.5901 14.3451ZM12.0001 4.00506L10.1201 5.88506L12.0001 7.76506V4.00506ZM14.0001 7.97506C15.4801 8.71506 16.5001 10.2351 16.5001 12.0051C16.5001 12.0851 16.4901 12.1651 16.4801 12.2451L14.0001 9.76506V7.97506Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.34005 2.93506L2.93005 4.34506L7.29005 8.70506L7.00005 9.00506H3.00005V15.0051H7.00005L12.0001 20.0051V13.4151L16.1801 17.5951C15.5301 18.0851 14.8001 18.4751 14.0001 18.7051V20.7651C15.3401 20.4651 16.5701 19.8451 17.6101 19.0151L19.6601 21.0651L21.0701 19.6551L4.34005 2.93506ZM10.0001 15.1751L7.83005 13.0051H5.00005V11.0051H7.83005L8.71005 10.1251L10.0001 11.4151V15.1751ZM18.5901 14.3451C18.8501 13.6151 19.0001 12.8251 19.0001 12.0051C19.0001 8.83506 16.8901 6.15506 14.0001 5.29506V3.23506C18.0101 4.14506 21.0001 7.72506 21.0001 12.0051C21.0001 13.3951 20.6801 14.7051 20.1201 15.8751L18.5901 14.3451ZM12.0001 4.00506L10.1201 5.88506L12.0001 7.76506V4.00506ZM14.0001 7.97506C15.4801 8.71506 16.5001 10.2351 16.5001 12.0051C16.5001 12.0851 16.4901 12.1651 16.4801 12.2451L14.0001 9.76506V7.97506Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-07-silence': Obi07Silence;
  }
}
