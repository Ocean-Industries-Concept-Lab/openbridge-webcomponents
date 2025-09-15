import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-ais-target-sleeping-filled')
export class ObiAisTargetSleepingFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.67955 18.0002H16.3194C16.6567 18.0002 16.8972 17.673 16.7966 17.3511L12.4767 3.52738C12.3305 3.05956 11.6684 3.05956 11.5222 3.52738L7.20231 17.3511C7.10169 17.673 7.34223 18.0002 7.67955 18.0002Z" fill="currentColor"/>
<path d="M16.7966 17.3511C16.8972 17.673 16.6567 18.0002 16.3194 18.0002H7.67955C7.34223 18.0002 7.10169 17.673 7.20231 17.3511L11.5222 3.52738C11.6684 3.05956 12.3305 3.05956 12.4767 3.52738L16.7966 17.3511ZM9.72016 16.0002H14.2797L11.9995 8.70529L9.72016 16.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.67955 18.0002H16.3194C16.6567 18.0002 16.8972 17.673 16.7966 17.3511L12.4767 3.52738C12.3305 3.05956 11.6684 3.05956 11.5222 3.52738L7.20231 17.3511C7.10169 17.673 7.34223 18.0002 7.67955 18.0002Z" style="fill: var(--element-active-inverted-color)"/>
<path d="M16.7966 17.3511C16.8972 17.673 16.6567 18.0002 16.3194 18.0002H7.67955C7.34223 18.0002 7.10169 17.673 7.20231 17.3511L11.5222 3.52738C11.6684 3.05956 12.3305 3.05956 12.4767 3.52738L16.7966 17.3511ZM9.72016 16.0002H14.2797L11.9995 8.70529L9.72016 16.0002Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-sleeping-filled': ObiAisTargetSleepingFilled;
  }
}
