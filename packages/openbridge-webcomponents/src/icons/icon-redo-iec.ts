import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-redo-iec')
export class ObiRedoIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2135 19C8.59681 19 7.20948 18.475 6.05148 17.425C4.89281 16.375 4.31348 15.0667 4.31348 13.5C4.31348 11.9333 4.89281 10.625 6.05148 9.575C7.20948 8.525 8.59681 8 10.2135 8H16.5135L13.9135 5.4L15.3135 4L20.3135 9L15.3135 14L13.9135 12.6L16.5135 10H10.2135C9.16348 10 8.25114 10.3333 7.47648 11C6.70114 11.6667 6.31348 12.5 6.31348 13.5C6.31348 14.5 6.70114 15.3333 7.47648 16C8.25114 16.6667 9.16348 17 10.2135 17H17.3135V19H10.2135Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2135 19C8.59681 19 7.20948 18.475 6.05148 17.425C4.89281 16.375 4.31348 15.0667 4.31348 13.5C4.31348 11.9333 4.89281 10.625 6.05148 9.575C7.20948 8.525 8.59681 8 10.2135 8H16.5135L13.9135 5.4L15.3135 4L20.3135 9L15.3135 14L13.9135 12.6L16.5135 10H10.2135C9.16348 10 8.25114 10.3333 7.47648 11C6.70114 11.6667 6.31348 12.5 6.31348 13.5C6.31348 14.5 6.70114 15.3333 7.47648 16C8.25114 16.6667 9.16348 17 10.2135 17H17.3135V19H10.2135Z" style="fill: var(--element-active-color)"/>
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
    'obi-redo-iec': ObiRedoIec;
  }
}
