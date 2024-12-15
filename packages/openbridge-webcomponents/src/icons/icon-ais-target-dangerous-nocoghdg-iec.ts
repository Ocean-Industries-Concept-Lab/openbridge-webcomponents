import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-target-dangerous-nocoghdg-iec')
export class ObiAisTargetDangerousNocoghdgIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0L9.37118 7.88646L11.1391 8.90718L12 6.32456L13.2712 10.1381L15.8818 11.6454L12 0Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 24L8.08006 11.7598L1.96997 8.23217L2.96997 6.50012L22.0225 17.5001L21.0225 19.2322L17.7883 17.3649L20 24H4ZM15.1777 15.8577L9.848 12.7806L6.77485 22L17.2251 22L15.1777 15.8577Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0L9.37118 7.88646L11.1391 8.90718L12 6.32456L13.2712 10.1381L15.8818 11.6454L12 0Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 24L8.08006 11.7598L1.96997 8.23217L2.96997 6.50012L22.0225 17.5001L21.0225 19.2322L17.7883 17.3649L20 24H4ZM15.1777 15.8577L9.848 12.7806L6.77485 22L17.2251 22L15.1777 15.8577Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-dangerous-nocoghdg-iec': ObiAisTargetDangerousNocoghdgIec;
  }
}
