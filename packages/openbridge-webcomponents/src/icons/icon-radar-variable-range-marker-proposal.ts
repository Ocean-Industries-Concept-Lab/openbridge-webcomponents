import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-variable-range-marker-proposal')
export class ObiRadarVariableRangeMarkerProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 19.499C7 20.8797 5.88071 21.999 4.5 21.999C3.11929 21.999 2 20.8797 2 19.499C2 18.1182 3.11929 16.999 4.5 16.999C5.88071 16.999 7 18.1182 7 19.499Z" fill="currentColor"/>
<path d="M20.499 18.4989H22.499V20.4989H20.499V18.4989Z" fill="currentColor"/>
<path d="M15.1059 7.47882L16.5201 6.0646L17.9343 7.47882L16.5201 8.89303L15.1059 7.47882Z" fill="currentColor"/>
<path d="M19.695 14.3922L21.6269 13.8745L22.1445 15.8064L20.2127 16.324L19.695 14.3922Z" fill="currentColor"/>
<path d="M17.8555 10.6335L19.5876 9.63346L20.5876 11.3655L18.8555 12.3655L17.8555 10.6335Z" fill="currentColor"/>
<path d="M11.633 5.14344L12.633 3.41139L14.3651 4.41139L13.3651 6.14344L11.633 5.14344Z" fill="currentColor"/>
<path d="M7.67471 3.78642L8.19234 1.85456L10.1242 2.3722L9.60656 4.30405L7.67471 3.78642Z" fill="currentColor"/>
<path d="M3.49963 3.5L3.49963 1.5L5.49963 1.5V3.5H3.49963Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 19.499C7 20.8797 5.88071 21.999 4.5 21.999C3.11929 21.999 2 20.8797 2 19.499C2 18.1182 3.11929 16.999 4.5 16.999C5.88071 16.999 7 18.1182 7 19.499Z" style="fill: var(--element-active-color)"/>
<path d="M20.499 18.4989H22.499V20.4989H20.499V18.4989Z" style="fill: var(--element-active-color)"/>
<path d="M15.1059 7.47882L16.5201 6.0646L17.9343 7.47882L16.5201 8.89303L15.1059 7.47882Z" style="fill: var(--element-active-color)"/>
<path d="M19.695 14.3922L21.6269 13.8745L22.1445 15.8064L20.2127 16.324L19.695 14.3922Z" style="fill: var(--element-active-color)"/>
<path d="M17.8555 10.6335L19.5876 9.63346L20.5876 11.3655L18.8555 12.3655L17.8555 10.6335Z" style="fill: var(--element-active-color)"/>
<path d="M11.633 5.14344L12.633 3.41139L14.3651 4.41139L13.3651 6.14344L11.633 5.14344Z" style="fill: var(--element-active-color)"/>
<path d="M7.67471 3.78642L8.19234 1.85456L10.1242 2.3722L9.60656 4.30405L7.67471 3.78642Z" style="fill: var(--element-active-color)"/>
<path d="M3.49963 3.5L3.49963 1.5L5.49963 1.5V3.5H3.49963Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-variable-range-marker-proposal': ObiRadarVariableRangeMarkerProposal;
  }
}