import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-aton-iec')
export class ObiChartAtonIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2361 9C14.7111 8.46924 15 7.76835 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 7.76835 9.28885 8.46924 9.76389 9H4.54602L2.27329 16H1V18L9.17071 18C9.58254 19.1652 10.6938 20 12 20C13.3062 20 14.4175 19.1652 14.8293 18L23 18V16H21.7267L19.454 9H14.2361ZM12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8ZM14.8293 16H19.6239L18.0006 11H5.99944L4.37606 16L9.17071 16C9.58254 14.8348 10.6938 14 12 14C13.3062 14 14.4175 14.8348 14.8293 16ZM12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2361 9C14.7111 8.46924 15 7.76835 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 7.76835 9.28885 8.46924 9.76389 9H4.54602L2.27329 16H1V18L9.17071 18C9.58254 19.1652 10.6938 20 12 20C13.3062 20 14.4175 19.1652 14.8293 18L23 18V16H21.7267L19.454 9H14.2361ZM12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8ZM14.8293 16H19.6239L18.0006 11H5.99944L4.37606 16L9.17071 16C9.58254 14.8348 10.6938 14 12 14C13.3062 14 14.4175 14.8348 14.8293 16ZM12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-aton-iec': ObiChartAtonIec;
  }
}
