import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-arrow-bidirectional-diagonal')
export class ObiArrowBidirectionalDiagonal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.98744 18.2501L12.9461 18.2501L12.9461 20.0001H4L4 11.0541H5.75L5.75 17.0127L17.0129 5.80371L11.0543 5.80371L11.0543 4.05371L20.0004 4.05371L20.0004 12.9998L18.2504 12.9998L18.2504 7.04115L6.98744 18.2501Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.98744 18.2501L12.9461 18.2501L12.9461 20.0001H4L4 11.0541H5.75L5.75 17.0127L17.0129 5.80371L11.0543 5.80371L11.0543 4.05371L20.0004 4.05371L20.0004 12.9998L18.2504 12.9998L18.2504 7.04115L6.98744 18.2501Z" style="fill: var(--element-active-color)"/>
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
    'obi-arrow-bidirectional-diagonal': ObiArrowBidirectionalDiagonal;
  }
}
