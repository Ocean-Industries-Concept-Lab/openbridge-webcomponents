import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-arrow-bidirectional-vertical')
export class ObiArrowBidirectionalVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8747 19.6502L17.381 15.144L18.6184 16.3814L11.9997 23.0001L5.38098 16.3814L6.61842 15.144L11.1247 19.6502L11.1248 4.35012L6.61848 8.8564L5.38105 7.61896L11.9998 1.00024L18.6185 7.61896L17.3811 8.8564L12.8748 4.35012L12.8747 19.6502Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8747 19.6502L17.381 15.144L18.6184 16.3814L11.9997 23.0001L5.38098 16.3814L6.61842 15.144L11.1247 19.6502L11.1248 4.35012L6.61848 8.8564L5.38105 7.61896L11.9998 1.00024L18.6185 7.61896L17.3811 8.8564L12.8748 4.35012L12.8747 19.6502Z" style="fill: var(--element-active-color)"/>
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
    'obi-arrow-bidirectional-vertical': ObiArrowBidirectionalVertical;
  }
}
