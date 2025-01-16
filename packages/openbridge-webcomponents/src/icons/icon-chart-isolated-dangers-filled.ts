import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-isolated-dangers-filled')
export class ObiChartIsolatedDangersFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7782 4.22183L12 1L4.22183 4.22183L1 12L4.22183 19.7782L12 23L19.7782 19.7782L23 12L19.7782 4.22183ZM15.5039 7.03551L16.9142 8.44581L13.3758 11.9842L16.8452 15.4536L15.4349 16.8639L11.9655 13.3945L8.49612 16.8639L7.08582 15.4536L10.5552 11.9842L7.08582 8.51478L8.49612 7.10449L11.9655 10.5739L15.5039 7.03551Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7782 4.22183L12 1L4.22183 4.22183L1 12L4.22183 19.7782L12 23L19.7782 19.7782L23 12L19.7782 4.22183ZM15.5039 7.03551L16.9142 8.44581L13.3758 11.9842L16.8452 15.4536L15.4349 16.8639L11.9655 13.3945L8.49612 16.8639L7.08582 15.4536L10.5552 11.9842L7.08582 8.51478L8.49612 7.10449L11.9655 10.5739L15.5039 7.03551Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-isolated-dangers-filled': ObiChartIsolatedDangersFilled;
  }
}
