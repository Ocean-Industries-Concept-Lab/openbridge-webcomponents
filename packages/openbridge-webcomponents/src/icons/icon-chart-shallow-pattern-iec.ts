import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-shallow-pattern-iec')
export class ObiChartShallowPatternIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.644 2H16.9119L16 3.57951L15.0881 2H13.356L15.134 5.07951L12 10.5077L8.86601 5.07951L10.644 2H8.91191L7.99998 3.5795L7.08806 2H5.35601L7.13396 5.0795L3.99998 10.5077L2 7.04364V10.0436L3.13396 12.0077L2 13.9718V16.9718L3.99998 13.5077L7.13396 18.9359L5.36491 22H7.09696L7.99998 20.4359L8.90301 22H10.6351L8.86601 18.9359L12 13.5077L15.134 18.9359L13.3649 22H15.097L16 20.4359L16.903 22H18.6351L16.866 18.9359L20 13.5077L22 16.9718V13.9718L20.866 12.0077L22 10.0436V7.04358L20 10.5077L16.866 5.07951L18.644 2ZM19.134 12.0077L16 6.57951L12.866 12.0077L16 17.4359L19.134 12.0077ZM4.86601 12.0077L7.99998 17.4359L11.134 12.0077L7.99998 6.57951L4.86601 12.0077Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.644 2H16.9119L16 3.57951L15.0881 2H13.356L15.134 5.07951L12 10.5077L8.86601 5.07951L10.644 2H8.91191L7.99998 3.5795L7.08806 2H5.35601L7.13396 5.0795L3.99998 10.5077L2 7.04364V10.0436L3.13396 12.0077L2 13.9718V16.9718L3.99998 13.5077L7.13396 18.9359L5.36491 22H7.09696L7.99998 20.4359L8.90301 22H10.6351L8.86601 18.9359L12 13.5077L15.134 18.9359L13.3649 22H15.097L16 20.4359L16.903 22H18.6351L16.866 18.9359L20 13.5077L22 16.9718V13.9718L20.866 12.0077L22 10.0436V7.04358L20 10.5077L16.866 5.07951L18.644 2ZM19.134 12.0077L16 6.57951L12.866 12.0077L16 17.4359L19.134 12.0077ZM4.86601 12.0077L7.99998 17.4359L11.134 12.0077L7.99998 6.57951L4.86601 12.0077Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-shallow-pattern-iec': ObiChartShallowPatternIec;
  }
}
