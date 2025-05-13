import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-layers')
export class ObiChartLayers extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.05L3 14.05L4.65 12.8L12 18.5L19.35 12.8L21 14.05L12 21.05ZM12 16L3 9L12 2L21 9L12 16ZM12 13.45L17.75 9L12 4.55L6.25 9L12 13.45Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.05L3 14.05L4.65 12.8L12 18.5L19.35 12.8L21 14.05L12 21.05ZM12 16L3 9L12 2L21 9L12 16ZM12 13.45L17.75 9L12 4.55L6.25 9L12 13.45Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-layers': ObiChartLayers;
  }
}
