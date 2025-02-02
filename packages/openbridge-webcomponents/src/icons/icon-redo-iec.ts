import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-redo-iec')
export class ObiRedoIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2132 19C8.59657 19 7.20923 18.475 6.05123 17.425C4.89257 16.375 4.31323 15.0667 4.31323 13.5C4.31323 11.9333 4.89257 10.625 6.05123 9.575C7.20923 8.525 8.59657 8 10.2132 8H16.5132L13.9132 5.4L15.3132 4L20.3132 9L15.3132 14L13.9132 12.6L16.5132 10H10.2132C9.16323 10 8.2509 10.3333 7.47623 11C6.7009 11.6667 6.31323 12.5 6.31323 13.5C6.31323 14.5 6.7009 15.3333 7.47623 16C8.2509 16.6667 9.16323 17 10.2132 17H17.3132V19H10.2132Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2132 19C8.59657 19 7.20923 18.475 6.05123 17.425C4.89257 16.375 4.31323 15.0667 4.31323 13.5C4.31323 11.9333 4.89257 10.625 6.05123 9.575C7.20923 8.525 8.59657 8 10.2132 8H16.5132L13.9132 5.4L15.3132 4L20.3132 9L15.3132 14L13.9132 12.6L16.5132 10H10.2132C9.16323 10 8.2509 10.3333 7.47623 11C6.7009 11.6667 6.31323 12.5 6.31323 13.5C6.31323 14.5 6.7009 15.3333 7.47623 16C8.2509 16.6667 9.16323 17 10.2132 17H17.3132V19H10.2132Z" style="fill: var(--element-active-color)"/>
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
