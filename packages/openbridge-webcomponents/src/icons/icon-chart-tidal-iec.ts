import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-tidal-iec')
export class ObiChartTidalIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 11.2502L12.6493 11.2502C11.7139 6.91138 5.28599 6.91138 4.35059 11.2502L1 11.2502V12.7502L11.3506 12.7502C12.286 17.0891 18.7139 17.0891 19.6493 12.7502L23 12.7502V11.2502ZM18.0883 12.7502L12.9117 12.7502C13.7369 15.0891 17.263 15.0891 18.0883 12.7502ZM11.0883 11.2502C10.263 8.91138 6.73694 8.91138 5.91167 11.2502L11.0883 11.2502Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 11.2502L12.6493 11.2502C11.7139 6.91138 5.28599 6.91138 4.35059 11.2502L1 11.2502V12.7502L11.3506 12.7502C12.286 17.0891 18.7139 17.0891 19.6493 12.7502L23 12.7502V11.2502ZM18.0883 12.7502L12.9117 12.7502C13.7369 15.0891 17.263 15.0891 18.0883 12.7502ZM11.0883 11.2502C10.263 8.91138 6.73694 8.91138 5.91167 11.2502L11.0883 11.2502Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-chart-tidal-iec': ObiChartTidalIec;
  }
}