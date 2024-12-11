import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-panel-illumination-iec')
export class ObiPanelIlluminationIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 4V7.96776C8.51828 8.70411 7.5 10.2331 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 10.2331 15.4817 8.70411 14 7.96776V4H10ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" fill="currentColor"/>
<path d="M18.1873 6.8734L16.7731 8.28762L15.7124 7.22696L17.1267 5.81274L18.1873 6.8734Z" fill="currentColor"/>
<path d="M20 12.7501H18V11.2501H20V12.7501Z" fill="currentColor"/>
<path d="M12.75 20.0001L12.75 18.0001H11.25L11.25 20.0001H12.75Z" fill="currentColor"/>
<path d="M4 12.7501L6 12.7501V11.2501L4 11.2501V12.7501Z" fill="currentColor"/>
<path d="M8.28781 7.2272L6.87359 5.81299L5.81276 6.87357L7.22715 8.28786L8.28781 7.2272Z" fill="currentColor"/>
<path d="M18.1875 17.1266L16.7732 15.7124L15.7123 16.7731L17.1265 18.1873L18.1875 17.1266Z" fill="currentColor"/>
<path d="M8.2879 16.7731L6.87369 18.1873L5.81303 17.1266L7.22724 15.7124L8.2879 16.7731Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 4V7.96776C8.51828 8.70411 7.5 10.2331 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 10.2331 15.4817 8.70411 14 7.96776V4H10ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" style="fill: var(--element-active-color)"/>
<path d="M18.1873 6.8734L16.7731 8.28762L15.7124 7.22696L17.1267 5.81274L18.1873 6.8734Z" style="fill: var(--element-active-color)"/>
<path d="M20 12.7501H18V11.2501H20V12.7501Z" style="fill: var(--element-active-color)"/>
<path d="M12.75 20.0001L12.75 18.0001H11.25L11.25 20.0001H12.75Z" style="fill: var(--element-active-color)"/>
<path d="M4 12.7501L6 12.7501V11.2501L4 11.2501V12.7501Z" style="fill: var(--element-active-color)"/>
<path d="M8.28781 7.2272L6.87359 5.81299L5.81276 6.87357L7.22715 8.28786L8.28781 7.2272Z" style="fill: var(--element-active-color)"/>
<path d="M18.1875 17.1266L16.7732 15.7124L15.7123 16.7731L17.1265 18.1873L18.1875 17.1266Z" style="fill: var(--element-active-color)"/>
<path d="M8.2879 16.7731L6.87369 18.1873L5.81303 17.1266L7.22724 15.7124L8.2879 16.7731Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-panel-illumination-iec': ObiPanelIlluminationIec;
  }
}