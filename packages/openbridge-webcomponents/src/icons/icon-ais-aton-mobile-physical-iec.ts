import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-aton-mobile-physical-iec')
export class ObiAisAtonMobilePhysicalIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 12L12 1L23 12L12 23L1 12ZM12 21.5858L21.5858 12L12 2.41421L2.41421 12L12 21.5858Z" fill="currentColor"/>
<path d="M17 12.4999V11.4999H7V12.4999H17Z" fill="currentColor"/>
<path d="M15.8891 8.81795L15.182 8.11084L8.11091 15.1819L8.81802 15.889L15.8891 8.81795Z" fill="currentColor"/>
<path d="M15.182 15.889L15.8891 15.1819L8.81802 8.11084L8.11091 8.81795L15.182 15.889Z" fill="currentColor"/>
<path d="M11.4999 17H12.4999V7H11.4999V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 12L12 1L23 12L12 23L1 12ZM12 21.5858L21.5858 12L12 2.41421L2.41421 12L12 21.5858Z" style="fill: var(--element-active-color)"/>
<path d="M17 12.4999V11.4999H7V12.4999H17Z" style="fill: var(--element-active-color)"/>
<path d="M15.8891 8.81795L15.182 8.11084L8.11091 15.1819L8.81802 15.889L15.8891 8.81795Z" style="fill: var(--element-active-color)"/>
<path d="M15.182 15.889L15.8891 15.1819L8.81802 8.11084L8.11091 8.81795L15.182 15.889Z" style="fill: var(--element-active-color)"/>
<path d="M11.4999 17H12.4999V7H11.4999V17Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-aton-mobile-physical-iec': ObiAisAtonMobilePhysicalIec;
  }
}