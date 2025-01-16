import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-isolated-dangers')
export class ObiChartIsolatedDangers extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9143 8.4457L15.504 7.0354L11.9656 10.5738L8.49623 7.10438L7.08594 8.51467L10.5553 11.9841L7.08594 15.4535L8.49623 16.8638L11.9656 13.3944L15.4351 16.8638L16.8454 15.4535L13.3759 11.9841L16.9143 8.4457Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7782 4.22183L12 1L4.22183 4.22183L1 12L4.22183 19.7782L12 23L19.7782 19.7782L23 12L19.7782 4.22183ZM5.75256 5.75256L12 3.16478L18.2474 5.75256L20.8352 12L18.2474 18.2474L12 20.8352L5.75256 18.2474L3.16478 12L5.75256 5.75256Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9143 8.4457L15.504 7.0354L11.9656 10.5738L8.49623 7.10438L7.08594 8.51467L10.5553 11.9841L7.08594 15.4535L8.49623 16.8638L11.9656 13.3944L15.4351 16.8638L16.8454 15.4535L13.3759 11.9841L16.9143 8.4457Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7782 4.22183L12 1L4.22183 4.22183L1 12L4.22183 19.7782L12 23L19.7782 19.7782L23 12L19.7782 4.22183ZM5.75256 5.75256L12 3.16478L18.2474 5.75256L20.8352 12L18.2474 18.2474L12 20.8352L5.75256 18.2474L3.16478 12L5.75256 5.75256Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-isolated-dangers': ObiChartIsolatedDangers;
  }
}
