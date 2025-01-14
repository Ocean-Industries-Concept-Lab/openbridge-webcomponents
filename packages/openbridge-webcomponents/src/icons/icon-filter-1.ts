import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-filter-1')
export class ObiFilter1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 1H1V23H23V1ZM1 0C0.447715 0 0 0.447716 0 1V23C0 23.5523 0.447716 24 1 24H23C23.5523 24 24 23.5523 24 23V1C24 0.447715 23.5523 0 23 0H1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.47 12.848C9.79218 11.7994 7.68266 11.7244 5.93468 12.6514L4.4685 13.4289L3.5315 11.662L4.99767 10.8845C7.37628 9.62309 10.2469 9.72505 12.53 11.152C14.2078 12.2006 16.3173 12.2756 18.0653 11.3486L19.5315 10.5711L20.4685 12.338L19.0023 13.1155C16.6237 14.3769 13.7531 14.275 11.47 12.848Z" fill="currentColor"/>
<path d="M10.2937 6.29216L8.29289 8.29297L9.70711 9.70718L12.1762 7.23811C14.326 8.2812 16.8631 8.24948 19.0023 7.11506L20.4685 6.33754L19.5315 4.57061L18.0653 5.34813C16.7068 6.06854 15.13 6.18381 13.7071 5.70717L15.7071 3.70718L14.2929 2.29297L11.8246 4.76131C9.67455 3.71786 7.13711 3.74946 4.99767 4.88401L3.53149 5.66152L4.4685 7.42845L5.93467 6.65093C7.29342 5.93038 8.87062 5.81521 10.2937 6.29216Z" fill="currentColor"/>
<path d="M10.2936 18.2921L8.29289 20.2929L9.70711 21.7071L12.1761 19.2381C14.326 20.2812 16.8631 20.2495 19.0023 19.1151L20.4685 18.3375L19.5315 16.5706L18.0653 17.3481C16.7068 18.0686 15.1299 18.1838 13.7071 17.7072L15.7071 15.7071L14.2929 14.2929L11.8245 16.7613C9.67451 15.7179 7.13709 15.7495 4.99767 16.884L3.53149 17.6615L4.4685 19.4284L5.93467 18.6509C7.2934 17.9304 8.87058 17.8152 10.2936 18.2921Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 1H1V23H23V1ZM1 0C0.447715 0 0 0.447716 0 1V23C0 23.5523 0.447716 24 1 24H23C23.5523 24 24 23.5523 24 23V1C24 0.447715 23.5523 0 23 0H1Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.47 12.848C9.79218 11.7994 7.68266 11.7244 5.93468 12.6514L4.4685 13.4289L3.5315 11.662L4.99767 10.8845C7.37628 9.62309 10.2469 9.72505 12.53 11.152C14.2078 12.2006 16.3173 12.2756 18.0653 11.3486L19.5315 10.5711L20.4685 12.338L19.0023 13.1155C16.6237 14.3769 13.7531 14.275 11.47 12.848Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10.2937 6.29216L8.29289 8.29297L9.70711 9.70718L12.1762 7.23811C14.326 8.2812 16.8631 8.24948 19.0023 7.11506L20.4685 6.33754L19.5315 4.57061L18.0653 5.34813C16.7068 6.06854 15.13 6.18381 13.7071 5.70717L15.7071 3.70718L14.2929 2.29297L11.8246 4.76131C9.67455 3.71786 7.13711 3.74946 4.99767 4.88401L3.53149 5.66152L4.4685 7.42845L5.93467 6.65093C7.29342 5.93038 8.87062 5.81521 10.2937 6.29216Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10.2936 18.2921L8.29289 20.2929L9.70711 21.7071L12.1761 19.2381C14.326 20.2812 16.8631 20.2495 19.0023 19.1151L20.4685 18.3375L19.5315 16.5706L18.0653 17.3481C16.7068 18.0686 15.1299 18.1838 13.7071 17.7072L15.7071 15.7071L14.2929 14.2929L11.8245 16.7613C9.67451 15.7179 7.13709 15.7495 4.99767 16.884L3.53149 17.6615L4.4685 19.4284L5.93467 18.6509C7.2934 17.9304 8.87058 17.8152 10.2936 18.2921Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-filter-1': ObiFilter1;
  }
}